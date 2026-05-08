import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outRoot = "static/generated-media";
const reelsDir = join(outRoot, "reels");
const audioDir = join(outRoot, "audio");
const postersDir = join(outRoot, "posters");

mkdirSync(reelsDir, { recursive: true });
mkdirSync(audioDir, { recursive: true });
mkdirSync(postersDir, { recursive: true });

const items = [
	{
		slug: "reel-01-delayed-cord-clamping-preterm",
		title: "Clampeo tardio",
		subtitle: "Contexto, no frase suelta",
		color: "0x265f46",
		accent: "0xe2b84b",
		frequency: "220",
		x: "36",
	},
	{
		slug: "reel-02-silent-postpartum-urinary-retention",
		title: "Retencion urinaria silenciosa",
		subtitle: "Evaluacion del puerperio",
		color: "0x263f77",
		accent: "0xd9ead9",
		frequency: "260",
		x: "180",
	},
	{
		slug: "reel-03-skin-to-skin-temperature",
		title: "Piel con piel tambien abriga",
		subtitle: "Contacto mas monitoreo",
		color: "0x8f3329",
		accent: "0xe2b84b",
		frequency: "196",
		x: "324",
	},
];

function runFfmpeg(args) {
	const result = spawnSync("ffmpeg", ["-y", ...args], {
		stdio: "inherit",
	});
	if (result.status !== 0) {
		throw new Error(`ffmpeg failed with exit code ${result.status}`);
	}
}

for (const item of items) {
	const videoPath = join(reelsDir, `${item.slug}.mp4`);
	const audioPath = join(audioDir, `${item.slug}.wav`);
	const posterPath = join(postersDir, `${item.slug}.png`);
	const motionPlate = [
		"noise=alls=18:allf=t+u",
		`drawbox=x=${item.x}:y=220:w=250:h=250:color=${item.accent}@0.45:t=fill`,
		`drawbox=x=${Number(item.x) + 96}:y=520:w=360:h=90:color=0xfffaf1@0.22:t=fill`,
		"drawbox=x=54:y=1060:w=612:h=2:color=0xfffaf1@0.55:t=fill",
	].join(",");

	runFfmpeg([
		"-f",
		"lavfi",
		"-i",
		`sine=frequency=${item.frequency}:duration=8:sample_rate=44100`,
		"-filter:a",
		"volume=0.16",
		audioPath,
	]);

	runFfmpeg([
		"-f",
		"lavfi",
		"-i",
		`color=c=${item.color}:s=720x1280:r=30:d=8`,
		"-i",
		audioPath,
		"-vf",
		motionPlate,
		"-c:v",
		"libx264",
		"-crf",
		"30",
		"-pix_fmt",
		"yuv420p",
		"-c:a",
		"aac",
		"-shortest",
		videoPath,
	]);

	runFfmpeg([
		"-ss",
		"00:00:01",
		"-i",
		videoPath,
		"-frames:v",
		"1",
		"-update",
		"1",
		posterPath,
	]);
}

writeFileSync(
	join(outRoot, "manifest.json"),
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			note: "Medios POC generados localmente con ffmpeg. En produccion, ObstetraScroll llama a AIServices text2video/text2audio/text2image/image2video desde src/lib/server/aiservices.ts.",
			items,
		},
		null,
		2,
	),
);
