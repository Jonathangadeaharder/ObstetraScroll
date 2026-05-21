import type { Fact } from "$lib/types";

// Lote 2: 100 nuevas reels basadas en preguntas de examen alemán para
// parteras del curso de homologación de terceros estados (DGGG/SGGG/ÖGGG/OMS).
// Estructura: 10 bloques temáticos × 10 facts.
export const facts2: Fact[] = [
	// ===== Bloque 1: Placentación, embriología, intercambio fetomaterno (101-110) =====
	{
		id: "placentacion-invasion-trofoblastica",
		rank: 101,
		title: "Invasión trofoblástica: el cimiento de la placentación normal",
		insight:
			"El trofoblasto extravelloso invade las arterias espirales del endometrio y el tercio interno del miometrio, destruyendo su pared elastomuscular y reemplazando el endotelio materno. Las arterias pasan de vasos de alta resistencia a vasos dilatados de baja resistencia, asegurando perfusión continua de baja presión al espacio intervelloso.",
		whyNonObvious:
			"Una invasión incompleta limitada a la decidua es la raíz de la preeclampsia precoz y de la restricción de crecimiento placentaria — no es un fallo tardío sino un defecto del primer trimestre.",
		audience: "Parteras y obstétricas en formación clínica",
		sourceNote: "DGGG S2k Preeclampsia 2024; FIGO 2025; Pijnenborg Placenta",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Placentación", "Trofoblasto", "Preeclampsia", "Anatomía"],
	},
	{
		id: "liquido-amniotico-funciones",
		rank: 102,
		title: "Líquido amniótico en la 2ª mitad: orina fetal y secreción pulmonar",
		insight:
			"En la segunda mitad del embarazo el líquido amniótico está compuesto principalmente por orina fetal y secreción pulmonar. Protege al feto del trauma y de la compresión del cordón, permite el desarrollo musculoesquelético, contiene péptidos antimicrobianos y es esencial para la maduración pulmonar al ser inhalado y deglutido.",
		whyNonObvious:
			"El oligohidramnios no es sólo un signo radiológico: refleja función renal y pulmonar fetal, y altera directamente la mecánica del trabajo de parto.",
		audience: "Parteras, sala de partos",
		sourceNote: "DGGG perinatal 2024; Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Líquido amniótico", "Fisiología fetal", "Riñón fetal"],
	},
	{
		id: "transporte-igg-fcrn-placenta",
		rank: 103,
		title: "El feto recibe inmunidad pasiva sólo por IgG vía FcRn",
		insight:
			"La inmunidad pasiva fetal proviene exclusivamente del transporte activo, receptor-dependiente, de IgG por receptores neonatales Fc (FcRn) en el sincitiotrofoblasto. IgM e IgA no atraviesan la barrera placentaria por tamaño y falta de transportador. El transporte se intensifica desde la semana 32.",
		whyNonObvious:
			"Por eso los prematuros nacen con escasa inmunidad pasiva: el grueso del transporte ocurre en el tercer trimestre, no en el segundo.",
		audience: "Parteras, neonatología",
		sourceNote: "WHO Maternal Immunology 2023; Simister Vaccine 2022",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Inmunología", "Prematuro", "Transferencia placentaria"],
	},
	{
		id: "trofoblasto-velloso-vs-extravelloso",
		rank: 104,
		title: "Trofoblasto velloso vs extravelloso: dos roles distintos",
		insight:
			"El trofoblasto velloso (sincitio + citotrofoblasto) cubre las vellosidades y se encarga del intercambio difusional y de la síntesis endocrina (hCG, hPL, progesterona, estrógenos). El trofoblasto extravelloso abandona el árbol velloso, invade decidua y miometrio, remodela la vasculatura y media la tolerancia inmunológica materna.",
		whyNonObvious:
			"El error frecuente es ver la placenta como un órgano único: son dos linajes celulares con funciones independientes y patologías propias.",
		audience: "Parteras y obstétricas",
		sourceNote: "Burton & Jauniaux Placenta 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Trofoblasto", "Endocrinología", "Anatomía"],
	},
	{
		id: "intercambio-gases-bohr-haldane",
		rank: 105,
		title: "Doble efecto Bohr y Haldane optimizan el O2 fetal",
		insight:
			"El intercambio gaseoso placentario es por difusión simple según gradientes de presión. La HbF tiene mayor afinidad por O2 que la HbA. Al ceder CO2 al feto, el pH materno baja (Bohr) facilitando la liberación de O2; el pH fetal sube favoreciendo su captación. El efecto Haldane mejora simultáneamente la captación materna de CO2 fetal.",
		whyNonObvious:
			"No es una sola física sino un doble mecanismo Bohr+Haldane el que permite oxigenación fetal con un gradiente tan modesto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Guyton & Hall 14th; Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Fisiología", "Hemoglobina", "Intercambio gaseoso"],
	},
	{
		id: "luteoplacentar-shift-progesterona",
		rank: 106,
		title: "Luteoplacentar shift entre semana 7-9",
		insight:
			"Entre las semanas 7 y 9 ocurre el luteoplacentar shift: el sincitiotrofoblasto asume la síntesis primaria de progesterona y estrógenos a partir de DHEA-S de la suprarrenal fetal. La progesterona mantiene el miometrio hiperpolarizado y suprime la respuesta inmune celular local para evitar el rechazo del aloinjerto fetal.",
		whyNonObvious:
			"El cuerpo lúteo no es la fuente eterna de progesterona: si la placenta falla en asumir el relevo, se pierde el embarazo aunque haya cuerpo lúteo intacto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Speroff Endocrinology 9th ed",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Endocrinología", "Progesterona", "Placenta"],
	},
	{
		id: "amnionitis-aszendierende-infektion",
		rank: 107,
		title: "Corioamnionitis: vía ascendente, citoquinas, prostaglandinas",
		insight:
			"En infección ascendente (típicamente tras RPM con flora vaginal), las bacterias penetran corion y amnios. Las membranas liberan IL-1, IL-6 y TNF-alfa que activan prostaglandinas en decidua y miometrio, induciendo maduración cervical y contracciones precoces. La infiltración leucocitaria del líquido amniótico define la corioamnionitis.",
		whyNonObvious:
			"La fiebre materna y la taquicardia fetal aparecen tarde: para entonces ya hay activación inflamatoria que dispara parto pretérmino.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG 712 2023; DGGG corioamnionitis 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Infección", "RPM", "Prematuridad"],
	},
	{
		id: "perfusion-uterina-50-vs-800",
		rank: 108,
		title: "Perfusión uterina: de 50 ml/min a 600-800 ml/min al término",
		insight:
			"En el estado no gestante el flujo uterino es ~50 ml/min (1% del gasto cardíaco). Al término alcanza 600-800 ml/min, el 10-15% del gasto cardíaco materno. Este aumento es por dilatación masiva y pérdida de resistencia en el lecho uterino, no por aumento de presión.",
		whyNonObvious:
			"Cualquier vasoconstricción uterina (catecolaminas, hipotensión, decúbito supino) reduce desproporcionadamente la oxigenación fetal porque es una caída sobre un sistema ya maximizado.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Hemodinámica", "Perfusión", "Anatomía"],
	},
	{
		id: "hpl-diabetogenicidad-lipolitico",
		rank: 109,
		title: "hPL: lipolítico y diabetogénico para alimentar al feto",
		insight:
			"El lactógeno placentario humano (hPL) se secreta proporcional a la masa placentaria. Actúa como antagonista de la insulina materna, reduce la sensibilidad insulínica de los tejidos maternos y promueve lipólisis. El objetivo es preservar glucosa materna para que pase al feto vía GLUT-1.",
		whyNonObvious:
			"La diabetes gestacional no es un fallo: es la consecuencia inevitable cuando el páncreas materno no puede compensar la resistencia inducida por hPL.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG diabetes gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Endocrinología", "hPL", "Diabetes gestacional"],
	},
	{
		id: "barrera-placentaria-madura-3trimestre",
		rank: 110,
		title: "Barrera placentaria al término: 4 capas adelgazadas",
		insight:
			"En la placenta madura del tercer trimestre, la barrera entre sangre materna y fetal son sólo 4 capas finas: sincitiotrofoblasto adelgazado, su membrana basal, una capa mínima de estroma y el endotelio capilar fetal. El citotrofoblasto se ha disuelto para minimizar la distancia de difusión.",
		whyNonObvious:
			"Esta arquitectura explica por qué casi todas las drogas pasan al feto: la barrera es funcional sólo para macromoléculas, no para moléculas pequeñas lipofílicas.",
		audience: "Parteras y obstétricas",
		sourceNote: "Burton Placenta 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Placenta", "Farmacología", "Anatomía"],
	},

	// ===== Bloque 2: Circulación fetal y adaptación neonatal (111-120) =====
	{
		id: "tres-shunts-fetales",
		rank: 111,
		title: "Tres shunts fetales: ductus venoso, foramen oval, ductus arterioso",
		insight:
			"El ductus venoso (Arancio) deriva ~50% de sangre oxigenada de la vena umbilical directamente a la cava inferior, evitando el hígado. El foramen oval conduce sangre rica en O2 del atrio derecho al izquierdo para irrigar cerebro y coronarias. El ductus arterioso (Botal) deriva ~90% del flujo del ventrículo derecho a la aorta descendente, evitando el pulmón comprimido.",
		whyNonObvious:
			"La circulación fetal es paralela, no serie como la del adulto: una sola obstrucción de un shunt no produce hipoxia letal mientras los otros funcionen.",
		audience: "Parteras y neonatología",
		sourceNote: "Rudolph fetal & neonatal 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Circulación fetal", "Anatomía", "Neonatal"],
	},
	{
		id: "cierre-ductus-arterioso-pO2",
		rank: 112,
		title: "Cierre del ductus arterioso: el pO2 dispara el cierre",
		insight:
			"El estímulo crítico es el salto abrupto de pO2 arterial (de 25-30 mmHg fetal a >90 mmHg neonatal) con los primeros respiros. El O2 inhibe los canales de potasio de las células musculares del ductus, entra Ca2+ y vasocontrae intensamente. La caída de prostaglandinas PGE2 (sin placenta) acelera el proceso.",
		whyNonObvious:
			"Los AINEs (indometacina, ibuprofeno) cierran el ductus en prematuros precisamente porque bloquean PGE2 — esa misma vía que en el feto mantiene el ductus abierto.",
		audience: "Parteras y neonatología",
		sourceNote: "AAP neonatal 2024; ESC pediatric cardio",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Ductus arterioso", "Neonatal", "Farmacología"],
	},
	{
		id: "cierre-foramen-oval-presiones",
		rank: 113,
		title: "Foramen oval se cierra por inversión de presiones",
		insight:
			"Con la ventilación, la resistencia vascular pulmonar cae drásticamente y aumenta el retorno al atrio izquierdo, subiendo su presión. Simultáneamente el clampeo del cordón corta el retorno venoso a la derecha, bajando la presión atrial derecha. La presión izquierda > derecha presiona el septum primum contra el septum secundum y cierra el foramen mecánicamente.",
		whyNonObvious:
			"El cierre no es por crecimiento de tejido: es puro gradiente de presión. Si las presiones se igualan o invierten (HTpulmonar), el foramen se reabre.",
		audience: "Parteras y neonatología",
		sourceNote: "Rudolph fetal & neonatal 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Foramen oval", "Neonatal", "Hemodinámica"],
	},
	{
		id: "saturacion-vena-vs-arterias-umbilicales",
		rank: 114,
		title: "Vena umbilical 80% sat; arterias umbilicales 50-55%",
		insight:
			"La vena umbilical transporta sangre oxigenada desde placenta al feto, con la saturación más alta del sistema (~80%). Las dos arterias umbilicales transportan sangre desoxigenada del feto a la placenta para reoxigenación, con saturación de sólo 50-55%.",
		whyNonObvious:
			"La nomenclatura es opuesta al adulto: en el feto la vena lleva sangre oxigenada y las arterias desoxigenada — por eso confundirse en la gasometría del cordón puede invertir el diagnóstico de asfixia.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG umbilical cord gas 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Cordón umbilical", "Gasometría", "Anatomía"],
	},
	{
		id: "termogenesis-no-tiritante-grasa-parda",
		rank: 115,
		title: "Termogénesis no-tiritante: grasa parda y UCP-1",
		insight:
			"El recién nacido no puede generar calor por tiritona muscular. Usa grasa parda (interescapular, perirrenal, paravertebral). El frío activa la noradrenalina, que vía receptores β3 activa la UCP-1 (termogenina) mitocondrial. UCP-1 desacopla la cadena respiratoria de la síntesis de ATP, convirtiendo los ácidos grasos directamente en calor.",
		whyNonObvious:
			"Mantener al recién nacido caliente no es estética: cada grado de hipotermia consume reservas de grasa parda y agrava acidosis e hipoglucemia.",
		audience: "Parteras, neonatología",
		sourceNote: "WHO thermal protection newborn 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Termorregulación", "Grasa parda", "Neonatal"],
	},
	{
		id: "clampeo-tardio-transfusion-placentaria",
		rank: 116,
		title: "Clampeo diferido: 80-100 ml de transfusión placentaria",
		insight:
			"El clampeo retardado al menos 30-60 segundos (o hasta cese del pulso) permite una transfusión placentaria de ~80-100 ml. Eleva el volumen sanguíneo neonatal ~30%, optimiza hematocrito, asegura oxigenación durante la transición pulmonar y aumenta significativamente las reservas de hierro hasta los 6 meses sin incrementar hiperbilirubinemia clínicamente relevante.",
		whyNonObvious:
			"El miedo a la ictericia retrasó este cambio décadas — la evidencia muestra que el beneficio en hierro supera con creces el riesgo bilirrubínico.",
		audience: "Parteras, sala de partos",
		sourceNote: "WHO delayed cord clamping 2024; ACOG 814",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Clampeo cordón", "Hierro", "Neonatal"],
	},
	{
		id: "ttn-resorcion-liquido-pulmonar",
		rank: 117,
		title: "Taquipnea transitoria: ENaC y resorción de líquido pulmonar",
		insight:
			"La TTN se debe a reabsorción tardía del líquido pulmonar fetal. Periparto, el epitelio pulmonar conmuta de secreción activa de Cl- a reabsorción de Na+ vía canales ENaC, estimulada por adrenalina y cortisol del parto. Sin estos estímulos (cesárea electiva sin trabajo de parto, prematuridad) el líquido queda en el intersticio.",
		whyNonObvious:
			"Por eso cesárea electiva antes de la semana 39 multiplica el riesgo de TTN — no por la cirugía, sino por la ausencia del estímulo hormonal del trabajo de parto.",
		audience: "Parteras, neonatología",
		sourceNote: "DGGG cesárea electiva 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["TTN", "Cesárea", "Adaptación pulmonar"],
	},
	{
		id: "primer-respiro-vasodilatacion-pulmonar",
		rank: 118,
		title: "Primer respiro: NO y prostaciclina abren el pulmón",
		insight:
			"In utero el pulmón está vasocontraído por hipoxia (Euler-Liljestrand). El primer respiro distiende mecánicamente los alvéolos y eleva el pO2 alveolar, lo que libera NO y prostaciclina (PGI2) del endotelio pulmonar. Esto produce vasodilatación masiva que reduce la resistencia vascular pulmonar diez veces en segundos.",
		whyNonObvious:
			"La transición no es pasiva: es un evento bioquímico activo que puede fallar (hipertensión pulmonar persistente del recién nacido) si hay hipoxia o acidosis al nacer.",
		audience: "Parteras, neonatología",
		sourceNote: "Rudolph fetal & neonatal 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Adaptación pulmonar", "Vasodilatación", "Neonatal"],
	},
	{
		id: "surfactante-laplace-prematuro",
		rank: 119,
		title: "Surfactante: la ley de Laplace explica el SDR del prematuro",
		insight:
			"El surfactante (neumocitos tipo II desde ~24-25 semanas) reduce la tensión superficial alveolar. Por Laplace (P=2T/r), un alvéolo pequeño sin surfactante colapsa porque T es alta y r pequeño. Sin surfactante los alvéolos colapsan en cada espiración (atelectasia), cada inspiración requiere presión enorme y aparece SDR.",
		whyNonObvious:
			"La betametasona prenatal funciona en horas porque acelera la maduración de neumocitos tipo II preexistentes — no genera neumocitos nuevos.",
		audience: "Parteras, neonatología",
		sourceNote: "WHO antenatal corticosteroids 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Surfactante", "Prematuro", "SDR"],
	},
	{
		id: "vitamina-k-profilaxis-VKMB",
		rank: 120,
		title: "Vitamina K al nacer: previene la enfermedad hemorrágica",
		insight:
			"Los neonatos nacen con déficit de factores K-dependientes (II, VII, IX, X) porque la vitamina K casi no atraviesa la placenta y su intestino es estéril sin flora productora. La profilaxis estándar es 2 mg de vitamina K oral en U1, U2 y U3 (o 1 mg IM al nacer) para prevenir hemorragias incluyendo intracraneales.",
		whyNonObvious:
			"La forma oral protege frente a hemorragia precoz pero requiere 3 dosis para proteger frente a hemorragia tardía (1-12 semanas). Saltarse U2/U3 deja al niño expuesto.",
		audience: "Parteras, neonatología",
		sourceNote: "WHO vitamin K neonatal 2024; AAP 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vitamina K", "Coagulación", "Neonatal"],
	},

	// ===== Bloque 3: Pelvis, canal del parto, mecánica del parto (121-130) =====
	{
		id: "cuatro-formas-pelvis",
		rank: 121,
		title: "Cuatro pelvis clásicas: la ginecoide es la más favorable",
		insight:
			"Ginecoide: entrada redondeada-transversal, ángulo púbico abierto, ideal mecánicamente. Androide: corazón, sacro estrecho, propensa a anomalías de inserción. Antropoide: ovalada sagital, favorece occipucio posterior persistente. Platipeloide: aplanada, diámetro sagital corto, dificulta el encaje.",
		whyNonObvious:
			"La mayoría son mixtas; el tipo puro es minoría. La forma predice más que el tamaño cuando el feto es de tamaño promedio.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Pelvis", "Anatomía", "Mecánica del parto"],
	},
	{
		id: "conjugata-vera-vs-diagonalis",
		rank: 122,
		title: "Conjugata vera: 1,5-2 cm menos que la diagonalis",
		insight:
			"La conjugata vera es el diámetro recto más estrecho de la entrada pélvica: borde posterior de la sínfisis al promontorio (≥11 cm). No se palpa directamente. La conjugata diagonalis se mide vaginalmente (borde inferior de sínfisis al promontorio, ~12,5-13 cm). Restando 1,5-2 cm se calcula la vera.",
		whyNonObvious:
			"Si la diagonalis es <11,5 cm el riesgo de desproporción es real. Sólo medirla cuando hay sospecha clínica, no de rutina.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG pelvimetría 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Pelvimetría", "Conjugada", "Anatomía"],
	},
	{
		id: "espinas-isquiaticas-angustia-pelvis",
		rank: 123,
		title: "Espinas isquiáticas: el diámetro crítico de 10 cm",
		insight:
			"La estrechez pélvica (angustia pelvis) está limitada por borde inferior de sínfisis (ventral), espinas isquiáticas (laterales) y articulación sacrococcígea (dorsal). El diámetro interespinoso (~10 cm) es el más crítico para el descenso del feto.",
		whyNonObvious:
			"El nivel de las espinas (estación 0) es la referencia del descenso fetal — no porque sea anatómica, sino porque es el cuello de botella de la pelvis.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Pelvis", "Espinas", "Mecánica del parto"],
	},
	{
		id: "hipomoclion-occipitoanterior",
		rank: 124,
		title: "Hipomoclion: el punto de pivote bajo la sínfisis",
		insight:
			"El hipomoclion es el punto fijo alrededor del cual el cuerpo fetal (típicamente la cabeza) rota para superar la siguiente etapa pélvica. En presentación occipitoanterior, el hipomoclion es la región suboccipital, que se apoya bajo la sínfisis para deflexionar la cabeza sobre el periné.",
		whyNonObvious:
			"Distintas presentaciones tienen distinto hipomoclion: cambiar la presentación cambia totalmente la mecánica — no es lo mismo coronar en occipital que en cara.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG mecánica del parto 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Mecánica", "Hipomoclion", "Presentación"],
	},
	{
		id: "flexion-maxima-suboccipitobregmatico",
		rank: 125,
		title: "Flexión máxima: 9,5 cm en lugar de 13 cm",
		insight:
			"En la entrada pélvica la cabeza fetal suele ir indiferente o levemente flexionada (sutura sagital en transverso). Al alcanzar el suelo pélvico, el músculo elevador del ano fuerza flexión máxima (mentón contra pecho). La fontanela menor pasa a ser el punto guía y la cabeza entra con el diámetro mínimo (suboccipitobregmático, ~9,5 cm).",
		whyNonObvious:
			"Cualquier deflexión convierte 9,5 cm en hasta 13,5 cm — una diferencia que la pelvis no perdona.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Flexión", "Cabeza fetal", "Diámetros"],
	},
	{
		id: "asinclitismo-naegele-litzmann",
		rank: 126,
		title: "Asinclitismo: anterior favorable, posterior patológico",
		insight:
			"En asinclitismo la sutura sagital no está centrada entre sínfisis y promontorio. Anterior (Naegele): cabeza inclinada hacia atrás, sutura desplazada al promontorio, parietal anterior dirige — habitualmente favorable. Posterior (Litzmann): sutura desplazada hacia la sínfisis, parietal posterior dirige — casi siempre patológico, indica falta de espacio.",
		whyNonObvious:
			"Confundir Naegele con Litzmann lleva a expectar lo que en realidad es bloqueo pélvico.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG mecánica del parto 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Asinclitismo", "Mecánica", "Diagnóstico"],
	},
	{
		id: "suelo-pelvico-tres-capas",
		rank: 127,
		title: "Suelo pélvico: 3 capas activas en el parto",
		insight:
			"Diafragma pélvico (interna): elevador del ano y coccígeo, centra y dirige la cabeza. Diafragma urogenital (media): transverso del periné profundo y superficial. Capa externa: esfínter anal externo, bulboesponjoso, isquiocavernoso. Las tres deben distenderse al máximo en el período expulsivo.",
		whyNonObvious:
			"El daño del suelo pélvico no es sólo del esfínter visible: la capa profunda determina el prolapso a largo plazo.",
		audience: "Parteras y obstétricas",
		sourceNote: "IUGA prolapse 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Suelo pélvico", "Anatomía", "Periné"],
	},
	{
		id: "curva-carus-eje-pelvico",
		rank: 128,
		title: "Curva de Carus: trayectoria en J alrededor de la sínfisis",
		insight:
			"La curva de Carus describe la línea de guía del canal del parto: primero recta caudal-dorsal hacia el sacro, luego dobla ventral-craneal en el ángulo púbico. El niño hace un arco alrededor de la sínfisis durante el descenso.",
		whyNonObvious:
			"Por eso pujar acostada empuja contra la curva, no a favor — y por qué la posición vertical aprovecha la gravedad y abre la curva.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum care 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Mecánica", "Posiciones de parto"],
	},
	{
		id: "suturas-fontanelas-parietal",
		rank: 129,
		title: "Suturas del parietal: sagital, coronal, lambdoidea",
		insight:
			"El parietal fetal limita medialmente con la sutura sagital, anteriormente con la coronal y posteriormente con la lambdoidea. En los cruces están la fontanela mayor (rombo, anterior) y la fontanela menor (triángulo, posterior).",
		whyNonObvious:
			"Tactar la forma de la fontanela cambia el diagnóstico: triángulo es occipital flexionada, rombo es occipital deflexionada.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG diagnóstico tacto 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Cabeza fetal", "Suturas", "Tacto"],
	},
	{
		id: "presentacion-frente-mentoocipital",
		rank: 130,
		title: "Presentación de frente: cesárea casi obligada",
		insight:
			"En presentación de frente (deflexión media) actúa el plano mentooccipital, con diámetro de ~13-13,5 cm y circunferencia ~36 cm. Excede casi siempre la capacidad de la pelvis. El parto vaginal es imposible si persiste; indicación de cesárea.",
		whyNonObvious:
			"Es la única deflexión que rara vez progresa: ni se reflexiona ni completa deflexión, queda atascada — diagnosticarla pronto evita pérdida de tiempo.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG operative delivery 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Presentación", "Cesárea", "Deflexión"],
	},

	// ===== Bloque 4: Fisiología materna del embarazo (131-140) =====
	{
		id: "tpr-cae-30-40-progesterona",
		rank: 131,
		title: "TA cae en 1º y 2º trimestre pese a más gasto cardíaco",
		insight:
			"La presión arterial baja porque la resistencia periférica cae 30-40%. Progesterona relaja la musculatura vascular, el endotelio sintetiza más NO y prostaciclinas, y la placenta funciona como sistema de baja resistencia en paralelo. El gasto cardíaco aumenta pero el TPR cae más.",
		whyNonObvious:
			"Una TA 'normal' de 130/85 en una embarazada puede ser ya hipertensión gestacional comparada con su línea base.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG HTA gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Hemodinámica", "TPR", "Embarazo"],
	},
	{
		id: "sindrome-vena-cava-supina",
		rank: 132,
		title: "Síndrome de vena cava: decúbito supino reduce retorno venoso",
		insight:
			"En decúbito supino desde la mitad del embarazo, el útero comprime vena cava inferior y vasos pélvicos contra la columna. Se reduce el retorno venoso, cae el volumen sistólico y el gasto cardíaco. Síncope materno, taquicardia refleja, sudoración fría — y a nivel placentario hipoperfusión y bradicardia fetal. La maniobra inmediata es decúbito lateral izquierdo.",
		whyNonObvious:
			"No siempre da síntomas dramáticos en la madre: a veces la única señal es bradicardia fetal en el CTG.",
		audience: "Parteras, sala de partos",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vena cava", "Hipotensión", "Posicionamiento"],
	},
	{
		id: "hipercoagulabilidad-embarazo",
		rank: 133,
		title: "Embarazo: estado hipercoagulable fisiológico (riesgo 4-5x)",
		insight:
			"El embarazo es protrombótico fisiológico para prepararse a la hemorragia del parto. Aumentan fibrinógeno y factores VII, VIII, IX, X y FvW; bajan proteína S y la fibrinólisis. El riesgo de TVP y TEP es 4-5 veces el de no embarazadas, y persiste hasta 6 semanas postparto.",
		whyNonObvious:
			"El mayor riesgo trombótico no es durante el embarazo sino el puerperio inmediato — donde a veces se baja la guardia.",
		audience: "Parteras y obstétricas",
		sourceNote: "RCOG VTE 2024; DGGG tromboprofilaxis",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Trombosis", "Coagulación", "Puerperio"],
	},
	{
		id: "alcalosis-respiratoria-progesterona",
		rank: 134,
		title: "Hiperventilación fisiológica: alcalosis respiratoria normal",
		insight:
			"Progesterona aumenta la sensibilidad del centro respiratorio al CO2. El volumen minuto sube ~40% sobre todo por volumen corriente. CO2 materno baja a ~30 mmHg con alcalosis respiratoria compensada por bicarbonato renal. Esto favorece la difusión de CO2 fetal a la madre.",
		whyNonObvious:
			"Un pCO2 de 40 mmHg en embarazo no es 'normal': indica hipoventilación y debe alertar.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Gasometría", "Respiración", "Embarazo"],
	},
	{
		id: "resistencia-insulinica-fetal",
		rank: 135,
		title: "Resistencia insulínica: a propósito, para nutrir al feto",
		insight:
			"La gestación induce resistencia insulínica periférica progresiva mediada por hPL, progesterona, cortisol y TNF-alfa. Su propósito biológico es reducir el consumo materno de glucosa para dejar más para el feto. Si el páncreas materno no compensa con hiperinsulinemia 2-3x, aparece diabetes gestacional.",
		whyNonObvious:
			"No es una 'patología' nueva: es la capacidad pancreática previa la que se rompe — por eso reaparece en futuros embarazos y predice DM2.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG diabetes gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Diabetes gestacional", "Insulina", "Metabolismo"],
	},
	{
		id: "creatinina-gfr-embarazo",
		rank: 136,
		title: "Creatinina 0,9 en embarazo ya puede ser daño renal",
		insight:
			"El filtrado glomerular aumenta ~50% por la expansión volémica. Creatinina y urea bajan: el valor normal de creatinina puede caer a 0,4-0,7 mg/dl. Una creatinina de 0,9 mg/dl en gestación es relativamente alta y puede indicar daño renal subclínico (por ejemplo en preeclampsia).",
		whyNonObvious:
			"Usar los rangos de no-embarazada en gestantes hace que se ignoren disfunciones renales reales — es necesario el rango gestacional.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG preeclampsia 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Función renal", "Creatinina", "Preeclampsia"],
	},
	{
		id: "relaxina-sinfisis-laxitud",
		rank: 137,
		title: "Relaxina: ablanda sínfisis y articulaciones sacroilíacas",
		insight:
			"Relaxina (cuerpo lúteo y placenta) remodela el tejido conectivo: degrada colágeno y aumenta el contenido de agua de cápsulas y ligamentos. Afecta sobre todo sínfisis púbica e iliosacras. El anillo pélvico se vuelve más elástico, lo que amplía temporalmente los diámetros óseos durante el parto.",
		whyNonObvious:
			"El dolor de sínfisis no es 'culpa' de la mujer: es la relaxina cumpliendo su función. Y por eso persiste semanas postparto.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG sínfisis 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Relaxina", "Sínfisis", "Pelvis"],
	},
	{
		id: "hcg-tsh-cross-reactivity",
		rank: 138,
		title: "hCG estimula la tiroides: TSH bajo en 1º trimestre",
		insight:
			"La hCG comparte estructura con TSH (subunidad alfa homóloga). En picos altos de hCG del primer trimestre, hCG cruza el receptor de TSH en la tiroides materna y sube T3/T4 libres. Por feedback, TSH baja. Es hipertiroidismo gestacional transitorio fisiológico.",
		whyNonObvious:
			"TSH bajo en primer trimestre no es enfermedad tiroidea: confundirlo lleva a tratamientos innecesarios.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG tiroides 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Tiroides", "hCG", "Endocrinología"],
	},
	{
		id: "reflujo-estreñimiento-progesterona",
		rank: 139,
		title: "Pirosis y estreñimiento: progesterona relaja músculo liso",
		insight:
			"Progesterona relaja sistémicamente el músculo liso. Baja el tono del esfínter esofágico inferior — reflujo. Enlentece el tránsito gástrico e intestinal — más reabsorción de agua en colon, estreñimiento. Son síntomas fisiológicos, no patológicos.",
		whyNonObvious:
			"Antes de tratar con IBP o laxantes, ajustar postura, fraccionar comidas y fibra resuelve la mayoría.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG molestias gestacionales 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Reflujo", "Estreñimiento", "Progesterona"],
	},
	{
		id: "anemia-dilucional-vs-real",
		rank: 140,
		title: "Anemia dilucional vs real: el corte por trimestre",
		insight:
			"El plasma materno expande 40-50% pero los eritrocitos sólo 20-30% — es dilución, no anemia. Baja Hb y Hto fisiológicamente. La anemia verdadera (usualmente ferropénica) se diagnostica cuando Hb cae bajo 11 g/dl en 1º y 3º trimestre o bajo 10,5 g/dl en 2º.",
		whyNonObvious:
			"Tratar todo descenso de Hb con hierro IV es sobretratamiento — la mayoría es dilucional fisiológica.",
		audience: "Parteras y obstétricas",
		sourceNote: "OMS anemia gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Anemia", "Hierro", "Hematología"],
	},

	// ===== Bloque 5: Fisiología endocrina del parto (141-150) =====
	{
		id: "retirada-funcional-progesterona",
		rank: 141,
		title: "El parto humano: retirada funcional de progesterona, no sistémica",
		insight:
			"En humanos la progesterona sistémica no cae antes del parto. Lo que cae es la respuesta del miometrio: baja la isoforma PR-B y sube la inhibitoria PR-A. Suben localmente estrógenos, que disparan gap junctions (conexina 43) y receptores de oxitocina, y prostaglandinas en membranas y decidua.",
		whyNonObvious:
			"Medir progesterona sérica para predecir parto es inútil: el cambio es a nivel receptor, no de circulación.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG parto 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Inicio parto", "Progesterona", "Receptores"],
	},
	{
		id: "reflejo-ferguson-oxitocina",
		rank: 142,
		title: "Reflejo de Ferguson: el feto que se autopuja",
		insight:
			"Es retroalimentación positiva: la cabeza fetal presiona el cuello y vagina, estimula receptores de distensión, aferencias al hipotálamo, pulsos de oxitocina desde la neurohipófisis, más contracciones, más presión cervical, más oxitocina.",
		whyNonObvious:
			"La epidural a veces interrumpe el reflejo — por eso a veces hay que apoyar el expulsivo con oxitocina exógena en mujeres bien analgesiadas.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Oxitocina", "Reflejo", "Parto"],
	},
	{
		id: "triple-gradiente-descendente",
		rank: 143,
		title: "Onda contráctil: triple gradiente descendente",
		insight:
			"Una contracción fisiológica empieza en el fundus (cerca de las trompas) y desciende. 1) Propagación de arriba abajo. 2) Duración mayor en fundus, menor en segmento inferior. 3) Intensidad máxima fundus, mínima abajo. Resultado: el feto baja y el cuello se dilata pasivamente.",
		whyNonObvious:
			"Una onda invertida (arriba flojo, abajo fuerte) no dilata: por eso una distocia funcional requiere oxitocina y no más espera.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG distocia 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Contracciones", "Distocia", "Parto"],
	},
	{
		id: "retraccion-miometrio-vs-contraccion",
		rank: 144,
		title: "Retracción miometrial: la fibra no vuelve a su largo",
		insight:
			"Durante la contracción las células se acortan. Al relajarse no vuelven a su longitud previa: quedan acortadas. Es la retracción. La fibra acumulada sube y disminuye el lumen uterino, jalando segmento inferior y cuello sobre el feto.",
		whyNonObvious:
			"Por eso una segunda fase del parto es siempre más eficiente: el músculo acumula trabajo, no se reinicia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Retracción", "Miometrio", "Parto"],
	},
	{
		id: "maduracion-cervical-inflamacion",
		rank: 145,
		title: "Maduración cervical: una inflamación dirigida",
		insight:
			"La maduración cervical es un proceso inflamatorio controlado. Prostaglandinas (PGE2) e IL-8 atraen neutrófilos al estroma cervical. Estos liberan colagenasas y MMPs que rompen la malla colágena rígida. Suben glicosaminoglicanos (hialurónico), entra agua: el cuello se ablanda y dilata.",
		whyNonObvious:
			"Los antiinflamatorios pueden frenar la maduración cervical: por eso en preparto no se usan AINEs si se quiere progresar.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG inducción 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Cuello uterino", "Prostaglandinas", "Inducción"],
	},
	{
		id: "gap-junctions-conexina-43",
		rank: 146,
		title: "Gap junctions: el cableado del miometrio coordinado",
		insight:
			"Gap junctions (conexina 43) acoplan eléctrica y metabólicamente las células miometriales. Casi ausentes en embarazo (contracciones aisladas, Braxton-Hicks). Justo antes del parto, los estrógenos elevan masivamente su expresión. Los potenciales de acción se propagan por todo el miometrio: contracciones sincronizadas y eficaces.",
		whyNonObvious:
			"Sin gap junctions hay contracciones, pero no parto: por eso una inducción farmacológica a veces tarda en 'enganchar'.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Conexina", "Miometrio", "Parto"],
	},
	{
		id: "catecolaminas-estres-frenan-parto",
		rank: 147,
		title: "Estrés y miedo frenan el parto vía beta-2",
		insight:
			"El estrés sostenido eleva catecolaminas. Adrenalina actúa en receptores β2 miometriales y los inhibe (efecto tocolítico). También vasoconstriñe arterias uterinas, hipoperfunde la placenta y favorece hipoxia fetal. El miedo materno literalmente paraliza el parto.",
		whyNonObvious:
			"La atmósfera de la sala no es estética: es fisiología. Luz tenue, intimidad, acompañamiento bajan catecolaminas y reanudan el parto.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum care 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Estrés", "Catecolaminas", "Distocia"],
	},
	{
		id: "alumbramiento-cizalla-uterina",
		rank: 148,
		title: "Alumbramiento: la placenta no se contrae, el útero sí",
		insight:
			"Tras la salida del feto, el útero se contrae y retrae masivamente bajo oxitocina mantenida. Como la placenta no es contráctil, se generan fuerzas de cizalla en la zona de inserción. Los vasos maternos rompen, se forma el hematoma retroplacentario fisiológico y la placenta se desprende.",
		whyNonObvious:
			"Apurar el alumbramiento antes de que el útero esté bien contraído fragmenta la placenta y aumenta retención y HPP.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO PPH 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Alumbramiento", "HPP", "Tercer periodo"],
	},
	{
		id: "ligadura-viviente-uterina",
		rank: 149,
		title: "Ligadura viviente: el músculo aprieta los vasos",
		insight:
			"Las arterias espirales atraviesan el miometrio entre las fibras musculares. Tras el alumbramiento, la contracción y retracción persistentes comprimen mecánicamente esos vasos. Esta 'ligadura viviente' es el mecanismo principal de hemostasia postparto; la coagulación celular es secundaria.",
		whyNonObvious:
			"Por eso en atonía la HPP no se detiene con hemostáticos: hay que recuperar el tono del útero (uterotónicos, masaje, balón).",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO PPH 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Atonía", "HPP", "Hemostasia"],
	},
	{
		id: "lactancia-amenorrea-prolactina",
		rank: 150,
		title: "Lactancia amenorrea: prolactina frena GnRH",
		insight:
			"La succión activa receptores mecánicos del pezón. Señales al hipotálamo y luego al hipófisis anterior liberan prolactina. Altas concentraciones de prolactina suprimen pulsos de GnRH, lo que baja FSH/LH y bloquea la maduración folicular. Es la base del método de amenorrea de la lactancia (MELA).",
		whyNonObvious:
			"MELA no es un método anticonceptivo seguro a la larga: depende de frecuencia y exclusividad de la lactancia, y de la ausencia de menstruación.",
		audience: "Parteras y obstétricas",
		sourceNote: "OMS planificación familiar 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Lactancia", "Anticoncepción", "Prolactina"],
	},
];

