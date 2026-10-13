"""Mathematics visual campaign — contact sheet (2026-10-12).

Crops the figure area out of each rendered card (see shot.cjs) and tiles them 3 across.

  python3 scripts/math/campaign-tools/montage.py sheet1.png math.linalg.rank math.linalg.dimension ... [--dir /tmp/math-visual-shots]

Writes <dir>/<out>. Six figures per sheet reads well. The crop (205,100,835,470) cuts a long title label off the TOP of a tall figure and a caption that runs past the
right edge in the sheet only; open the single PNG (<dir>/<id>_1026.png) to see the whole card.
"""
import os, sys
from PIL import Image

args = sys.argv[1:]
d = '/tmp/math-visual-shots'
if '--dir' in args:
    i = args.index('--dir'); d = args[i + 1]; del args[i:i + 2]
if len(args) < 2:
    sys.exit('usage: montage.py out.png conceptId [conceptId ...] [--dir DIR]')
out, ids = args[0], args[1:]
cells = [Image.open(os.path.join(d, i.replace('.', '_') + '_1026.png')).convert('RGB').crop((205, 100, 835, 470)) for i in ids]
cols = 3
rows = (len(cells) + cols - 1) // cols
w, h = cells[0].size
sheet = Image.new('RGB', (cols * w, rows * h), (20, 28, 24))
for k, c in enumerate(cells):
    sheet.paste(c, ((k % cols) * w, (k // cols) * h))
sheet.save(os.path.join(d, out))
print(os.path.join(d, out), sheet.size)
