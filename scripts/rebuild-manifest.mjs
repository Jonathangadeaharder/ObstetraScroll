import { execSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const reelsDir = join(projectRoot, "static", "generated-media", "reels");
const manifestPath = join(
	projectRoot,
	"static",
	"generated-media",
	"manifest.json",
);

const items = [];
for (const file of readdirSync(reelsDir).sort()) {
	if (!file.endsWith(".mp4")) continue;
	const slug = file.replace(/\.mp4$/, "");
	const fullPath = join(reelsDir, file);
	let duration = 30;
	try {
		duration = Math.round(
			Number.parseFloat(
				execSync(
					`/opt/homebrew/bin/ffprobe-full -v error -show_entries format=duration -of csv=p=0 "${fullPath}"`,
					{ encoding: "utf8" },
				).trim(),
			),
		);
	} catch {}
	items.push({
		slug,
		durationSec: duration,
		videoPath: `/generated-media/reels/${slug}.mp4`,
		audioPath: `/generated-media/audio/${slug}.mp3`,
		posterPath: `/generated-media/posters/${slug}.jpg`,
	});
}

writeFileSync(manifestPath, JSON.stringify({ items }, null, 2));
console.log(`Wrote ${items.length} items to ${manifestPath}`);
