import type { Fact } from "$lib/types";

export const facts: Fact[] = [
	{
		id: "delayed-cord-clamping-preterm",
		rank: 1,
		title: "El clampeo tardío no es solo tema de parto de bajo riesgo",
		insight:
			"También en muchos nacimientos prematuros, esperar un poco antes de clampear puede tener impacto clínico, siempre que la estabilización urgente no indique otra cosa.",
		whyNonObvious:
			"Muchos equipos asocian el clampeo tardío con partos de término sin complicaciones, no con prematurez y manejo de transición.",
		audience: "Parteras, obstétricas y equipos de sala de parto",
		sourceNote:
			"Demo: antes de publicar, contrastar con guía clínica y protocolo local.",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Cordón", "Prematurez", "Comunicación del equipo"],
	},
	{
		id: "silent-postpartum-urinary-retention",
		rank: 2,
		title: "La retención urinaria posparto puede venir en silencio",
		insight:
			"Una vejiga llena después del parto no siempre se siente como ganas intensas de orinar y puede influir en sangrado, dolor y vínculo.",
		whyNonObvious:
			"La ausencia de urgencia miccional se lee fácil como tranquilidad, aunque la sensibilidad y la movilidad estén cambiadas.",
		audience: "Puerperio institucional y seguimiento domiciliario",
		sourceNote:
			"Demo: validar umbrales de volumen e intervalos de pesquisa con el protocolo local.",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Puerperio", "Evaluación", "Retención urinaria"],
	},
	{
		id: "skin-to-skin-temperature",
		rank: 3,
		title: "Piel con piel también es termorregulación",
		insight:
			"El contacto piel con piel temprano puede ayudar a sostener la temperatura, pero funciona mejor cuando posición, secado y monitoreo están bien cuidados.",
		whyNonObvious:
			"En redes se cuenta mucho la emoción del contacto; la función fisiológica protectora queda menos visible.",
		audience: "Estudiantes de obstetricia y partería",
		sourceNote:
			"Demo: revisar con estándares neonatales y prevención de hipotermia.",
		evidenceStatus: "seeded",
		riskLevel: "medium",
		tags: ["Piel con piel", "Recién nacido", "Temperatura"],
	},
	{
		id: "oxytocin-context-matters",
		rank: 4,
		title: "La oxitocina no trabaja en el vacío",
		insight:
			"Estrés, seguridad, luz, palabras y ritmo de intervención pueden influir en cómo se acompaña la fisiología del trabajo de parto.",
		whyNonObvious:
			"El concepto suele reducirse a lo bioquímico, aunque el ambiente y la comunicación son herramientas concretas de la partera.",
		audience: "Preparación para el parto y sala de parto",
		sourceNote:
			"Demo: revisar como narrativa educativa, no como indicación terapéutica.",
		evidenceStatus: "seeded",
		riskLevel: "low",
		tags: ["Fisiología", "Comunicación", "Ambiente"],
	},
	{
		id: "meconium-risk-gradient",
		rank: 5,
		title: "El meconio es una señal de contexto, no una alarma aislada",
		insight:
			"El significado del líquido amniótico meconial depende de color, cantidad, edad gestacional, monitoreo fetal, signos infecciosos y evolución completa.",
		whyNonObvious:
			"Los formatos de redes aman el sí/no; acá lo importante es reconocer el patrón clínico.",
		audience: "Equipos de sala de parto",
		sourceNote:
			"Demo: sincronizar criterios de escalamiento con protocolo local.",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Líquido amniótico", "Monitoreo fetal", "Riesgo"],
	},
	{
		id: "hand-expression-antenatal",
		rank: 6,
		title: "A veces el plan de calostro empieza antes del parto",
		insight:
			"La extracción antenatal puede conversarse en personas gestantes seleccionadas, pero necesita indicación clara y acompañamiento.",
		whyNonObvious:
			"Muchas veces el inicio de la lactancia se piensa recién después del parto; la consejería previa queda menos visible.",
		audience: "Consejería en lactancia y controles prenatales",
		sourceNote:
			"Demo: revisar contraindicaciones y población objetivo antes de publicar.",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Lactancia", "Prenatal", "Calostro"],
	},
];

export function listFacts() {
	return facts;
}

export function findFact(id: string) {
	return facts.find((fact) => fact.id === id);
}
