import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = join(projectRoot, "static", "generated-media", "audio-11labs");
mkdirSync(outDir, { recursive: true });

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "D6fGRDoSy1WFiaIpAbC7";
const API_KEY = process.env.ELEVENLABS_TOKEN;
if (!API_KEY) throw new Error("ELEVENLABS_TOKEN not set");

const TONES = ["calm", "urgent", "mentor"];

// Generate briefs from facts with varied tones and shuffled order
const factsJson = execSync(
  `cd "${projectRoot}" && pnpm exec tsx -e 'import { facts } from "./src/lib/server/facts.ts";import { planReel, reelRequestSchema } from "./src/lib/server/reelPlanner.ts";const TONES = ["calm", "urgent", "mentor"];const data = facts.map((f, i) => { const tone = TONES[i % TONES.length]; const req = reelRequestSchema.parse({ factId: f.id, tone, targetDurationSec: Math.min(180, Math.max(30, f.riskLevel === "high" ? 60 : f.riskLevel === "medium" ? 45 : 30)) }); const brief = planReel(f, req); return { slug: "reel-" + String(i+1).padStart(2,"0") + "-" + f.id, title: f.title, tone, script: brief.script, durationSec: req.targetDurationSec };});process.stdout.write(JSON.stringify(data));'`,
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
);

const items = JSON.parse(factsJson);

// Stable order: slug index = fact rank. Pipeline matches by slug.
console.log(`Total items: ${items.length} (stable order, varied tones)`);

const manifest = [];

for (const [idx, item] of items.entries()) {
  const slug = item.slug;
  const outPath = join(outDir, `${slug}.mp3`);

  // Keep only beats 1 (reframe) + 2 (clinical insight) — those are unique
  // per fact. Beats 0 (opener), 3 ("Para la práctica..."), 4 (safety) are
  // identical across all 100 reels and would feel monotonous.
  const paragraphs = item.script.split("\n\n");
  const text =
    paragraphs.length >= 3
      ? paragraphs.slice(1, 3).join("\n\n").trim()
      : paragraphs.join("\n\n").trim();

  console.log(`[${idx + 1}/${items.length}] ${slug} (tone: ${item.tone})...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        model_id: "eleven_multilingual_v2",
        text,
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.85,
          speed: 1,
        },
      }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`FAILED ${slug}: ${response.status} - ${err.slice(0, 100)}`);
    manifest.push({ slug, title: item.title, tone: item.tone, status: "failed", error: `${response.status}` });
    continue;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(outPath, buffer);
  console.log(`  OK (${(buffer.length / 1024).toFixed(0)} KB)`);

  manifest.push({ slug, title: item.title, tone: item.tone, status: "done", file: outPath });

  await new Promise((r) => setTimeout(r, 1100));
}

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), voiceId: VOICE_ID, items: manifest }, null, 2),
);

const ok = manifest.filter((m) => m.status === "done").length;
const fail = manifest.filter((m) => m.status === "failed").length;
console.log(`\nDone: ${ok} OK, ${fail} failed`);
