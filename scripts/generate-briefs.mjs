import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outRoot = join(projectRoot, "static", "generated-media");
mkdirSync(outRoot, { recursive: true });

// We can't directly import the TS modules from ESM, so let's parse the facts from facts.ts
// Actually, let's use the SvelteKit build output or a different approach.
// The simplest: use node --import tsx or write a pure JS version.

// Let's extract facts by evaluating the TS file through a subprocess
import { execSync } from "node:child_process";

// Generate facts JSON using tsx
const factsJson = execSync(
  `cd "${projectRoot}" && pnpm exec tsx -e '` +
  `import { facts } from "./src/lib/server/facts.ts";` +
  `import { planReel, reelRequestSchema } from "./src/lib/server/reelPlanner.ts";` +
  `const data = facts.map((f, i) => {` +
  `  const dur = f.riskLevel === "high" ? 60 : f.riskLevel === "medium" ? 45 : 30;` +
  `  const req = reelRequestSchema.parse({ factId: f.id, tone: "mentor", targetDurationSec: Math.min(180, Math.max(30, dur)) });` +
  `  const brief = planReel(f, req);` +
  `  return { slug: "reel-" + String(i+1).padStart(2,"0") + "-" + f.id, factId: f.id, rank: f.rank, title: f.title, brief };` +
  `});` +
  `process.stdout.write(JSON.stringify(data));` +
  `'`,
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);

const briefs = JSON.parse(factsJson);
console.log(`Generated ${briefs.length} briefs`);

const manifest = {
  generatedAt: new Date().toISOString(),
  note: "Sesión 2: Briefs generados para 94 facts usando planReel. Quizzes pendientes de enriquecer con LLM.",
  totalFacts: briefs.length,
  totalBriefs: briefs.length,
  items: briefs,
};

writeFileSync(
  join(outRoot, "manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8",
);

console.log(`Manifest written to ${join(outRoot, "manifest.json")}`);
