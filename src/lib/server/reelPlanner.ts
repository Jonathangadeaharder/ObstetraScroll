import { z } from "zod";
import type { Fact, ReelBeat, ReelBrief } from "$lib/types";

export const reelRequestSchema = z.object({
	factId: z.string().min(1),
	tone: z.enum(["calm", "urgent", "mentor"]).default("mentor"),
	targetDurationSec: z.number().min(30).max(180).default(60),
});

export type ReelRequest = z.infer<typeof reelRequestSchema>;

const toneOpeners: Record<ReelRequest["tone"], string> = {
	calm: "Mirá esto con calma, pero sin dejarlo pasar:",
	urgent: "Este momento en sala no conviene pasarlo por alto:",
	mentor: "Un detalle de partería que se aprende con cancha:",
};

function compact(text: string, max = 138) {
	if (text.length <= max) return text;
	return `${text.slice(0, max - 1).trim()}…`;
}

export function planReel(fact: Fact, request: ReelRequest): ReelBrief {
	const duration = request.targetDurationSec;
	const hook = `${toneOpeners[request.tone]} ${fact.title}.`;
	const beats: ReelBeat[] = [
		{
			id: "b00_hook",
			startSec: 0,
			durationSec: 4,
			visual:
				"Partera haciendo una pausa antes de registrar; luz de sala de parto, mirada enfocada.",
			voiceover: hook,
			overlay: compact(fact.title, 48),
			camera: "primer plano, acercamiento lento",
		},
		{
			id: "b01_reframe",
			startSec: 4,
			durationSec: 6,
			visual:
				"Placa vertical con pantalla dividida: regla obvia a la izquierda, contexto clínico a la derecha.",
			voiceover: fact.whyNonObvious,
			overlay: "No memorices la regla. Leé el patrón.",
			camera: "placa gráfica 9:16 fija",
		},
		{
			id: "b02_clinical_point",
			startSec: 10,
			durationSec: 8,
			visual:
				"Manos tranquilas marcando tres puntos de chequeo en una pizarra; sin pacientes visibles.",
			voiceover: fact.insight,
			overlay: "Contexto + evolución + protocolo",
			camera: "sobre el hombro, profundidad de campo suave",
		},
		{
			id: "b03_action",
			startSec: 18,
			durationSec: Math.max(5, duration - 23),
			visual: "Tarjeta de checklist junto a documentación de sala o puerperio.",
			voiceover:
				"Para la práctica: convertí la idea en un mini-check, usá las mismas palabras de escalamiento con tu equipo y no lo publiques separado de guía o protocolo local.",
			overlay: "Mini-check, no frase suelta",
			camera: "toma cenital, luz editorial nítida",
		},
		{
			id: "b04_safety",
			startSec: Math.max(23, duration - 5),
			durationSec: 5,
			visual: "Placa final con espacio para fuentes y sello de revisión.",
			voiceover:
				"Antes de publicar: revisión clínica, fuentes completas y límites bien nombrados.",
			overlay: "Revisión pendiente",
			camera: "placa final estática",
		},
	];

	return {
		id: `reel_${fact.id}`,
		factId: fact.id,
		title: `Reel: ${fact.title}`,
		format: "instagram_reel_9x16",
		durationSec: duration,
		hook,
		script: beats.map((beat) => beat.voiceover).join("\n\n"),
		beats,
		imagePrompts: beats.map(
			(beat) =>
				`${beat.visual}, ${beat.camera}, estilo documental editorial latinoamericano, tonos de piel naturales, educación clínica clara, vertical 9:16, sin datos de pacientes legibles`,
		),
		caption: `${fact.title}\n\n${fact.insight}\n\nNota editorial: ${fact.sourceNote}`,
		hashtags: [
			"#Parteria",
			"#Obstetricia",
			"#Puerperio",
			"#EducacionClinica",
			"#ObstetraScroll",
		],
		editorialChecks: [
			"Poner el estado de fuentes en approved antes de exportar",
			"No usar escenas identificables ni detalles de pacientes",
			"Sumar contraindicaciones y protocolo local en la descripción",
			"Revisar risk-level antes del render automático por lote",
		],
		renderPlan: [
			{
				id: "script",
				label: "Guion cerrado",
				status: "ready",
				detail: "Hook, voiceover y overlays salen del brief clínico del fact.",
			},
			{
				id: "keyframes",
				label: "Keyframes",
				status: fact.evidenceStatus === "approved" ? "queued" : "blocked",
				detail:
					"Como en sitcom_pilot: cada beat tiene un prompt 9:16 como unidad de render.",
			},
			{
				id: "voice",
				label: "Voz en off",
				status: fact.riskLevel === "high" ? "blocked" : "queued",
				detail:
					"En facts high-risk, text2audio queda bloqueado hasta la revisión clínica.",
			},
			{
				id: "assemble",
				label: "Ensamblar reel",
				status: "blocked",
				detail: "ffmpeg espera video, audio y subtítulos para cerrar el MP4.",
			},
		],
		status:
			fact.evidenceStatus === "approved"
				? "ready_for_pipeline"
				: "review_required",
	};
}
