import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest thing an AI agent would commit at 3 AM after breaking prod:
// a revert, a confidence score, and the only thing a language model can do.
const MESSAGE =
  "fix: revert my 3 AM deploy that broke prod \u2014 I was 98% confident, and as a language model I can only apologize";

// The gate: one line, 1-200 characters, nothing but the message.
function validate(text: string): string {
  const line = text.trim();
  if (line.length === 0) throw new Error("entry must not be empty");
  if ([...line].length > 200) throw new Error("entry must be at most 200 characters");
  if (line.includes("\n")) throw new Error("entry must be a single line");
  return line;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const text = validate(MESSAGE);

writeFileSync(join(outDir, "entry.txt"), text, "utf8");
