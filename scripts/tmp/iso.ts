import { vAffirm } from '@/lib/kernel/verifier/rules'
const ctx = (learnerText: string) => ({ learnerText } as never)
const learner = 'ok so area would be L times L, so L squared right?'
// VERBATIM from the last production response (replay after e4a5c3c6).
const draft = `Claude, you hit the nail right on the head! Area is indeed length multiplied by length, which gives us length squared, written as L squared.   Because area is made of length multiplied by length, we can say its dimension is length squared. Now, imagine we are building on that exact idea of dimensions to check if a formula makes sense.   If someone wrote down an equation where they tried to add an area (which has the dimension of length squared) directly to a plain distance (which has the dimension of just length), dimensional analysis is the tool we use to spot that mismatch instantly, just like knowing you cannot add three kilograms to four seconds.`
const v = vAffirm(draft, ctx(learner))
console.log('vAffirm on the EXACT production draft:', v ? `REJECT (${v.matched})` : 'PASS')
// If PASS, which marker let it through?
const M = /\b(not\s+quite|not\s+exactly|not\s+just|not\s+the\s+same|isn'?t|is\s+not|are\s+not|aren'?t|rather\s+than|more\s+than\s+just|instead\s+of|careful|to\s+be\s+precise|precisely\s+speaking|partly|partially|close|almost|but\s+not|however|the\s+difference|differs?\s+from|actually|strictly\s+speaking|watch\s+out|common\s+mix[- ]?up|easy\s+to\s+confuse)\b/i
const m = M.exec(draft)
console.log('marker found:', m ? `"${m[0]}" at index ${m.index}` : 'NONE')
