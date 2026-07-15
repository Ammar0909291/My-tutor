# brain/

Authored Educational Brain source. Files are `.bs` (BrainScript) —
compiled by `src/lib/brain-compiler` into Policy Packs the K4 kernel
consumes.

C4 MVP scope:
- Sample source in `physics-mechanics.bs` demonstrating Band 3 dispatch
  rules that were empty in K4 (SDK-M2 pilot slice not yet begun).
- Multi-file overlays, full BrainScript block set, IDE tooling → SDK-M1+.

## Adding a rule

```
::pack <pack-id> <semver>
description: ...
::end

::rule <rule-id> v1
band: 0..6
citation: educational-brain/path
specificity: <int>
mandatory: true|false
guard: { "kind":"all","clauses":[ ... ] }
effect: { "move":"...", "actionClass":"...", ... }
::end
```

Cite every rule. Compile with:

```ts
import { compileSingle } from '@/lib/brain-compiler'
compileSingle('physics-mechanics.bs', fs.readFileSync('brain/physics-mechanics.bs','utf8'))
```

Adoption of compiled packs into the runtime route is a K4-follow-on
milestone; today the compile + load path is exercised by tests only.
