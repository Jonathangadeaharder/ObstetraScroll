import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Fact, ReelFeedItem } from "$lib/types";
import { enrichQuiz } from "./enrichQuiz";
import { allFacts } from "./facts";

import { planReel, reelRequestSchema } from "./reelPlanner";

const generatedAt = "2026-05-08T10:04:00+02:00";

const quizCache = new Map<string, ReturnType<typeof enrichQuiz>>();

function getQuiz(fact: Fact) {
	if (!quizCache.has(fact.id)) {
		quizCache.set(fact.id, enrichQuiz(fact));
	}
	const q = quizCache.get(fact.id);
	if (!q) throw new Error("unreachable");
	return q;
}

type GeneratedManifest = {
	items?: Array<{
		slug: string;
		durationSec?: number;
		videoPath?: string;
		audioPath?: string;
		posterPath?: string;
	}>;
};

function readGeneratedManifest(): GeneratedManifest {
	const paths = [
		resolve(process.cwd(), "static", "generated-media", "manifest.json"),
		resolve(
			process.cwd(),
			"build",
			"client",
			"generated-media",
			"manifest.json",
		),
	];
	const path = paths.find((candidate) => existsSync(candidate));
	if (!path) return {};
	return JSON.parse(readFileSync(path, "utf8")) as GeneratedManifest;
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
	const slug = `reel-${String(fact.rank).padStart(3, "0")}-${fact.id}`;
	const generated = manifest.items?.find((item) => item.slug === slug);

	return {
		id: slug,
		factId: fact.id,
		title: fact.title,
		videoPath: generated?.videoPath ?? `/generated-media/reels/${slug}.mp4`,
		audioPath: generated?.audioPath ?? `/generated-media/audio/${slug}.mp3`,
		posterPath: generated?.posterPath ?? `/generated-media/posters/${slug}.jpg`,
		durationSec: generated?.durationSec ?? 30,
		generatedAt,
		brief,
		assets: [
			{
				kind: "video",
				path: generated?.videoPath ?? `/generated-media/reels/${slug}.mp4`,
				prompt: brief.imagePrompts[0],
				provider: "elevenlabs",
			},
			{
				kind: "audio",
				path: generated?.audioPath ?? `/generated-media/audio/${slug}.mp3`,
				prompt: brief.beats[0].voiceover,
				provider: "elevenlabs",
			},
			{
				kind: "image",
				path: generated?.posterPath ?? `/generated-media/posters/${slug}.jpg`,
				prompt: brief.imagePrompts[1],
				provider: "text2image",
			},
		],
		quiz: getQuiz(fact),
	};
}

export function listFeedItems() {
	const manifest = readGeneratedManifest();
	// Surface only facts whose generated reel exists in manifest, so the app
	// never shows "Video no disponible". Falls back to all facts when manifest
	// is empty (dev / pre-render state).
	const manifestSlugs = new Set(manifest.items?.map((i) => i.slug) ?? []);
	const visible =
		manifestSlugs.size > 0
			? allFacts.filter((f) =>
					manifestSlugs.has(`reel-${String(f.rank).padStart(3, "0")}-${f.id}`),
				)
			: allFacts;
	return visible.map((fact, i) => feedItem(fact, i, manifest));
}
