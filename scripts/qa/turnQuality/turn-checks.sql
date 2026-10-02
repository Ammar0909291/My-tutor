-- Phase 0 turn-quality checks (docs/architecture/TURN_ASSEMBLY_PROPOSAL.md §4).
-- READ-ONLY. Returns counts only (egress-safe). Window: :days (edit the interval below).
-- A stored assistant row is the reply prose, then (when a card was attached)
-- "\n\n<question>\nA) …" appended by appendMcqToHistoryText.
with s0 as (
  select m.id, m."sessionId", m."createdAt", m.role, m.content,
    sum(case when m.role='USER' then 1 else 0 end) over (partition by m."sessionId" order by m."createdAt", m.id) ug
  from public.messages m where m."createdAt" > now() - interval '15 days'
), usr as (
  select "sessionId", ug, content said, lag(content) over (partition by "sessionId" order by "createdAt", id) said_before
  from s0 where role='USER'
), asst as (
  select s0.*, lag(content) over (partition by "sessionId" order by "createdAt", id) prev_reply
  from s0 where role='ASSISTANT'
), a as (
  select asst.id, asst."sessionId", asst."createdAt", sub.slug subj,
    case when u.email like '%@mytutor-qa.invalid' then 'qa' else 'real' end acct,
    regexp_replace(asst.content, E'\\n\\n[^\\n]*\\nA\\) .*$', '') prose,
    substring(asst.content from E'\\n\\n([^\\n]*)\\nA\\) ') card_q,
    usr.said, usr.said_before, asst.prev_reply
  from asst
  join learn_sessions s on s.id = asst."sessionId"
  join subjects sub on sub.id = s."subjectId"
  join users u on u.id = s."userId"
  left join usr on usr."sessionId" = asst."sessionId" and usr.ug = asst.ug
  where asst."createdAt" > now() - interval '14 days'
), g as (
  select a.*,
    coalesce(array_length(regexp_split_to_array(btrim(prose), E'\\s+'), 1), 0) words,
    btrim(prose) ilike '%finished — nice work%' is_close,
    -- the learner tapped an option of the card on the previous reply
    (prev_reply is not null and said is not null
      and (strpos(prev_reply, E'\nA) ' || said) + strpos(prev_reply, E'\nB) ' || said) + strpos(prev_reply, E'\nC) ' || said) + strpos(prev_reply, E'\nD) ' || said)) > 0) graded,
    -- curly apostrophes read as straight ones (models write "let’s")
    translate(coalesce(substring(btrim(prose) from E'([^.!?]+[.!?]*)$'), ''), '‘’', '''''') last_sentence,
    row_number() over (partition by "sessionId", md5(btrim(prose)) order by "createdAt") dup_rank
  from a
)
select subj, acct,
  count(*) turns,
  count(*) filter (where card_q is not null) with_card,
  count(*) filter (where graded) graded_turns,
  -- K1 stub: under 12 words of prose, not the lesson close
  count(*) filter (where words < 12 and not is_close and card_q is null) k1_stub_no_card,
  count(*) filter (where words < 12 and not is_close and graded) k1_stub_on_graded,
  -- K2 a question in the prose beside a card
  count(*) filter (where card_q is not null and prose ~ '\?') k2_question_beside_card,
  -- K3 the reply quotes the learner's PREVIOUS answer and not this one (R2 signature)
  count(*) filter (where graded and said_before is not null and length(said_before) >= 4
    and said_before <> said and strpos(prose, said_before) > 0 and strpos(prose, said) = 0) k3_previous_answer_quoted,
  -- K4 a closing sentence announcing the (hidden) card
  count(*) filter (where card_q is not null
    and last_sentence ~* '\y(now|next|let''?s|let me|you''?ll|below|beneath|coming up|time to|follows|following|upcoming)\y'
    and last_sentence ~* '\y(question|check|quiz|tests?|tested|testing|try|problem|exercise|see (if|whether|how well)|your turn)\y'
    and last_sentence !~ '\?') k4_blind_lead_in,
  -- K5 the same prose (over 120 chars) sent again in the session
  count(*) filter (where dup_rank > 1 and length(btrim(prose)) > 120) k5_repeated_reply
from g group by 1, 2 order by 1, 2;
