import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Fact, QuizQuestion, ReelFeedItem } from "$lib/types";
import { facts } from "./facts";
import { planReel, reelRequestSchema } from "./reelPlanner";

const generatedAt = "2026-05-08T10:04:00+02:00";

const quizzes: Record<string, QuizQuestion> = {
	"delayed-cord-clamping-preterm": {
		id: "quiz-delayed-cord",
		question: "¿Cuál es la idea segura para llevarte de este reel?",
		options: [
			"El clampeo tardío siempre es lo correcto.",
			"El contexto clínico define si esperar es útil y seguro.",
			"En prematurez nunca se debería esperar para clampear.",
		],
		answerIndex: 1,
		explanation:
			"La clave es entrenar lectura de patrón: protocolo, estabilización y evolución siguen mandando.",
	},
	"silent-postpartum-urinary-retention": {
		id: "quiz-urinary-retention",
		question: "¿Por qué este dato puede pasar desapercibido?",
		options: [
			"Porque no tener ganas de orinar puede dar una falsa tranquilidad.",
			"Porque la retención urinaria solo aparece después de una cesárea.",
			"Porque evaluar la vejiga en puerperio no cambia nada.",
		],
		answerIndex: 0,
		explanation:
			"En el posparto pueden cambiar la sensibilidad, la movilidad y el dolor; por eso hay que mirar el cuadro completo.",
	},
	"skin-to-skin-temperature": {
		id: "quiz-skin-temperature",
		question: "¿Qué enfoque encaja mejor con ObstetraScroll?",
		options: [
			"Contar el piel con piel solo desde lo emocional.",
			"Explicar contacto, fisiología y monitoreo juntos.",
			"Dejar afuera la temperatura del recién nacido.",
		],
		answerIndex: 1,
		explanation:
			"El reel tiene que unir cercanía emocional con función fisiológica y cuidado clínico.",
	},
};

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

function feedItem(fact: Fact, index: number): ReelFeedItem {
	const brief = planReel(
		fact,
		reelRequestSchema.parse({
			factId: fact.id,
			tone: "mentor",
			targetDurationSec: 28,
		}),
	);
	const slug = `reel-${String(index + 1).padStart(2, "0")}-${fact.id}`;
	const generated = readGeneratedManifest().items?.find(
		(item) => item.slug === slug,
	);

	return {
		id: slug,
		factId: fact.id,
		title: fact.title,
		videoPath: generated?.videoPath ?? `/generated-media/reels/${slug}.mp4`,
		audioPath: generated?.audioPath ?? `/generated-media/audio/${slug}.wav`,
		posterPath: generated?.posterPath ?? `/generated-media/posters/${slug}.png`,
		durationSec: generated?.durationSec ?? 8,
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
		quiz: quizzes[fact.id] ?? {
			id: `quiz-${fact.id}`,
			question: "¿Qué debería quedar después del reel?",
			options: [
				"Una frase aislada.",
				"Un mini-check revisable, con estado de fuentes claro.",
				"Una recomendación sin respaldo.",
			],
			answerIndex: 1,
			explanation:
				"ObstetraScroll puede sentirse scrolleable, pero no se despega del contexto clínico ni de la revisión.",
		},
	};
}

export function listFeedItems() {
	return facts.slice(0, 3).map(feedItem);
}
