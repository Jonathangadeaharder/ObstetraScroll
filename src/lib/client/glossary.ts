// Clinical/obstetric term glossary used by the info-panel to clarify jargon
// surfaced in reels. Lowercase keys; first regex match wins.

export type GlossaryEntry = {
	term: string;
	short: string;
	full: string;
};

export const GLOSSARY: GlossaryEntry[] = [
	{
		term: "HPP",
		short: "Hemorragia postparto",
		full: "Pérdida sanguínea ≥500 ml en parto vaginal o ≥1000 ml en cesárea dentro de las primeras 24 horas postparto.",
	},
	{
		term: "AMTSL",
		short: "Manejo activo del 3er periodo",
		full: "Active Management of the Third Stage of Labour: oxitocina profiláctica + tracción controlada de cordón + masaje uterino post-alumbramiento.",
	},
	{
		term: "OMS",
		short: "Organización Mundial de la Salud",
		full: "Agencia de la ONU que publica guías clínicas de referencia global en obstetricia y salud materna.",
	},
	{
		term: "TXA",
		short: "Ácido tranexámico",
		full: "Antifibrinolítico que estabiliza coágulos. 1 g IV en HPP reduce muerte por sangrado ~30%; máximo beneficio si se da en la primera hora.",
	},
	{
		term: "UI",
		short: "Unidades internacionales",
		full: "Medida estandarizada de actividad biológica de fármacos como oxitocina. 10 UI IM es la dosis profiláctica habitual post-alumbramiento.",
	},
	{
		term: "IM",
		short: "Intramuscular",
		full: "Vía de administración por inyección al músculo. Inicio de acción ~3-5 min para oxitocina.",
	},
	{
		term: "IV",
		short: "Intravenoso",
		full: "Vía de administración por inyección directa a la circulación. Efecto inmediato pero requiere acceso venoso.",
	},
	{
		term: "NNT",
		short: "Número necesario a tratar",
		full: "Cantidad de pacientes a tratar para prevenir 1 evento adverso. NNT=14 en HPP significa que 14 personas con manejo activo evitan 1 hemorragia severa.",
	},
	{
		term: "WOMAN",
		short: "Ensayo WOMAN Trial",
		full: "Estudio aleatorizado con 20.060 personas que demostró que TXA reduce mortalidad por HPP, especialmente si se da en la primera hora.",
	},
	{
		term: "Cochrane",
		short: "Cochrane Review",
		full: "Revisión sistemática considerada el estándar de oro en evidencia clínica. Resume y meta-analiza ensayos aleatorizados.",
	},
	{
		term: "preeclampsia",
		short: "Trastorno hipertensivo del embarazo",
		full: "Hipertensión gestacional + daño de órgano (proteinuria, alteración hepática/renal, síntomas neurológicos). Causa principal de morbimortalidad materna.",
	},
	{
		term: "eclampsia",
		short: "Convulsiones por preeclampsia",
		full: "Aparición de convulsiones tónico-clónicas en preeclampsia. Sulfato de magnesio es el tratamiento de primera línea (no anticonvulsivantes clásicos).",
	},
	{
		term: "HELLP",
		short: "Hemólisis, enzimas hepáticas elevadas, plaquetopenia",
		full: "Variante grave de preeclampsia con disfunción multiorgánica. Mortalidad materna 1-25%.",
	},
	{
		term: "IMC",
		short: "Índice de masa corporal",
		full: "Peso (kg) / talla² (m). IMC ≥30 kg/m² triplica riesgo de preeclampsia.",
	},
	{
		term: "CTG",
		short: "Cardiotocografía",
		full: "Registro continuo de frecuencia cardíaca fetal + contracciones uterinas. Tamizaje intraparto de hipoxia fetal.",
	},
	{
		term: "GBS",
		short: "Estreptococo grupo B",
		full: "Streptococcus agalactiae, colonizador del tracto genital. Profilaxis antibiótica intraparto reduce sepsis neonatal precoz.",
	},
	{
		term: "PCR",
		short:
			"Proteína C reactiva (en sepsis) / reacción en cadena de polimerasa (en diagnóstico)",
		full: "En sepsis neonatal: marcador inflamatorio (PCR-CRP). En microbiología: técnica de amplificación de ADN para identificar patógenos.",
	},
	{
		term: "Bakri",
		short: "Balón de taponamiento uterino",
		full: "Dispositivo intrauterino inflable que comprime sitios de sangrado en HPP por atonía. Éxito 85-95%, evita laparotomía.",
	},
	{
		term: "Misoprostol",
		short: "Análogo de prostaglandina E1",
		full: "800 μg sublingual en HPP donde no hay oxitocina. Efectos adversos: escalofríos, fiebre transitoria. Salva vidas en contextos sin cadena de frío.",
	},
	{
		term: "Carbetocina",
		short: "Análogo sintético de oxitocina",
		full: "100 μg IM/IV. Vida media más larga, estable a temperatura ambiente hasta 30°C. No inferior a oxitocina para prevenir HPP.",
	},
	{
		term: "atonía",
		short: "Útero hipocontráctil postparto",
		full: "Falla del útero para contraerse después del alumbramiento. Causa 70-80% de HPP. Primera línea: uterotónicos + masaje + compresión bimanual.",
	},
	{
		term: "puerperio",
		short: "Período postparto",
		full: "Desde alumbramiento hasta ~6 semanas (puerperio tardío). Ventana crítica para HPP, depresión postparto, tromboembolismo.",
	},
	{
		term: "expulsivo",
		short: "2da fase del trabajo de parto",
		full: "Desde dilatación completa hasta expulsión fetal. Pujos maternos guiados por sensación o dilatación.",
	},
	{
		term: "alumbramiento",
		short: "3er periodo del parto",
		full: "Expulsión de placenta y membranas. Ventana de mayor riesgo de HPP — donde actúa el AMTSL.",
	},
];

const RE_CACHE = new Map<string, RegExp>();
function termRegex(term: string): RegExp {
	let re = RE_CACHE.get(term);
	if (!re) {
		const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		re = new RegExp(`\\b${escaped}\\b`, "i");
		RE_CACHE.set(term, re);
	}
	return re;
}

export function findTermsInText(text: string): GlossaryEntry[] {
	if (!text) return [];
	const found: GlossaryEntry[] = [];
	for (const entry of GLOSSARY) {
		if (termRegex(entry.term).test(text)) found.push(entry);
	}
	return found;
}
