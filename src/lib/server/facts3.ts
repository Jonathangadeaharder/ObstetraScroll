import type { Fact } from "$lib/types";

// Lote 3: 100 reels más sobre embarazo normal y control prenatal.
// Basado en banco alemán de preguntas para certificación de parteras
// (DGGG/SGGG/ÖGGG/OMS).
export const facts3: Fact[] = [
	{
		id: "ssl-fechado-1trimestre",
		rank: 201,
		title: "Longitud céfalocaudal (LCC): el patrón oro para fechar",
		insight:
			"Entre LCC 45 y 84 mm (semanas 11+0 a 13+6) la variabilidad biológica es mínima y la datación es la más precisa de todo el embarazo. Datar más temprano o tarde introduce error progresivo.",
		whyNonObvious:
			"Datar por ecografía del 2º trimestre puede errar 7-10 días: la del 1er trimestre con LCC entre 45-84 mm sigue siendo el patrón oro.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG dating 2024; DGGG 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Datación", "1er trimestre", "Ecografía"],
	},
	{
		id: "tsh-bajo-1trimestre-hcg",
		rank: 202,
		title: "TSH bajo en 1er trimestre: cross-reactividad de hCG",
		insight:
			"La subunidad alfa de hCG es homóloga a TSH. En pico de hCG (semanas 9-12) cruza el receptor tiroideo materno, sube T3/T4 y por feedback baja TSH. Es hipertiroidismo gestacional transitorio fisiológico.",
		whyNonObvious:
			"TSH 0,1 en semana 10 no es enfermedad: tratar con tiamazol puede dañar al feto.",
		audience: "Parteras y obstétricas",
		sourceNote: "ATA pregnancy thyroid 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Tiroides", "hCG", "1er trimestre"],
	},
	{
		id: "gdm-screening-24-28-semanas",
		rank: 203,
		title: "Screening de diabetes gestacional: 24-28 semanas",
		insight:
			"Entre las semanas 24-28 la resistencia insulínica gestacional alcanza nivel clínicamente relevante. La curva 75g (1h, 2h) detecta GDM con sensibilidad óptima en esa ventana.",
		whyNonObvious:
			"Antes de la semana 24 muchas mujeres dan falso negativo: la resistencia aún no llegó al pico.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG GDM 2024; OMS",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["GDM", "Screening", "Embarazo"],
	},
	{
		id: "gdm-criterio-ayunas-92",
		rank: 204,
		title: "Corte de glucosa en ayunas: 92 mg/dl es GDM",
		insight:
			"Según IADPSG/OMS, una glucemia en ayunas ≥92 mg/dl (5,1 mmol/l) ya es criterio diagnóstico de GDM en la 75g-oGTT. Cortes a 1h: ≥180; 2h: ≥153 mg/dl.",
		whyNonObvious:
			"El umbral materno 92 está por debajo del corte diabético del adulto: tratar parece exagerado pero reduce macrosomía y distocia de hombros.",
		audience: "Parteras y obstétricas",
		sourceNote: "IADPSG 2024; DGGG GDM",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["GDM", "Glucemia", "Diagnóstico"],
	},
	{
		id: "rh-anti-d-300mcg-28sem",
		rank: 205,
		title: "Anti-D 300 μg IM en semana 28 a toda Rh-negativa con feto Rh+",
		insight:
			"Toda embarazada Rh-negativa con feto Rh+ (o desconocido) recibe 300 μg (1500 UI) IM en semana 28-30. Bloquea sensibilización por microtransfusiones del 3er trimestre. Dosis adicional dentro de 72h postparto si el neonato es Rh+.",
		whyNonObvious:
			"La oral o titulación semanal no la sustituyen: la dosis IM única en semana 28 sigue siendo el estándar mundial.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG anti-D 2024; ACOG 192",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Anti-D", "Rh", "Profilaxis"],
	},
	{
		id: "doppler-uterina-2trimestre",
		rank: 206,
		title: "Doppler uterino 2º trimestre: predicción de preeclampsia/RCIU",
		insight:
			"En semana 20-24 el Doppler de arteria uterina mide PI y notch protodiastólico. PI alto o notch bilateral persistente indica fallo en remodelación trofoblástica y predice preeclampsia precoz e RCIU placentaria.",
		whyNonObvious:
			"No descarta vasa previa ni acretismo — esos son ecografía estructural, no Doppler de uterina.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Doppler", "Preeclampsia", "Screening"],
	},
	{
		id: "doppler-acm-anemia-fetal",
		rank: 207,
		title: "Anemia fetal: medir velocidad sistólica de ACM",
		insight:
			"Ante sospecha de anemia fetal (Parvovirus B19, incompatibilidad Rh) la velocidad sistólica máxima en arteria cerebral media (Vmax) correlaciona con el grado de anemia. Vmax >1,5 MoM indica anemia moderada-grave que requiere cordocentesis o transfusión intrauterina.",
		whyNonObvious:
			"La arteria umbilical no sirve para anemia fetal: refleja resistencia placentaria, no anemia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Mari NEJM 2000; ISUOG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Anemia fetal", "Doppler", "ACM"],
	},
	{
		id: "gbs-screening-36-37",
		rank: 208,
		title: "Streptococcus grupo B: hisopado recto-vaginal en 36-37 semanas",
		insight:
			"El screening de GBS por hisopado recto-vaginal se hace en semanas 36+0 a 37+6, ventana de máxima sensibilidad para predecir colonización en el momento del parto. Positivo → profilaxis intraparto con penicilina.",
		whyNonObvious:
			"Hacerlo en semana 32 da falso negativo en parto a término; antes de semana 36 la flora todavía cambia.",
		audience: "Parteras y obstétricas",
		sourceNote: "CDC GBS 2024; DGGG",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["GBS", "Screening", "Sepsis neonatal"],
	},
	{
		id: "hiperpigmentacion-msh-estrogenos",
		rank: 209,
		title: "Linea nigra y cloasma: estrógenos + MSH placentario",
		insight:
			"La hiperpigmentación gestacional (linea nigra abdominal, cloasma facial, vulva) se debe a estímulo combinado de estrógenos y MSH (hormona estimulante de melanocitos) placentario sobre los melanocitos predispuestos.",
		whyNonObvious:
			"Protector solar reduce el cloasma — la luz UV es el cofactor que activa la pigmentación inducida hormonalmente.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG dermatología gestacional",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Piel", "MSH", "Cloasma"],
	},
	{
		id: "leopold-3-pawlik-cabeza",
		rank: 210,
		title: "3ª maniobra de Leopold (Pawlik): qué presenta sobre sínfisis",
		insight:
			"La 3ª maniobra de Leopold (de Pawlik) palpa con una mano la parte que se presenta sobre la sínfisis. Bola dura redonda = cabeza. Bola más blanda e irregular = nalgas. Define presentación cefálica vs podálica.",
		whyNonObvious:
			"Si en la 3ª maniobra la cabeza está aún 'ballotando' (libre) cerca del término, sospechar desproporción o cabeza no encajada.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Leopold", "Tacto externo", "Presentación"],
	},
	{
		id: "ganancia-peso-400-500-semana",
		rank: 211,
		title: "Ganancia 400-500 g/semana en 2º y 3er trimestre",
		insight:
			"En mujer con IMC normal (18,5-24,9) la ganancia semanal en 2º y 3er trimestre fisiológica es 400-500 g. Total típico 11-16 kg en todo el embarazo.",
		whyNonObvious:
			"Ganar más de 700 g/semana no es 'bebé grande': suele ser retención de líquido — pista temprana de preeclampsia.",
		audience: "Parteras y obstétricas",
		sourceNote: "IOM weight gain 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Peso", "Nutrición", "Embarazo"],
	},
	{
		id: "folato-preconcepcional-28dias",
		rank: 212,
		title: "Folato 400 μg/día: empezar antes de concebir",
		insight:
			"El tubo neural cierra hacia el día 28 post-concepción, muchas veces antes de que se confirme el embarazo. Por eso 400 μg/día de ácido fólico se inician 3 meses antes de buscar embarazo.",
		whyNonObvious:
			"Iniciarlo al diagnóstico de embarazo (semana 5-6) llega tarde para el tubo neural — sólo previene defectos posteriores.",
		audience: "Mujeres en edad fértil; parteras de consulta",
		sourceNote: "OMS folato 2024; CDC",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Folato", "Pre-concepcional", "Tubo neural"],
	},
	{
		id: "papp-a-screening-1trimestre",
		rank: 213,
		title: "PAPP-A bajo: aneuploidías + insuficiencia placentaria",
		insight:
			"PAPP-A (proteína A asociada al embarazo) baja en 1er trimestre se asocia a trisomía 21 y a futuro fallo placentario (preeclampsia, RCIU). Junto con β-hCG libre forma el screening bioquímico del 1er trimestre.",
		whyNonObvious:
			"Un PAPP-A <0,4 MoM, aun con cromosomas normales, justifica vigilar crecimiento fetal y aspirina profiláctica.",
		audience: "Parteras y obstétricas",
		sourceNote: "FMF 1st trimester 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["PAPP-A", "Aneuploidía", "Placenta"],
	},
	{
		id: "translucencia-nucal-3-5mm",
		rank: 214,
		title: "Translucencia nucal >3,5 mm: cardiopatía y trisomía 21",
		insight:
			"En 11-13 semanas la translucencia nucal >3,0-3,5 mm es marcador potente de cardiopatías congénitas y trisomía 21 (también 18, 13). Indica ecocardiograma fetal detallado + estudio genético.",
		whyNonObvious:
			"Incluso con cariotipo normal, una NT alta deja un riesgo cardíaco residual relevante — no se descarta sólo con NIPT.",
		audience: "Parteras y obstétricas",
		sourceNote: "FMF NT 2024; ISUOG 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["NT", "Cardiopatías", "Aneuploidía"],
	},
	{
		id: "plasma-expansion-40-50",
		rank: 215,
		title: "Plasma materno crece 40-50% al término",
		insight:
			"El plasma materno se expande 40-50% al término de un embarazo único, para perfundir el útero y amortiguar la pérdida sanguínea del parto. Los eritrocitos crecen menos (20-30%), por eso baja Hb fisiológicamente.",
		whyNonObvious:
			"Por eso un Hb 10 en semana 28 no significa anemia: la dilución es fisiológica si no hay déficit de hierro.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Volemia", "Anemia", "Embarazo"],
	},
	{
		id: "leucocitos-15000-fisiologica",
		rank: 216,
		title: "Leucocitos 15.000/μl: normal en embarazo y parto",
		insight:
			"Un leve aumento fisiológico de leucocitos (sobre todo neutrófilos) hasta ~15.000/μl en embarazo y hasta 25.000/μl en trabajo de parto es normal. No basta por sí solo para diagnosticar infección.",
		whyNonObvious:
			"Tratar antibiótico por leucocitosis aislada lleva a sobretratamiento masivo en sala de parto.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG intrapartum fever 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Leucocitos", "Infección", "Embarazo"],
	},
	{
		id: "hidronefrosis-gestacional-progesterona",
		rank: 217,
		title: "Dilatación de vía urinaria: progesterona relaja músculo liso",
		insight:
			"Progesterona relaja el músculo liso de la vía urinaria, dilatando pelvis renal y uréteres (más marcado derecho por compresión del útero). Aumenta capacidad pero también éstasis: mayor riesgo de IVU y pielonefritis.",
		whyNonObvious:
			"Pielonefritis en embarazo no es rara: una bacteriuria asintomática debe tratarse SIEMPRE, no observar.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG IVU embarazo 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["IVU", "Bacteriuria", "Riñón"],
	},
	{
		id: "perfil-biofisico-cuatro-parametros",
		rank: 218,
		title: "Perfil biofísico fetal: 4 parámetros ecográficos",
		insight:
			"El perfil biofísico (BPP) evalúa por ecografía: movimientos respiratorios fetales, movimientos corporales, tono y volumen de líquido amniótico. A menudo con CTG suma 5 parámetros (BPP modificado).",
		whyNonObvious:
			"BPP bajo (<6/10) en término indica acidosis fetal incipiente — no es solo 'el bebé estaba dormido'.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG BPP 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["BPP", "Bienestar fetal", "Ecografía"],
	},
	{
		id: "hb-anemia-2trimestre-105",
		rank: 219,
		title: "Anemia 2º trimestre: Hb <10,5 g/dl",
		insight:
			"OMS: anemia gestacional con Hb <11,0 g/dl en 1º y 3er trimestre, y <10,5 g/dl en 2º trimestre (dado el pico de hemodilución). Por debajo de ese corte sí se trata, casi siempre por déficit de hierro.",
		whyNonObvious:
			"Tratar dilución fisiológica con hierro IV es sobretratar; verificar ferritina y reservas antes de transfundir.",
		audience: "Parteras y obstétricas",
		sourceNote: "OMS anemia gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Anemia", "Hierro", "Hemoglobina"],
	},
	{
		id: "glucosuria-fisiologica-gfr",
		rank: 220,
		title: "Glucosuria fisiológica: GFR alta baja el umbral renal",
		insight:
			"La GFR aumenta ~50% y el túbulo proximal no logra reabsorber toda la glucosa filtrada. Aparece glucosuria con glucemia normal. Es fisiológica y no diagnostica diabetes.",
		whyNonObvious:
			"Buscar GDM por glucosuria es de baja sensibilidad: la 75g-oGTT en 24-28 semanas sigue siendo la única forma fiable.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG GDM 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Glucosuria", "Función renal", "GDM"],
	},
	{
		id: "ctg-variabilidad-5-25",
		rank: 221,
		title: "Variabilidad CTG 5-25 lpm: ondulatorio y reactivo",
		insight:
			"Variabilidad fetal entre 5 y 25 lpm es ondulatorio y refleja sistema nervioso autónomo intacto. <5 lpm (silente) puede indicar sueño o hipoxia; >25 lpm (saltatorio) puede indicar estrés.",
		whyNonObvious:
			"Silente >40 minutos rompe la regla del 'sueño fetal' — debe alarmar.",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["CTG", "Variabilidad", "Bienestar fetal"],
	},
	{
		id: "ctg-aceleracion-15bpm-15s",
		rank: 222,
		title: "Aceleración CTG: ≥15 lpm por ≥15 segundos",
		insight:
			"Una aceleración del CTG fetal se define como ascenso de ≥15 lpm sobre la basal durante ≥15 segundos. Indica vitalidad fetal y sistema autónomo competente. Su presencia tras movimientos es signo de feto reactivo.",
		whyNonObvious:
			"Ausencia de aceleraciones >40 min: indica que probablemente no es sueño y obliga a investigar.",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["CTG", "Aceleraciones", "Bienestar fetal"],
	},
	{
		id: "imc-30-riesgo-gdm-hta",
		rank: 223,
		title: "IMC pregestacional ≥30: alto riesgo obstétrico",
		insight:
			"IMC ≥30 kg/m² es obesidad pregestacional. Triplica riesgo de preeclampsia, duplica el de GDM, multiplica macrosomía y cesárea. Indica controles más estrictos y plan de aspirina profiláctica si suma otro factor.",
		whyNonObvious:
			"El consejo de bajar peso en embarazo es ineficaz; el momento clave es pre-concepcional.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG obesity 2024; DGGG",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Obesidad", "GDM", "Preeclampsia"],
	},
	{
		id: "bacteriuria-asintomatica-screening",
		rank: 224,
		title: "Bacteriuria asintomática: screening + tratamiento siempre",
		insight:
			"En la primera consulta del embarazo se hace urocultivo o stick con nitritos+leucocitos. Bacteriuria asintomática sin tratar progresa a pielonefritis hasta en 30%. Tratar siempre, no observar.",
		whyNonObvious:
			"Por eso a la embarazada no se le aplica 'no tratar bacteriuria asintomática' del adulto general — es la única excepción.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG IVU embarazo 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["IVU", "Bacteriuria", "Pielonefritis"],
	},
	{
		id: "cervix-25mm-screening-prematuro",
		rank: 225,
		title: "Cuello <25 mm antes de 24 sem: riesgo de prematuridad",
		insight:
			"Cuello uterino transvaginal <25 mm antes de la semana 24 multiplica el riesgo de parto pretérmino. Indica considerar progesterona vaginal (200 mg/día) y, en casos seleccionados, pesario o cerclaje.",
		whyNonObvious:
			"Una sola medición acortada en mujer con antecedente de parto pretérmino justifica intervención inmediata, no segunda medición.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG preterm 2024; SMFM",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Cuello uterino", "Prematuridad", "Progesterona"],
	},
	{
		id: "afi-cuatro-cuadrantes",
		rank: 226,
		title: "AFI: suma de profundidades en 4 cuadrantes",
		insight:
			"El índice de líquido amniótico (AFI) suma las profundidades verticales del bolsillo más grande en cada cuadrante uterino. Normal 8-18 cm. <5 cm = oligohidramnios; >25 cm = polihidramnios.",
		whyNonObvious:
			"En embarazos múltiples y obesidad la medida única del bolsillo más grande (DVP) es más fiable que el AFI.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG amniotic fluid 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["AFI", "Líquido amniótico", "Ecografía"],
	},
	{
		id: "oligohidramnios-dvp-2cm",
		rank: 227,
		title: "Oligohidramnios: bolsillo <2 cm en 3er trimestre",
		insight:
			"DVP (bolsillo vertical más profundo) <2 cm o AFI <5 cm define oligohidramnios. Sugiere anomalía renal fetal o insuficiencia placentaria crónica (menos diuresis). En término, suele indicar finalización.",
		whyNonObvious:
			"En término, oligohidramnios incluso aislado se considera indicación de inducción — no es sólo 'el bebé está apretado'.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG amniotic fluid 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Oligohidramnios", "Insuficiencia placentaria"],
	},
	{
		id: "hta-gestacional-140-90",
		rank: 228,
		title: "HTA gestacional: ≥140/90 en 2 mediciones",
		insight:
			"Hipertensión gestacional: PA sistólica ≥140 y/o diastólica ≥90 mmHg en dos mediciones separadas. Aparece tras semana 20 sin proteinuria (a diferencia de preeclampsia, que sí la requiere).",
		whyNonObvious:
			"Una toma 142/88 'aislada' no es benigna: confirmar en 4 horas y monitorizar — un tercio progresan a preeclampsia.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISSHP 2024; DGGG HTA",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HTA", "Preeclampsia", "PA"],
	},
	{
		id: "nipt-cffdna-99-trisomy",
		rank: 229,
		title: "NIPT: >99% detección trisomía 21, sin riesgo",
		insight:
			"El test prenatal no invasivo analiza ADN libre fetal en sangre materna desde semana 10. Detecta trisomía 21 con >99% de sensibilidad y especificidad. Sin riesgo de aborto. Confirmación invasiva (CVS/amnio) si positivo.",
		whyNonObvious:
			"NIPT no es diagnóstico — es screening. Un positivo no autoriza interrupción sin amniocentesis.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG NIPT 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["NIPT", "cfDNA", "Aneuploidía"],
	},
	{
		id: "leopold-4-divergente-encajado",
		rank: 230,
		title: "4ª Leopold divergente: cabeza encajada",
		insight:
			"En la 4ª maniobra de Leopold (a la espalda de la mujer, presionando hacia abajo), si los dedos divergen al avanzar a la sínfisis la mayor circunferencia ya cruzó el estrecho superior — cabeza encajada. Si convergen aún no.",
		whyNonObvious:
			"Una cabeza no encajada en nulípara después de la semana 38 obliga a investigar desproporción.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Leopold", "Encaje", "Tacto externo"],
	},
	{
		id: "sindrome-vena-cava-lateral-izquierdo",
		rank: 231,
		title: "Decúbito lateral izquierdo: profilaxis de vena cava",
		insight:
			"Desde la semana 20 evitar el decúbito supino. Lateralizar a la izquierda (o cuña bajo cadera derecha) desplaza el útero de la vena cava. Mantiene retorno venoso, gasto cardíaco y perfusión placentaria.",
		whyNonObvious:
			"En CTG con bradicardia inexplicada, lateralizar a izquierda suele resolver en segundos — siempre primer paso.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vena cava", "Posicionamiento", "Bradicardia"],
	},
	{
		id: "vitamina-d-suplementacion-800",
		rank: 232,
		title: "Vitamina D3 600-800 UI/día en embarazo",
		insight:
			"Suplementación de vitamina D3 600-800 UI/día (o más en deficiencia confirmada) asegura absorción cálcica materna y mineralización ósea fetal. Reduce raquitismo neonatal y tetania.",
		whyNonObvious:
			"En invierno o piel oscura, 800 UI puede ser insuficiente: medir 25-OH-vitamina D si hay factores de riesgo.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGE vitamina D 2024; OMS",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Vitamina D", "Suplementación"],
	},
	{
		id: "altura-uterina-sfa-semanas",
		rank: 233,
		title: "Altura uterina (cm) ≈ semanas entre 20-34",
		insight:
			"La altura uterina (sínfisis al fondo uterino con cinta) entre semanas 20 y 34 en cm es aproximadamente igual a la edad gestacional ±2 cm. Cribado sencillo de RCIU y macrosomía.",
		whyNonObvious:
			"Sólo dos mediciones consecutivas que se desvíen >2 cm justifican ecografía — una sola no.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO antenatal care 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Altura uterina", "RCIU", "Screening"],
	},
	{
		id: "ctg-bradicardia-110-10min",
		rank: 234,
		title: "Bradicardia fetal: <110 lpm por >10 minutos",
		insight:
			"FIGO: bradicardia fetal es basal <110 lpm durante >10 min. Sospechar hipoxia aguda, compresión de cordón, hipotensión materna o desprendimiento. Maniobras inmediatas: lateralizar, oxígeno, suspender oxitocina, evaluar finalización.",
		whyNonObvious:
			"Bradicardia <80 lpm sin recuperación en 5 min ya exige cesárea de emergencia (no esperar 10 min).",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Bradicardia", "CTG", "Emergencia"],
	},
	{
		id: "toxoplasmosis-gato-carne-cruda",
		rank: 235,
		title: "Toxoplasmosis: heces de gato y carne mal cocida",
		insight:
			"Toxoplasma gondii se transmite por heces de gato, carne cruda o mal cocida, frutas/verduras mal lavadas. Embarazada seronegativa debe evitarlos. Primoinfección en embarazo: riesgo de hidrocefalia, calcificaciones intracraneales, coriorretinitis.",
		whyNonObvious:
			"Gato doméstico de interior sin cazar es bajo riesgo; el riesgo real está en areneros, jardinería y carne cruda.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG TORCH 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Toxoplasmosis", "TORCH", "Prevención"],
	},
	{
		id: "hellp-dolor-epigastrico",
		rank: 236,
		title: "HELLP: dolor epigástrico es alarma, no gastritis",
		insight:
			"HELLP (Hemólisis, enzimas hepáticas elevadas, plaquetopenia) variante grave de preeclampsia. El dolor en hipocondrio derecho/epigastrio se debe a distensión de cápsula hepática por microinfartos. Mortalidad materna 1-25%. Finalizar embarazo.",
		whyNonObvious:
			"Dolor epigástrico en embarazada con HTA NO es gastritis — pedir labs (plaquetas, transaminasas, LDH) urgente.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISSHP HELLP 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HELLP", "Preeclampsia", "Emergencia"],
	},
	{
		id: "vitamina-a-teratogena",
		rank: 237,
		title: "Vitamina A en altas dosis: teratógena",
		insight:
			"Retinol >10.000 UI/día puede causar malformaciones craneofaciales y cardíacas. Por eso multivitamínicos prenatales usan beta-caroteno (precursor) no retinol directo. Evitar suplementos de hígado animal.",
		whyNonObvious:
			"Crema con retinoides también: se absorbe poco pero contraindicada por precaución.",
		audience: "Mujeres en edad fértil; parteras",
		sourceNote: "OMS retinol embarazo 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vitamina A", "Teratógenos", "Suplementos"],
	},
	{
		id: "abdomen-fetal-rciu-asimetrico",
		rank: 238,
		title: "Circunferencia abdominal: marcador clave de RCIU asimétrica",
		insight:
			"En insuficiencia placentaria el feto redirige sangre a cerebro y corazón (brain-sparing) sacrificando hígado y músculo: circunferencia abdominal se estanca antes que perímetro cefálico. Patrón asimétrico clásico.",
		whyNonObvious:
			"Una caída de percentil de CA entre dos ecografías es más sensible que un solo valor bajo.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG RCIU 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["RCIU", "Brain-sparing", "Ecografía"],
	},
	{
		id: "insulina-pancreas-2x-3x",
		rank: 239,
		title: "Páncreas materno secreta 2-3× más insulina al término",
		insight:
			"Para compensar la resistencia insulínica inducida por hPL, progesterona y cortisol placentarios, el páncreas materno hipersecreta 2-3× más insulina al término. Si la reserva pancreática es limitada, aparece GDM.",
		whyNonObvious:
			"GDM no es un fallo nuevo: es la capacidad pancreática previa la que se rompe — predice DM2 futura en la madre.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG GDM 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Insulina", "Páncreas", "GDM"],
	},
	{
		id: "tdap-tos-ferina-28-semanas",
		rank: 240,
		title: "Vacuna Tdap (tos ferina) en 3er trimestre",
		insight:
			"STIKO/OMS: toda embarazada recibe Tdap entre semanas 28-36, independiente del estado vacunal previo. Permite paso transplacentario de IgG anti-pertussis y protege al lactante de tos ferina grave los primeros meses.",
		whyNonObvious:
			"Vacunar a la madre protege al bebé mejor que vacunar al entorno familiar (cocooning): es transferencia activa pasiva.",
		audience: "Mujeres embarazadas; parteras",
		sourceNote: "STIKO 2024; CDC",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vacunas", "Pertussis", "Lactante"],
	},
	{
		id: "occipucio-anterior-fontanela-menor",
		rank: 241,
		title: "Occipital anterior: fontanela menor por delante",
		insight:
			"En presentación occipital anterior (la más favorable), al tacto vaginal la fontanela menor (triangular, suturas lambdoidea + sagital) se palpa por delante (hacia la sínfisis), sincíticamente. Es la guía del trabajo de parto óptimo.",
		whyNonObvious:
			"Si se palpa la fontanela mayor (rombo, 4 suturas), el feto está deflexionado y la mecánica cambia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Occipital anterior", "Tacto", "Fontanela"],
	},
	{
		id: "hla-g-tolerancia-fetal",
		rank: 242,
		title: "HLA-G: cómo el trofoblasto evita ser atacado",
		insight:
			"El trofoblasto invasor no expresa HLA clásicos (sería visto como aloantígeno). Expresa HLA-G no clásico que inhibe a las NK uterinas y desactiva su citotoxicidad. Es la pieza clave de la tolerancia inmune materna-fetal.",
		whyNonObvious:
			"Por eso embarazo no es inmunosupresión sistémica — la madre puede combatir infecciones; sólo el trofoblasto es 'invisible'.",
		audience: "Parteras y obstétricas",
		sourceNote: "Annu Rev Immunol 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Inmunología", "HLA-G", "Tolerancia"],
	},
	{
		id: "ctg-rutina-no-mejora-resultados",
		rank: 243,
		title: "CTG de rutina antes de término: sin beneficio comprobado",
		insight:
			"En embarazo de bajo riesgo, el CTG semanal de rutina antes del término NO baja mortalidad perinatal y SÍ aumenta cesárea. Se reserva para indicaciones específicas o desde semana 40+0.",
		whyNonObvious:
			"Hacer CTG 'tranquilizador' rutinario aumenta falsos positivos, intervenciones y ansiedad sin beneficio para mujer ni feto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Cochrane antepartum CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["CTG", "Sobreintervención", "Evidencia"],
	},
	{
		id: "anomalia-presentacion-deflexion",
		rank: 244,
		title: "Anomalía de presentación: deflexión y asinclitismo",
		insight:
			"Anomalía de presentación es relación irregular entre cabeza fetal y pelvis al inicio del parto. Incluye deflexiones (bregma, frente, cara) y asinclitismos. Dificultan o impiden la mecánica del parto.",
		whyNonObvious:
			"Frente persistente = cesárea casi obligada; bregma muchas veces progresa por sí mismo.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG mecánica parto 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Presentación", "Distocia"],
	},
	{
		id: "hipomoclion-suboccipital-sinfisis",
		rank: 245,
		title: "Hipomoclion en occipital anterior: nuca contra sínfisis",
		insight:
			"En occipital anterior el hipomoclion es la región suboccipital del feto. Se apoya bajo la sínfisis y permite la deflexión final que extruye la cabeza sobre el periné en el expulsivo.",
		whyNonObvious:
			"Pujar antes de que la nuca encuentre la sínfisis es ineficaz y agotador — confiar en el reflejo de Ferguson.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Hipomoclion", "Expulsivo", "Mecánica"],
	},
	{
		id: "yodo-150mcg-suplemento",
		rank: 246,
		title: "Yodo: 150 μg/día suplemento (total ~230 μg/día)",
		insight:
			"OMS: total 230 μg/día en embarazo. Suplemento típico 100-150 μg/día sobre dieta. Esencial para tiroides fetal desde semana 10-12, neurodesarrollo y prevención de bocio neonatal. Excepción: madre hipertiroidea grave.",
		whyNonObvious:
			"Déficit leve no produce bocio visible pero baja CI infantil 5-10 puntos — prevenirlo en silencio importa mucho.",
		audience: "Parteras y obstétricas",
		sourceNote: "OMS yodo gestacional 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Yodo", "Tiroides", "Neurodesarrollo"],
	},
	{
		id: "quickening-20-semanas",
		rank: 247,
		title: "Quickening: primeros movimientos percibidos hacia semana 20",
		insight:
			"El quickening son los primeros movimientos fetales percibidos conscientemente por la madre. En nulípara hacia semana 20; en multípara antes, hasta semana 16-18 (reconocen la sensación).",
		whyNonObvious:
			"Pérdida brusca de la sensación de movimientos fetales obliga a CTG urgente — no normalizar.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO antenatal 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Movimientos fetales", "Quickening"],
	},
	{
		id: "triple-test-obsolescencia",
		rank: 248,
		title: "Triple test (AFP/hCG/uE3): obsoleto frente a NIPT",
		insight:
			"El triple test mide AFP, hCG y estriol no conjugado en suero materno (2º trimestre) para risk de trisomía 21 y defectos del tubo neural. Falsos positivos altos. Hoy reemplazado por screening del 1er trimestre + NIPT.",
		whyNonObvious:
			"Saberlo importa: pacientes con resultados antiguos (años atrás) traen referencia obsoleta; explicar el cambio.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG screening 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Triple test", "Screening", "Histórico"],
	},
	{
		id: "gasto-cardiaco-30-50",
		rank: 249,
		title: "Gasto cardíaco: aumento del 30-50% al 3er trimestre",
		insight:
			"GC materno aumenta 30-50% al 3er trimestre por aumento de volumen sistólico y FC (10-15 lpm extra). Esto sostiene la perfusión uteroplacentaria y los órganos maternos sobrecargados (riñón, mamas).",
		whyNonObvious:
			"Por eso enfermedades cardíacas leves pre-embarazo descompensan en 3er trimestre — el corazón ya está al máximo.",
		audience: "Parteras y obstétricas",
		sourceNote: "ESC pregnancy heart 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Gasto cardíaco", "Cardiopatía", "Embarazo"],
	},
	{
		id: "proteinuria-300mg-criterio-pe",
		rank: 250,
		title: "Proteinuria significativa: ≥300 mg/24h o PCR ≥0,3",
		insight:
			"Para diagnóstico de preeclampsia se requiere proteinuria ≥300 mg en orina de 24h o cociente proteína/creatinina ≥0,3 mg/mg. Sin proteinuria pero con HTA gestacional + signos de daño orgánico, también se diagnostica preeclampsia.",
		whyNonObvious:
			"PE sin proteinuria existe — síntomas neurológicos, trombocitopenia o daño hepático también bastan para diagnóstico.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISSHP 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Proteinuria", "Preeclampsia", "Diagnóstico"],
	},
	{
		id: "suboccipitobregmatico-95cm",
		rank: 251,
		title: "Suboccipitobregmático 9,5 cm: diámetro óptimo",
		insight:
			"Con flexión máxima, el plano de paso es el suboccipitobregmático: 9,5 cm de diámetro, 32 cm de circunferencia — el más estrecho de la cabeza fetal. Es la base mecánica del parto vaginal eficiente.",
		whyNonObvious:
			"Cualquier deflexión convierte 9,5 cm en 11-13 cm — diferencia decisiva entre parto fluido y distocia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Diámetros", "Flexión", "Mecánica"],
	},
	{
		id: "brain-sparing-perfusion-redistribucion",
		rank: 252,
		title: "Brain-sparing: redistribución de flujo a cerebro fetal",
		insight:
			"En hipoxia crónica el feto vasodilata arteria cerebral media y vasoconstriñe periferia. Sigue creciendo el cerebro pero cae masa corporal — RCIU asimétrica. Doppler de ACM con resistencia baja confirma el fenómeno.",
		whyNonObvious:
			"Brain-sparing no es 'protector eterno' — cuando claudica (ductus venoso con onda a invertida) la finalización es urgente.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Brain-sparing", "Doppler", "RCIU"],
	},
	{
		id: "progesterona-bloquea-prolactina-mama",
		rank: 253,
		title: "Progesterona bloquea prolactina en mama hasta parto",
		insight:
			"Durante el embarazo la prolactina ya está elevada pero la progesterona placentaria bloquea sus receptores en las células mamarias. El calostro se forma pero no hay 'subida de leche'. Al expulsar la placenta, la progesterona cae y se libera la lactogénesis II.",
		whyNonObvious:
			"Retención placentaria es causa frecuente de subida de leche retrasada >72h: revisar restos antes de pensar en otras causas.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO breastfeeding 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Lactancia", "Progesterona", "Prolactina"],
	},
	{
		id: "ductus-venoso-a-wave-revertida",
		rank: 254,
		title: "Ductus venoso onda a revertida: hipoxia avanzada",
		insight:
			"En el Doppler del ductus venoso, una onda a (contracción auricular) revertida o ausente indica claudicación cardíaca fetal por hipoxia/acidosis avanzada. Es indicación de finalización urgente.",
		whyNonObvious:
			"Es señal más tardía que el brain-sparing — verla significa que la reserva fetal está agotada.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Ductus venoso", "Hipoxia fetal", "Finalización"],
	},
	{
		id: "hierro-30mg-embarazo-dge",
		rank: 255,
		title: "Hierro: 30 mg/día en embarazo (vs 15 mg fuera)",
		insight:
			"La DGE recomienda 30 mg de hierro/día en embarazo, el doble que fuera. Cubrir con dieta es difícil — suplementar suele ser necesario, ajustado por ferritina. Suplementación rutinaria sin medir ferritina sólo se sostiene si la prevalencia es alta.",
		whyNonObvious:
			"Hierro en exceso causa estreñimiento intenso y, a veces, daño hepático. Medir antes de dosificar alto.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGE 2024; OMS",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Hierro", "Anemia", "Suplementación"],
	},
	{
		id: "carus-curve-trayectoria",
		rank: 256,
		title: "Curva de Carus: el feto rota alrededor de la sínfisis",
		insight:
			"La curva de Carus es la línea-guía del canal del parto: recta caudal-dorsal hasta el suelo pélvico, luego se dobla ventral-craneal en el ángulo púbico. El feto describe un arco alrededor de la sínfisis.",
		whyNonObvious:
			"Posiciones verticales aprovechan la gravedad alineada con la curva — pujar acostada lucha contra la curva.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Curva Carus", "Posiciones", "Mecánica"],
	},
	{
		id: "nipt-positive-confirmacion-invasive",
		rank: 257,
		title: "NIPT positivo: confirmar con amniocentesis o CVS",
		insight:
			"NIPT es screening, no diagnóstico. Sensibilidad >99% pero hay falsos positivos (placenta confinada, gemelo evanescente, mosaicismos). Un resultado positivo debe confirmarse con CVS o amniocentesis antes de cualquier decisión.",
		whyNonObvious:
			"Interrumpir embarazo basándose sólo en NIPT positivo es error clínico y ético: siempre confirmar.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG NIPT 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["NIPT", "Confirmación", "Ética"],
	},
	{
		id: "placenta-previa-total-cesarea",
		rank: 258,
		title: "Placenta previa total: cesárea obligada",
		insight:
			"Placenta previa total = placenta cubre completamente el orificio cervical interno. Parto vaginal contraindicado por hemorragia masiva al borramiento. Cesárea electiva programada antes de inicio espontáneo.",
		whyNonObvious:
			"Hemorragia roja indolora en 2º-3er trimestre obliga a ecografía antes de tacto: tacto vaginal en previa total es catastrófico.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG placenta previa 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Placenta previa", "Hemorragia", "Cesárea"],
	},
	{
		id: "minute-ventilation-progesterona",
		rank: 259,
		title: "Volumen minuto sube 40% por progesterona",
		insight:
			"Progesterona reduce el umbral del centro respiratorio al CO2: la madre hiperventila, baja pCO2 (~30 mmHg), alcalosis respiratoria compensada. Favorece la salida de CO2 fetal por gradiente.",
		whyNonObvious:
			"pCO2 'normal' (40) en embarazo es ya hipoventilación — alarma respiratoria que se suele pasar por alto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Ventilación", "Alcalosis", "Embarazo"],
	},
	{
		id: "rpm-liquido-pH-test",
		rank: 260,
		title: "RPM: salida franca + pH alcalino + actim PROM",
		insight:
			"RPM (ruptura prematura de membranas) confirmada por: salida franca de líquido claro en espéculo, pH vaginal >6,5 (test de papel), o tests específicos (Actim PROM, AmniSure). Espéculo es la primera prueba; tacto sólo en parto activo.",
		whyNonObvious:
			"Tacto repetido en RPM antes de inicio de parto sube riesgo de corioamnionitis — limitar al mínimo.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG PROM 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["RPM", "Diagnóstico", "Espéculo"],
	},
	{
		id: "hipotiroidismo-1trimestre-fetal",
		rank: 261,
		title: "Hipotiroidismo materno 1er trimestre: daño neurológico fetal",
		insight:
			"En las primeras 10-12 semanas el feto no produce T4 propia: depende del paso de T4 materna. Hipotiroidismo materno no tratado causa déficit de migración neuronal y CI reducido permanente. Tratar siempre con levotiroxina con monitoreo de TSH.",
		whyNonObvious:
			"TSH >2,5 mUI/L en 1er trimestre ya justifica iniciar levotiroxina si hay anti-TPO positivos — no esperar TSH 5.",
		audience: "Parteras y obstétricas",
		sourceNote: "ATA pregnancy thyroid 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Hipotiroidismo", "Levotiroxina", "Neurodesarrollo"],
	},
	{
		id: "zeichnen-tapon-mucoso-borrado",
		rank: 262,
		title: "'Zeichnen': salida del tapón mucoso antes del parto",
		insight:
			"El borramiento cervical hace que el tapón mucoso de Kristeller pierda su soporte mecánico. Sale como flujo gelatinoso, a veces teñido de sangre. Indica cambios cervicales activos pero no necesariamente parto en minutos.",
		whyNonObvious:
			"El tapón puede salir días antes del parto: no es indicación de ingreso si no hay contracciones regulares.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Tapón mucoso", "Inicio parto", "Cuello"],
	},
	{
		id: "folato-alto-riesgo-4mg",
		rank: 263,
		title: "Folato 4-5 mg/día en mujeres con antecedente de NTD",
		insight:
			"Mujeres con embarazo previo afectado por defecto del tubo neural (espina bífida, anencefalia) o con tratamientos antiepilépticos toman folato a dosis alta 4-5 mg/día pre-concepcional. Reduce recurrencia ~70%.",
		whyNonObvious:
			"Iniciar 4 mg al confirmar embarazo es tarde — el tubo neural ya cerró. Pre-concepcional es la única ventana.",
		audience: "Mujeres en edad fértil; parteras",
		sourceNote: "CDC folate 2024; ACOG",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Folato", "NTD", "Recurrencia"],
	},
	{
		id: "indice-resistencia-vasos",
		rank: 264,
		title: "Índice de resistencia (RI): (S-D)/S",
		insight:
			"El RI Doppler = (velocidad sistólica máxima - diastólica mínima) / sistólica máxima. Mide la resistencia distal al vaso explorado. Útero alta resistencia normal fuera embarazo, baja al 2º trimestre con remodelación adecuada.",
		whyNonObvious:
			"No mide flujo absoluto — sólo perfil; útil para tendencias y comparativos, no como número aislado.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Doppler", "Índice resistencia", "Hemodinámica"],
	},
	{
		id: "post-termino-42-semanas",
		rank: 265,
		title: "Post-término: ≥42+0 (≥294 días)",
		insight:
			"Embarazo se considera post-término desde semana 42+0 (294 días). Aumenta el riesgo de macrosomía, oligohidramnios, meconio, distocia de hombros y muerte intrauterina. La mayoría de protocolos plantean inducción entre 41+0 y 41+5 para evitar llegar a 42+0.",
		whyNonObvious:
			"En 41 semanas la inducción reduce mortalidad fetal sin aumentar cesárea, contra la creencia previa.",
		audience: "Parteras y obstétricas",
		sourceNote: "Cochrane induction 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Post-término", "Inducción", "Mortalidad"],
	},
	{
		id: "asinclitismo-litzmann-promontorio",
		rank: 266,
		title: "Asinclitismo posterior (Litzmann): mal pronóstico",
		insight:
			"En asinclitismo posterior (Litzmann) la sutura sagital se desplaza hacia la sínfisis y el parietal posterior dirige el descenso. Suele atascarse en promontorio. Pronóstico geburtsmecánico desfavorable: indica falta de espacio.",
		whyNonObvious:
			"Litzmann mantenido tras posiciones maternas y oxitocina es indicación de cesárea — insistir lleva a sufrimiento fetal.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG distocia 2023",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Asinclitismo", "Litzmann", "Distocia"],
	},
	{
		id: "papp-a-bajo-aspirina-prevencion",
		rank: 267,
		title: "PAPP-A bajo en 1er trimestre: aspirina profiláctica",
		insight:
			"PAPP-A bajo (<0,4 MoM) en 1er trimestre indica disfunción trofoblástica temprana y riesgo elevado de preeclampsia precoz y RCIU. Aspirina 150 mg/noche desde semana 12-16 baja incidencia.",
		whyNonObvious:
			"Iniciar aspirina después de semana 16 ya no previene preeclampsia precoz — la ventana es estrecha.",
		audience: "Parteras y obstétricas",
		sourceNote: "ASPRE NEJM 2017; FIGO 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Aspirina", "PAPP-A", "Preeclampsia"],
	},
	{
		id: "sindrome-vena-cava-fetal-bradicardia",
		rank: 268,
		title:
			"Síndrome de vena cava puede manifestarse sólo como bradicardia fetal",
		insight:
			"A veces el síndrome de vena cava materno no da síncope ni hipotensión franca, sólo una caída sutil en la perfusión placentaria. La única señal puede ser bradicardia fetal súbita en CTG. Por eso: lateralizar antes de buscar causas exóticas.",
		whyNonObvious:
			"Antes de oxígeno, oxitocina o tocolíticos por bradicardia: cambiar de posición. Resuelve la mayoría.",
		audience: "Parteras, sala de partos",
		sourceNote: "WHO intrapartum 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Vena cava", "Bradicardia", "Posicionamiento"],
	},
	{
		id: "vagina-ph-3-8-4-5-protector",
		rank: 269,
		title: "pH vaginal 3,8-4,5: barrera contra ascensión bacteriana",
		insight:
			"En el embarazo los lactobacilos producen ácido láctico manteniendo pH 3,8-4,5 que inhibe crecimiento de GBS, Gardnerella y patógenos vaginales. Es la primera barrera contra corioamnionitis ascendente.",
		whyNonObvious:
			"Duchas vaginales y antibióticos sistémicos rompen el balance: no se prescriben en embarazo sin indicación clara.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG vaginosis 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["pH vaginal", "Lactobacilos", "Infección"],
	},
	{
		id: "lambda-sign-dicorial",
		rank: 270,
		title: "Lambda sign: embarazo gemelar dicoriónico",
		insight:
			"En el primer trimestre la presencia del 'lambda sign' (placenta engrosada en la base de la membrana inter-twin formando triángulo) confirma gemelar dicoriónico-diamniótico. T-sign con membrana fina indica monocoriónico.",
		whyNonObvious:
			"Dicoriónico tiene menos riesgo que monocoriónico — la identificación en 1er trimestre cambia todo el seguimiento.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG twins 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Gemelos", "Coriónico", "1er trimestre"],
	},
	{
		id: "liquido-fetal-orina-segunda-mitad",
		rank: 271,
		title: "Líquido amniótico 2ª mitad: principalmente orina fetal",
		insight:
			"En la 2ª mitad del embarazo el líquido amniótico es predominantemente orina fetal con aporte pulmonar. Refleja la diuresis fetal: oligohidramnios persistente en 3er trimestre sugiere falla renal fetal o insuficiencia placentaria.",
		whyNonObvious:
			"Ausencia total de líquido (anhidramnios) en 1er trimestre puede indicar agenesia renal — sospechar siempre.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG amniotic 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Líquido amniótico", "Riñón fetal", "Diuresis"],
	},
	{
		id: "antikorpersuche-irregular-aks",
		rank: 272,
		title: "Test de Coombs indirecto: detección de aloanticuerpos irregulares",
		insight:
			"El test de Coombs indirecto (Antikörpersuchtest, AKS) busca anticuerpos irregulares (anti-D, anti-Kell, anti-c, etc.) que cruzan placenta y pueden destruir eritrocitos fetales. Hacer en consulta inicial y semana 24-28.",
		whyNonObvious:
			"Anti-Kell es tan grave como anti-D: una madre anti-Kell+ con feto Kell+ puede tener anemia fetal severa.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG isoinmunización 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Aloanticuerpos", "Coombs", "Anemia fetal"],
	},
	{
		id: "cervix-15mm-progesterona",
		rank: 273,
		title: "Cuello 15 mm: progesterona vaginal indicada",
		insight:
			"En 2º trimestre, cuello ≤15 mm en asintomática indica alto riesgo de parto pretérmino. Progesterona vaginal 200 mg/día reduce parto pretérmino <34 semanas en 25-40%. En casos seleccionados también pesario o cerclaje.",
		whyNonObvious:
			"El tratamiento es inmediato — no se repite la medición a la espera: el riesgo es real ya.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG preterm 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Cuello corto", "Progesterona", "Prematuro"],
	},
	{
		id: "bishop-score-induccion",
		rank: 274,
		title: "Score de Bishop ≥8: inducción con alta probabilidad de éxito",
		insight:
			"El score de Bishop puntúa 5 factores cervicales (consistencia, posición, borramiento, dilatación, altura presentación). Bishop ≥8 indica cuello favorable; éxito de inducción cercano a parto espontáneo. <6 sugiere madurar cuello primero (prostaglandinas, balón).",
		whyNonObvious:
			"Inducir con Bishop bajo sin madurar antes aumenta cesárea — el score guía la estrategia, no es trámite.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG induction 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Bishop", "Inducción", "Cuello"],
	},
	{
		id: "tpr-caida-embarazo-vasodilatacion",
		rank: 275,
		title: "TPR cae por vasodilatación NO+progesterona",
		insight:
			"Resistencia periférica total cae 30-40% en 2º trimestre por progesterona y aumento de NO endotelial. La placenta como sistema de baja resistencia en paralelo amplifica el efecto. Por eso TA media baja en 2º trimestre y vuelve a subir en 3er trimestre.",
		whyNonObvious:
			"Mid-pregnancy drop': la mujer suele sentir mareos por las TA bajas — es fisiológica, no patológica.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["TPR", "TA", "Vasodilatación"],
	},
	{
		id: "ctg-sinusoidal-anemia-prematerminal",
		rank: 276,
		title: "CTG sinusoidal: signo prematerminal por anemia fetal",
		insight:
			"Patrón sinusoidal CTG: oscilación regular sinuosa sin aceleraciones por >20 min. Asociado a anemia fetal grave (incompatibilidad, sangrado feto-materno) o hipoxia avanzada. Si persiste, indica finalización inmediata.",
		whyNonObvious:
			"Sinusoidal benigno transitorio existe (medicamentos, succión) — pero persistente es alarma de máximo nivel.",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["CTG", "Sinusoidal", "Anemia fetal"],
	},
	{
		id: "edemas-leves-vespertinos",
		rank: 277,
		title: "Edemas leves vespertinos: fisiológicos por presión venosa",
		insight:
			"En 3er trimestre, edemas leves de tobillo al final del día por presión hidrostática + compresión de venas pélvicas por útero. Sin HTA ni proteinuria son fisiológicos. Mejoran con descanso, elevación y lateralización.",
		whyNonObvious:
			"Diuréticos están contraindicados — reducen volemia placentaria sin resolver la causa.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG molestias 2023",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Edema", "Embarazo", "Fisiología"],
	},
	{
		id: "feindiagnostik-19-22-organos",
		rank: 278,
		title: "Ecografía morfológica 19-22 semanas: screening estructural",
		insight:
			"El screening morfológico (Feindiagnostik) en 19-22 semanas evalúa sistemáticamente todas las estructuras fetales: cardíacas (corte de 4 cámaras + salidas), SNC (ventrículos, cerebelo), abdomen, riñones, columna, extremidades. Diagnostica mayoría de malformaciones mayores.",
		whyNonObvious:
			"No es 'sólo ver al bebé moverse' — es scan diagnóstico técnico que requiere operador entrenado y tiempo (~30 min).",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG 18-22 weeks 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Morfológica", "Malformaciones", "Screening"],
	},
	{
		id: "hpl-lipolisis-energia-materna",
		rank: 279,
		title: "hPL induce lipólisis materna para alimentar al feto",
		insight:
			"El lactógeno placentario humano (hPL) induce lipólisis en tejido adiposo materno, liberando ácidos grasos libres como combustible materno. Esto ahorra glucosa, que pasa preferentemente al feto vía GLUT-1.",
		whyNonObvious:
			"En ayuno prolongado del embarazo aparece cetosis fisiológica — los ácidos grasos del hPL son la fuente.",
		audience: "Parteras y obstétricas",
		sourceNote: "Speroff 9th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["hPL", "Lipólisis", "Metabolismo"],
	},
	{
		id: "leopold-querlage-fundus-vacio",
		rank: 280,
		title: "Querlage: fundus vacío, partes fetales en flancos",
		insight:
			"En presentación transversa (Querlage), la 1ª Leopold encuentra fundus uterino vacío (no cabeza ni nalgas), las grandes partes fetales (cabeza+nalgas) palpan en flancos derecho e izquierdo. Parto vaginal imposible — cesárea o versión.",
		whyNonObvious:
			"Querlage en 36+ semanas es indicación de versión cefálica externa o cesárea programada, no esperar.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG malpresentation 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Querlage", "Transversa", "Versión"],
	},
	{
		id: "leitstelle-pequeña-fontanela",
		rank: 281,
		title: "Leitstelle: punto guía en el descenso",
		insight:
			"La Leitstelle es la parte más baja del feto en el canal del parto, tangible al tacto vaginal — define presentación y orientación. En occipital anterior es la fontanela menor; en frente, los suturas frontales; en cara, el mentón.",
		whyNonObvious:
			"La altura de la Leitstelle (estaciones) es la referencia del descenso — más útil que dilatación para predecir parto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Leitstelle", "Estación", "Tacto"],
	},
	{
		id: "hipertrofia-cardiaca-fisiologica",
		rank: 282,
		title: "Hipertrofia cardíaca excéntrica: adaptación fisiológica",
		insight:
			"El corazón materno se hipertrofia excéntricamente (cavidades agrandadas con paredes mantenidas) para acomodar el volumen incrementado sin sobrecargar. Aumenta también compliance. Revierte 6-12 meses postparto.",
		whyNonObvious:
			"Por eso ECG y ecocardiograma en embarazo muestran 'cardiomegalia leve' — fisiológica, no enfermedad.",
		audience: "Parteras y obstétricas",
		sourceNote: "ESC pregnancy heart 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Hipertrofia cardíaca", "Adaptación", "Hemodinámica"],
	},
	{
		id: "kleihauer-betke-makrotransfusion",
		rank: 283,
		title: "Kleihauer-Betke: cuantifica transfusión fetomaterna",
		insight:
			"El test de Kleihauer-Betke usa la resistencia de HbF al ácido para identificar eritrocitos fetales en sangre materna. Cuantifica volumen de transfusión fetomaterna. Indica si dosis estándar de anti-D es suficiente o requiere ajuste tras trauma o sangrado.",
		whyNonObvious:
			"Tras trauma abdominal grave en embarazo, KB es obligado — la microtransfusión puede ser mayor de lo aparente.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG isoinmunización 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Kleihauer", "Transfusión fetomaterna", "Trauma"],
	},
	{
		id: "deceleracion-tardia-hipoxia",
		rank: 284,
		title: "Desaceleración tardía: hipoxia placentaria",
		insight:
			"Desaceleración tardía CTG: nadir desplazado tras la cresta de la contracción. Refleja hipoxia placentaria: la reserva intervellosa no compensa la compresión por la contracción. Es signo de insuficiencia placentaria — más grave que las variables.",
		whyNonObvious:
			"Una sola tardía aislada no es alarma; recurrentes en >50% de contracciones es indicación de finalización.",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Desaceleración tardía", "Hipoxia", "CTG"],
	},
	{
		id: "hemodilucion-hto-32-35",
		rank: 285,
		title: "Hemodilución: hematocrito baja a 32-35% fisiológico",
		insight:
			"Al expandirse el plasma más que los eritrocitos, el hematocrito cae fisiológicamente a 32-35% en 2º trimestre. La fluidez sanguínea mejora el intercambio en intervelloso (menos viscosidad, mejor difusión).",
		whyNonObvious:
			"Hto 38% al término no es 'normal' — sugiere hemoconcentración por preeclampsia o deshidratación.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Hematocrito", "Hemodilución", "Plasma"],
	},
	{
		id: "estrogenos-ductos-mamarios",
		rank: 286,
		title: "Estrógenos: proliferación de ductos mamarios",
		insight:
			"Los estrógenos durante el embarazo proliferan el sistema ductal mamario. La progesterona diferencia los alvéolos secretores. La prolactina prepara la maquinaria secretora. Las tres convergen para la lactancia futura.",
		whyNonObvious:
			"Las mamas duelen no por 'subida de leche' sino por proliferación ductal y alveolar — el dolor antecede a la lactancia.",
		audience: "Parteras y obstétricas",
		sourceNote: "Speroff 9th",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Estrógenos", "Mama", "Lactancia"],
	},
	{
		id: "funneling-trichter-prematuridad",
		rank: 287,
		title: "Funneling cervical: OCI abierto, OCE cerrado",
		insight:
			"El funneling (Trichterbildung) es apertura del orificio cervical interno desde arriba, con OCE aún cerrado. Visible en ecografía transvaginal como 'embudo'. Marcador de insuficiencia cervical y riesgo de parto pretérmino.",
		whyNonObvious:
			"Funneling significativo >50% con cuello corto es indicación inmediata de progesterona o cerclaje — no esperar.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG cerclage 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Funneling", "Cuello", "Prematuro"],
	},
	{
		id: "gfr-aumento-50",
		rank: 288,
		title: "GFR aumenta 50% en embarazo normal",
		insight:
			"La GFR materna sube 50% por encima del basal en 2º-3er trimestre por expansión volémica e hiperfiltración. Permite eliminar productos metabólicos materno-fetales. Refleja en creatinina baja (0,4-0,7 mg/dl).",
		whyNonObvious:
			"Por eso ajuste de dosis renal de fármacos en embarazo no es 'reducir', es a veces 'aumentar' por mayor aclaramiento.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["GFR", "Riñón", "Farmacocinética"],
	},
	{
		id: "membranas-sinciocapilares-difusion",
		rank: 289,
		title: "Membranas sincio-capilares: ultra-finas para difusión",
		insight:
			"Las membranas sincio-capilares en placenta madura son áreas donde sincitiotrofoblasto se adelgaza al máximo, casi en contacto con endotelio capilar fetal. Optimizan difusión de O2 y CO2 — son el 'sitio activo' del intercambio.",
		whyNonObvious:
			"En insuficiencia placentaria estas membranas escasean — por eso a veces placentas 'grandes' funcionan mal.",
		audience: "Parteras y obstétricas",
		sourceNote: "Burton Placenta 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Difusión", "Placenta", "Intercambio"],
	},
	{
		id: "ctg-taquicardia-160-10min",
		rank: 290,
		title: "Taquicardia fetal: >160 lpm por >10 minutos",
		insight:
			"Taquicardia fetal: basal >160 lpm sostenida >10 min. Causas: fiebre materna (corioamnionitis), hipoxia incipiente, fármacos (β-agonistas), arritmia fetal. Buscar siempre causa, no sólo observar.",
		whyNonObvious:
			"Taquicardia + variabilidad reducida es peor que taquicardia aislada — combina dos signos de hipoxia.",
		audience: "Parteras y obstétricas",
		sourceNote: "FIGO CTG 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Taquicardia", "CTG", "Corioamnionitis"],
	},
	{
		id: "varices-progesterona-presion-pelvica",
		rank: 292,
		title: "Várices: progesterona + presión pélvica del útero",
		insight:
			"Las várices vulvares y de pierna en embarazo se favorecen por relajación venosa (progesterona) y presión hidrostática por compresión de venas pélvicas por el útero. Aumentan progresivamente con cada embarazo.",
		whyNonObvious:
			"Soportes compresivos y elevación funcionan; medicación venotónica oral no se recomienda — efecto débil.",
		audience: "Parteras y obstétricas",
		sourceNote: "DGGG varices 2023",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Várices", "Progesterona", "Compresión venosa"],
	},
	{
		id: "centralizacion-acm-vasodilatacion",
		rank: 293,
		title: "Centralización fetal: ACM vasodilata para proteger cerebro",
		insight:
			"En hipoxia crónica el feto centraliza: vasodilata cerebral media (baja resistencia ACM, baja índice cerebroplacentario), vasoconstriñe periferia. Doppler de ACM con índice de pulsatilidad bajo confirma el reflejo.",
		whyNonObvious:
			"Centralización es reflejo protector, no benigno: indica que la placenta ya no provee suficiente — vigilar.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG Doppler 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Centralización", "ACM", "Doppler"],
	},
	{
		id: "screening-1trim-edad-nt-bioquimica",
		rank: 294,
		title: "Screening 1er trimestre: edad + NT + bioquímica",
		insight:
			"El screening combinado del 1er trimestre integra edad materna, NT ecográfica y bioquímica (β-hCG libre + PAPP-A) — detección de trisomía 21 del 85-90% con 5% de falsos positivos. Base para decidir NIPT o invasiva.",
		whyNonObvious:
			"NIPT no reemplaza el screening combinado en sistemas con recursos limitados — la ecografía NT también descarta malformaciones estructurales tempranas.",
		audience: "Parteras y obstétricas",
		sourceNote: "FMF combined 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Screening", "NT", "Trisomía"],
	},
	{
		id: "sinclitismo-recto-promontorio",
		rank: 295,
		title: "Sinclitismo: sutura sagital centrada en estrecho superior",
		insight:
			"Sinclitismo es la entrada simétrica del cráneo fetal en la pelvis: sutura sagital exactamente equidistante entre sínfisis y promontorio. Es la entrada óptima y predice descenso fluido.",
		whyNonObvious:
			"Una entrada sinclítica puede deteriorarse en asinclitismo si la pelvis no acomoda — re-evaluar en cada tacto.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Sinclitismo", "Tacto", "Mecánica"],
	},
	{
		id: "afp-defecto-tubo-neural",
		rank: 296,
		title: "AFP elevado: defecto de tubo neural abierto",
		insight:
			"En defectos abiertos del tubo neural (espina bífida, anencefalia) la AFP fetal escapa al líquido amniótico y atraviesa la placenta. AFP materna >2,0-2,5 MoM en 2º trimestre orienta a NTD. Confirmar con ecografía detallada.",
		whyNonObvious:
			"AFP también sube en gemelar, datación incorrecta y gastrosquisis — no es específico, requiere correlación.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG NTD 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["AFP", "Tubo neural", "Espina bífida"],
	},
	{
		id: "volumen-corriente-40-percent",
		rank: 297,
		title: "Volumen corriente sube 40% por progesterona",
		insight:
			"En 3er trimestre el volumen corriente aumenta ~40% por estímulo del centro respiratorio (progesterona). La frecuencia respiratoria sube poco. El volumen residual baja por elevación diafragmática.",
		whyNonObvious:
			"Por eso la disnea de esfuerzo en embarazo es común y benigna — sin saturación baja ni signos de patología cardiopulmonar.",
		audience: "Parteras y obstétricas",
		sourceNote: "Williams Obstetrics 27th",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Volumen corriente", "Respiración", "Disnea"],
	},
	{
		id: "monocorial-monoamniotico-cordones",
		rank: 298,
		title: "Monocoriónico monoamniótico: cordones se enredan",
		insight:
			"En gemelar monocoriónico monoamniótico ambos fetos comparten cavidad amniótica y placenta. Riesgo alto de entrelazamiento de cordones (cord entanglement) y muerte súbita. Vigilancia ecográfica frecuente; parto programado por cesárea en semana 32-34.",
		whyNonObvious:
			"Es el subtipo gemelar más raro y con mayor mortalidad. Identificación temprana cambia totalmente el manejo.",
		audience: "Parteras y obstétricas",
		sourceNote: "ISUOG twins 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Gemelos", "Monoamniótico", "Cordón"],
	},
	{
		id: "hsd2-cortisol-fetal-proteccion",
		rank: 299,
		title: "11β-HSD2 placentaria: protege al feto del cortisol materno",
		insight:
			"La 11β-HSD2 placentaria convierte cortisol activo en cortisona inactiva antes de que llegue al feto. Protege el neurodesarrollo de la inhibición glucocorticoidea materna.",
		whyNonObvious:
			"Por eso betametasona y dexametasona (sintéticos no metabolizados por 11β-HSD2) sí llegan al feto y son los que maduran pulmón.",
		audience: "Parteras y obstétricas",
		sourceNote: "WHO antenatal corticosteroids 2024",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["11β-HSD2", "Cortisol", "Corticoides"],
	},
	{
		id: "polihidramnios-dvp-8cm",
		rank: 300,
		title: "Polihidramnios: DVP ≥8 cm o AFI >24-25 cm",
		insight:
			"Polihidramnios = bolsillo vertical ≥8 cm o AFI >24-25 cm. Causas: trastorno de deglución fetal (atresia esofágica), GDM mal controlada, infecciones, gemelar discordante. Aumenta riesgo de RPM, parto pretérmino, distocia.",
		whyNonObvious:
			"Polihidramnios + GDM sugiere control glucémico insuficiente — la glucosa fetal alta da poliuria osmótica.",
		audience: "Parteras y obstétricas",
		sourceNote: "ACOG amniotic fluid 2024",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Polihidramnios", "GDM", "AFI"],
	},
];
