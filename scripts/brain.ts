#!/usr/bin/env node
/**
 * C2 — the `brain` CLI shell.
 *
 * Deliberately thin: argv parsing and disk I/O only. Every decision lives in
 * src/lib/cekr/cli.ts, which is pure and unit-tested without a filesystem —
 * the same split brain-compiler/compile.ts already uses.
 *
 *   npm run brain -- check <files...>     parse + lower + validate (V-1…V-16)
 *   npm run brain -- fmt   <files...>     normalise in place
 *   npm run brain -- fmt --check <files>  fail if any file is unformatted
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { check, formatReport, fmt, isFormatted } from '../src/lib/cekr/cli'

function usage(): never {
  console.error('usage: brain check <files...> | brain fmt [--check] <files...>')
  process.exit(2)
}

function main(): void {
  const [command, ...rest] = process.argv.slice(2)
  if (!command) usage()

  if (command === 'check') {
    const files = rest
    if (files.length === 0) usage()
    const report = check(files.map((file) => ({ file, source: readFileSync(file, 'utf8') })))
    console.log(formatReport(report))
    process.exit(report.ok ? 0 : 1)
  }

  if (command === 'fmt') {
    const checkOnly = rest[0] === '--check'
    const files = checkOnly ? rest.slice(1) : rest
    if (files.length === 0) usage()
    let unformatted = 0
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      if (isFormatted(source)) continue
      unformatted++
      if (checkOnly) console.error(`unformatted: ${file}`)
      else { writeFileSync(file, fmt(source)); console.log(`formatted: ${file}`) }
    }
    if (checkOnly) {
      console.log(unformatted === 0 ? `ok — ${files.length} file(s) formatted` : `FAILED — ${unformatted} unformatted`)
      process.exit(unformatted === 0 ? 0 : 1)
    }
    console.log(`ok — ${unformatted} file(s) rewritten`)
    process.exit(0)
  }

  usage()
}

main()
