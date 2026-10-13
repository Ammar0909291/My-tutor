"""Mathematics visual campaign — start a batch test file (2026-10-12).

Creates src/tests/mathCoreScenesBatch<N>.test.ts holding the standard generic suites (each concept resolves to its own figure, the validator
and figure audit pass, every coordinate is within ±5, the label budget, ≤ 50 objects per step, three cumulative steps, role colours only, no
zero-length lines, the two reserved figure-less concepts stay figure-less) — copied from the previous batch's test head — plus a
`describe('the mathematics each figure draws')` block with ONE `it.todo` per figure that you replace with a test that reads the DRAWN
coordinates back and re-derives every number the figure states.

  python3 scripts/math/campaign-tools/new-batch-test.py 32 mathCoreScenesB32 \
      math.linalg.rank:buildRankScene:math-rank math.linalg.dimension:buildDimensionScene:math-dimension ...

Each triple is  <concept id>:<exported build function>:<scene id used in the figure's `id:`>.
Generic helpers come from test-helpers.txt (dist, labelAt, numsIn, numOf, evalLR, matMul, closeVec, closeMat, vecOf, arrowsFrom, rankOf, det2, mulVec);
matrix-grid readers (gridLabels / numGrid / colorsOf) depend on the batch's generator exports — copy them from src/tests/mathCoreScenesBatch32.test.ts. Raise the threshold in src/tests/mathVisualCampaignAudit.test.ts by the number of figures.
"""
import re, sys, glob, os

n, module, *triples = sys.argv[1:]
root = os.getcwd()
prev = sorted(glob.glob(os.path.join(root, 'src/tests/mathCoreScenesBatch*.test.ts')), key=lambda p: int(re.search(r'Batch(\d+)', p).group(1)))[-1]
src = open(prev, encoding='utf8').read()
head_end = src.index("// ── helpers") if "// ── helpers" in src else src.index("describe('the mathematics each figure draws'")
head = src[:head_end]
helpers = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test-helpers.txt'), encoding='utf8').read()
# the header comment, module import and BATCH list are batch specific
head = re.sub(r"/\*\*.*?\*/", f"/**\n * Mathematics visual campaign, batch {n} (2026-10-12): TODO describe the concepts. Every number a figure states is re-derived here from the\n * DRAWN dots, numerals, lines, arrows and curves, never from the generator's own constants alone.\n */", head, count=1, flags=re.S)
head = re.sub(r"(import \* as M from '@/lib/teaching/sceneGenerators/)mathCoreScenesB\d+'", lambda m: m.group(1) + module + "'", head)
rows = [t.split(':') for t in triples]
batch = 'const BATCH: Array<[string, () => SceneSpec, string]> = [\n' + ''.join(f"  ['{c}', M.{f}, '{i}'],\n" for c, f, i in rows) + ']\n'
head = re.sub(r"const BATCH: Array<\[string, \(\) => SceneSpec, string\]> = \[.*?\n\]\n", batch, head, count=1, flags=re.S)
body = "describe('the mathematics each figure draws', () => {\n" + ''.join(f"  it.todo('{c}: re-derive every stated number from the drawn coordinates')\n" for c, f, i in rows) + '})\n'
dest = os.path.join(root, f'src/tests/mathCoreScenesBatch{n}.test.ts')
open(dest, 'w', encoding='utf8').write(head + helpers + body)
print('wrote', dest, 'from the head of', os.path.basename(prev))
