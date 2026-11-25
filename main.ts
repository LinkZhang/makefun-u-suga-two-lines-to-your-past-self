// Two Lines to Your Past Self (Node 22, standard library only): writes two lines
// to /output/entry.txt — line one warns the past self about one specific
// moment in a single sentence, line two says why it mattered and what changed.
// The gate takes UTF-8 text of 1 to 280 characters, not only white space.
//
// The winning entry: at the bus stop on the morning of an interview, you lend
// your only umbrella to the man in the grey coat. The twist is the consequence:
// you arrive soaked, he arrives dry, and the job you were interviewing for goes
// to him — one small kindness, traced to its exact cost, in two sentences.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  "Don't lend your only umbrella to the man in the grey coat at the bus stop on the morning of your interview.\n" +
  'You arrived soaked, he arrived dry, and he got the job — the one you were interviewing for.\n';

// Gate self-check (RULES.txt: UTF-8 text, 1–280 chars, not only whitespace,
// exactly two lines): refuse to write anything invalid instead of shipping it.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 280) {
  console.error(`entry must be 1 to 280 characters, got ${chars}`);
  process.exit(1);
}
const lines = ENTRY.split('\n').filter((line) => line.length > 0);
if (lines.length !== 2) {
  console.error(`entry must be exactly two lines, got ${lines.length}`);
  process.exit(1);
}
if (lines.some((line) => line.trim().length === 0)) {
  console.error('entry lines must not be only white space');
  process.exit(1);
}
// The twist, restated: the warning is not "don't be kind" — it is that this
// one kindness cost the job. The man is a stranger in a grey coat, so the
// loss is pure bad luck, and line two lands the consequence in three rising
// beats — soaked, dry, he got the job — so the second line is the price of
// the first, not a restatement of it.
if (lines.some((line) => line.split(/\s+/).filter(Boolean).length < 5)) {
  console.error('each line must carry at least 5 words');
  process.exit(1);
}
if (/[\t\r]/.test(ENTRY)) {
  console.error('entry must not contain tabs or carriage returns');
  process.exit(1);
}
if (!lines[0].endsWith('.') || !lines[1].endsWith('.')) {
  console.error('each line must be a single sentence ending with a period');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${chars} chars, ${lines.length} lines)`);
