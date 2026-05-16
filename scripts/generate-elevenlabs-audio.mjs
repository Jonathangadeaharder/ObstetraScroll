import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = join(projectRoot, "static", "generated-media", "audio-11labs");
mkdirSync(outDir, { recursive: true });

const VOICE_ID = "D6fGRDoSy1WFiaIpAbC7";
const API_KEY = process.env.ELEVENLABS_TOKEN;
if (!API_KEY) throw new Error("ELEVENLABS_TOKEN not set");

const TONES = ["calm", "urgent", "mentor"];

const EXTRA_OPENERS = [
  "Esto es algo que no te enseñan en el libro pero aparece en sala:",
  "Si hay un detalle clínico que suele pasarse por alto, es este:",
  "Hacé una pausa y repasá esto con tu equipo:",
  "No es teoría, es lo que la evidencia dice hoy:",
  "En la práctica diaria este punto se olvida con frecuencia:",
  "Vale la pena tenerlo claro antes del próximo turno:",
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate briefs from facts with varied tones and shuffled order
const factsJson = execSync(
  `cd "${projectRoot}" && pnpm exec tsx -e 'import { facts } from "./src/lib/server/facts.ts";import { planReel, reelRequestSchema } from "./src/lib/server/reelPlanner.ts";const TONES = ["calm", "urgent", "mentor"];const data = facts.map((f, i) => { const tone = TONES[i % TONES.length]; const req = reelRequestSchema.parse({ factId: f.id, tone, targetDurationSec: Math.min(180, Math.max(30, f.riskLevel === "high" ? 60 : f.riskLevel === "medium" ? 45 : 30)) }); const brief = planReel(f, req); return { slug: "reel-" + String(i+1).padStart(2,"0") + "-" + f.id, title: f.title, tone, script: brief.script, durationSec: req.targetDurationSec };});process.stdout.write(JSON.stringify(data));'`,
  { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
);

let items = JSON.parse(factsJson);

// Shuffle items
items = shuffle(items);

// Renumber slugs after shuffle
items.forEach((item, i) => {
  item.slug = item.slug.replace(/^reel-\d+/, `reel-${String(i + 1).padStart(2, "0")}`);
});

console.log(`Total items: ${items.length} (shuffled, varied tones)`);

const manifest = [];

for (const [idx, item] of items.entries()) {
  const slug = item.slug;
  let text = item.script;
  const outPath = join(outDir, `${slug}.mp3`);

  // Replace first line with a varied opener for extra diversity
  const lines = text.split("\n");
  const extraIdx = idx % EXTRA_OPENERS.length;
  lines[0] = `${EXTRA_OPENERS[extraIdx]} ${item.title}.`;
  text = lines.join("\n");

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
