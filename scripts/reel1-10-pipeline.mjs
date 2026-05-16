import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outDir = join(projectRoot, "static", "generated-media", "reel-poc");
const manifestPath = join(outDir, "manifest.json");
mkdirSync(outDir, { recursive: true });

// First 10 facts - short scripts
const SCRIPTS = [
  { id: "01-oxitocina", title: "10 UI de oxitocina en el 3er periodo reduce HPP un 60%",
    text: "Diez unidades de oxitocina intramuscular dentro del minuto posterior al parto. Eso es todo lo que separa una hemorragia prevenible de una emergencia obstétrica. Sesenta por ciento menos de hemorragia postparto comparado con manejo expectante. Y sin embargo muchos equipos esperan signos de separación placentaria antes de administrarla. La ventana óptima es el primer minuto. No esperes. Oxitocina profiláctica: el minuto uno salva vidas." },
  { id: "02-manejo-activo", title: "El manejo activo del 3er periodo duplica la protección contra HPP",
    text: "Manejo activo versus expectante. Oxitocina más tracción controlada del cordón más masaje uterino. Reduce HPP severa en más del 50 por ciento. Solo necesitas tratar a 14 pacientes para prevenir una hemorragia severa. Persiste el mito de que el manejo expectante es más fisiológico. Pero la evidencia es clara. El manejo activo reduce mortalidad y no aumenta complicaciones. Tres pasos. Una vida." },
  { id: "03-acido-tranexamico", title: "Ácido tranexámico en HPP: cada minuto cuenta",
    text: "Ácido tranexámico. Un gramo intravenoso. Dentro de las primeras tres horas reduce muerte por sangrado treinta y uno por ciento. Pero si lo das dentro de la primera hora la reducción llega al sesenta y ocho por ciento. El estudio WOMAN Trial lo demostró con más de veinte mil pacientes. Y aún así muchos equipos lo usan como última opción. No esperes. El TXA es primera línea en HPP. Cada minuto que pasa, pierdes protección." },
  { id: "04-masaje-uterino", title: "El masaje uterino cada 15 minutos no previene HPP",
    text: "Masaje uterino cada quince minutos durante dos horas. Suena a protocolo estricto. Pero la evidencia dice que no reduce la incidencia de hemorragia. No. Tiene. Más. Efecto. Que evaluar a demanda cuando hay signos de alerta. Esto no significa que el masaje no sirva. Significa que hacerlo programado sin indicación no agrega beneficio. Evalúa el tono uterino cuando toca. No cada quince minutos por rutina." },
  { id: "05-carbetocina", title: "Carbetocina estable supera a oxitocina termolábil",
    text: "La oxitocina necesita refrigeración constante entre dos y ocho grados. En países de ingresos bajos y medios, hasta cuarenta por ciento pierde eficacia por ruptura de la cadena de frío. La carbetocina es estable a temperatura ambiente hasta treinta grados. Y no es inferior a la oxitocina para prevenir hemorragia. Cien microgramos intravenosos o intramusculares. Sin nevera. Sin excusas." },
  { id: "06-misoprostol", title: "Misoprostol sublingual salva vidas donde no hay oxitocina",
    text: "Ochocientos microgramos de misoprostol sublingual. Cuando no hay oxitocina inyectable, esta pastilla reduce la necesidad de transfusiones en treinta por ciento. Sí, produce escalofríos y a veces fiebre. Pero el perfil beneficio riesgo en contextos sin acceso a oxitocina es abrumadoramente favorable. El misoprostol no es ideal. Es lo que tienes cuando no hay nada más. Y salva vidas." },
  { id: "07-traccion-cordon", title: "La tracción controlada del cordón no previene HPP por sí sola",
    text: "La tracción controlada del cordón se enseña como paso esencial del manejo activo. Pero el beneficio principal viene de la oxitocina, no de la tracción. Estudiado: tracción controlada sin oxitocina no reduce hemorragia severa ni necesidad de transfusión. Esto no es teoría. Es Cochrane. La oxitocina es la heroína. La tracción es el acompañante. No inviertas el orden." },
  { id: "08-compresion-bimanual", title: "Compresión bimanual uterina: la maniobra que todos deberían conocer",
    text: "Cuando no tienes uterotónicos a mano y el útero sangra, tienes diez segundos para actuar. Compresión bimanual del útero: una mano en el abdomen, la otra en la vagina, comprimes el istmo. No requiere insumos. No requiere electricidad. Solo conocimiento. Pero muchos equipos nunca la practican en simulaciones. Es el puente entre el sangrado y la cirugía. Practícala antes de que la necesites." },
  { id: "09-balon-taponamiento", title: "El balón de taponamiento uterino evita cirugías mayores en HPP",
    text: "Balón de Bakri o balón de condón. Tienen ochenta y cinco a noventa y cinco por ciento de éxito para controlar hemorragia por atonía. Evitan laparotomía. Evitan histerectomía. Su costo es la principal barrera pero existen alternativas artesanales con eficacia similar. Un balón de condón con suero fisiológico. Cuesta centavos. Puede salvar un útero y una vida. El taponamiento no es la última opción. Es la oportunidad." },
  { id: "10-ligadura-arterial", title: "Ligadura de arterias uterinas preserva fertilidad en HPP refractaria",
    text: "Hemorragia que no responde a uterotónicos. La tentación es histerectomía. Pero la ligadura bilateral de arterias uterinas técnica de O'Leary tiene ochenta a noventa por ciento de éxito. Preserva el útero. Preserva la fertilidad. Es cirugía, sí. Pero es cirugía conservadora. No toda HPP que no cede con fármacos necesita histerectomía. La devascularización es una opción. Y debe estar en tu arsenal." }
];

