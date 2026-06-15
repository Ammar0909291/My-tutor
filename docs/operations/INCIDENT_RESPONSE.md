# Incident Response Playbook

## Emergency Contacts
| Role | Name | Contact |
|------|------|---------|
| On-call engineer | [FILL IN] | [FILL IN] |
| Database admin | [FILL IN] | [FILL IN] |
| Platform owner | [FILL IN] | [FILL IN] |

---

## Incident Types

### DB Connectivity Loss
**Symptoms**: 503 from `/api/health`, login failures, blank dashboards

**Steps**:
1. Check `/api/health` → look at `db` field
2. Check Neon console for database status
3. Verify `DATABASE_URL` env var is correct and the pooler endpoint is active
4. Check for Neon auto-suspend: visit console.neon.tech and wake the database
5. If using pgbouncer: verify `?pgbouncer=true&connect_timeout=15` params

**Resolution**: Once DB is reachable, `/api/health` returns `{ "status": "ok" }` automatically.

---

### SMTP / Email Failures
**Symptoms**: Password reset emails not delivered, verification emails bouncing

**Steps**:
1. Check `/admin/ops` → Failure Counters panel for `smtp` context
2. Verify `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` are set correctly
3. Test SMTP connection: `openssl s_client -connect smtp.gmail.com:587 -starttls smtp`
4. Check Gmail: ensure "App Passwords" are used (not account password) if 2FA is on
5. Check spam/bounce logs on your email provider dashboard

---

### AI Provider Failure
**Symptoms**: Chat responses fail, tutor sessions error out

**Steps**:
1. Check `/admin/ai-ops` for provider status
2. The app has automatic fallback: OpenRouter → Groq → Gemini
3. Check `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `GEMINI_API_KEY` are set
4. Check provider status pages:
   - Groq: status.groq.com
   - OpenRouter: openrouter.ai
5. Monitor failure counters at `/admin/ops`

---

### High 429 Rate (Rate Limit Errors)
**Symptoms**: Users see "Too many requests" errors

**Steps**:
1. Check rate limit config in `src/lib/rateLimitEdge.ts`
2. Review `AI_GLOBAL_RPM` env var — current limit may be too low
3. Check Redis availability (`REDIS_URL`) — rate limiting requires Redis
4. Consider increasing `AI_GLOBAL_RPM` or adding per-user limits
5. Check for abuse: review `/admin/users` for unusual activity

---

### Auth Failures
**Symptoms**: Users cannot log in, sessions expire immediately, JWT errors in logs

**Steps**:
1. Verify `AUTH_SECRET` env var is set (NextAuth v5 — NOT `NEXTAUTH_SECRET`)
2. Ensure `AUTH_SECRET` is at least 32 characters: `openssl rand -base64 32`
3. Check `NEXTAUTH_URL` matches the actual deployment URL
4. Clear browser cookies and retry
5. Check Google OAuth credentials if using Google sign-in

**Note**: If `AUTH_SECRET` changes, all existing sessions are invalidated — all users must re-login.

---

## Post-Incident
1. Document timeline in incident log
2. Update this playbook with any new findings
3. Add monitoring for the failure pattern if not already covered
