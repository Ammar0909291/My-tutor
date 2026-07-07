#!/usr/bin/env bash
# Type-error ratchet — VALIDATION_FRAMEWORK_P10.md §6 step 2.
#
# NOT a zero-error gate: this branch carries a known-nonzero baseline of
# pre-existing type errors (measured 2026-07-02; see the spec §1). This
# gate fails only when the error count INCREASES relative to the committed
# baseline. Any PR may lower the baseline; none may raise it. When the
# baseline reaches zero this converts into a hard type gate.
#
# Bootstrap: the baseline must be captured from an environment with a
# cleanly generated Prisma client (CI), NOT from a sandbox where
# `prisma generate` cannot download engines — the counts differ. Until
# scripts/ci/tsc-baseline.txt is committed, this step reports the count
# and passes.
set -uo pipefail

BASELINE_FILE="scripts/ci/tsc-baseline.txt"

count=$(npx tsc --noEmit 2>&1 | grep -cE "error TS[0-9]+" || true)
echo "tsc --noEmit error count: ${count}"

if [[ ! -f "${BASELINE_FILE}" ]]; then
  echo "No baseline at ${BASELINE_FILE} — bootstrap mode (pass)."
  echo "From a CI run with a cleanly generated Prisma client, commit:"
  echo "  echo ${count} > ${BASELINE_FILE}"
  exit 0
fi

baseline=$(tr -d '[:space:]' < "${BASELINE_FILE}")
echo "Committed baseline: ${baseline}"

if (( count > baseline )); then
  echo "FAIL: type-error count increased (${baseline} -> ${count})."
  echo "New type errors are not allowed. Fix them, or if a pre-existing"
  echo "error was merely relocated, keep the count at or below baseline."
  exit 1
fi

if (( count < baseline )); then
  echo "NOTE: count is below baseline (${baseline} -> ${count})."
  echo "Please ratchet down in this PR:  echo ${count} > ${BASELINE_FILE}"
fi

echo "PASS: type-error ratchet (${count} <= ${baseline})"
