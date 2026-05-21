import type { Fact, QuizQuestion } from "$lib/types";

// Patterns whisper-friendly: percentages, dosage units, time, ratios.
const NUMERIC_RE =
	/(\d{1,4}(?:[.,]\d{1,2})?)\s?(%|UI|mg|mcg|μg|g(?!estación)|ml|kg|min|minutos?|horas?|días?|semanas?)/gi;

function cap(s: string): string {
	return s ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : s;
}

function trunc(text: string, max: number): string {
	return text.length <= max ? text : `${text.slice(0, max - 1).trim()}…`;
}

function mutateValue(value: number): number {
	// Pick clinically plausible offset: half or third or double.
	const factors = [0.5, 0.33, 2];
	const f = factors[Math.floor(value) % factors.length];
	const next = value * f;
	return next >= 1 ? Math.round(next) : Math.round(next * 10) / 10;
}

// Replace the FIRST numeric token in insight with a mutated value.
// Used to produce a hard distractor that flips a key magnitude.
function distractorWithMutatedNumber(
	insight: string,
	seed: number,
): string | null {
	const matches = Array.from(insight.matchAll(NUMERIC_RE));
	if (matches.length === 0) return null;
	const pick = matches[seed % matches.length];
	const raw = pick[1].replace(",", ".");
	const value = Number.parseFloat(raw);
	if (!Number.isFinite(value)) return null;
	const next = mutateValue(value);
	const replaced = insight.replace(
		pick[0],
		`${next}${pick[0].includes(" ") ? " " : ""}${pick[2]}`,
	);
	return cap(trunc(replaced, 140));
}

// Invert a directional verb ("reduce" -> "no modifica", "aumenta" -> "reduce").
// Produces a distractor that sounds plausible but contradicts the evidence.
function distractorWithInvertedDirection(insight: string): string | null {
	const swaps: [RegExp, string][] = [
		[/\breduce\b/i, "no modifica"],
		[/\breduc(en|ió|ido|ida)/i, "no modific$1"],
		[/\bdisminuye\b/i, "aumenta"],
		[/\baumenta\b/i, "disminuye"],
		[/\bduplica\b/i, "no cambia"],
		[/\btriplica\b/i, "no cambia"],
		[/\bprevien(e|en)\b/i, "no afect$1"],
		[/\bmayor\b/i, "menor"],
		[/\bmenor\b/i, "mayor"],
	];
	for (const [re, sub] of swaps) {
		if (re.test(insight)) {
			return cap(trunc(insight.replace(re, sub), 140));
		}
	}
	return null;
}

// Build a "common misconception" distractor from why-non-obvious context.
function distractorFromMisconception(why: string): string {
	// whyNonObvious usually describes the wrong but widespread belief.
	return cap(trunc(why, 140));
}

const fallbackWrong = [
	"Esperar a que aparezcan signos clínicos evidentes antes de intervenir.",
	"Aplicar la regla general sin ajustar a la situación clínica individual.",
	"Derivar siempre al nivel de mayor complejidad antes de iniciar manejo.",
	"Mantener conducta expectante mientras se monitorea la evolución.",
];

function uniq(items: string[]): string[] {
	const seen = new Set<string>();
	const out: string[] = [];
	for (const x of items) {
		const k = x.toLowerCase();
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(x);
	}
	return out;
}

const questionTemplates = [
	(t: string) => `¿Qué dice la evidencia sobre ${t.toLowerCase()}?`,
	(t: string) =>
		`Frente a ${t.toLowerCase()}, ¿cuál es la conducta respaldada?`,
	(t: string) =>
		`Sobre ${t.toLowerCase()}, ¿cuál afirmación refleja la mejor evidencia?`,
	(t: string) => `¿Qué es correcto respecto a ${t.toLowerCase()}?`,
];

export function enrichQuiz(fact: Fact): QuizQuestion {
	const correct = cap(trunc(fact.insight, 160));

	const candidates: string[] = [];
	const mut1 = distractorWithMutatedNumber(fact.insight, fact.rank);
	if (mut1) candidates.push(mut1);
	const mut2 = distractorWithMutatedNumber(fact.insight, fact.rank + 1);
	if (mut2 && mut2 !== mut1) candidates.push(mut2);
	const inv = distractorWithInvertedDirection(fact.insight);
	if (inv) candidates.push(inv);
	candidates.push(distractorFromMisconception(fact.whyNonObvious));

	// Pad with fallbacks if extraction was sparse.
	let i = 0;
	while (candidates.length < 3) {
		candidates.push(fallbackWrong[(fact.rank + i++) % fallbackWrong.length]);
	}

	const distractors = uniq(candidates)
		.filter((x) => x !== correct)
		.slice(0, 3);
	while (distractors.length < 3) {
		distractors.push(
			fallbackWrong[(fact.rank + distractors.length) % fallbackWrong.length],
		);
	}

	const answerIndex = fact.rank % 4;
	const options = [...distractors];
	options.splice(answerIndex, 0, correct);
	options.length = 4;

	const question = questionTemplates[fact.rank % questionTemplates.length](
		fact.title,
	);

	const explanation = `${cap(trunc(fact.insight, 280))}\n\nPor qué no es obvio: ${cap(trunc(fact.whyNonObvious, 200))}\n\nFuente: ${fact.sourceNote}`;

	const optionNotes = options.map((opt, i) => {
		if (i === answerIndex) {
			return `Correcto. ${cap(trunc(fact.insight, 220))}`;
		}
		if (opt === inv) {
			return "Incorrecto: invierte la dirección del efecto. La evidencia muestra el efecto opuesto al planteado aquí.";
		}
		if (opt === mut1 || opt === mut2) {
			return "Incorrecto: la magnitud o dosis es plausible pero no es la respaldada por la evidencia. Revisá el valor exacto.";
		}
		if (opt === candidates[3]) {
			return `Incorrecto: refleja una creencia frecuente pero la evidencia la contradice. ${cap(trunc(fact.whyNonObvious, 160))}`;
		}
		return "Incorrecto: conducta genérica que no aplica al escenario clínico específico.";
	});

	return {
		id: `quiz-${fact.id}`,
		question,
		options,
		answerIndex,
		explanation,
		optionNotes,
	};
}
