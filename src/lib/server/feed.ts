import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Fact, ReelFeedItem } from "$lib/types";
import { facts } from "./facts";
import { enrichQuiz } from "./enrichQuiz";
import { planReel, reelRequestSchema } from "./reelPlanner";

const generatedAt = "2026-05-08T10:04:00+02:00";

const quizCache = new Map<string, ReturnType<typeof enrichQuiz>>();

function getQuiz(fact: Fact) {
	if (!quizCache.has(fact.id)) {
		quizCache.set(fact.id, enrichQuiz(fact));
	}
	return quizCache.get(fact.id)!;
}

type GeneratedManifest = {
	items?: Array<{
		slug: string;
		durationSec?: number;
		videoPath?: string;
		audioPath?: string;
		backgroundPath?: string;
		posterPath?: string;
	}>;
};

function readGeneratedManifest(): GeneratedManifest {
	const manifestPath = resolve(
		process.cwd(),
		"static",
		"generated-media",
		"manifest.json",
	);
	if (!existsSync(manifestPath)) return {};

	return JSON.parse(readFileSync(manifestPath, "utf8")) as GeneratedManifest;
}

const audioDurations = new Map<string, number>();

function getAudioDuration(slug: string): number {
	if (audioDurations.has(slug)) return audioDurations.get(slug)!;
	const audioPath = resolve(
		process.cwd(),
		"static",
		"generated-media",
		"audio",
		`${slug}.wav`,
	);
	if (!existsSync(audioPath)) return 8;
	try {
		const dur = execSync(
			`ffprobe -v error -show_entries format=duration -of csv=p=0 "${audioPath}"`,
			{ encoding: "utf8" },
		).trim();
		const sec = Math.round(Number.parseFloat(dur) || 8);
		audioDurations.set(slug, sec);
		return sec;
	} catch {
		return 8;
	}
}

function feedItem(
	fact: Fact,
	index: number,
	manifest: GeneratedManifest,
): ReelFeedItem {
	const brief = planReel(
		fact,
		reelRequestSchema.parse({
			factId: fact.id,
			tone: "mentor",
			targetDurationSec: 60,
		}),
	);
	const slug = `reel-${String(index + 1).padStart(2, "0")}-${fact.id}`;
	const generated = manifest.items?.find((item) => item.slug === slug);

	return {
		id: slug,
		factId: fact.id,
		title: fact.title,
		videoPath: generated?.videoPath ?? `/generated-media/reels/${slug}.mp4`,
		audioPath: generated?.audioPath ?? `/generated-media/audio/${slug}.wav`,
		posterPath: generated?.posterPath ?? `/generated-media/posters/${slug}.png`,
		durationSec: getAudioDuration(slug),
		generatedAt,
		brief,
		assets: [
			{
				kind: "video",
				path: generated?.videoPath ?? `/generated-media/reels/${slug}.mp4`,
				prompt: brief.imagePrompts[0],
				provider: "text2video",
			},
			{
				kind: "audio",
				path: generated?.audioPath ?? `/generated-media/audio/${slug}.wav`,
				prompt: brief.beats[0].voiceover,
				provider: "text2audio",
			},
			{
				kind: "image",
				path: generated?.posterPath ?? `/generated-media/posters/${slug}.png`,
				prompt: brief.imagePrompts[1],
				provider: "text2image",
			},
		],
		quiz: getQuiz(fact),
	};
}

export function listFeedItems() {
	const manifest = readGeneratedManifest();
	return facts.map((fact, i) => feedItem(fact, i, manifest));
}
