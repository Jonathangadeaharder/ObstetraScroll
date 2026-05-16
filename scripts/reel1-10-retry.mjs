import { writeFileSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = join(projectRoot, "static", "generated-media", "reel-poc");
const manifestPath = join(outDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const CRAZY_TOKEN = process.env.CRAZY_TOKEN;
if (!CRAZY_TOKEN) throw new Error("CRAZY_TOKEN not set");
const API_KEY = process.env.ELEVENLABS_TOKEN;

// Retry kling tasks that got undefined taskId
console.log("Retrying failed kling tasks...");
const failedKling = manifest.filter(m => m.type === "kling-video" && !m.taskId);
for (const item of failedKling) {
  const resp = await fetch("https://crazyrouter.com/v1/video/generations", {
    method: "POST",
    headers: { "Authorization": `Bearer ${CRAZY_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: item.model, prompt: item.prompt, image: item.image })
  });
  const data = await resp.json();
  item.taskId = data.task_id || data.id;
  item.status = "queued";
  console.log(`  ${item.slug} -> task: ${item.taskId}`);
  await new Promise(r => setTimeout(r, 500));
}

// Retry failed elevenlabs sequentially
console.log("\nRetrying failed elevenlabs audios (sequential)...");
const failedAudio = manifest.filter(m => m.type === "elevenlabs-audio" && m.status === "failed");
for (const item of failedAudio) {
  const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${item.voice}`, {
    method: "POST",
    headers: { "xi-api-key": API_KEY, "Content-Type": "application/json", "Accept": "audio/mpeg" },
    body: JSON.stringify({
      model_id: "eleven_multilingual_v2",
      text: item.text,
      voice_settings: { stability: 0.35, similarity_boost: 0.85, speed: 1 }
    })
  });
  if (!resp.ok) { console.error(`  ${item.slug} FAILED: HTTP ${resp.status}`); continue; }
  const buffer = await resp.arrayBuffer();
  const outPath = join(outDir, `${item.slug}.mp3`);
  writeFileSync(outPath, Buffer.from(buffer));
  item.status = "done";
  item.filePath = outPath;
  console.log(`  ${item.slug} -> saved (${buffer.byteLength}B)`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest updated. ${manifest.filter(m => m.type === "kling-video" && m.taskId).length}/30 kling queued, ${manifest.filter(m => m.type === "elevenlabs-audio" && m.status === "done").length}/10 audios done.`);
console.log("Now run reel1-10-poll.mjs to wait for completion.");