const VOICE_ID = "D6fGRDoSy1WFiaIpAbC7";
const API_KEY = process.env.ELEVENLABS_TOKEN;
if (!API_KEY) throw new Error("ELEVENLABS_TOKEN not set");

const CRAZY_TOKEN = "sk-CGkQU7BHDRWamWo7btwJ5ZVYgemSKY7eIYTMdklaf8qjH8Ru";
const BASE_IMAGE = "https://media.crazyrouter.com/task-artifacts/2026/05/16/sync-image/20260516122138357856396qZBjAPRm-1.png";

const manifest = [];

// Generate 3 kling video clips per reel + 1 ElevenLabs audio per reel
for (let i = 0; i < SCRIPTS.length; i++) {
  const reel = SCRIPTS[i];
  const reelNum = String(i + 1).padStart(2, "0");

  // 3 different prompts for 3 clips
  const prompts = [
    `${reel.title}, médica obstetra latina hablando a cámara, gestos suaves con manos, expresión profesional, fondo clínico`,
    `Médica obstetra explicando un concepto clínico a cámara, tono serio pero accesible, manos gesticulando, consultorio obstetricia`,
    `Obstetra profesional mirando a cámara, fondo con ecógrafo y materiales clínicos, expresión de enseñanza, ambiente médico`
  ];

  for (let clip = 0; clip < 3; clip++) {
    const clipLabel = `clip-${clip + 1}`;
    manifest.push({
      type: "kling-video",
      slug: `reel-${reelNum}-${clipLabel}`,
      model: "kling-v1-6",
      prompt: prompts[clip],
      image: BASE_IMAGE,
      status: "pending"
    });
  }

  manifest.push({
    type: "elevenlabs-audio",
    slug: `reel-${reelNum}-audio`,
    voice: VOICE_ID,
    text: reel.text,
    status: "pending"
  });
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest: ${manifest.length} tasks (${SCRIPTS.length} reels × 3 video clips + 1 audio each)`);

// Fire all 30 kling requests in parallel
async function fireKling(item) {
  const resp = await fetch("https://crazyrouter.com/v1/video/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CRAZY_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: item.model,
      prompt: item.prompt,
      image: item.image
    })
  });
  const data = await resp.json();
  item.taskId = data.task_id || data.id;
  item.status = "queued";
  console.log(`  ${item.slug} -> task: ${item.taskId}`);
}

console.log("\nDispatching 30 kling video jobs...");
const videoTasks = manifest.filter(m => m.type === "kling-video").map(fireKling);
await Promise.all(videoTasks);

// Fire all 10 ElevenLabs audio requests in parallel
async function fireElevenLabs(item) {
  const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${item.voice}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      "Accept": "audio/mpeg"
    },
    body: JSON.stringify({
      model_id: "eleven_multilingual_v2",
      text: item.text,
      voice_settings: {
        stability: 0.35,
        similarity_boost: 0.85,
        speed: 1.0
      }
    })
  });
  if (!resp.ok) {
    const err = await resp.text();
    console.error(`  ${item.slug} FAILED: ${err}`);
    item.status = "failed";
    return;
  }
  const buffer = await resp.arrayBuffer();
  const outPath = join(outDir, `${item.slug}.mp3`);
  writeFileSync(outPath, Buffer.from(buffer));
  item.status = "done";
  item.filePath = outPath;
  console.log(`  ${item.slug} -> saved (${buffer.byteLength}B)`);
}

console.log("\nGenerating 11 ElevenLabs audios...");
const audioTasks = manifest.filter(m => m.type === "elevenlabs-audio").map(fireElevenLabs);
await Promise.all(audioTasks);

// Save updated manifest
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest saved to ${manifestPath}`);
console.log("All tasks dispatched. Run reel1-10-poll.mjs to check status.");
