import type { Fact } from "$lib/types";

export const facts: Fact[] = [
	// ===== LOTE 1: Hemorragia postparto (rank 1-20) =====
	{
		id: "hpp-oxitocina-profilaxis-10ui",
		rank: 1,
		title: "10 UI de oxitocina en el 3er periodo reduce HPP un 60%",
		insight:
			"La administración profiláctica de 10 UI de oxitocina IM dentro del minuto posterior al parto reduce la incidencia de hemorragia postparto en aproximadamente 60% comparada con el manejo expectante del tercer periodo.",
		whyNonObvious:
			"Muchos equipos aún esperan signos de separación placentaria antes de administrar oxitocina, demorando la ventana óptima de prevención.",
		audience: "Obstétricas, parteras y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD001808 (Begley et al., 2019); OMS, Prevención HPP (2012)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HPP", "Oxitocina", "3er periodo", "Prevención"],
	},
	{
		id: "hpp-amtsl-vs-expectante",
		rank: 2,
		title: "El manejo activo del 3er periodo duplica la protección contra HPP",
		insight:
			"El manejo activo del tercer periodo (oxitocina profiláctica + tracción controlada del cordón + masaje uterino) reduce el riesgo de HPP en más del 50% comparado con el manejo expectante, con NNT de 14 para prevenir una HPP severa.",
		whyNonObvious:
			"Persiste la creencia de que el manejo expectante es más 'fisiológico', pero la evidencia muestra que el manejo activo reduce mortalidad materna sin aumentar complicaciones.",
		audience: "Obstétricas y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD001808 (Begley et al., 2019); OMS, Recomendaciones HPP (2023)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HPP", "Manejo activo", "3er periodo", "Prevención"],
	},
	{
		id: "hpp-acido-tranexamico-woman",
		rank: 3,
		title: "Ácido tranexámico en HPP: cada minuto cuenta",
		insight:
			"El ácido tranexámico (1 g IV) administrado dentro de las 3 horas posteriores al inicio de la HPP reduce la muerte por sangrado en un 31%. Administrado dentro de la primera hora, la reducción alcanza el 68%.",
		whyNonObvious:
			"El ácido tranexámico no se usa rutinariamente como fármaco de primera línea en HPP a pesar de la evidencia del WOMAN Trial, y muchos equipos lo reservan como última opción.",
		audience: "Médicos obstetras y equipos de emergencia obstétrica",
		sourceNote:
			"WOMAN Trial Collaborators, Lancet 2017; OMS, Recomendaciones HPP (2023)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HPP", "Ácido tranexámico", "WOMAN", "Emergencia"],
	},
	{
		id: "hpp-masaje-uterano-post-parto",
		rank: 4,
		title: "El masaje uterino cada 15 minutos no previene HPP",
		insight:
			"El masaje uterino rutinario programado (cada 15 minutos durante las primeras 2 horas) no reduce significativamente la incidencia de HPP ni la pérdida sanguínea comparado con la evaluación clínica a demanda.",
		whyNonObvious:
			"El masaje uterino es una práctica estandarizada en muchos protocolos posparto inmediato, pero la evidencia no respalda su realización programada en ausencia de signos de alerta.",
		audience: "Parteras y enfermería obstétrica",
		sourceNote: "Cochrane Review CD006689 (Saco-Peralta et al., 2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Masaje uterino", "Posparto", "Protocolo"],
	},
	{
		id: "hpp-carbetocina-paises-ingresos-medios",
		rank: 5,
		title:
			"Carbetocina estable en temperatura ambiente supera a oxitocina termolábil",
		insight:
			"La carbetocina (100 mcg IV/IM) no es inferior a la oxitocina para prevenir HPP, y su estabilidad a temperatura ambiente (hasta 30°C sin cadena de frío) la hace superior en contextos de recursos limitados.",
		whyNonObvious:
			"La oxitocina requiere refrigeración constante (2-8°C), lo que en países de ingresos bajos y medios compromete su eficacia hasta en un 40% de los casos.",
		audience: "Ministerios de Salud y gestores de programas obstétricos",
		sourceNote:
			"Cochrane Review CD012840 (Gallos et al., 2022); OMS, Recomendaciones HPP (2023)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Carbetocina", "Cadena de frío", "Oxitocina"],
	},
	{
		id: "hpp-misoprostol-segunda-linea",
		rank: 6,
		title: "Misoprostol sublingual salva vidas donde no hay oxitocina",
		insight:
			"El misoprostol sublingual (800 mcg) es eficaz como fármaco de segunda línea para HPP cuando no hay oxitocina inyectable disponible, reduciendo la necesidad de transfusiones en un 30%.",
		whyNonObvious:
			"El misoprostol se asocia con escalofríos e hipertermia, lo que genera desconfianza en equipos clínicos, pero su perfil beneficio-riesgo es favorable en contextos sin acceso a oxitocina.",
		audience: "Equipos de atención primaria y parto domiciliario",
		sourceNote:
			"Cochrane Review CD012840 (Gallos et al., 2022); OMS, Medicamentos esenciales",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Misoprostol", "Oxitocina", "Segunda línea"],
	},
	{
		id: "hpp-traccion-controlada-cordon",
		rank: 7,
		title: "La tracción controlada del cordón no previene HPP por sí sola",
		insight:
			"La tracción controlada del cordón como componente aislado no reduce la incidencia de HPP severa ni la necesidad de transfusión cuando se compara con la espera sin tracción, siempre que se administre oxitocina profiláctica.",
		whyNonObvious:
			"Múltiples guías enseñan la tracción controlada como paso esencial, pero la evidencia sugiere que el beneficio principal del manejo activo proviene de la oxitocina, no de la tracción.",
		audience: "Obstétricas y estudiantes de obstetricia",
		sourceNote: "Cochrane Review CD007456 (Hofmeyr et al., 2019)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Tracción de cordón", "3er periodo", "Oxitocina"],
	},
	{
		id: "hpp-compresion-bimanual-uterina",
		rank: 8,
		title:
			"Compresión bimanual uterina: la maniobra que todos deberían conocer",
		insight:
			"La compresión bimanual del útero (masaje + compresión manual transvaginal del istmo) es una maniobra temporal efectiva para ganar tiempo mientras se preparan uterotónicos o el traslado quirúrgico.",
		whyNonObvious:
			"Es una técnica de bajo costo que no requiere insumos, pero muchos equipos no la practican en simulaciones ni la tienen protocolizada como paso inicial.",
		audience: "Todo el personal de sala de parto",
		sourceNote: "OMS, Manejo de HPP (2023); FIGO Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Compresión bimanual", "Urgencia", "Maniobra"],
	},
	{
		id: "hpp-taponamiento-balón-uterino",
		rank: 9,
		title: "El balón de taponamiento uterino evita cirugías mayores en HPP",
		insight:
			"El taponamiento con balón intrauterino (Bakri o balón de condón) tiene una tasa de éxito del 85-95% para controlar HPP por atonía, evitando laparotomía y posible histerectomía.",
		whyNonObvious:
			"Por su costo, muchos hospitales no lo tienen disponible, aunque existen alternativas artesanales (balón de condón) con eficacia similar reportada en estudios observacionales.",
		audience: "Obstetras y emergenciólogos",
		sourceNote:
			"Cochrane Review CD012840 (Gallos et al., 2022); OMS, HPP Tratamiento (2023)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Balón intrauterino", "Atonía", "Taponamiento"],
	},
	{
		id: "hpp-ligadura-arterias-uterinas",
		rank: 10,
		title:
			"Ligadura de arterias uterinas preserva fertilidad en HPP refractaria",
		insight:
			"La ligadura bilateral de arterias uterinas (técnica de O'Leary) tiene una tasa de éxito del 80-90% para controlar HPP por atonía, preservando el útero y la fertilidad futura.",
		whyNonObvious:
			"Ante una HPP que no responde a uterotónicos, la tendencia es considerar histerectomía rápidamente, pero las técnicas de devascularización uterina son opciones efectivas y conservadoras.",
		audience: "Cirujanos obstetras y residentes de obstetricia",
		sourceNote: "OMS, HPP Tratamiento (2023); FIGO Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Ligadura arterial", "Cirugía conservadora", "Fertilidad"],
	},
	{
		id: "hpp-hemoglobina-predictor-riesgo",
		rank: 11,
		title: "Hemoglobina preparto <11 g/dL triplica riesgo de HPP severa",
		insight:
			"Las gestantes con hemoglobina preparto menor a 11 g/dL tienen 3 veces más riesgo de HPP severa y 4 veces más riesgo de requerir transfusión, independientemente de la vía del parto.",
		whyNonObvious:
			"La anemia leve se considera un hallazgo de bajo riesgo y a menudo no se corrige antes del parto, pero es uno de los predictores más fuertes de HPP severa.",
		audience: "Equipos de control prenatal",
		sourceNote: "OMS, Hemoglobina y HPP (2023); Lancet Global Health (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Hemoglobina", "Anemia", "Preparto", "Prevención"],
	},
	{
		id: "hpp-atonia-causa-principal",
		rank: 12,
		title: "La atonía uterina causa el 80% de las HPP",
		insight:
			"La atonía uterina es responsable del 70-80% de todas las hemorragias postparto. La sobredistención uterina (macrosomía, gemelar, polihidramnios) es el factor de riesgo más importante.",
		whyNonObvious:
			"Existe la creencia de que los desgarros son la causa más frecuente de HPP, pero la atonía es abrumadoramente más común y prevenible con uterotónicos profilácticos.",
		audience: "Estudiantes de obstetricia y partería",
		sourceNote: "OMS, HPP Epidemiología (2023); WHO Guidelines for HPP (2022)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["HPP", "Atonía", "Epidemiología", "Útero"],
	},
	{
		id: "hpp-desgarros-perineales-grado-3-4",
		rank: 13,
		title: "Los desgarros perineales severos duplican el riesgo de HPP tardía",
		insight:
			"Los desgarros de tercer y cuarto grado duplican el riesgo de HPP secundaria (24 horas a 6 semanas posparto) y quintuplican el riesgo de hematomas pélvicos.",
		whyNonObvious:
			"La HPP tardía se asocia principalmente con retención de restos placentarios, pero los desgarros no reparados o mal reparados son una causa subdiagnosticada.",
		audience: "Obstétricas y equipos de puerperio",
		sourceNote:
			"Cochrane Review CD012286 (Williams et al., 2020); OMS, Perineal Trauma (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Desgarro perineal", "Puerperio", "Episiotomía"],
	},
	{
		id: "hpp-acretismo-placentario-mortalidad",
		rank: 14,
		title: "El acretismo placentario quintuplica el riesgo de muerte materna",
		insight:
			"El espectro de acretismo placentario (PAS) se asocia con una mortalidad materna del 7-10%, pérdida sanguínea media de 3000-5000 mL y necesidad de histerectomía en más del 50% de los casos.",
		whyNonObvious:
			"La incidencia de PAS aumentó 10 veces en las últimas dos décadas debido al incremento de cesáreas, pero el diagnóstico prenatal sigue siendo bajo en muchos centros.",
		audience: "Obstetras, radiólogos y equipos de alto riesgo obstétrico",
		sourceNote: "Cochrane Review CD014596 (2023); FIGO Guidelines PAS (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Acretismo", "Placenta", "Cesárea", "Histerectomía"],
	},
	{
		id: "hpp-cesarea-hemorragia-mayor-volumen",
		rank: 15,
		title: "Cesárea duplica la pérdida sanguínea comparada con parto vaginal",
		insight:
			"La pérdida sanguínea media en una cesárea electiva es de 500-800 mL, y en cesárea de urgencia puede superar los 1000 mL, duplicando la pérdida media del parto vaginal (200-400 mL).",
		whyNonObvious:
			"La cesárea se percibe como un procedimiento controlado, pero la pérdida sanguínea es significativamente mayor y la HPP en cesárea tiene peores desenlaces debido al retraso en la identificación.",
		audience: "Equipos de quirófano obstétrico",
		sourceNote:
			"WHO, Cesarean Section Rates (2021); Lancet Series on CS (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Cesárea", "Pérdida sanguínea", "Quirófano"],
	},
	{
		id: "hpp-fluidos-reanimacion-restrictiva",
		rank: 16,
		title: "La reanimación con líquidos en HPP debe ser restrictiva",
		insight:
			"La reanimación con cristaloides en HPP debe limitarse a 1-2 L antes de iniciar hemoderivados. La administración excesiva de cristaloides (>3 L) se asocia con coagulopatía dilucional y mayor mortalidad.",
		whyNonObvious:
			"La respuesta instintiva ante una HPP es 'llenar al paciente', pero el exceso de cristaloides empeora la coagulopatía y la acidosis metabólica.",
		audience: "Equipos de emergencia obstétrica",
		sourceNote: "OMS, HPP Tratamiento (2023); CRASH-2 Trial (2017)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Cristaloides", "Reanimación", "Coagulopatía"],
	},
	{
		id: "hpp-transfusion-temprana-razon-1-1",
		rank: 17,
		title: "Transfusión 1:1 en HPP mejora supervivencia",
		insight:
			"La reanimación con hemoderivados en proporción 1:1 (glóbulos rojos:plasma fresco congelado) en HPP masiva reduce la mortalidad en un 40% comparada con transfusiones tardías o desbalanceadas.",
		whyNonObvious:
			"La tendencia es transfundir solo glóbulos rojos cuando baja el hematocrito, pero en HPP masiva la reposición temprana de factores de coagulación es crítica para romper el ciclo de coagulopatía.",
		audience: "Bancos de sangre y equipos de emergencia obstétrica",
		sourceNote: "OMS, Transfusión en HPP (2023); RCOG Green-top #52 (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["HPP", "Transfusión", "Plasma fresco", "Coagulopatía"],
	},
	{
		id: "hpp-simulacion-equipos-resultados",
		rank: 18,
		title: "Simulación clínica en HPP reduce mortalidad un 30%",
		insight:
			"La implementación de simulaciones periódicas de HPP en equipos de sala de parto reduce la mortalidad materna por HPP en un 30% y mejora el cumplimiento de protocolos en un 50%.",
		whyNonObvious:
			"La simulación se considera un gasto operativo, no una inversión en resultados, pero cada hora de simulación programada se traduce en vidas salvadas en el mundo real.",
		audience: "Directores de servicios de obstetricia y gestores hospitalarios",
		sourceNote:
			"WHO, Simulation-Based Training (2022); Cochrane Review CD014596 (2023)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Simulación", "Capacitación", "Equipo"],
	},
	{
		id: "hpp-retencion-restos-placentarios",
		rank: 19,
		title: "Restos placentarios: la causa olvidada de HPP secundaria",
		insight:
			"La retención de restos placentarios es la causa más frecuente de HPP secundaria (después de 24 horas), representando el 30-40% de los casos. El legrado uterino diferido se asocia con peores desenlaces.",
		whyNonObvious:
			"Cuando una paciente sangra días después del parto, se asume que es normal hasta que es severo. La ecografía posparto no está protocolizada para detectar restos.",
		audience: "Equipos de puerperio y atención primaria",
		sourceNote:
			"Cochrane Review CD012840 (Gallos et al., 2022); OMS, Puerperio (2023)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["HPP", "Restos placentarios", "Legrado", "Puerperio"],
	},
	{
		id: "hpp-ecografia-diagnostico-causa",
		rank: 20,
		title: "La ecografía en HPP aguda identifica causa en segundos",
		insight:
			"La ecografía point-of-care en HPP permite identificar en menos de 60 segundos si la causa es atonía (útero hipocontráctil), restos placentarios (imagen heterogénea intracavitaria) o hematoma pélvico.",
		whyNonObvious:
			"La ecografía no forma parte del algoritmo estándar de HPP aguda en la mayoría de protocolos, donde el manejo es predominantemente clínico hasta fases avanzadas.",
		audience: "Obstetras y emergenciólogos",
		sourceNote:
			"FIGO Guidelines, POCUS in HPP (2022); OMS, Ecografía Obstétrica (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["HPP", "Ecografía", "POCUS", "Diagnóstico rápido"],
	},

	// ===== LOTE 2: Preeclampsia/eclampsia (rank 21-35) =====
	{
		id: "preeclampsia-aspirina-baja-dosis",
		rank: 21,
		title: "Aspirina 150 mg desde las 12 semanas reduce preeclampsia un 60%",
		insight:
			"La administración de aspirina en dosis de 150 mg diarios desde antes de las 16 semanas de gestación reduce la incidencia de preeclampsia pretérmino en un 62% en gestantes de alto riesgo.",
		whyNonObvious:
			"Muchos protocolos aún usan 100 mg o comienzan después de las 20 semanas, cuando la ventana de prevención placentaria ya se cerró en gran medida.",
		audience: "Equipos de control prenatal y alto riesgo obstétrico",
		sourceNote:
			"Cochrane Review CD004659 (Duley et al., 2019); ASPRE Trial (NEJM, 2017)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Aspirina", "Prevención", "Primer trimestre"],
	},
	{
		id: "preeclampsia-calcio-suplementacion",
		rank: 22,
		title:
			"Calcio 1-2 g/día reduce preeclampsia un 50% en poblaciones con baja ingesta",
		insight:
			"La suplementación con calcio (1-2 g/día) en gestantes con baja ingesta dietética de calcio reduce el riesgo de preeclampsia en un 55% y el de parto prematuro en un 24%.",
		whyNonObvious:
			"En países con ingesta adecuada de lácteos no hay beneficio, pero en poblaciones con déficit de calcio, la suplementación es tan efectiva como la aspirina en prevención.",
		audience: "Nutricionistas y equipos de control prenatal",
		sourceNote:
			"Cochrane Review CD001059 (Hofmeyr et al., 2018); OMS, Calcio Prenatal (2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Calcio", "Nutrición", "Prevención"],
	},
	{
		id: "preeclampsia-sulfato-magnesio-eclampsia",
		rank: 23,
		title: "Sulfato de magnesio reduce convulsiones eclámpticas un 50%",
		insight:
			"El sulfato de magnesio (dosis de carga 4 g IV + mantenimiento 1 g/h durante 24 horas) reduce el riesgo de eclampsia en un 52% en mujeres con preeclampsia severa comparado con placebo o diazepam.",
		whyNonObvious:
			"El diazepam y la fenitoína se usaron históricamente para prevenir convulsiones, pero el sulfato de magnesio es superior en eficacia con menor depresión respiratoria neonatal.",
		audience: "Obstetras, emergenciólogos y equipos de cuidados intensivos",
		sourceNote:
			"Cochrane Review CD001910 (Duley et al., 2020); Magpie Trial (Lancet, 2002)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Preeclampsia", "Eclampsia", "Sulfato de magnesio", "Convulsiones"],
	},
	{
		id: "preeclampsia-parto-electivo-37-semanas",
		rank: 24,
		title:
			"Parto electivo a las 37 semanas reduce complicaciones en preeclampsia",
		insight:
			"La inducción electiva del parto a las 37 semanas en gestantes con preeclampsia leve reduce la progresión a preeclampsia severa (RR 0.46) y el ingreso materno a UCI, sin aumentar cesáreas.",
		whyNonObvious:
			"Existe temor de que la inducción prematura aumente las cesáreas, pero la evidencia muestra que la inducción a las 37 semanas es segura y reduce complicaciones maternas severas.",
		audience: "Obstetras y equipos de decisión obstétrica",
		sourceNote:
			"Cochrane Review CD004659 (Duley et al., 2019); HYPITAT Trial (Lancet, 2014)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Inducción", "Parto a término", "Cesárea"],
	},
	{
		id: "preeclampsia-ecografia-arterias-uterinas",
		rank: 25,
		title:
			"Ecografía de arterias uterinas predice preeclampsia desde el primer trimestre",
		insight:
			"El índice de pulsatilidad (IP) promedio de arterias uterinas > percentil 95 junto con factores clínicos permite detectar el 75% de casos de preeclampsia pretérmino antes de las 16 semanas.",
		whyNonObvious:
			"La preeclampsia se considera una enfermedad de diagnóstico clínico tardío, pero la ecografía Doppler de primer trimestre puede identificar a las gestantes en riesgo 20 semanas antes de que aparezcan los síntomas.",
		audience: "Ecografistas y obstetras de alto riesgo",
		sourceNote:
			"ISUOG Guidelines, Doppler Uterine Artery (2021); FMF Algorithm (NEJM, 2017)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: [
			"Preeclampsia",
			"Ecografía Doppler",
			"Arterias uterinas",
			"Predicción",
		],
	},
	{
		id: "preeclampsia-plgf-sflt1-diagnostico",
		rank: 26,
		title: "Cociente sFlt-1/PlGF descarta preeclampsia con 99% de certeza",
		insight:
			"El cociente sFlt-1/PlGF ≤38 tiene un valor predictivo negativo del 99.3% para preeclampsia en las siguientes 4 semanas, permitiendo evitar hospitalizaciones innecesarias en casos de sospecha clínica.",
		whyNonObvious:
			"La proteína en orina de 24 horas sigue siendo el estándar diagnóstico en muchos centros, pero los biomarcadores angiogénicos son superiores para descartar la enfermedad rápidamente.",
		audience: "Obstetras, emergenciólogos y equipos de diagnóstico",
		sourceNote:
			"PROGNOSIS Study (Zeisler et al., Circulation 2016); SOGC Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Preeclampsia", "sFlt-1", "PlGF", "Biomarcadores", "Triage"],
	},
	{
		id: "preeclampsia-pedales-tipico-atipico",
		rank: 27,
		title:
			"El edema de miembros inferiores no es criterio diagnóstico de preeclampsia",
		insight:
			"El edema generalizado fue eliminado como criterio diagnóstico de preeclampsia en 2013. El diagnóstico requiere presión arterial ≥140/90 mmHg más proteinuria u otro marcador de daño orgánico.",
		whyNonObvious:
			"El edema de piernas es casi universal en el tercer trimestre (>80% de gestantes sanas lo presentan) y no predice preeclampsia, pero sigue generando consultas de urgencia innecesarias.",
		audience: "Gestantes, atención primaria y admisión hospitalaria",
		sourceNote: "ACOG Practice Bulletin #222 (2020); ISSHP Guidelines (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Preeclampsia", "Edema", "Criterios diagnósticos", "Triage"],
	},
	{
		id: "preeclampsia-hellp-mortalidad",
		rank: 28,
		title: "Síndrome HELLP tiene mortalidad materna del 1-3%",
		insight:
			"El síndrome HELLP complica el 10-20% de los casos de preeclampsia severa, con una mortalidad materna del 1-3% y una mortalidad perinatal del 7-20%, y no se resuelve con solo suspender el embarazo.",
		whyNonObvious:
			"A diferencia de la preeclampsia que mejora rápidamente posparto, el HELLP puede empeorar en las primeras 24-48 horas después del parto, requiriendo vigilancia en UCI.",
		audience: "Cuidados intensivos obstétricos",
		sourceNote:
			"Cochrane Review CD004659 (Duley et al., 2019); ACOG HELLP Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Preeclampsia", "HELLP", "Mortalidad materna", "UCI"],
	},
	{
		id: "preeclampsia-ejercicio-prevencion",
		rank: 29,
		title: "Ejercicio aeróbico en el embarazo reduce riesgo de preeclampsia",
		insight:
			"La realización de ejercicio aeróbico supervisado (150 min/semana de actividad moderada) reduce la incidencia de preeclampsia en un 30-40% en gestantes con sobrepeso u obesidad.",
		whyNonObvious:
			"El reposo y la disminución de actividad física eran recomendaciones tradicionales para prevenir preeclampsia, pero la evidencia muestra que el sedentarismo es un factor de riesgo modificable significativo.",
		audience: "Gestantes, obstetras y educadores prenatales",
		sourceNote:
			"Cochrane Review CD011440 (Davenport et al., 2020); OMS, Actividad Física en Gestación (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Preeclampsia", "Ejercicio", "Prevención", "Obesidad"],
	},
	{
		id: "preeclampsia-obesidad-riesgo-triple",
		rank: 30,
		title: "Obesidad pregestacional triplica riesgo de preeclampsia",
		insight:
			"Gestantes con IMC pregestacional ≥30 kg/m² tienen un riesgo 3.4 veces mayor de desarrollar preeclampsia y 2.7 veces mayor de desarrollar eclampsia comparadas con gestantes con IMC normal.",
		whyNonObvious:
			"La obesidad se asocia con inflamación crónica y disfunción endotelial que exacerban la fisiopatología placentaria, no es solo un factor de riesgo mecánico o metabólico.",
		audience: "Equipos de control prenatal y nutrición",
		sourceNote:
			"WHO, Obesity and Pregnancy (2021); Cochrane Review CD004659 (Duley et al., 2019)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Obesidad", "IMC", "Riesgo pregestacional"],
	},
	{
		id: "preeclampsia-seguimiento-posparto-cardiovascular",
		rank: 31,
		title: "Preeclampsia quintuplica riesgo cardiovascular futuro",
		insight:
			"Las mujeres que desarrollan preeclampsia tienen 5 veces más riesgo de hipertensión crónica, 2 veces más riesgo de enfermedad coronaria y 1.8 veces más riesgo de accidente cerebrovascular en los 10-20 años posteriores.",
		whyNonObvious:
			"La preeclampsia no termina con el parto. Es una señal de alerta cardiovascular temprana que debería iniciar seguimiento cardiológico de por vida, pero rara vez se implementa.",
		audience: "Médicos de atención primaria, cardiólogos y obstetras",
		sourceNote:
			"AHA/ACC Guidelines, Preeclampsia and CVD (2021); Circulation Review (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Cardiovascular", "Posparto", "Seguimiento"],
	},
	{
		id: "preeclampsia-progesterona-no-previene",
		rank: 32,
		title: "La progesterona no previene ni trata la preeclampsia",
		insight:
			"A pesar de la hipótesis de que la progesterona podría mejorar la placentación, múltiples ensayos clínicos aleatorizados muestran que la progesterona no reduce la incidencia ni la severidad de la preeclampsia.",
		whyNonObvious:
			"La progesterona se prescribe ampliamente en el primer trimestre por diversos motivos, y existe la creencia no respaldada de que podría tener un efecto protector sobre la placenta.",
		audience: "Obstetras y equipos de reproducción asistida",
		sourceNote:
			"Cochrane Review CD004659 (Duley et al., 2019); OPPTION Trial (BJOG, 2020)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Preeclampsia", "Progesterona", "Prevención", "Mitología"],
	},
	{
		id: "preeclampsia-presion-arterial-135-85",
		rank: 33,
		title: "PA 135/85 mmHg merece vigilancia, no esperar a 140/90",
		insight:
			"Las gestantes con presión arterial ≥135/85 mmHg antes de las 20 semanas tienen 4 veces más riesgo de desarrollar preeclampsia que aquellas con PA <120/80 mmHg.",
		whyNonObvious:
			"Las tablas diagnósticas tradicionales usan 140/90 como umbral, pero valores prehipertensivos tempranos son predictores más potentes que cualquier otro factor clínico aislado.",
		audience: "Equipos de control prenatal",
		sourceNote: "ALSPAC Study (Lancet, 2020); ISSHP Diagnostic Criteria (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Presión arterial", "Prehipertensión", "Vigilancia"],
	},
	{
		id: "preeclampsia-episiotomia-no-recomendada",
		rank: 34,
		title: "La episiotomía no está indicada en preeclampsia severa",
		insight:
			"No hay evidencia que respalde la episiotomía rutinaria en gestantes con preeclampsia severa para 'acortar el expulsivo'. La episiotomía selectiva tiene iguales resultados perinatales sin mayor riesgo de desgarros.",
		whyNonObvious:
			"Muchos obstetras realizan episiotomía en pacientes con preeclampsia bajo el supuesto de reducir el esfuerzo materno y la elevación de la PA, pero la evidencia no respalda esta práctica.",
		audience: "Obstetras y parteras",
		sourceNote:
			"Cochrane Review CD000081 (Jiang et al., 2021); WHO, Episiotomy Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Preeclampsia", "Episiotomía", "Expulsivo", "Manejo de parto"],
	},
	{
		id: "preeclampsia-urale-muerte-evitable",
		rank: 35,
		title:
			"La preeclampsia sigue siendo una de las principales causas de muerte materna evitable",
		insight:
			"A pesar de los avances en prevención y tratamiento, la preeclampsia/eclampsia causa 46,000 muertes maternas al año globalmente, y el 90% ocurren en países de ingresos bajos y medios.",
		whyNonObvious:
			"En países de altos ingresos la mortalidad por preeclampsia es casi nula, pero las brechas en detección temprana, acceso a sulfato de magnesio y parto oportuno perpetúan la inequidad sanitaria.",
		audience: "Gestores de salud pública y organismos internacionales",
		sourceNote:
			"WHO, Maternal Mortality Report (2023); Lancet Preeclampsia Series (2021)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: [
			"Preeclampsia",
			"Eclampsia",
			"Mortalidad materna",
			"Equidad sanitaria",
		],
	},

	// ===== LOTE 3: Sepsis neonatal (rank 36-45) =====
	{
		id: "sepsis-neonatal-gbs-profilaxis-intraparto",
		rank: 36,
		title: "Profilaxis intraparto con penicilina reduce sepsis por GBS un 80%",
		insight:
			"La administración de penicilina G intravenosa al menos 4 horas antes del parto reduce la transmisión vertical de Streptococcus agalactiae (GBS) y la sepsis neonatal temprana en un 80-86%.",
		whyNonObvious:
			"El cribado universal de GBS a las 35-37 semanas se implementa en muchos países, pero la ventana mínima de 4 horas de profilaxis antes del parto frecuentemente no se logra en partos rápidos.",
		audience: "Equipos de sala de parto y neonatología",
		sourceNote:
			"Cochrane Review CD001256 (Ohlsson et al., 2020); CDC GBS Guidelines (2019)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Sepsis neonatal", "GBS", "Profilaxis", "Penicilina"],
	},
	{
		id: "sepsis-neonatal-lactobacillus-oral-prematuro",
		rank: 37,
		title: "Lactobacillus oral reduce enterocolitis necrotizante en prematuros",
		insight:
			"La administración oral de probióticos (Lactobacillus spp. + Bifidobacterium spp.) en recién nacidos prematuros reduce la incidencia de enterocolitis necrotizante (NEC) en un 50% y la mortalidad asociada en un 25%.",
		whyNonObvious:
			"Durante años se evitó administrar cualquier bacteria viva a neonatos inmunocomprometidos por temor a sepsis por probióticos, pero el perfil de seguridad es excelente con cepas específicas.",
		audience: "Neonatólogos y equipos de UCI neonatal",
		sourceNote:
			"Cochrane Review CD005496 (Sharif et al., 2020); ESPGHAN Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: [
			"Sepsis neonatal",
			"Probióticos",
			"NEC",
			"Prematuro",
			"Lactobacillus",
		],
	},
	{
		id: "sepsis-neonatal-pcr-diagnostico",
		rank: 38,
		title: "PCR al nacer no descarta sepsis neonatal",
		insight:
			"La proteína C reactiva (PCR) en las primeras 6 horas de vida tiene una sensibilidad menor al 50% para detectar sepsis neonatal, incluso en casos confirmados por cultivo.",
		whyNonObvious:
			"La PCR es el marcador inflamatorio más solicitado en sepsis neonatal, pero su negatividad temprana crea falsa seguridad y retrasa el inicio de antibióticos en casos que lo requieren.",
		audience: "Pediatras y neonatólogos",
		sourceNote:
			"Cochrane Review CD012369 (2021); NICE Neonatal Sepsis Guidelines (2021)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Sepsis neonatal", "PCR", "Biomarcadores", "Diagnóstico"],
	},
	{
		id: "sepsis-neonatal-lactancia-materna-prevencion",
		rank: 39,
		title: "Lactancia materna reduce 50% el riesgo de sepsis neonatal tardía",
		insight:
			"La lactancia materna exclusiva reduce en un 50% el riesgo de sepsis neonatal tardía (>72 horas) comparada con la alimentación con fórmula, gracias a la transferencia de IgA secretora y oligosacáridos.",
		whyNonObvious:
			"La leche materna se considera principalmente un alimento, pero su función inmunológica es tan potente que supera a muchos antibióticos profilácticos en prevención de sepsis tardía.",
		audience: "Neonatólogos, parteras y consejeras de lactancia",
		sourceNote:
			"WHO, Breastfeeding and Infection Prevention (2022); Cochrane Review CD009644 (2019)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Sepsis neonatal", "Lactancia materna", "IgA", "Prevención"],
	},
	{
		id: "sepsis-neonatal-algoritmo-kaiser",
		rank: 40,
		title:
			"El algoritmo de Kaiser reduce antibioticoterapia innecesaria un 50%",
		insight:
			"El uso del algoritmo de sepsis neonatal de Kaiser Permanente (evaluación seriada con examen físico + signos vitales + biomarcadores cada 4 horas) reduce la exposición a antibióticos en un 50% sin aumentar sepsis confirmada.",
		whyNonObvious:
			"La práctica habitual es iniciar antibióticos ante cualquier factor de riesgo (corioamnionitis, RPM), pero la observación clínica seriada con este algoritmo es igual de segura y reduce resistencias bacterianas.",
		audience: "Neonatólogos y equipos de sala de parto",
		sourceNote:
			"Kaiser Permanente Neonatal Sepsis Algorithm (Pediatrics, 2020); NICE Guidelines (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Sepsis neonatal", "Kaiser", "Algoritmo", "Antibióticos"],
	},
	{
		id: "sepsis-neonatal-liquido-amniotico-meconial",
		rank: 41,
		title: "Líquido meconial no siempre indica infección neonatal",
		insight:
			"El líquido amniótico meconial tiene una sensibilidad del 50-60% y una especificidad del 65-70% para sepsis neonatal, lo que significa que 1 de cada 3 neonatos con líquido meconial recibe antibióticos innecesarios.",
		whyNonObvious:
			"El líquido meconial se asocia instintivamente con sufrimiento fetal e infección, pero la mayoría de los neonatos a término con líquido meconial no tienen sepsis y no requieren antibióticos.",
		audience: "Obstetras, neonatólogos y parteras",
		sourceNote:
			"Cochrane Review CD012369 (2021); WHO, Neonatal Infection Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Sepsis neonatal", "Líquido meconial", "Antibióticos"],
	},
	{
		id: "sepsis-neonatal-clorhexidina-cordon-oms",
		rank: 42,
		title:
			"Clorhexidina en el cordón umbilical reduce mortalidad neonatal un 34%",
		insight:
			"La aplicación tópica de clorhexidina al 7.1% en el muñón umbilical en las primeras 24 horas de vida reduce la mortalidad neonatal en un 34% en contextos de alto riesgo de infección (parto domiciliario).",
		whyNonObvious:
			"El cuidado del cordón umbilical se considera una intervención menor, pero en contextos de parto domiciliario limpio salva más vidas que muchas intervenciones tecnológicas de alto costo.",
		audience: "Parteras comunitarias y atención primaria neonatal",
		sourceNote:
			"Cochrane Review CD015521 (2020); OMS, Cuidado del Cordón (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Sepsis neonatal", "Clorhexidina", "Cordón", "Mortalidad neonatal"],
	},
	{
		id: "sepsis-neonatal-bacterias-multirresistentes-uci",
		rank: 43,
		title:
			"El 70% de las sepsis neonatales en UCI son por bacterias multirresistentes",
		insight:
			"En unidades de cuidados intensivos neonatales de ingresos medios y bajos, el 70% de las sepsis neonatales confirmadas por cultivo son causadas por bacterias resistentes a los antibióticos de primera línea.",
		whyNonObvious:
			"Las guías estándar recomiendan ampicilina + gentamicina como primera línea, pero en unidades con alta prevalencia de resistencia, esta combinación no cubre el 50% de los patógenos.",
		audience: "Neonatólogos, infectólogos y gestores hospitalarios",
		sourceNote:
			"WHO, Antimicrobial Resistance in Neonatal Sepsis (2023); Lancet Microbe (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Sepsis neonatal", "Resistencia", "UCI neonatal", "Antibióticos"],
	},
	{
		id: "sepsis-neonatal-rmn-pretermino-profilaxis",
		rank: 44,
		title: "RPM pretérmino: 48 horas de latencia reducen sepsis neonatal",
		insight:
			"El manejo expectante de la ruptura prematura de membranas (RPM) pretérmino con corticoides + antibióticos (eritromicina) durante 48 horas reduce la sepsis neonatal en un 30% comparado con inducción inmediata.",
		whyNonObvious:
			"La indicación intuitiva ante bolsa rota es 'sacar al bebé cuanto antes para evitar infección', pero 48 horas de latencia permiten que los corticoides maduren el pulmón y reducen la sepsis global.",
		audience: "Obstetras y neonatólogos",
		sourceNote:
			"Cochrane Review CD001058 (Kenyon et al., 2020); ORACLE Trial (Lancet, 2001)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Sepsis neonatal", "RPM", "Corticoides", "Latencia", "Pretérmino"],
	},
	{
		id: "sepsis-neonatal-piel-con-piel-infeccion",
		rank: 45,
		title: "El contacto piel con piel no aumenta riesgo de sepsis neonatal",
		insight:
			"El contacto piel con piel inmediato posparto no aumenta la incidencia de sepsis neonatal confirmada ni sospechada, incluso en neonatos prematuros o de bajo peso al nacer.",
		whyNonObvious:
			"Existe la creencia de que separar al neonato para 'asepsia' y procedimientos reduce infecciones, pero la colonización temprana con la microbiota materna es protectora, no riesgosa.",
		audience: "Neonatólogos, parteras y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD009644 (2019); WHO, Skin-to-Skin Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Sepsis neonatal", "Piel con piel", "Microbiota", "Kanguro"],
	},

	// ===== LOTE 4: Parto prematuro (rank 46-55) =====
	{
		id: "prematuro-progesterona-vaginal-prevencion",
		rank: 46,
		title: "Progesterona vaginal reduce parto prematuro un 45% en cuello corto",
		insight:
			"La progesterona vaginal (200 mg/día) en gestantes con cuello uterino corto (<25 mm en ecografía de segundo trimestre) reduce el parto prematuro antes de las 34 semanas en un 45% y la morbilidad neonatal en un 60%.",
		whyNonObvious:
			"Históricamente la progesterona se usaba solo en antecedente de parto prematuro, pero el cribado ecográfico universal de longitud cervical permite identificar a las gestantes asintomáticas que se benefician.",
		audience: "Obstetras, ecografistas y equipos de control prenatal",
		sourceNote:
			"Cochrane Review CD010939 (Dodd et al., 2019); OPPTIMUM Trial (Lancet, 2016)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Progesterona", "Cuello corto", "Ecografía"],
	},
	{
		id: "prematuro-cerclaje-cervical-emergencia",
		rank: 47,
		title: "Cerclaje de emergencia salva embarazos con dilatación cervical",
		insight:
			"El cerclaje cervical de emergencia (antes de las 24 semanas con dilatación >1 cm y membranas visibles) prolonga el embarazo en promedio 9-10 semanas más comparado con reposo, con una tasa de supervivencia neonatal del 70-80%.",
		whyNonObvious:
			"Cuando el cuello ya está dilatado y se ven las membranas, la tendencia es diagnosticar incompetencia cervical irreversible, pero el cerclaje urgente tiene resultados sorprendentemente buenos.",
		audience: "Obstetras de alto riesgo",
		sourceNote: "Cochrane Review CD012867 (2019); SUPPORT Trial (AJOG, 2021)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: [
			"Parto prematuro",
			"Cerclaje",
			"Incompetencia cervical",
			"Emergencia",
		],
	},
	{
		id: "prematuro-corticoides-antenatales-sobrevida",
		rank: 48,
		title: "Corticoides antenatales reducen muerte neonatal un 40%",
		insight:
			"Una única tanda de corticosteroides antenatales (betametasona 24 mg o dexametasona 24 mg) entre las 24 y 34 semanas reduce la mortalidad neonatal en un 40%, el síndrome de dificultad respiratoria en un 35% y la hemorragia intraventricular en un 45%.",
		whyNonObvious:
			"Los corticoides se asocian con efectos adversos a largo plazo, pero un solo curso antenatal tiene un perfil beneficio-riesgo abrumadoramente favorable que salva vidas neonatales.",
		audience: "Obstetras y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD004454 (McGoldrick et al., 2020); WHO, Corticoides Prenatales (2022)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Parto prematuro", "Corticoides", "SDR", "Mortalidad neonatal"],
	},
	{
		id: "prematuro-sulfato-magnesio-neuroproteccion",
		rank: 49,
		title:
			"Sulfato de magnesio antes del parto prematuro protege el cerebro neonatal",
		insight:
			"La administración de sulfato de magnesio (dosis de carga 4 g + mantenimiento 1 g/h) en gestantes con amenaza de parto prematuro antes de las 32 semanas reduce la parálisis cerebral infantil en un 30% (NNT 56).",
		whyNonObvious:
			"El sulfato de magnesio se conoce principalmente para tratar la eclampsia, no como neuroprotector fetal. Su indicación prenatal para proteger el cerebro del prematuro está subutilizada globalmente.",
		audience: "Obstetras y neonatólogos",
		sourceNote:
			"Cochrane Review CD004661 (Doyle et al., 2020); SOGC Neuroprotection Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: [
			"Parto prematuro",
			"Sulfato de magnesio",
			"Neuroprotección",
			"Parálisis cerebral",
		],
	},
	{
		id: "prematuro-tocoliticos-bloqueo-canales-calcio",
		rank: 50,
		title: "Nifedipina y atosiban son igualmente efectivos como tocolíticos",
		insight:
			"El bloqueante de canales de calcio (nifedipina) y el antagonista de oxitocina (atosiban) tienen la misma eficacia para prolongar el embarazo 48 horas (tasa de éxito 86-90%), con menor riesgo de efectos adversos maternos que los beta-miméticos (terbutalina).",
		whyNonObvious:
			"La terbutalina y otros beta-miméticos se usaron como tocolíticos de primera línea durante décadas, pero tienen tasas de efectos adversos maternos (taquicardia, hipokalemia, hiperglucemia) del 40%, comparadas con <5% para nifedipina.",
		audience: "Obstetras y equipos de alto riesgo obstétrico",
		sourceNote:
			"Cochrane Review CD012976 (2020); APOSTEL Studies (AJOG, 2016-2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Tocolíticos", "Nifedipina", "Atosiban"],
	},
	{
		id: "prematuro-longitud-cervical-universal",
		rank: 51,
		title:
			"Cribado universal de longitud cervical a las 20-24 semanas reduce prematuridad",
		insight:
			"La medición universal de la longitud cervical por ecografía transvaginal entre las 20 y 24 semanas detecta al 60% de las gestantes con riesgo de parto prematuro espontáneo, permitiendo intervenciones preventivas.",
		whyNonObvious:
			"La mayoría de los sistemas de salud no realizan cribado universal de longitud cervical, solo a gestantes con antecedente de parto prematuro, perdiendo al 60% de las que tendrán un parto antes de término.",
		audience: "Gestores de políticas de control prenatal",
		sourceNote:
			"Cochrane Review CD010939 (Dodd et al., 2019); NICE Preterm Birth Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Longitud cervical", "Cribado", "Ecografía"],
	},
	{
		id: "prematuro-fibronectina-fetal-triaje",
		rank: 52,
		title: "Fibronectina fetal negativa descarta parto prematuro en 7-14 días",
		insight:
			"La fibronectina fetal (fFN) en flujo vaginal tiene un valor predictivo negativo del 97-99% para parto prematuro en los siguientes 7-14 días, permitiendo evitar hospitalizaciones innecesarias y administrar tocolíticos solo cuando es necesario.",
		whyNonObvious:
			"Ante una amenaza de parto prematuro, la mayoría de los protocolos indican ingreso y corticoides independientemente del riesgo real. La fFN permite ser más selectivo y reducir intervenciones innecesarias.",
		audience: "Obstetras y equipos de triaje obstétrico",
		sourceNote:
			"Cochrane Review CD013507 (2021); NICE Preterm Labor Guidelines (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Fibronectina fetal", "Triaje", "Biomarcadores"],
	},
	{
		id: "prematuro-cesarea-sistematica-no-mejora",
		rank: 53,
		title: "Cesárea sistemática en prematuros no mejora resultados neonatales",
		insight:
			"La cesárea electiva en presentación de nalgas para prematuros antes de las 37 semanas no mejora la mortalidad ni la morbilidad neonatal severa comparada con el parto vaginal en centros con experiencia.",
		whyNonObvious:
			"La cesárea se indica sistemáticamente en prematuros con nalgas bajo el supuesto de que 'protege' al neonato, pero la evidencia muestra que la vía del parto no modifica los resultados cuando hay experiencia en parto pélvico.",
		audience: "Obstetras y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD006596 (Hoffmeyr et al., 2019); PREMODA Study (AJOG, 2006)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Cesárea", "Nalgas", "Presentación pélvica"],
	},
	{
		id: "prematuro-periodontal-enfermedad-riesgo",
		rank: 54,
		title: "Enfermedad periodontal duplica riesgo de parto prematuro",
		insight:
			"La periodontitis materna moderada a severa se asocia con un riesgo 2.2 veces mayor de parto prematuro antes de las 37 semanas y 2.5 veces mayor de bajo peso al nacer, independientemente de otros factores de riesgo conocidos.",
		whyNonObvious:
			"La salud bucal no se considera parte del control prenatal rutinario, pero la inflamación periodontal genera mediadores inflamatorios sistémicos que pueden desencadenar trabajo de parto prematuro.",
		audience: "Equipos de control prenatal y odontólogos",
		sourceNote:
			"Cochrane Review CD009297 (Iheozor-Ejiofor et al., 2020); OMS, Salud Bucal en Gestación (2021)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Parto prematuro", "Periodontitis", "Salud bucal", "Inflamación"],
	},
	{
		id: "prematuro-brecha-global-mortalidad",
		rank: 55,
		title:
			"El parto prematuro es la principal causa de muerte en menores de 5 años",
		insight:
			"Las complicaciones del parto prematuro causan aproximadamente 900,000 muertes al año en niños menores de 5 años, y el 75% de estas muertes podrían prevenirse con intervenciones costo-efectivas (corticoides, kanguro, antibióticos).",
		whyNonObvious:
			"La prematuridad se percibe como un problema de países de altos ingresos por la tecnología neonatal, pero el 85% de los partos prematuros ocurren en países de ingresos bajos y medios donde la mortalidad es más alta.",
		audience: "Gestores de salud pública y decisores políticos",
		sourceNote:
			"WHO, Preterm Birth Fact Sheet (2023); Lancet Series, Born Too Soon (2020)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Parto prematuro", "Mortalidad infantil", "Global", "Inequidad"],
	},

	// ===== LOTE 5: Asfixia perinatal (rank 56-65) =====
	{
		id: "asfixia-reanimacion-90-segundos-cordon",
		rank: 56,
		title:
			"Esperar 60-90 segundos antes de pinzar el cordón en reanimación mejora resultados",
		insight:
			"En neonatos que requieren reanimación, la espera de 60-90 segundos antes del pinzamiento del cordón combinada con reanimación inicial con el cordón intacto (resucitación con cordón) mejora la estabilidad hemodinámica y reduce la hemorragia intraventricular.",
		whyNonObvious:
			"El protocolo de reanimación neonatal (NRP) tradicional separa al neonato inmediatamente para la reanimación en la cuna cálida, pero mantener el cordón intacto durante los primeros pasos de reanimación tiene beneficios hemodinámicos.",
		audience: "Neonatólogos y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD012756 (2020); NRP/AAP Cord Management Guidelines (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Asfixia", "Reanimación", "Cordón", "Pinzamiento tardío"],
	},
	{
		id: "asfixia-hipotermia-terapeutica-neuroproteccion",
		rank: 57,
		title:
			"Hipotermia terapéutica reduce muerte y discapacidad en asfixia un 30%",
		insight:
			"La hipotermia terapéutica (33-34°C durante 72 horas iniciada dentro de las primeras 6 horas de vida) en neonatos con encefalopatía hipóxico-isquémica moderada a severa reduce la muerte o discapacidad neurológica mayor a los 18 meses en un 30% (NNT 7).",
		whyNonObvious:
			"Enfriar a un recién nacido parece contraintuitivo cuando el instinto es calentarlo, pero la hipotermia reduce el metabolismo cerebral y la cascada excitotóxica que sigue a la asfixia.",
		audience: "Neonatólogos y unidades de cuidados intensivos neonatales",
		sourceNote:
			"Cochrane Review CD003311 (Jacobs et al., 2019); NICE Hypothermia Guidelines (2021)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Asfixia", "Hipotermia", "Neuroprotección", "Encefalopatía"],
	},
	{
		id: "asfixia-magnestio-no-neuroproteccion",
		rank: 58,
		title: "El sulfato de magnesio posnatal no es neuroprotector en asfixia",
		insight:
			"A diferencia de su uso antenatal en prematuros, el sulfato de magnesio administrado después del nacimiento en neonatos con asfixia perinatal no reduce la muerte o discapacidad severa a los 18 meses (RR 1.01, IC 95% 0.92-1.11).",
		whyNonObvious:
			"Basándose en los resultados positivos en neuroprotección antenatal, muchos neonatólogos extrapolaron el beneficio del magnesio al período posnatal, pero los ensayos clínicos no confirman esta hipótesis.",
		audience: "Neonatólogos",
		sourceNote:
			"Cochrane Review CD004661 (Doyle et al., 2020); MagNet Trial (Lancet, 2021)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Asfixia", "Sulfato de magnesio", "Neuroprotección", "Posnatal"],
	},
	{
		id: "asfixia-liquido-meconial-aspiracion-no",
		rank: 59,
		title: "La aspiración de vía aérea en meconio NO está recomendada",
		insight:
			"La aspiración endotraqueal rutinaria de neonatos con líquido amniótico meconial (incluso espeso) no reduce la incidencia de síndrome de aspiración meconial (SAM) ni la mortalidad comparada con reanimación estándar sin aspiración.",
		whyNonObvious:
			"La aspiración rutinaria de la vía aérea en neonatos con meconio fue un pilar de la reanimación neonatal durante 30 años, pero la evidencia demostró que no solo no beneficia, sino que retrasa la ventilación.",
		audience: "Neonatólogos y equipos de sala de parto",
		sourceNote:
			"Cochrane Review CD014594 (2021); NRP/AAP Meconium Guidelines (2020)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Asfixia", "Meconio", "Aspiración", "Reanimación"],
	},
	{
		id: "asfixia-pH-arterial-cordon-umbilical",
		rank: 60,
		title:
			"pH de cordón <7.0 confirma asfixia pero no predice parálisis cerebral",
		insight:
			"Un pH en sangre de arteria umbilical <7.0 tiene una sensibilidad del 70% para detectar asfixia perinatal, pero su valor predictivo positivo para parálisis cerebral futura es menor al 1%.",
		whyNonObvious:
			"El pH bajo del cordón umbilical genera enorme ansiedad en equipos médicos y familias, pero la mayoría de los neonatos con acidosis severa al nacer no desarrollan secuelas neurológicas.",
		audience: "Neonatólogos, obstetras y servicios jurídicos obstétricos",
		sourceNote:
			"ACOG/AAP Guidelines, Neonatal Encephalopathy (2019); Lancet Neurology (2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Asfixia", "pH cordón", "Parálisis cerebral", "Acidosis"],
	},
	{
		id: "asfixia-oxigeno-21porciento-reanimacion",
		rank: 61,
		title:
			"La reanimación neonatal debe iniciar con aire (21% O2), no oxígeno puro",
		insight:
			"Iniciar la reanimación neonatal con aire ambiente (21% de oxígeno) comparado con oxígeno al 100% reduce la mortalidad neonatal en un 30% en neonatos a término y en un 20% en prematuros.",
		whyNonObvious:
			"El oxígeno puro se consideró esencial para la reanimación neonatal desde los años 80, pero la evidencia demostró que la hiperoxia es más dañina que la hipoxia breve en el neonato asfíctico.",
		audience: "Neonatólogos, parteras y equipos de reanimación",
		sourceNote:
			"Cochrane Review CD005954 (Welsford et al., 2021); ILCOR Guidelines (2020)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Asfixia", "Oxígeno", "Reanimación", "Hiperoxia"],
	},
	{
		id: "asfixia-encefalopatia-grado-leve-secuelas",
		rank: 62,
		title:
			"La encefalopatía hipóxico-isquémica leve tiene secuelas a largo plazo",
		insight:
			"Los neonatos con encefalopatía hipóxico-isquémica (EHI) leve tienen 2-3 veces más riesgo de presentar alteraciones cognitivas, conductuales y de aprendizaje a los 5-7 años, comparados con neonatos sanos de similar edad gestacional.",
		whyNonObvious:
			"La EHI leve se considera un cuadro autolimitado que 'no deja secuelas', pero estudios longitudinales muestran que afecta funciones ejecutivas y rendimiento escolar que se manifiestan años después.",
		audience: "Neonatólogos, pediatras del desarrollo y neuropediatras",
		sourceNote:
			"Cochrane Review CD003311 (Jacobs et al., 2019); Lancet Child & Adolescent Health (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Asfixia", "Encefalopatía", "Neurodesarrollo", "Seguimiento"],
	},
	{
		id: "asfixia-cesarea-no-mejora-asfixia-cronica",
		rank: 63,
		title: "La cesárea no previene la asfixia perinatal crónica",
		insight:
			"Las asfixias perinatales de origen crónico (insuficiencia placentaria, restricción de crecimiento intrauterino, preeclampsia) no se previenen con la cesárea de urgencia, ya que el daño cerebral ocurrió antes del inicio del trabajo de parto.",
		whyNonObvious:
			"La cesárea de emergencia se percibe como la solución para cualquier asfixia, pero la mayoría de los casos de encefalopatía neonatal se originan antes del trabajo de parto (eventos antenatales) y no son prevenibles por la vía del parto.",
		audience: "Obstetras, neonatólogos y peritos médico-legales",
		sourceNote:
			"ACOG, Neonatal Encephalopathy & Cerebral Palsy (2019); Lancet Neurology Series (2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Asfixia", "Cesárea", "Encefalopatía", "Antenatal"],
	},
	{
		id: "asfixia-biomarcadores-tempranos-enol",
		rank: 64,
		title:
			"La enolasa neuronal sérica a las 6 horas predice severidad de asfixia",
		insight:
			"La enolasa neuronal específica (NSE) en suero a las 6 horas de vida tiene un área bajo la curva ROC de 0.91 para predecir EHI moderada-severa, superando al muestreo de cordón único y al examen neurológico temprano en precisión.",
		whyNonObvious:
			"La evaluación de la asfixia se basa principalmente en pH de cordón y examen neurológico clínico (Samat), pero los biomarcadores séricos tempranos como la NSE tienen mayor capacidad predictiva que ambos.",
		audience: "Neonatólogos y unidades de cuidados intensivos neonatales",
		sourceNote:
			"Cochrane Review CD012369 (2021); Pediatrics, NSE Biomarker Study (2022)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["Asfixia", "NSE", "Biomarcadores", "Encefalopatía"],
	},
	{
		id: "asfixia-cuidados-paliativos-perinatales",
		rank: 65,
		title:
			"Cuidados paliativos perinatales son una opción válida en asfixia severa",
		insight:
			"En casos de asfixia perinatal con pronóstico neurológico catastrófico confirmado (ausencia de actividad eléctrica cerebral sostenida, lactato elevado persistente), los cuidados paliativos perinatales son una alternativa ética y clínicamente válida al soporte vital intensivo.",
		whyNonObvious:
			"La tendencia en medicina perinatal es 'hacer todo lo posible', pero los cuidados paliativos en asfixia severa con pronóstico neurológico devastador pueden prevenir sufrimiento innecesario y respetar la autonomía familiar.",
		audience: "Neonatólogos, comités de ética y equipos de cuidados paliativos",
		sourceNote:
			"WHO, Palliative Care in Neonatology (2022); Lancet Neonatal Palliative Care Series (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["Asfixia", "Cuidados paliativos", "Ética", "Pronóstico neurológico"],
	},

	// ===== LOTE 6: Infecciones - VIH, sífilis, malaria (rank 66-75) =====
	{
		id: "infecciones-vih-tar-carga-viral-indetectable",
		rank: 66,
		title: "Carga viral indetectable = 0% de transmisión vertical del VIH",
		insight:
			"Gestantes con VIH en terapia antirretroviral (TAR) con carga viral <1000 copias/mL al momento del parto tienen un riesgo de transmisión vertical menor al 0.5%. En aquellas con <50 copias/mL, la tasa es cercana a 0%.",
		whyNonObvious:
			"Históricamente el VIH en el embarazo implicaba cesárea electiva y suspensión de lactancia, pero con TAR efectivo, la transmisión vertical es prevenible y el parto vaginal es seguro.",
		audience: "Obstetras, infectólogos y gestantes con VIH",
		sourceNote:
			"OMS, Eliminación Transmisión VIH (2023); BHIVA Pregnancy Guidelines (2022)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["VIH", "Transmisión vertical", "TAR", "Carga viral", "Cesárea"],
	},
	{
		id: "infecciones-sifilis-bencilpenicilina-curativa",
		rank: 67,
		title:
			"Una dosis de penicilina bencílica en sífilis temprana previene sífilis congénita",
		insight:
			"La administración de penicilina G bencílica 2.4 millones UI IM en una sola dosis antes de las 28 semanas reduce la sífilis congénita en un 98%. El tratamiento después de las 28 semanas o con sífilis tardía requiere 3 dosis semanales.",
		whyNonObvious:
			"A pesar de ser una cura simple y de bajo costo, la sífilis congénita sigue causando >300,000 muertes fetales y neonatales al año globalmente, principalmente por fallas en el cribado prenatal.",
		audience: "Equipos de control prenatal y atención primaria",
		sourceNote:
			"OMS, Eliminación Sífilis Congénita (2023); CDC STI Guidelines (2021)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Sífilis", "Sífilis congénita", "Penicilina", "Cribado prenatal"],
	},
	{
		id: "infecciones-malaria-iptp-sulfadoxina-pirimetamina",
		rank: 68,
		title: "Sulfadoxina-pirimetamina reduce malaria placentaria un 75%",
		insight:
			"El tratamiento preventivo intermitente (TPI) con sulfadoxina-pirimetamina (3 dosis durante el segundo y tercer trimestre) en gestantes de áreas endémicas reduce la malaria placentaria en un 75% y la anemia materna severa en un 40%.",
		whyNonObvious:
			"El TPI se administra incluso a gestantes sin síntomas de malaria ni prueba positiva, pero la quimioprofilaxis intermitente es más efectiva que tratar solo los casos sintomáticos para mejorar resultados perinatales.",
		audience: "Equipos de control prenatal en regiones endémicas",
		sourceNote:
			"Cochrane Review CD004431 (Garner et al., 2020); OMS, Malaria en Gestación (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Malaria", "Sulfadoxina-pirimetamina", "TPI", "Anemia", "Placenta"],
	},
	{
		id: "infecciones-vih-lactancia-materna-tar",
		rank: 69,
		title: "Lactancia materna con TAR tiene <1% de transmisión de VIH",
		insight:
			"En contextos donde la lactancia materna es la opción más segura (falta de agua potable, alta mortalidad infantil por infecciones), la lactancia materna exclusiva con TAR materno tiene un riesgo de transmisión postnatal del VIH menor al 1%.",
		whyNonObvious:
			"La recomendación histórica para madres con VIH era 'no amamantar nunca', pero en países de ingresos bajos y medios, la lactancia artificial tiene mayor mortalidad infantil por desnutrición e infecciones que el riesgo de transmisión del VIH.",
		audience: "Infectólogos, pediatras y consejeras de lactancia",
		sourceNote: "WHO, Breastfeeding and HIV (2023); PROMISE Study (NEJM, 2020)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["VIH", "Lactancia materna", "TAR", "Transmisión postnatal"],
	},
	{
		id: "infecciones-sifilis-cribado-universal-obligatorio",
		rank: 70,
		title:
			"El cribado universal de sífilis en el primer trimestre es costo-efectivo",
		insight:
			"El cribado universal de sífilis en la primera consulta prenatal con VDRL/RPR tiene un costo-efectividad de US$ 50-150 por caso de sífilis congénita evitado, incluso en poblaciones con prevalencia tan baja como 0.1%.",
		whyNonObvious:
			"En países con baja prevalencia de sífilis, algunos sistemas de salud reservan el cribado para gestantes de alto riesgo, pero el cribado universal sigue siendo costo-efectivo incluso en poblaciones de muy baja prevalencia.",
		audience: "Gestores de salud pública y decisores políticos",
		sourceNote:
			"OMS, Inversión en Salud Materna (2023); CDC Cost-Effectiveness Analysis (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Sífilis", "Cribado", "Costo-efectividad", "Salud pública"],
	},
	{
		id: "infecciones-malaria-mosquitero-embarazo",
		rank: 71,
		title:
			"El mosquitero tratado con insecticida reduce malaria gestacional un 40%",
		insight:
			"El uso de mosquiteros tratados con insecticida de larga duración (MTILD) durante el embarazo reduce la malaria gestacional en un 40%, la malaria placentaria en un 35% y el bajo peso al nacer en un 20% en áreas de transmisión estable.",
		whyNonObvious:
			"Los mosquiteros se consideran una intervención genérica de salud pública, pero su impacto específico en resultados obstétricos es comparable al de muchas intervenciones farmacológicas.",
		audience: "Equipos de control prenatal en áreas endémicas",
		sourceNote:
			"Cochrane Review CD004431 (Garner et al., 2020); OMS, Malaria Prevention (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Malaria", "Mosquiteros", "Prevención", "Bajo peso al nacer"],
	},
	{
		id: "infecciones-vih-parto-vaginal-seguro",
		rank: 72,
		title: "Parto vaginal en VIH con carga viral indetectable es seguro",
		insight:
			"Gestantes con VIH con carga viral <400 copias/mL en la semana 36 pueden planificar un parto vaginal electivo sin aumento del riesgo de transmisión vertical comparado con cesárea electiva.",
		whyNonObvious:
			"Múltiples guías aún recomiendan cesárea electiva en gestantes con VIH independientemente de la carga viral, cuando la evidencia muestra que con carga viral indetectable el parto vaginal tiene el mismo riesgo de transmisión.",
		audience: "Obstetras e infectólogos",
		sourceNote:
			"BHIVA Pregnancy Guidelines (2022); WHO, PMTCT Guidelines (2023)",
		evidenceStatus: "needs_review",
		riskLevel: "high",
		tags: ["VIH", "Parto vaginal", "Cesárea", "Carga viral"],
	},
	{
		id: "infecciones-torch-citomegalovirus-valaciclovir",
		rank: 73,
		title: "Valaciclovir reduce transmisión vertical de CMV un 71%",
		insight:
			"La administración de valaciclovir oral (8 g/día) a gestantes con infección primaria por citomegalovirus (CMV) en el primer trimestre reduce la transmisión vertical en un 71% (de 40% a 11%), sin efectos adversos maternos severos.",
		whyNonObvious:
			"El CMV congénito no tenía tratamiento prenatal disponible hasta hace pocos años. Tradicionalmente se ofrecía solo consejería y opción de interrupción, pero el valaciclovir cambió el panorama terapéutico.",
		audience: "Obstetras, infectólogos y medicina fetal",
		sourceNote:
			"Cochrane Review CD012940 (2021); VALACYCLOVIR Trial (Lancet, 2020)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["CMV", "Valaciclovir", "TORCH", "Transmisión vertical"],
	},
	{
		id: "infecciones-vph-cribado-prenatal-no-recomendado",
		rank: 74,
		title: "El cribado de VPH en el embarazo no está recomendado",
		insight:
			"No hay evidencia que respalde el cribado rutinario de VPH en gestantes asintomáticas, ya que la infección por VPH no aumenta el riesgo obstétrico adverso ni modifica la conducta durante el embarazo o el parto.",
		whyNonObvious:
			"La presencia de VPH en el control prenatal se reporta incidentalmente por citología y genera ansiedad innecesaria en la gestante, además de que los cambios citológicos del embarazo pueden interpretarse erróneamente.",
		audience: "Obstetras y equipos de control prenatal",
		sourceNote:
			"ACOG, HPV in Pregnancy (2020); WHO, Cervical Cancer Screening (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["VPH", "Cribado", "Prenatal", "Citología"],
	},
	{
		id: "infecciones-tuberculosis-embarazo-isoniazida",
		rank: 75,
		title:
			"La isoniacida profiláctica en embarazadas con VIH reduce TB en un 40%",
		insight:
			"La terapia preventiva con isoniacida (300 mg/día durante 6 meses) en gestantes con VIH que viven en áreas de alta prevalencia de tuberculosis reduce la incidencia de TB activa en un 40% y la mortalidad global en un 35%.",
		whyNonObvious:
			"El embarazo se consideró históricamente una contraindicación para isoniacida profiláctica por temor a hepatotoxicidad, pero el riesgo de TB diseminada en gestantes VIH positivas supera ampliamente el riesgo de hepatotoxicidad.",
		audience: "Infectólogos, obstetras y equipos de control prenatal",
		sourceNote:
			"WHO, TB Preventive Therapy in Pregnancy (2022); Cochrane Review CD013690 (2021)",
		evidenceStatus: "needs_review",
		riskLevel: "medium",
		tags: ["TB", "Isoniacida", "VIH", "Profilaxis", "Hepatotoxicidad"],
	},

	// ===== LOTE 7: Nutrición materna (rank 76-85) =====
	{
		id: "nutricion-acido-folico-neurotubo",
		rank: 76,
		title:
			"Ácido fólico pre-concepcional reduce defectos de tubo neural un 70%",
		insight:
			"La suplementación con ácido fólico (400-800 mcg/día) desde al menos 1 mes antes de la concepción hasta las 12 semanas reduce la incidencia de defectos del tubo neural (DTN) en un 70%. Dosis más altas (4-5 mg/día) están indicadas en antecedente de DTN o epilepsia.",
		whyNonObvious:
			"El 50% de los embarazos no son planificados, por lo que la suplementación comienza cuando ya se cerró el tubo neural (días 22-28 posconcepción). La fortificación de harinas es la estrategia poblacional más efectiva.",
		audience: "Gestantes en edad fértil y equipos de atención primaria",
		sourceNote:
			"Cochrane Review CD007950 (De-Regil et al., 2019); OMS, Ácido Fólico (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: [
			"Nutrición",
			"Ácido fólico",
			"Defectos tubo neural",
			"Preconcepción",
		],
	},
	{
		id: "nutricion-hierro-anemia-materna",
		rank: 77,
		title: "Hierro suplementario reduce anemia materna en un 70%",
		insight:
			"La suplementación diaria con hierro (30-60 mg/día) durante el embarazo reduce la incidencia de anemia materna al término en un 70% y la deficiencia de hierro en un 57%, con una reducción marginal pero significativa del bajo peso al nacer.",
		whyNonObvious:
			"El hierro suplementario causa estreñimiento y náuseas, lo que lleva a baja adherencia. La suplementación intermitente (3 veces/semana) tiene eficacia similar con menos efectos adversos.",
		audience: "Equipos de control prenatal y nutricionistas",
		sourceNote:
			"Cochrane Review CD009095 (Peña-Rosas et al., 2019); OMS, Suplementación Hierro (2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Nutrición", "Hierro", "Anemia", "Suplementación"],
	},
	{
		id: "nutricion-yodo-deficiencia-cognitivo",
		rank: 78,
		title:
			"La deficiencia de yodo en el embarazo reduce el CI infantil 10-15 puntos",
		insight:
			"La deficiencia severa de yodo durante el embarazo reduce el cociente intelectual infantil en 10-15 puntos en promedio. La suplementación con yodo (250 mcg/día) antes de la concepción o en el primer trimestre previene completamente el daño neurológico.",
		whyNonObvious:
			"El desarrollo neurológico fetal depende del yodo materno desde las primeras semanas de gestación. Cuando el diagnóstico de deficiencia se hace al nacer, el daño cognitivo ya es irreversible.",
		audience: "Nutricionistas, endocrinólogos y equipos de control prenatal",
		sourceNote:
			"Cochrane Review CD003635 (Zhou et al., 2019); OMS, Yodo en Gestación (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Nutrición", "Yodo", "CI", "Neurodesarrollo", "Tiroides"],
	},
	{
		id: "nutricion-vitamina-d-embarazo",
		rank: 79,
		title:
			"Vitamina D en el embarazo reduce el riesgo de bajo peso al nacer en un 40%",
		insight:
			"La suplementación con vitamina D (600-4000 UI/día) durante el embarazo reduce la incidencia de bajo peso al nacer en un 40%, la preeclampsia en un 30% y la diabetes gestacional en un 15% en poblaciones con deficiencia basal.",
		whyNonObvious:
			"La vitamina D se asocia principalmente con la salud ósea, pero sus receptores están presentes en la placenta y modulan la respuesta inmunológica, la angiogénesis y la función endotelial.",
		audience: "Nutricionistas, obstetras y equipos de control prenatal",
		sourceNote:
			"Cochrane Review CD013656 (2021); WHO, Vitamin D in Pregnancy (2022)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Nutrición", "Vitamina D", "Bajo peso", "Preeclampsia"],
	},
	{
		id: "nutricion-dieta-mediterranea-gestacional",
		rank: 80,
		title: "La dieta mediterránea reduce diabetes gestacional un 35%",
		insight:
			"La adherencia a una dieta mediterránea suplementada con aceite de oliva virgen extra y frutos secos (30 g/día) desde el primer trimestre reduce la incidencia de diabetes mellitus gestacional en un 35% y el aumento de peso gestacional excesivo en un 40%.",
		whyNonObvious:
			"La restricción calórica fue la estrategia tradicional para prevenir la diabetes gestacional, pero la calidad de la grasa (monoinsaturada de oliva y frutos secos) es más importante que la cantidad total de calorías.",
		audience: "Nutricionistas, obstetras y gestantes",
		sourceNote: "Cochrane Review CD011275 (2020); STORK Study (BMJ, 2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: [
			"Nutrición",
			"Dieta mediterránea",
			"Diabetes gestacional",
			"Aceite de oliva",
		],
	},
	{
		id: "nutricion-zinc-embarazo-resultados",
		rank: 81,
		title: "El zinc reduce el parto prematuro en un 14%",
		insight:
			"La suplementación con zinc (15-25 mg/día) durante el embarazo reduce el parto prematuro en un 14% (RR 0.86, IC 95% 0.76-0.98), especialmente en gestantes con bajo nivel socioeconómico o ingesta inadecuada de zinc.",
		whyNonObvious:
			"La suplementación con zinc no es parte del estándar prenatal en la mayoría de los países. Solo el 10% de los suplementos prenatales comerciales contienen zinc, a pesar de la evidencia de su beneficio.",
		audience: "Nutricionistas y equipos de control prenatal",
		sourceNote:
			"Cochrane Review CD000297 (Carducci et al., 2021); WHO, Zinc Supplementation (2022)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Nutrición", "Zinc", "Parto prematuro", "Suplementación"],
	},
	{
		id: "nutricion-obesidad-materna-riesgo-fetal",
		rank: 82,
		title: "Obesidad materna duplica riesgo de muerte fetal",
		insight:
			"Gestantes con obesidad (IMC ≥30 kg/m²) tienen 2.1 veces más riesgo de muerte fetal intrauterina comparadas con gestantes de peso normal, y el riesgo aumenta a 3.5 veces en obesidad mórbida (IMC ≥40 kg/m²).",
		whyNonObvious:
			"El riesgo de muerte fetal asociado a obesidad es comparable al de la edad materna avanzada (>40 años), sin embargo, la obesidad recibe menos atención como factor de riesgo obstétrico en la consejería prenatal.",
		audience: "Equipos de control prenatal y nutrición",
		sourceNote:
			"WHO, Obesity and Pregnancy (2021); Lancet Obesity Series (2023)",
		evidenceStatus: "approved",
		riskLevel: "high",
		tags: ["Nutrición", "Obesidad", "Muerte fetal", "IMC"],
	},
	{
		id: "nutricion-suplementos-multimicronutrientes",
		rank: 83,
		title: "Suplementos multimicronutrientes reducen bajo peso al nacer un 15%",
		insight:
			"La suplementación prenatal con multimicronutrientes (15 vitaminas y minerales, incluyendo hierro, ácido fólico, zinc, yodo, cobre, selenio) reduce el bajo peso al nacer en un 15% y la mortalidad neonatal en un 10% comparada con solo hierro y ácido fólico.",
		whyNonObvious:
			"La OMS recomienda solo hierro y ácido fólico en el embarazo, pero el metaanálisis más grande de 23 ensayos (>140,000 gestantes) muestra que los multimicronutrientes tienen beneficios adicionales sobre la dupla tradicional.",
		audience: "Gestores de políticas de salud materna",
		sourceNote:
			"Cochrane Review CD049058 (2021); Lancet Maternal & Child Nutrition Series (2020)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: [
			"Nutrición",
			"Multimicronutrientes",
			"Bajo peso",
			"Mortalidad neonatal",
		],
	},
	{
		id: "nutricion-proteinas-balance-energetico",
		rank: 84,
		title: "Suplementos proteico-energéticos balanceados reducen muerte fetal",
		insight:
			"Los suplementos proteico-energéticos balanceados en gestantes desnutridas reducen el riesgo de muerte fetal en un 31% y el bajo peso al nacer en un 32%, mientras que los suplementos con alto contenido proteico sin balance energético pueden ser perjudiciales.",
		whyNonObvious:
			"No todas las proteínas son iguales. Los suplementos con >25% de calorías provenientes de proteínas sin suficiente energía total se asocian con restricción de crecimiento fetal, posiblemente por toxicidad por nitrógeno.",
		audience:
			"Nutricionistas y equipos de control prenatal en poblaciones vulnerables",
		sourceNote:
			"Cochrane Review CD000032 (Ota et al., 2019); OMS, Nutrición Materna (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Nutrición", "Proteínas", "Desnutrición", "Muerte fetal"],
	},
	{
		id: "nutricion-cafeina-embarazo-límite",
		rank: 85,
		title:
			"Más de 200 mg/día de cafeína duplica riesgo de restricción de crecimiento fetal",
		insight:
			"El consumo materno de cafeína >200 mg/día (equivalente a 2 tazas de café) se asocia con un riesgo 2 veces mayor de restricción de crecimiento fetal y un 20% más de riesgo de bajo peso al nacer, con una relación dosis-respuesta lineal.",
		whyNonObvious:
			"El café y los energizantes se consideran sustancias de bajo riesgo durante el embarazo, pero la cafeína atraviesa la barrera placentaria sin metabolizarse (el feto carece de CYP1A2), acumulándose en el compartimento fetal.",
		audience: "Gestantes y equipos de consejería prenatal",
		sourceNote:
			"Cochrane Review CD013612 (2021); ACOG, Caffeine in Pregnancy (2020)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Nutrición", "Cafeína", "Crecimiento fetal", "Bajo peso"],
	},

	// ===== LOTE 8: Diversos - lactancia, tabaco, salud mental (rank 86-94) =====
	{
		id: "diversos-lactancia-exclusiva-6-meses",
		rank: 86,
		title:
			"Lactancia materna exclusiva 6 meses reduce mortalidad infantil un 80%",
		insight:
			"La lactancia materna exclusiva durante los primeros 6 meses de vida reduce la mortalidad infantil por infecciones (diarrea, neumonía) en un 80% comparada con la alimentación con fórmula en países de ingresos bajos y medios.",
		whyNonObvious:
			"La leche materna se considera un alimento, pero su función como primera 'vacuna' (IgA secretora, factor bífido, lactoferrina) es biológicamente más relevante que su aporte calórico en los primeros meses.",
		audience: "Gestantes, familiares y profesionales de la salud",
		sourceNote:
			"Cochrane Review CD009644 (2019); OMS, Lactancia Materna (2021)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Lactancia", "Mortalidad infantil", "Inmunidad", "6 meses"],
	},
	{
		id: "diversos-tabaco-placenta-insuficiencia",
		rank: 87,
		title:
			"Fumar en el embarazo reduce el peso al nacer 200 gramos en promedio",
		insight:
			"El tabaquismo materno durante el embarazo reduce el peso al nacer en 150-250 gramos en promedio y duplica el riesgo de parto prematuro y bajo peso al nacer, con un efecto dosis-dependiente (a más cigarrillos, menor peso).",
		whyNonObvious:
			"La nicotina es vasoconstrictora placentaria potente, pero muchas gestantes creen que 'un cigarrillo menos' es suficiente. No hay umbral seguro: incluso 1-4 cigarrillos/día reducen significativamente el peso fetal.",
		audience: "Gestantes y equipos de cesación tabáquica prenatal",
		sourceNote:
			"Cochrane Review CD012078 (Claire et al., 2020); OMS, Tabaco y Embarazo (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Tabaco", "Bajo peso", "Nicotina", "Cesación", "Placenta"],
	},
	{
		id: "diversos-salud-mental-depresion-posparto-edimburgo",
		rank: 88,
		title:
			"La escala de Edimburgo detecta depresión posparto con 86% de sensibilidad",
		insight:
			"La Escala de Depresión Postnatal de Edimburgo (EPDS) con un punto de corte ≥10 tiene una sensibilidad del 86% y una especificidad del 87% para detectar depresión posparto mayor en las primeras 6-8 semanas posparto.",
		whyNonObvious:
			"La depresión posparto se diagnostica clínicamente en menos del 50% de los casos en países de ingresos altos. El cribado sistemático con EPDS no se implementa universalmente a pesar de su validación en >50 idiomas.",
		audience: "Equipos de puerperio y atención primaria",
		sourceNote:
			"Cochrane Review CD013319 (2021); OMS, Salud Mental Perinatal (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Salud mental", "Depresión posparto", "EPDS", "Cribado"],
	},
	{
		id: "diversos-lactancia-cancer-materno",
		rank: 89,
		title:
			"Lactancia materna reduce cáncer de mama un 6% por cada año acumulado",
		insight:
			"Cada 12 meses acumulados de lactancia materna reduce el riesgo de cáncer de mama invasivo en un 6%, independientemente de otros factores de riesgo. La lactancia de 12 meses o más reduce el cáncer ovárico epitelial en un 30%.",
		whyNonObvious:
			"La lactancia beneficia principalmente al bebé en el imaginario social, pero su efecto protector contra cánceres hormonales es comparable al de la ooforectomía profiláctica en algunos subgrupos de riesgo.",
		audience: "Gestantes y equipos de consejería en lactancia",
		sourceNote:
			"Lancet Breastfeeding Series (2023); WHO/IARC, Lactancia y Cáncer (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Lactancia", "Cáncer de mama", "Cáncer de ovario", "Prevención"],
	},
	{
		id: "diversos-alcohol-sindrome-fetal-alcoholico",
		rank: 90,
		title: "No hay umbral seguro de alcohol en el embarazo",
		insight:
			"El consumo de alcohol en cualquier trimestre del embarazo se asocia con alteraciones del neurodesarrollo fetal (trastornos del espectro alcohólico fetal, TEAF) sin un umbral mínimo establecido. El patrón de consumo intenso episódico (binge drinking) es el más lesivo.",
		whyNonObvious:
			"La creencia popular de que 'una copa de vino ocasional no hace daño' persiste incluso entre profesionales de la salud, pero la evidencia no identifica un nivel seguro y el TEAF es 100% prevenible.",
		audience: "Gestantes y equipos de consejería prenatal",
		sourceNote:
			"Cochrane Review CD013684 (2021); OMS, Alcohol y Embarazo (2022)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: ["Alcohol", "TEAF", "Síndrome alcohólico fetal", "Neurodesarrollo"],
	},
	{
		id: "diversos-ejercicio-piso-pelvico-incontinencia",
		rank: 91,
		title:
			"Ejercicios de piso pélvico en el embarazo reducen incontinencia urinaria posparto un 50%",
		insight:
			"El entrenamiento supervisado de los músculos del piso pélvico (3 series de 8-12 contracciones máximas por día) iniciado en el segundo trimestre reduce la incontinencia urinaria posparto en un 50% (NNT 4), con beneficio mantenido a 12 meses.",
		whyNonObvious:
			"La incontinencia urinaria posparto se considera una 'consecuencia inevitable' del embarazo y el parto, pero es prevenible con un programa de entrenamiento simple y de bajo costo durante el control prenatal.",
		audience: "Gestantes, kinesiólogas y parteras",
		sourceNote:
			"Cochrane Review CD007471 (Woodley et al., 2020); IUGA Guidelines (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Piso pélvico", "Incontinencia", "Kinesiología", "Prevención"],
	},
	{
		id: "diversos-parto-en-agua-no-mejora-resultados",
		rank: 92,
		title:
			"El parto en agua no mejora resultados perinatales comparado con parto fuera del agua",
		insight:
			"El parto en agua (inmersión durante el expulsivo) no reduce la duración del trabajo de parto, la necesidad de analgesia, ni las tasas de cesárea comparado con la inmersión solo durante la dilatación. Tampoco se ha asociado con mayor riesgo neonatal grave en embarazos de bajo riesgo con estrictos criterios de selección.",
		whyNonObvious:
			"El parto en agua ganó popularidad como alternativa 'más fisiológica y menos dolorosa', pero los ensayos clínicos aleatorizados no demuestran beneficios obstétricos cuantificables sobre la inmersión en agua solo durante la dilatación.",
		audience: "Parteras, obstetras y gestantes",
		sourceNote:
			"Cochrane Review CD009886 (Cluett et al., 2020); NICE Intrapartum Care (2022)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: [
			"Parto en agua",
			"Inmersión",
			"Dilatación",
			"Expulsivo",
			"Evidencia",
		],
	},
	{
		id: "diversos-continuidad-partera-mortalidad",
		rank: 93,
		title:
			"Modelo de continuidad de partera reduce mortalidad perinatal un 20%",
		insight:
			"El modelo de atención con continuidad de partera (misma partera durante todo el embarazo, parto y puerperio) reduce la mortalidad perinatal en un 20% y las intervenciones obstétricas (episiotomía, parto instrumental) en un 30%, comparado con el modelo médico fragmentado de baja y mediana complejidad.",
		whyNonObvious:
			"La atención obstétrica se organiza crecientemente en equipos médicos rotativos por eficiencia hospitalaria, pero el vínculo continuo con una partera conocida mejora resultados perinatales más que muchas tecnologías de alto costo.",
		audience: "Gestores de servicios de obstetricia y parteras",
		sourceNote:
			"Cochrane Review CD012667 (Sandall et al., 2020); WHO, Midwifery Model (2021)",
		evidenceStatus: "approved",
		riskLevel: "medium",
		tags: [
			"Partería",
			"Continuidad de cuidados",
			"Mortalidad perinatal",
			"Modelo de atención",
		],
	},
	{
		id: "diversos-doulas-resultados-perinatales",
		rank: 94,
		title: "El acompañamiento continuo por doula reduce cesáreas un 30%",
		insight:
			"El apoyo continuo durante el trabajo de parto por una doula (mujer entrenada sin funciones clínicas) reduce la probabilidad de cesárea en un 30%, el uso de analgesia farmacológica en un 35% y la duración del trabajo de parto en 40 minutos en promedio.",
		whyNonObvious:
			"Las doulas no reemplazan al personal médico ni realizan intervenciones clínicas, pero su presencia continua y soporte emocional modifica significativamente los resultados obstétricos medibles.",
		audience: "Gestantes, gestores hospitalarios y equipos obstétricos",
		sourceNote:
			"Cochrane Review CD012667 (Bohren et al., 2020); WHO, Companionship during Labor (2021)",
		evidenceStatus: "approved",
		riskLevel: "low",
		tags: ["Doula", "Acompañamiento", "Cesárea", "Trabajo de parto"],
	},
];

export function listFacts() {
	return facts;
}

export function findFact(id: string) {
	return facts.find((fact) => fact.id === id);
}
