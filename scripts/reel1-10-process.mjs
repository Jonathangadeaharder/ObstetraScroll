import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = join(projectRoot, "static", "generated-media", "reel-poc");
const manifestPath = join(outDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const CRAZY_TOKEN = process.env.CRAZY_TOKEN;
if (!CRAZY_TOKEN) throw new Error("CRAZY_TOKEN not set");

// Poll kling tasks until done
const klingTasks = manifest.filter(m => m.type === "kling-video" && m.taskId);
console.log(`Polling ${klingTasks.length} kling tasks...`);

let allDone = false;
while (!allDone) {
  allDone = true;
  for (const item of klingTasks) {
    if (item.status === "done" || item.status === "failed") continue;
    allDone = false;
    try {
      const resp = await fetch(`https://crazyrouter.com/v1/video/generations/${item.taskId}`, {
        headers: { "Authorization": `Bearer ${CRAZY_TOKEN}` }
      });
      const data = await resp.json();
      const taskData = data.data || data;
      const status = taskData.status || taskData.task_status;
      if (status === "succeed" || status === "SUCCESS" || status === "succeeded") {
        const url = taskData.url || taskData.result_url || taskData.artifact_url;
        if (url && url !== "") {
          // Download
          const vidResp = await fetch(url);
          const buffer = Buffer.from(await vidResp.arrayBuffer());
          const vidPath = join(outDir, `${item.slug}.mp4`);
          writeFileSync(vidPath, buffer);
          item.status = "done";
          item.filePath = vidPath;
          console.log(`  ${item.slug} DONE (${buffer.byteLength}B)`);
        }
      } else if (status === "failed") {
        item.status = "failed";
        console.log(`  ${item.slug} FAILED`);
      }
      // else still processing/queued
    } catch(e) {
      console.log(`  ${item.slug} poll error: ${e.message}`);
    }
  }
  if (!allDone) {
    console.log("  waiting 15s...");
    await new Promise(r => setTimeout(r, 15000));
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Now process: combine clips + audio for each reel
console.log("\nProcessing final reels...");

// Get audio durations
function getDuration(filePath) {
  const out = execSync(`ffprobe -v quiet -print_format json -show_format "${filePath}"`, { encoding: "utf8" });
  return Number.parseFloat(JSON.parse(out).format.duration);
}

// Get video info
function getVideoInfo(filePath) {
  const out = execSync(`ffprobe -v quiet -print_format json -show_streams "${filePath}"`, { encoding: "utf8" });
  const streams = JSON.parse(out).streams;
  const vid = streams.find(s => s.codec_type === "video");
  return { width: vid.width, height: vid.height };
}

const reels = {};
for (const item of manifest) {
  if (item.type === "elevenlabs-audio" && item.status === "done") {
    const reelNum = item.slug.match(/reel-(\d+)/)[1];
    if (!reels[reelNum]) reels[reelNum] = { audio: item, clips: [] };
    reels[reelNum].audio = item;
  }
  if (item.type === "kling-video" && item.status === "done") {
    const reelNum = item.slug.match(/reel-(\d+)/)[1];
    if (!reels[reelNum]) reels[reelNum] = { audio: null, clips: [] };
    reels[reelNum].clips.push(item);
  }
}

const finalsDir = join(outDir, "final");
mkdirSync(finalsDir, { recursive: true });

for (const [num, reel] of Object.entries(reels).sort((a, b) => a[0].localeCompare(b[0]))) {
  if (!reel.audio || reel.clips.length === 0) {
    console.log(`  reel-${num}: SKIP (audio=${!!reel.audio}, clips=${reel.clips.length})`);
    continue;
  }

  const audioPath = reel.audio.filePath;
  const audioDur = getDuration(audioPath);
  const clipPaths = reel.clips.map(c => c.filePath);

  console.log(`  reel-${num}: ${clipPaths.length} clips, audio ${audioDur.toFixed(1)}s`);

  // Create concat file
  const concatLines = clipPaths.map(p => `file '${p}'`).join("\n");
  const concatFile = join(outDir, `concat-${num}.txt`);
  writeFileSync(concatFile, concatLines);

  // Concatenate clips
  const concatVid = join(outDir, `reel-${num}-concat.mp4`);
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatFile}" -c copy "${concatVid}"`, { stdio: "pipe" });

  // Get concat duration, calculate slow factor
  const concatDur = getDuration(concatVid);
  const slowFactor = Math.max(1, concatDur / audioDur);

  // Slow down video and force 9:16, add audio
  const finalPath = join(finalsDir, `reel-${num}.mp4`);
  // Slow down via setpts, resize to 720x1280, pad for 9:16
  execSync(
    `ffmpeg -y -i "${concatVid}" -i "${audioPath}" ` +
    `-filter_complex ` +
    `"[0:v]setpts=${slowFactor}*PTS,scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2[v]" ` +
    `-map "[v]" -map "1:a" -shortest -c:v libx264 -c:a aac "${finalPath}"`,
    { stdio: "pipe", timeout: 120000 }
  );

  const finalDur = getDuration(finalPath);
  console.log(`  reel-${num} FINAL: ${finalDur.toFixed(1)}s -> ${finalPath}`);

  // Cleanup
  execSync(`rm "${concatFile}" "${concatVid}"`, { stdio: "pipe" });
}

console.log(`\nDONE! ${finalsDir}`);
execSync(`ls -lh "${finalsDir}"`, { stdio: "inherit" });
