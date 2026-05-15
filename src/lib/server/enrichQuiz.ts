import type { Fact, QuizQuestion } from "$lib/types";

const questionTemplates = [
	(t: string) =>
		`Según la evidencia, ${t.slice(0, 1).toLowerCase()}${t.slice(1)}?`,
	(t: string) =>
		`En la práctica clínica, ¿cuál es la conducta correcta respecto a ${t.toLowerCase()}?`,
	(t: string) =>
		`¿Cuál de estas afirmaciones sobre ${t.toLowerCase()} está respaldada por la evidencia?`,
	(t: string) =>
		`Frente a ${t.toLowerCase()}, ¿qué dice la evidencia que debería hacerse?`,
];

function pick<T>(arr: T[], idx: number): T {
	return arr[idx % arr.length];
}

function trunc(text: string, max: number): string {
	return text.length <= max ? text : `${text.slice(0, max - 1).trim()}…`;
}

function shuffleCorrect(
	options: string[],
	correctIdx: number,
): { options: string[]; answerIndex: number } {
	const corrected = [...options];
	const correct = corrected[0];
	corrected[0] = corrected[correctIdx];
	corrected[correctIdx] = correct;
	return { options: corrected, answerIndex: correctIdx };
}

const genericWrong3 = [
	"Esperar y evaluar sin intervención hasta que aparezcan complicaciones.",
	"Aplicar el protocolo institucional sin considerar el contexto individual.",
	"Derivar a un nivel de mayor complejidad en todos los casos.",
	"Realizar el manejo habitual sin ajustes basados en el riesgo individual.",
];

export function enrichQuiz(fact: Fact): QuizQuestion {
	const question = pick(questionTemplates, fact.rank)(fact.title);

	const correct = trunc(fact.insight, 160);

	const wrongFromWhy = trunc(fact.whyNonObvious, 140);

	const negPrefix = fact.insight.includes("no") ? "" : "No ";
	const wrongNegated = trunc(
		`${negPrefix}${fact.insight.charAt(0).toLowerCase()}${fact.insight.slice(1)}`,
		140,
	);

	const wrongGeneral = pick(genericWrong3, fact.rank + 3);

	const options = [correct, wrongFromWhy, wrongNegated, wrongGeneral];
	const correctIndex = 1 + (fact.rank % 3);
	const shuffled = shuffleCorrect(options, correctIndex);

	const maxExpl = 350;
	const explanation = `${trunc(fact.insight, maxExpl)}\n\nFuente: ${fact.sourceNote}`;

	const optionNotes = shuffled.options.map((opt, i) => {
		if (i === shuffled.answerIndex) {
			return `Correcto: ${trunc(fact.insight, 200)}`;
		}
		if (opt === wrongFromWhy) {
			return `Incorrecto: esto describe una práctica o creencia común, pero la evidencia muestra que no es lo óptimo. ${trunc(fact.whyNonObvious, 150)}`;
		}
		if (opt === wrongNegated) {
			return "Incorrecto: la afirmación contradice directamente la evidencia actual. Revisá el dato clínico.";
		}
		return "Incorrecto: esta opción no refleja el abordaje que la evidencia recomienda para este escenario específico.";
	});

	return {
		id: `quiz-${fact.id}`,
		question,
		options: shuffled.options,
		answerIndex: shuffled.answerIndex,
		explanation,
		optionNotes,
	};
}
