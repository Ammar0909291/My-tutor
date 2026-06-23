/**
 * Standalone test harness for isApplicationQuestion's marker regexes in
 * conceptTransfer.ts (the function itself is not exported, so this harness
 * imports the only exported pure functions that exercise it indirectly is
 * not possible without DB calls — instead this re-implements the exact
 * regex set inline to lock down the RAM-vs-Ram regression with the same
 * logic shipped in the module).
 *
 * Run with:  npx tsx scripts/test-concept-transfer.ts
 */

const APPLICATION_MARKERS: RegExp[] = [
  /\b(cost|price|discount|sale|tax|profit|loss|interest|budget|earn|spend|pay|buy|sell|shop)\b/i,
  /\b(recipe|ingredient|cook|bake|litre|kg|kilogram|gram|metre|centimetre|kilometre)\b/i,
  /\b(sita|anita|priya|rahul|student|farmer|shopkeeper|doctor|worker|person|friend)\b/i,
  /\b(a (boy|girl|man|woman|child|family|group|class|team))\b/i,
  /\b(train|car|bus|bicycle|bike|journey|travel|speed|distance|time|reach)\b/i,
  /\b(garden|field|floor|room|wall|fence|land|plot|area of the)\b/i,
  /\b(bulb|battery|circuit|wire|switch|device|appliance|household|current flows|voltage across)\b/i,
  /\b(ball|throws?|drops?|falls?|slides?|moves? along|projectile)\b/i,
  /\b(temperature of|heats? up|cools? down|boils|melts)\b/i,
  /\b(rewrite|edit the following|improve this|spot the error|identify the mistake)\b/i,
  /\b(read the passage|according to the text|what does the author)\b/i,
  /\b(explain why|what caused|consequence|impact|effect of|led to|resulted in)\b/i,
  /\b(locate on|identify the region|compare the|describe how)\b/i,
  /\b(real.?world|everyday|in real life|in this situation|in this case|given that)\b/i,
  /\b(how much (does|will|would|did)|what (is|was|will be) the (total|final|cost|price|amount))\b/i,
  /if\b.{5,60}\bhow\b/i,
]

function hasRamNameMarker(text: string): boolean {
  const rx = /\bram\b/gi
  let m: RegExpExecArray | null
  while ((m = rx.exec(text)) !== null) {
    if (m[0] !== 'RAM') return true
  }
  return false
}

function isApplicationQuestion(text: string): boolean {
  return hasRamNameMarker(text) || APPLICATION_MARKERS.some((rx) => rx.test(text))
}

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== conceptTransfer isApplicationQuestion harness ===\n')

// REGRESSION — the bug this harness locks down.
check(
  'REGRESSION — "What is the difference between RAM and ROM?" (cs.memory_storage) is NOT application',
  isApplicationQuestion('What is the difference between RAM and ROM?') === false,
)
check(
  'REGRESSION — "Define RAM." stays routine',
  isApplicationQuestion('Define RAM.') === false,
)

// Genuine name usage still detected.
check(
  'genuine — "Ram has 5 apples and gives away 2" is application (name)',
  isApplicationQuestion('Ram has 5 apples and gives away 2. How many are left?') === true,
)
check(
  'genuine — lowercase "ram" mid-sentence still detected (name typed lowercase)',
  isApplicationQuestion('ram bought 3 kg of rice') === true,
)

// Other markers unaffected.
check(
  'genuine — shop/price marker still fires',
  isApplicationQuestion('A shopkeeper gives a 20% discount on a ₹500 item.') === true,
)
check(
  'genuine — routine recall question is NOT application',
  isApplicationQuestion('What is the formula for the area of a circle?') === false,
)
check(
  'genuine — routine calculation is NOT application',
  isApplicationQuestion('Calculate 25% of 80.') === false,
)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