export const facts2Block6to10: Fact[] = [
	// ===== Bloque 6: Anatomía profunda de las vías del parto y cráneo fetal (151-160) =====
	{
		id: "spatium-perinei-profundum",
		rank: 151,
		title: "Espacio perineal profundo: límites y estructuras",
		insight:
			"El espacio perineal profundo está limitado cranealmente por la fascia superior del diafragma urogenital y caudalmente por la membrana perineal. Contiene transverso del periné profundo, esfínter externo de la uretra y ramas de los vasos y el nervio pudendos.",
		whyNonObvious:
			"Es la capa que más sufre cizallamiento durante el expulsivo — su daño explica incontinencia urinaria a largo plazo aunque la piel del periné quede intacta.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Periné", "Anatomía profunda"],
	},
	{
		id: "linea-jacoby-intercristal",
		rank: 152,
		title: "Línea intercristal (Jacoby): referencia para epidural",
		insight:
			"La línea intercristal une los puntos más altos de las crestas ilíacas y cruza la columna a nivel de L4 o del espacio L4-L5. Es el punto anatómico de referencia para colocar epidural o raquídea durante el parto.",
		whyNonObvious:
			"Si la mujer está muy obesa o lordótica, la palpación puede engañar 1-2 niveles arriba o abajo — más riesgo de punción dural.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG analgesia parto 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Anestesia", "Anatomía", "Epidural"],
	},
	{
		id: "sinciput-vorderhauptslage",
		rank: 153,
		title: "Sinciput y bregma: la fontanela mayor guía",
		insight:
			"El sinciput es la región frontal del cráneo fetal. En presentación de bregma (deflexión leve) el sinciput desciende y la fontanela mayor (bregma) se vuelve el punto guía en el canal del parto.",
		whyNonObvious:
			"Si en el tacto se palpa una fontanela grande rombal, no es occipital: el feto está deflexionado y la mecánica cambia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Presentación", "Bregma", "Tacto"],
	},
	{
		id: "diametros-pelvicos-tres-niveles",
		rank: 154,
		title: "Diámetros pélvicos: ovalado-redondo-ovalado",
		insight:
			"Entrada: transverso (~13 cm) > sagital (~11 cm), forma ovalada transversal. Excavación: ~12,5 cm en ambos, redondeada. Salida: sagital alarga a 11,5-12 cm por retropulsión del coxis; transverso (intertuberoso) ~10-10,5 cm. La cabeza fetal rota para acomodarse al cambio de eje.",
		whyNonObvious:
			"La rotación interna no es estética: si la cabeza no rota, no pasa la salida — la mecánica es geométrica, no negociable.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Diámetros pélvicos", "Mecánica"],
	},
	{
		id: "ligamento-cardinal-mackenrodt",
		rank: 155,
		title: "Ligamento cardinal: el sostén transversal del útero",
		insight:
			"El ligamento cardinal (Mackenrodt) es un haz fibrovascular dentro del parametrio que va de la cérvix y fondo vaginal lateral a la pared pélvica. Es el sostén transversal principal del útero. Durante el parto soporta tensión por el descenso de la cabeza fetal.",
		whyNonObvious:
			"Su daño persistente postparto (junto con sacrouterinos) es el origen del prolapso uterino años después.",
		audience: "Parteras y obstétricas",
		sourceNote: "IUGA prolapse 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Ligamentos", "Prolapso", "Anatomía"],
	},
	{
		id: "anillo-bandl-ruptura-uterina",
		rank: 156,
		title: "Anillo de Bandl: alarma de rotura uterina",
		insight:
			"En un parto obstruido, el segmento superior se contrae y engrosa, el inferior se distiende hasta adelgazarse al máximo. La línea limítrofe entre ambos asciende sobre la sínfisis y se hace visible y palpable como anillo de Bandl. Es señal de rotura uterina inminente y exige cesárea de emergencia.",
		whyNonObvious:
			"Ver el anillo de Bandl no es 'hallazgo curioso': es contraindicación absoluta a seguir con oxitocina o parto vaginal.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO obstructed labor 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Bandl", "Rotura uterina", "Emergencia"],
	},
	{
		id: "moldeamiento-cabeza-suturas",
		rank: 157,
		title: "Moldeamiento: las suturas permiten reducir el diámetro",
		insight:
			"Los huesos del cráneo fetal no están fusionados: están unidos por suturas y fontanelas elásticas. Bajo la presión del canal, las placas óseas se solapan y reducen el perímetro craneal temporalmente. Esto permite el paso sin dañar el cerebro.",
		whyNonObvious:
			"Un moldeamiento exagerado tras parto largo no es patológico, pero un moldeamiento absoluto puede ser signo de desproporción cefalopélvica que pasó por poco.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Cráneo fetal", "Moldeamiento"],
	},
	{
		id: "nervio-pudendo-bloqueo",
		rank: 158,
		title: "Bloqueo del pudendo: anestesia para parto instrumental",
		insight:
			"El nervio pudendo (S2-S4) sale del plexo sacro, rodea la espina isquiática y entra al canal de Alcock. Inerva sensorial y motoramente la mayor parte de periné. Para bloquearlo se inyecta anestésico justo detrás de la espina isquiática palpada vaginalmente.",
		whyNonObvious:
			"El bloqueo del pudendo no anestesia útero ni cuello: sirve sólo para parto instrumental, episiotomía o sutura, no para distensión uterina.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG operative delivery 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Anestesia", "Pudendo", "Episiotomía"],
	},
	{
		id: "pelvis-justo-minor",
		rank: 159,
		title: "Pelvis justo minor: forma normal pero pequeña",
		insight:
			"Pelvis justo minor es una pelvis ginecoide morfológicamente normal pero con todos los diámetros 1-2 cm bajo el promedio. Parto vaginal posible sólo con feto pequeño; con peso normal, lo habitual es paro de progreso.",
		whyNonObvious:
			"No basta con verla 'normal' en la pelvimetría — hay que comparar contra el peso fetal estimado.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG pelvimetría 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Pelvimetría", "Desproporción"],
	},
	{
		id: "centro-perineal-tendineum",
		rank: 160,
		title: "Centro perineal: nudo fibroso entre vulva y ano",
		insight:
			"El centro tendinoso del periné es un nudo fibromuscular entre vulva y ano donde convergen elevador del ano (puborrectal), transverso del periné, bulboesponjoso y esfínter anal externo. Sostiene toda la estática del suelo pélvico.",
		whyNonObvious:
			"Un desgarro III-IV grados que dañe el centro perineal mal reparado es origen de incontinencia fecal y prolapso a largo plazo.",
		audience: "Parteras y obstétricas",
		sourceNote: "RCOG OASIS 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Periné", "Desgarro", "Reparación"],
	},

	// ===== Bloque 7: Ejes endocrinos y gónadas (161-170) =====
	{
		id: "lactancia-nachwehen-oxitocina",
		rank: 161,
		title: "Entuertos durante la lactancia: oxitocina contrae el útero",
		insight:
			"La succión libera oxitocina desde la neurohipófisis. Esta oxitocina actúa sobre los receptores miometriales aún hipertrofiados, generando contracciones intensas (entuertos). Comprimen el lecho placentario, mejoran hemostasia y aceleran la involución uterina.",
		whyNonObvious:
			"El dolor de entuertos no se 'aguanta porque sí': es la oxitocina haciendo su trabajo hemostático — analgesia sí, pero no suprimir el reflejo.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO PPH 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Lactancia", "Entuertos", "Puerperio"],
	},
	{
		id: "supresion-fsh-lh-en-embarazo",
		rank: 162,
		title: "Esteroides placentarios suprimen FSH y LH",
		insight:
			"Estrógenos y progesterona placentarios generan feedback negativo intenso sobre hipotálamo e hipófisis. FSH y LH quedan suprimidas, no hay maduración folicular ni ovulación durante todo el embarazo.",
		whyNonObvious:
			"Por eso 'gemelos heterocronicos' (dos óvulos fertilizados en ciclos distintos) son fenomenales — biológicamente casi imposibles.",
		audience: "Parteras y obstétricas",
		sourceNote: "Speroff 9th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["FSH", "LH", "Endocrinología"],
	},
	{
		id: "oxitocina-vida-media-corta",
		rank: 163,
		title: "Oxitocina IV: vida media de 3-5 minutos",
		insight:
			"La oxitocina nativa o sintética tiene vida media plasmática de sólo 3-5 minutos: es degradada por oxitocinasas placentarias y maternas. Por eso debe administrarse en infusión continua con bomba; cambios de dosis se reflejan en pocos minutos.",
		whyNonObvious:
			"Por la corta vida media, parar la oxitocina es la respuesta inmediata ante hiperestimulación — funciona en minutos.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO induction 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Oxitocina", "Inducción", "Hiperestimulación"],
	},
	{
		id: "hormona-antimulleriana-fetal",
		rank: 164,
		title: "AMH fetal: induce regresión de los conductos de Müller",
		insight:
			"La hormona antimülleriana (AMH) la secretan las células de Sertoli del testículo fetal desde la semana 8, inducidas por el gen SRY. AMH bloquea el desarrollo de los conductos de Müller (que habrían formado útero, trompas y tercio superior de vagina). Testosterona induce conductos de Wolff a genitales masculinos internos.",
		whyNonObvious:
			"Por eso falta de AMH en feto XY causa síndrome de persistencia mülleriana: hombre con útero y trompas residuales.",
		audience: "Parteras y obstétricas",
		sourceNote: "Speroff 9th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["AMH", "Diferenciación sexual", "Embriología"],
	},
	{
		id: "nauseas-hcg-area-postrema",
		rank: 165,
		title: "Náuseas del 1º trimestre: hCG estimula área postrema",
		insight:
			"Las náuseas correlacionan con el pico de hCG entre semanas 9-12. Isoformas específicas de hCG estimulan la zona quimiorreceptora gatillo del tronco cerebral. Estrógenos suben paralelo y enlentecen el vaciamiento gástrico. Causa multifactorial pero con hCG como motor.",
		whyNonObvious:
			"Por eso embarazos múltiples y enfermedad trofoblástica (hCG muy elevada) cursan con náuseas extremas: no es 'sensibilidad' sino dosis.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG nausea pregnancy 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Náuseas", "hCG", "Primer trimestre"],
	},
	{
		id: "cortisol-11bhsd2-placentaria",
		rank: 166,
		title: "11β-HSD2: la placenta protege al feto del cortisol materno",
		insight:
			"El cortisol total materno duplica o triplica durante embarazo, impulsado por CRH placentaria. Para proteger al feto, la placenta expresa 11β-HSD2, enzima que oxida cortisol activo a cortisona inactiva antes de que llegue al feto.",
		whyNonObvious:
			"Por eso betametasona y dexametasona materna sí pasan al feto: son sintéticos no oxidados por 11β-HSD2 — útil para madurar pulmón.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO antenatal corticosteroids 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Cortisol", "Placenta", "Corticoides"],
	},
	{
		id: "sflt1-plgf-ratio-preeclampsia",
		rank: 167,
		title: "sFlt-1/PlGF: marcador placentario de preeclampsia e IUGR",
		insight:
			"sFlt-1 es antiangiogénico, PlGF es pro-angiogénico. En disfunción placentaria, sFlt-1 sube y PlGF cae. El ratio sFlt-1/PlGF alto indica isquemia placentaria crónica y predice preeclampsia y RCIU placentaria.",
		whyNonObvious:
			"Útil sobre todo para descartar: un ratio normal a la semana 28 tiene VPN muy alto para preeclampsia en 1-4 semanas.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG preeclampsia 2024; ISSHP 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Preeclampsia", "Biomarcadores", "PlGF"],
	},
	{
		id: "lactogenesis-ii-prolactina-progesterona",
		rank: 168,
		title: "Subida de leche: la caída de progesterona libera prolactina",
		insight:
			"La prolactina ya está alta antes del parto, pero la progesterona placentaria bloquea sus receptores mamarios. Al expulsar la placenta, la progesterona y los estrógenos caen abruptamente y la prolactina puede actuar libremente — el calostro pasa a leche madura entre 24 y 72 horas.",
		whyNonObvious:
			"Restos placentarios retenidos retrasan la subida de leche porque mantienen progesterona alta — siempre considerar si la lactogénesis se demora >72 horas.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO breastfeeding 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Lactancia", "Lactogénesis", "Puerperio"],
	},
	{
		id: "hiperinsulinismo-fetal-macrosomia",
		rank: 169,
		title:
			"Hiperinsulinismo fetal: por qué la diabetes mal controlada hace macrosomía",
		insight:
			"Glucosa materna pasa libremente la placenta; insulina materna no. En hiperglucemia materna crónica, el páncreas fetal hipersecreta insulina desde la semana 12. La insulina fetal es factor de crecimiento: lipogénesis y glucogénesis fetal aumentan, organomegalia y macrosomía.",
		whyNonObvious:
			"La macrosomía es asimétrica: tronco y vísceras crecen, perímetro cefálico no — por eso la distocia de hombros es el riesgo principal, no la cabeza.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG GDM 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Macrosomía", "GDM", "Distocia hombros"],
	},
	{
		id: "cortisol-fetal-madura-organos",
		rank: 170,
		title: "Cortisol fetal: madura pulmón e intestino al término",
		insight:
			"En las últimas semanas la suprarrenal fetal incrementa la producción de cortisol. Este glucocorticoide endógeno induce diferenciación de neumocitos tipo II (surfactante) y maduración de enzimas intestinales (preparación para alimentación enteral).",
		whyNonObvious:
			"La administración prenatal de betametasona en amenaza de parto prematuro imita esta misma señal: no es 'crear' madurez, es adelantar la propia.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO antenatal corticosteroids 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Cortisol", "Maduración pulmonar", "Prematuridad"],
	},

	// ===== Bloque 8: Inmunología fetomaterna y hematología perinatal (171-180) =====
	{
		id: "tolerancia-inmune-hla-g",
		rank: 171,
		title: "Tolerancia fetomaterna: HLA-G y T-regs en la interfaz",
		insight:
			"El sincitiotrofoblasto no expresa MHC clásicos (HLA-A, HLA-B), siendo invisible a CTL maternas. Expresa HLA-G no clásico que inhibe a las NK uterinas. La decidua recluta T-regs locales que suprimen inflamación. Resultado: tolerancia local, inmunidad sistémica preservada.",
		whyNonObvious:
			"Es por eso que vacunarse en embarazo es seguro: el feto está protegido por barrera local, no por inmunosupresión materna.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO immunology pregnancy 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Inmunología", "Tolerancia", "Vacunas"],
	},
	{
		id: "rh-hemolitica-igG-segunda",
		rank: 172,
		title: "Enfermedad hemolítica Rh: IgG ataca al segundo feto Rh+",
		insight:
			"Madre Rh negativa, feto Rh positivo: transfusión fetomaterna sensibiliza a la madre, que produce IgM primero y luego IgG anti-D. En el siguiente embarazo Rh+, IgG anti-D atraviesa la placenta, se une a eritrocitos fetales y los destruye en el bazo. Anemia fetal grave, hidrops, muerte intrauterina.",
		whyNonObvious:
			"El primer embarazo Rh+ suele ser indemne; el riesgo aparece desde el segundo. Por eso la profilaxis anti-D del primer embarazo es preventiva, no terapéutica.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG isoinmunización Rh 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Rh", "Isoinmunización", "Anemia fetal"],
	},
	{
		id: "profilaxis-anti-d-28-72h",
		rank: 173,
		title: "Profilaxis anti-D: 28-30 semanas y dentro de 72h postparto",
		insight:
			"Toda embarazada Rh negativa con feto Rh positivo (o desconocido) recibe 300 μg de inmunoglobulina anti-D en la semana 28-30. Repite dosis dentro de 72 horas postparto si el recién nacido se confirma Rh+. Dosis extra ante riesgos de transfusión fetomaterna (aborto, amniocentesis, trauma abdominal).",
		whyNonObvious:
			"Saltar la dosis de 28 semanas porque 'la madre se siente bien' es un error: el objetivo es bloquear sensibilización por microtransfusiones que ya pueden haber ocurrido en silencio.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG isoinmunización Rh 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Anti-D", "Rh", "Profilaxis"],
	},
	{
		id: "hbf-cadena-gamma-curva-izquierda",
		rank: 174,
		title: "HbF: cadenas gamma, curva desplazada a la izquierda",
		insight:
			"HbF tiene cadenas α2γ2 en lugar de α2β2 del adulto. HbF se une débilmente al 2,3-BPG, lo que aumenta su afinidad por el O2 (curva a la izquierda). Por eso el feto puede captar O2 incluso con pO2 intervelloso de 30 mmHg.",
		whyNonObvious:
			"Esta misma afinidad alta hace que el feto entregue mal O2 a sus tejidos en hipoxia aguda — el margen de adaptación a hipoxia prolongada es estrecho.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HbF", "Oxigenación", "Hipoxia"],
	},
	{
		id: "ictericia-praecox-vs-fisiologica",
		rank: 175,
		title: "Ictericia precoz vs fisiológica: las primeras 24 horas mandan",
		insight:
			"Ictericia precoz: bilirrubina sube en las primeras 24 horas o más rápido que 0,5 mg/dl por hora. Casi siempre hemólisis (incompatibilidad AB0 o Rh). Ictericia fisiológica: aparece entre día 3-5, debida a inmadurez de glucuronil transferasa hepática y alto recambio eritrocitario.",
		whyNonObvious:
			"Tratar igual ambos lleva a perder tiempo: la precoz exige Coombs y exsanguineotransfusión si sube rápido; la fisiológica suele necesitar sólo fototerapia.",
		audience: "Parteras y neonatología",
		sourceNote: "AAP hyperbilirubinemia 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Ictericia", "Bilirrubina", "Neonatal"],
	},
	{
		id: "leucocitosis-parto-no-infeccion",
		rank: 176,
		title: "Leucocitosis del parto: hasta 25.000 sin ser infección",
		insight:
			"Durante el trabajo de parto, los leucocitos suben fisiológicamente a 15.000-25.000/μl por estrés y demarginación inducida por cortisol y adrenalina. No es diagnóstico aislado de infección.",
		whyNonObvious:
			"Si se trata cada leucocitosis del parto con antibióticos, se sobretratan miles sin beneficio: hay que ver el contexto clínico (fiebre, taquicardia fetal, FUL).",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG intrapartum fever 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Leucocitosis", "Infección", "Parto"],
	},
	{
		id: "volumen-sanguineo-fetal-80ml-kg",
		rank: 177,
		title: "Volumen sanguíneo fetal: 80-85 ml/kg",
		insight:
			"El feto a término tiene ~80-85 ml/kg de volumen sanguíneo (vs ~65-70 ml/kg en adulto). Compensa con frecuencia cardíaca alta (110-160 lpm) y Hb alta (16-20 g/dl) el bajo pO2 intrauterino para mantener entrega tisular de O2.",
		whyNonObvious:
			"Una pérdida de 50 ml en un recién nacido de 3 kg es 20% de su volemia — equivalente a 1 litro en adulto.",
		audience: "Parteras y neonatología",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Volemia", "Neonatal", "Hemorragia"],
	},
	{
		id: "microtransfusion-fetomaterna-parto",
		rank: 178,
		title: "Microtransfusión fetomaterna: pico en alumbramiento",
		insight:
			"Pequeñas cantidades de eritrocitos fetales pasan a circulación materna durante el embarazo, pero el grueso ocurre en expulsivo y alumbramiento por las fuerzas mecánicas. Bastan 0,1 ml de sangre fetal para sensibilizar a una Rh negativa.",
		whyNonObvious:
			"El test de Kleihauer-Betke postparto identifica casos con transfusión mayor de 30 ml que requieren dosis extra de anti-D.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG isoinmunización 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Transfusión fetomaterna", "Rh", "Postparto"],
	},
	{
		id: "celulas-madre-cordon",
		rank: 179,
		title: "Sangre de cordón: rica en células madre hematopoyéticas",
		insight:
			"La sangre de cordón contiene células madre hematopoyéticas (CD34+) primitivas y mesenquimales. En útero migran de hígado/bazo a médula ósea, por lo que circulan activamente. Permite uso terapéutico en trasplante hematopoyético como alternativa a médula ósea.",
		whyNonObvious:
			"Donar cordón a banco público beneficia a múltiples receptores; almacenar 'privado' rara vez se usa para el propio niño.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO cord blood 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Células madre", "Cordón umbilical"],
	},
	{
		id: "anemia-fisiologica-neonato-epo",
		rank: 180,
		title: "Anemia fisiológica del lactante: por caída de EPO",
		insight:
			"Tras el nacimiento sube el pO2 y la eritropoyetina renal cae casi a cero. Sin EPO, la médula ósea para de fabricar eritrocitos. La Hb baja progresivamente hasta semanas 6-8, cuando el déficit relativo de O2 tisular vuelve a despertar EPO.",
		whyNonObvious:
			"La 'anemia' del lactante hacia las 8 semanas es fisiológica: dar hierro no acelera la recuperación si la EPO aún no se ha reactivado.",
		audience: "Parteras y obstétricas",
		sourceNote: "AAP pediatric anemia 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Anemia", "EPO", "Lactante"],
	},

	// ===== Bloque 9: Miometrio y vasculatura uterina (181-190) =====
	{
		id: "tres-capas-miometrio",
		rank: 181,
		title: "Miometrio: tres capas con funciones distintas",
		insight:
			"Estrato supravascular (externo): fibras longitudinales, acortan el útero. Estrato vascular (medio): fibras espirales entrelazadas con vasos, principal motor contráctil y hemostasia (ligadura viviente). Estrato subvascular (interno): fibras circulares, mantienen el cuello cerrado en el embarazo.",
		whyNonObvious:
			"Una lesión sólo del estrato vascular ya basta para impedir hemostasia postparto — por eso el masaje bimanual es a través del fondo, no del cuello.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Miometrio", "Hemostasia", "Anatomía"],
	},
	{
		id: "arteria-uterina-notch-doppler",
		rank: 182,
		title: "Arteria uterina: el notch debe desaparecer en semana 24",
		insight:
			"La arteria uterina viene de la ilíaca interna y anastomosa con la ovárica. En no gestante hay notch protodiastólico y flujo de alta resistencia. Con la invasión trofoblástica, hacia las semanas 20-24 el notch desaparece y el flujo se vuelve de baja resistencia.",
		whyNonObvious:
			"Si a la semana 24 todavía hay notch bilateral en uterinas, es un marcador potente de futuro preeclampsia o RCIU placentaria.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Doppler", "Preeclampsia", "RCIU"],
	},
	{
		id: "plexo-frankenhauser-autonomia",
		rank: 183,
		title: "Plexo de Frankenhäuser: el útero conserva autonomía propia",
		insight:
			"La inervación uterina es vegetativa vía plexo uterovaginal de Frankenhäuser (simpático T10-L2, parasimpático S2-S4). Sin embargo el miometrio tiene marcapasos propios y autonomía miogénica. Una paciente con lesión medular alta puede tener parto.",
		whyNonObvious:
			"Esto explica por qué la epidural no detiene el parto: bloquea sólo la modulación, no la contracción miógena.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Inervación", "Plexo", "Epidural"],
	},
	{
		id: "laplace-segmento-inferior-ruptura",
		rank: 184,
		title: "Ley de Laplace: el segmento inferior es el más vulnerable",
		insight:
			"Tensión de pared = Presión × Radio / (2 × Espesor). En parto obstruido, el segmento inferior se distiende (R sube) y se adelgaza (h cae); incluso a presión normal la tensión de pared explota. Por eso casi todas las roturas uterinas ocurren ahí, no en el fondo.",
		whyNonObvious:
			"Cuanto más fina la pared del segmento inferior se siente al tacto, más cerca está la rotura: la sensación importa más que la dilatación.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO obstructed labor 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Rotura uterina", "Laplace", "Segmento inferior"],
	},
	{
		id: "couvelaire-uterus-apoplejia",
		rank: 185,
		title: "Útero de Couvelaire: apoplejía uteroplacentaria",
		insight:
			"En desprendimiento prematuro grave el hematoma retroplacentario diseca entre las fibras miometriales y bajo la serosa visceral. El útero aparece marmoreado azul-negro en cesárea. El miometrio infiltrado pierde contractilidad: atonía refractaria.",
		whyNonObvious:
			"Esa atonía no se resuelve con oxitocina: es daño anatómico, hay que considerar histerectomía si la hemorragia persiste.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO obstetric emergencies 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["DPPNI", "Couvelaire", "Histerectomía"],
	},
	{
		id: "progesterona-hiperpolariza-miometrio",
		rank: 186,
		title: "Progesterona: hiperpolariza el miometrio, lo silencia",
		insight:
			"Progesterona hiperpolariza la membrana de la célula miometrial: extrae K+ y baja el potencial de reposo a -60 a -65 mV. Además bloquea canales de Ca2+. El miometrio queda silente. Al caer la sensibilidad progesterónica antes del parto, el potencial sube a -45 mV y la célula se vuelve excitable.",
		whyNonObvious:
			"Por eso los gestágenos vaginales reducen parto pretérmino en mujeres seleccionadas: refuerzan la hiperpolarización del miometrio.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG preterm labor 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Progesterona", "Miometrio", "Prematuridad"],
	},
	{
		id: "drenaje-linfatico-cuerpo-utero",
		rank: 187,
		title: "Linfa del cuerpo uterino: paraaorta directa",
		insight:
			"La linfa del cuerpo uterino drena vía vasos paralelos a la arteria ovárica directamente a ganglios paraaorticos a nivel de la salida renal. La linfa del cuello drena a ilíacos internos, externos y sacros.",
		whyNonObvious:
			"Por eso una corioamnionitis severa puede dar lumbalgia y sepsis abdominal sin afectar primero pelvis: la diseminación sigue la ruta linfática paraaórtica.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Linfa", "Sepsis", "Anatomía"],
	},
	{
		id: "hematoma-retroperitoneal-postparto",
		rank: 188,
		title: "Hematoma retroperitoneal: hemorragia oculta postparto",
		insight:
			"Lesión de arteria vaginal o ramas de uterina en espacios paravesical/pararrectal puede sangrar al retroperitoneo sin sangrado vaginal visible. El espacio sube al retroperitoneo abdominal: litros pueden acumularse en silencio. Choque + dolor en flanco/espalda postparto: pensar en hematoma retroperitoneal.",
		whyNonObvious:
			"La ausencia de sangrado vaginal no descarta HPP: el shock con útero contraído debe disparar imagen urgente.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO PPH 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Hematoma", "HPP oculta", "Choque"],
	},
	{
		id: "magnesio-antagonista-calcio-miometrio",
		rank: 189,
		title: "Sulfato de magnesio: antagonista del calcio en miometrio",
		insight:
			"Mg2+ compite con Ca2+ en canales L y bloquea su entrada en la célula miometrial. Sin Ca2+ intracelular, MLCK no se activa y no hay contracción. Por eso MgSO4 es a la vez tocolítico, neuroprotector fetal y antieclámptico.",
		whyNonObvious:
			"Sobredosis de Mg paraliza también la musculatura respiratoria: el antídoto es gluconato de calcio IV.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO MgSO4 eclampsia 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Magnesio", "Eclampsia", "Tocolisis"],
	},
	{
		id: "ureter-cruza-arteria-uterina",
		rank: 190,
		title: "El uréter cruza bajo la arteria uterina: 'water under the bridge'",
		insight:
			"La arteria uterina cruza por encima del uréter ~1,5-2 cm lateral al orificio cervical interno. En cirugía obstétrica de emergencia (rotura uterina, HPP grave) es la zona de mayor riesgo de ligar accidentalmente el uréter.",
		whyNonObvious:
			"Por eso 'water under the bridge': agua (uréter) bajo el puente (uterina) — regla mnemotécnica básica que ha salvado riñones en quirófano.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG hysterectomy 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Anatomía", "Uréter", "Cirugía"],
	},

	// ===== Bloque 10: Pelvis, tejidos blandos y mecánica del periné (191-200) =====
	{
		id: "rombo-michaelis-asimetria",
		rank: 191,
		title: "Rombo de Michaelis: la asimetría delata pelvis anómala",
		insight:
			"El rombo de Michaelis es un campo cutáneo sobre el sacro con 4 vértices: apófisis espinosa de L5 arriba, espinas ilíacas posterosuperiores a los lados, inicio del pliegue interglúteo abajo. Asimetría o aplastamiento sugiere deformidad pélvica (escoliosis, raquitismo) que aumenta riesgo de desproporción.",
		whyNonObvious:
			"Una mirada de 3 segundos al rombo de Michaelis con la mujer de pie puede sustituir radiografías innecesarias.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG pelvimetría 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Michaelis", "Pelvimetría", "Inspección"],
	},
	{
		id: "vagina-hipertrofia-estrogeno-parto",
		rank: 192,
		title: "Vagina embarazada: hipertrofia, elasticidad, hiperemia",
		insight:
			"Bajo estrógenos el epitelio vaginal hipertrofia, la lámina propria aumenta fibras elásticas y afloja el colágeno, y el plexo venoso vaginal se ingurgita. La vagina se transforma en tejido tipo esponjoso muy distensible, capaz de envolverse al paso de la cabeza sin desgarro generalizado.",
		whyNonObvious:
			"Por eso los desgarros vaginales menores suelen sangrar mucho a pesar de ser pequeños: la hiperemia los hace lucir más graves de lo que son.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Vagina", "Estrógenos", "Periné"],
	},
	{
		id: "schultze-vs-duncan-alumbramiento",
		rank: 193,
		title: "Alumbramiento: Schultze más limpio, Duncan más sangrante",
		insight:
			"Schultze (~80%): la placenta se desprende desde el centro, el hematoma queda detrás y la placenta sale con cara fetal lisa por delante. Mínima hemorragia visible. Duncan: se desprende desde un borde, la sangre fluye continuamente y la placenta sale con cara materna primero. Más sangrado visible.",
		whyNonObvious:
			"No es 'malo' o 'bueno': sólo informa sobre la dirección del desprendimiento — lo grave es la cuantía total, no el orden.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO PPH 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Alumbramiento", "Schultze", "Duncan"],
	},
	{
		id: "desgarro-grado-ii-vs-iii",
		rank: 194,
		title: "Desgarro II vs III: cualquier fibra del esfínter externo cuenta",
		insight:
			"Desgarro II grado: piel, tejido subcutáneo y musculatura perineal (transverso, bulboesponjoso), sin afectar esfínter anal. Desgarro III: incluye fibras del esfínter anal externo. Subclasificación Sultan: IIIa <50%, IIIb >50%, IIIc además esfínter anal interno.",
		whyNonObvious:
			"Un desgarro III no diagnosticado se suele detectar meses después por incontinencia: el tacto rectal post-sutura es la única forma fiable de no pasarlo por alto.",
		audience: "Parteras y obstétricas",
		sourceNote: "RCOG OASIS 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Desgarro", "OASIS", "Reparación"],
	},
	{
		id: "perine-rigido-caput-succedaneum",
		rank: 195,
		title: "Periné rígido: caput succedaneum y bolsa serosanguinolenta",
		insight:
			"Un periné rígido (nuliparas, cicatrices) resiste el descenso, la cabeza es presionada contra el suelo pélvico. Se comprimen venas y linfáticos del cuero cabelludo en la línea guía, aparece edema serosanguinolento — el caput succedaneum. Atraviesa suturas y se reabsorbe en pocos días.",
		whyNonObvious:
			"Si el caput aparece muy temprano y crece rápido, es indicador de obstrucción y no de progresión normal del parto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Caput", "Periné", "Obstrucción"],
	},
	{
		id: "distantia-spinarum-25-26cm",
		rank: 196,
		title: "Distantia spinarum: 25-26 cm normal",
		insight:
			"La distantia spinarum es la medida externa entre las espinas ilíacas anterosuperiores con pelvímetro. Valor normal en mujer adulta: 25-26 cm.",
		whyNonObvious:
			"Pequeños desvíos no significan poco — combinada con distantia cristarum y trochanterica permite estimar el tipo de pelvis sin imagen.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG pelvimetría 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Pelvimetría", "Distancias"],
	},
	{
		id: "bartolino-secrecion-embarazo",
		rank: 197,
		title: "Glándulas de Bartolino: lubricación reforzada en parto",
		insight:
			"Las glándulas de Bartolino están en el tercio posterior de los labios mayores. Bajo la influencia hormonal del embarazo secretan más fluido mucoide alcalino al vestíbulo. Protegen el introito del roce intenso durante el expulsivo.",
		whyNonObvious:
			"Una bartholinitis obstructiva en el embarazo puede dolorificar el expulsivo: vigilarla en la consulta preparto.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG vulva 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Bartolino", "Lubricación", "Vulva"],
	},
	{
		id: "coxis-anquilosado-detencion",
		rank: 198,
		title: "Coxis anquilosado: bloqueo al final del descenso",
		insight:
			"En condiciones normales el coxis se retropulsiona 1,5-2 cm gracias a la amfiartrosis sacrococcígea, abriendo la salida sagital. Si está anquilosado por trauma antiguo o fractura silente, no se desplaza: la salida no se amplía y aparece detención al final del expulsivo o fractura intraparto del coxis.",
		whyNonObvious:
			"Una historia de 'caída al hielo en la infancia' rara vez se asocia a este problema, pero puede explicar detenciones inexplicadas en el plano de salida.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG pelvimetría 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Coxis", "Salida pélvica", "Mecánica"],
	},
	{
		id: "arterias-espirales-baja-presion-intervelloso",
		rank: 199,
		title: "Espirales abren al intervelloso a 10-15 mmHg",
		insight:
			"100-150 arterias espirales remodeladas vacían directamente en el espacio intervelloso. Sin pared muscular, la presión cae de ~100 mmHg en arterias uterinas a sólo 10-15 mmHg en el espacio intervelloso. Esta baja presión es esencial para flujo laminar que envuelve las vellosidades sin destruirlas.",
		whyNonObvious:
			"Hipertensión materna grave puede aumentar la presión intervellosa lo suficiente para dañar mecánicamente las vellosidades y precipitar desprendimientos.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Arterias espirales", "Hipertensión", "Placenta"],
	},
	{
		id: "tapon-mucoso-cervical-kristeller",
		rank: 200,
		title: "Tapón mucoso cervical: barrera mecánica e inmune",
		insight:
			"Bajo dominio de progesterona, las criptas cervicales secretan moco hiperviscoso y rico en mucinas que forma el tapón de Kristeller. Bloquea mecánicamente la ascensión bacteriana y contiene inmunoglobulinas, lisozimas y péptidos antimicrobianos. Se expulsa cuando empieza el borramiento cervical: el 'tapón mucoso sangrante'.",
		whyNonObvious:
			"Su salida no significa parto inmediato: puede preceder al parto horas o días. Es señal de cambio cervical, no de trabajo activo.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Tapón mucoso", "Cuello uterino", "Inicio parto"],
	},
];

export const allFacts2 = [...facts2, ...facts2Block6to10];
