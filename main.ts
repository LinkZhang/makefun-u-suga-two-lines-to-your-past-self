// Two Lines to Your Past Self (Node 22, standard library only): writes two lines
// to /output/entry.txt — line one warns the past self about one specific
// moment in a single sentence, line two says why it mattered and what changed.
// The gate takes UTF-8 text of 1 to 280 characters, not only white space.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  "Do not delete the folder called 'old' at 2 a.m. the night before the deadline — the only working copy of the final draft is inside it.\n" +
  'Losing four days of work taught me to keep two copies of everything, and I still check the trash before I empty it.\n';

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
if (/[\t\r]/.test(ENTRY)) {
  console.error('entry must not contain tabs or carriage returns');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), ENTRY, 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${chars} chars, ${lines.length} lines)`);
