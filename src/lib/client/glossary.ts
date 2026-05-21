// Clinical/obstetric term glossary used by the info-panel to clarify jargon
// surfaced in reels. Lowercase keys; first regex match wins.

export type GlossaryEntry = {
	term: string;
	short: string;
	full: string;
};

// Tono rioplatense/argentino: voseo, "acordate", "fijate", "tené en cuenta".
export const GLOSSARY: GlossaryEntry[] = [
	{
		term: "HPP",
		short: "Hemorragia postparto",
		full: "Pérdida ≥500 ml en parto vaginal o ≥1000 ml en cesárea dentro de las primeras 24 hs. Acordate: la atonía es la causa #1, así que palpá fondo uterino siempre.",
	},
	{
		term: "AMTSL",
		short: "Manejo activo del 3er periodo",
		full: "Oxitocina profiláctica + tracción controlada del cordón + masaje uterino post-alumbramiento. Es la regla, no la excepción — duplica protección vs manejo expectante.",
	},
	{
		term: "OMS",
		short: "Organización Mundial de la Salud",
		full: "La OMS publica las guías de referencia global en obstetricia. Mirá las recomendaciones intraparto 2024 antes de discutir cualquier protocolo nuevo.",
	},
	{
		term: "TXA",
		short: "Ácido tranexámico",
		full: "Antifibrinolítico, estabiliza coágulos. 1 g IV en HPP baja mortalidad ~30%, y hasta 68% si lo das dentro de la primera hora. No lo dejes para 'última opción' — va primera línea.",
	},
	{
		term: "UI",
		short: "Unidades internacionales",
		full: "Medida de actividad biológica. La dosis profiláctica de oxitocina post-alumbramiento es 10 UI IM dentro del primer minuto. No esperés a ver signos de separación.",
	},
	{
		term: "IM",
		short: "Intramuscular",
		full: "Inyección al músculo. La oxitocina IM hace efecto en 3-5 minutos, ideal cuando no hay vía IV todavía y se necesita actuar ya.",
	},
	{
		term: "IV",
		short: "Intravenoso",
		full: "Acceso directo al torrente sanguíneo, efecto inmediato. Pero necesitás vía permeable: tenela siempre lista antes del expulsivo en pacientes de riesgo.",
	},
	{
		term: "NNT",
		short: "Número necesario a tratar",
		full: "Cuántos pacientes hay que tratar para prevenir 1 evento. NNT=14 en HPP significa que cada 14 personas con manejo activo, evitás una hemorragia severa. Bajo NNT = intervención muy eficaz.",
	},
	{
		term: "WOMAN",
		short: "Ensayo WOMAN Trial",
		full: "Estudio aleatorizado con 20.060 personas que demostró que TXA baja mortalidad por HPP, sobre todo si se administra dentro de la primera hora. Es la evidencia que sostiene el TXA primera línea.",
	},
	{
		term: "Cochrane",
		short: "Cochrane Review",
		full: "Las revisiones Cochrane son el patrón oro de la evidencia. Meta-analizan ensayos aleatorizados y se actualizan periódicamente. Citarlas cierra debates.",
	},
	{
		term: "preeclampsia",
		short: "Trastorno hipertensivo del embarazo",
		full: "Hipertensión gestacional + daño de órgano (riñón, hígado, coagulación, neuro). Causa principal de morbimortalidad materna. Aspirina 150 mg desde semana 12-16 si hay factores de riesgo.",
	},
	{
		term: "eclampsia",
		short: "Convulsiones por preeclampsia",
		full: "Convulsiones tónico-clónicas en una preeclampsia. Sulfato de magnesio IV es la primera línea — los anticonvulsivantes clásicos no sirven acá.",
	},
	{
		term: "HELLP",
		short: "Hemólisis, hepáticas, plaquetopenia",
		full: "Variante grave de preeclampsia con disfunción multiorgánica. Mortalidad 1-25%. Dolor en epigastrio no es gastritis — pedí labs urgente.",
	},
	{
		term: "IMC",
		short: "Índice de masa corporal",
		full: "Peso (kg) / talla² (m). IMC ≥30 kg/m² triplica riesgo de preeclampsia. Hablalo en la consulta pre-concepcional, no en semana 30.",
	},
	{
		term: "CTG",
		short: "Cardiotocografía",
		full: "Registro continuo de FC fetal + contracciones. Variabilidad 5-25 lpm es lo que querés ver. Silente más de 40 min ya no es 'sueño fetal'.",
	},
	{
		term: "GBS",
		short: "Estreptococo grupo B",
		full: "Streptococcus agalactiae coloniza el tracto genital. Hisopado recto-vaginal en semana 36-37; si da positivo, penicilina IV intraparto previene sepsis neonatal.",
	},
	{
		term: "PCR",
		short: "Proteína C reactiva / reacción en cadena de polimerasa",
		full: "En sepsis neonatal: PCR es marcador inflamatorio. En diagnóstico microbiológico: técnica de amplificación de ADN para identificar patógenos. Mismo nombre, dos cosas distintas — fijate el contexto.",
	},
	{
		term: "Bakri",
		short: "Balón de taponamiento uterino",
		full: "Dispositivo inflable que comprime el lecho placentario en HPP por atonía refractaria. Éxito 85-95%, te evita laparotomía. Sin Bakri, un balón de condón con suero salino hace el mismo trabajo.",
	},
	{
		term: "Misoprostol",
		short: "Análogo de prostaglandina E1",
		full: "800 μg sublingual en HPP cuando no hay oxitocina. Da escalofríos y a veces fiebre transitoria. No es ideal, pero salva vidas donde no hay cadena de frío.",
	},
	{
		term: "Carbetocina",
		short: "Análogo sintético de oxitocina",
		full: "100 μg IM/IV. Vida media más larga, estable a temperatura ambiente hasta 30°C — no hace falta heladera. No es inferior a la oxitocina para prevenir HPP.",
	},
	{
		term: "atonía",
		short: "Útero hipocontráctil postparto",
		full: "El útero no se contrae después del alumbramiento. Causa el 70-80% de las HPP. Primera línea: uterotónicos + masaje uterino + compresión bimanual. Sin tono, no hay hemostasia.",
	},
	{
		term: "puerperio",
		short: "Período postparto",
		full: "Desde el alumbramiento hasta las 6 semanas. Ventana crítica para HPP, depresión postparto y tromboembolismo. El TEP postparto es la causa #1 de muerte materna evitable.",
	},
	{
		term: "expulsivo",
		short: "2da fase del trabajo de parto",
		full: "Desde dilatación completa hasta el nacimiento. Pujos guiados por sensación, no por reloj. Posiciones verticales aprovechan la curva de Carus.",
	},
	{
		term: "alumbramiento",
		short: "3er periodo del parto",
		full: "Expulsión de la placenta y membranas. Es donde aparece la HPP más grave. AMTSL activo: oxitocina, tracción controlada y masaje uterino.",
	},
	{
		term: "Doppler",
		short: "Ecografía con flujo",
		full: "Mide velocidad y resistencia en vasos placentarios y fetales. Arteria uterina entre 20-24 semanas predice preeclampsia; ACM detecta brain-sparing; ductus venoso con onda 'a' revertida = finalización urgente.",
	},
	{
		term: "RPM",
		short: "Ruptura prematura de membranas",
		full: "Salida de líquido amniótico antes del trabajo de parto. Confirmá con espéculo (líquido al esfuerzo) + pH alcalino o test específico. Limitá los tactos vaginales — cada uno sube riesgo de corioamnionitis.",
	},
	{
		term: "RCIU",
		short: "Restricción de crecimiento intrauterino",
		full: "Feto por debajo del percentil 10 o con caída de percentil entre ecografías. Diferenciá PEG constitucional de RCIU patológica con Doppler. Brain-sparing es señal de insuficiencia placentaria.",
	},
	{
		term: "GDM",
		short: "Diabetes gestacional",
		full: "Resistencia insulínica que el páncreas no compensa. Screening universal con 75g entre 24-28 semanas. Glucemia en ayunas ≥92 ya es criterio. Tratá: la macrosomía y distocia de hombros no perdonan.",
	},
	{
		term: "NIPT",
		short: "Test prenatal no invasivo",
		full: "Análisis de ADN fetal libre en sangre materna desde semana 10. >99% sensibilidad para trisomía 21. Pero es screening, no diagnóstico — un positivo se confirma con amniocentesis o CVS antes de decidir nada.",
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
