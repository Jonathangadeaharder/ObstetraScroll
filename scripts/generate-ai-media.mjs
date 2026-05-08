import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const aiservicesRoot = resolve(projectRoot, "../AIServices");
const outRoot = resolve(projectRoot, "static/generated-media");
const reelsDir = join(outRoot, "reels");
const audioDir = join(outRoot, "audio");
const backgroundsDir = join(outRoot, "backgrounds");
const keyframesDir = join(outRoot, "keyframes");
const segmentsDir = join(outRoot, "segments");
const postersDir = join(outRoot, "posters");

const pythonPath = [
	resolve(aiservicesRoot, "packages/aiservices_core/src"),
	resolve(aiservicesRoot, "packages/image2video/src"),
	resolve(aiservicesRoot, "packages/text2image/src"),
	resolve(aiservicesRoot, "packages/text2audio/src"),
].join(":");

mkdirSync(reelsDir, { recursive: true });
mkdirSync(audioDir, { recursive: true });
mkdirSync(backgroundsDir, { recursive: true });
mkdirSync(keyframesDir, { recursive: true });
mkdirSync(segmentsDir, { recursive: true });
mkdirSync(postersDir, { recursive: true });

const SEGMENT_SECONDS = 8;
const SEGMENT_FPS = 8;
const SEGMENT_WIDTH = 384;
const SEGMENT_HEIGHT = 672;
const SEGMENT_STEPS = 4;

const items = [
	{
		slug: "reel-01-delayed-cord-clamping-preterm",
		title: "El clampeo tardío no es solo tema de parto de bajo riesgo",
		seed: 3101,
		backgroundPrompt:
			"vertical documentary editorial video for midwife education, calm birth room details, hands preparing cord clamp checklist, no visible patient identity, natural Latin American clinical light, gentle camera movement, 9:16",
		script: `Mirá esto con calma, pero con mucha atención clínica. El clampeo tardío no es una frase para repetir en automático. En muchos nacimientos prematuros, esperar un poco antes de clampear puede sumar, pero solo si la estabilización urgente no pide otra cosa.

La parte no obvia es esta: muchas veces el equipo asocia clampeo tardío con parto de término, bebé vigoroso y escena tranquila. En prematurez, en cambio, la transición puede ser más frágil, y por eso la decisión necesita lectura de contexto.

Pensalo como una pausa de seguridad. Primero: ¿qué dice el protocolo local para esta edad gestacional? Segundo: ¿el recién nacido necesita intervención inmediata que no puede esperar? Tercero: ¿el equipo ya acordó quién mira el reloj, quién observa respiración, tono y color, y quién comunica el siguiente paso?

El punto para una partera no es defender una regla suelta. Es convertir la recomendación en una conversación de equipo. Si el contexto permite esperar, se espera con vigilancia. Si no permite esperar, se actúa y se registra por qué.

Antes de publicar o enseñar este dato, revisá guía clínica, límites y contraindicaciones. En obstetricia, una buena idea no vale sola: vale cuando está situada.`,
	},
	{
		slug: "reel-02-silent-postpartum-urinary-retention",
		title: "La retención urinaria posparto puede venir en silencio",
		seed: 3102,
		backgroundPrompt:
			"vertical documentary editorial video for postpartum midwife education, quiet puerperium room, checklist, water glass, clinical notes, respectful no patient identity, soft natural light, slow handheld motion, 9:16",
		script: `Un detalle de puerperio que se aprende con cancha: una vejiga llena después del parto no siempre se siente como ganas fuertes de orinar. Y esa ausencia de urgencia puede engañar.

Después del nacimiento cambian varias cosas a la vez. Puede haber analgesia, cansancio, dolor perineal, edema, miedo a moverse, dificultad para levantarse o una sensibilidad distinta. Entonces la persona puede decir “no tengo ganas”, pero el cuadro completo contar otra historia.

¿Por qué importa? Porque la retención urinaria puede aumentar malestar, interferir con el descanso, complicar la movilidad, sumar dolor y, en algunos contextos, mezclarse con la lectura del sangrado o la involución uterina. No es para alarmar: es para mirar mejor.

En la práctica, pensá en un mini-check. Hora del parto. Última micción. Cantidad aproximada. Dolor. Distensión. Movilidad. Tipo de analgesia. Sangrado. Sensación de presión. Y lo más importante: qué umbrales usa tu institución para evaluar, medir o escalar.

La clave educativa es no transformar “orinar después del parto” en una orden fría. Acompañá con lenguaje cuidadoso: “vamos a cuidar también tu vejiga, aunque todavía no sientas ganas”. Eso baja ansiedad y mejora observación.

Para publicar este reel, agregá siempre protocolo local y límites. Lo scrolleable no tiene que ser superficial.`,
	},
	{
		slug: "reel-03-skin-to-skin-temperature",
		title: "Piel con piel también es termorregulación",
		seed: 3103,
		backgroundPrompt:
			"vertical documentary editorial video for newborn thermal care education, warm clinical room, blankets, thermometer, skin to skin educational setup without identifiable faces, Latin American natural tones, soft slow motion, 9:16",
		script: `Piel con piel no es solo una imagen tierna para redes. También es fisiología. En los primeros minutos, el recién nacido está ajustando respiración, circulación, glucosa y temperatura. El contacto temprano puede ayudar a sostener calor, pero no funciona por magia.

La parte menos obvia es que el vínculo emocional y el cuidado térmico no compiten. Van juntos. Para que el piel con piel sea seguro y útil, importan el secado, la posición, la vía aérea visible, el gorro o manta cuando corresponde, la vigilancia del color, el tono, la respiración y la temperatura.

Entonces, cuando lo enseñes, no digas solamente “ponelo piel con piel”. Decí: “piel con piel bien posicionado, seco, observado y acompañado”. Esa frase cambia el foco: de una postal bonita a una intervención de cuidado.

Como mini-check para estudiantes: uno, contacto directo y cobertura adecuada. Dos, cabeza visible y cuello sin flexión excesiva. Tres, respiración y color observables. Cuatro, temperatura según protocolo. Cinco, comunicación clara con la familia para que sepa qué estamos mirando.

La emoción del momento importa muchísimo. Pero una partera con oficio también ve la fisiología debajo de esa emoción. Antes de publicar, revisá estándares neonatales y prevención de hipotermia. El mensaje tiene que ser cálido, sí, pero también clínicamente responsable.`,
	},
];

function run(command, args, options = {}) {
	const result = spawnSync(command, args, {
		cwd: options.cwd ?? projectRoot,
		env: { ...process.env, ...options.env },
		stdio: "inherit",
	});
	if (result.status !== 0) {
		throw new Error(
			`${command} ${args.join(" ")} failed with exit ${result.status}`,
		);
	}
}

function read(command, args) {
	const result = spawnSync(command, args, {
		cwd: projectRoot,
		encoding: "utf8",
	});
	if (result.status !== 0) {
		throw new Error(`${command} ${args.join(" ")} failed: ${result.stderr}`);
	}
	return result.stdout.trim();
}

function runAIServices(args) {
	run("uv", args, {
		cwd: aiservicesRoot,
		env: {
			HF_HUB_DISABLE_XET: "1",
			PYTHONPATH: pythonPath,
			IMAGE2VIDEO_MODEL_DIR: "dgrauet/ltx-2.3-mlx-q8",
		},
	});
}

function durationSeconds(path) {
	return Number(
		read("ffprobe", [
			"-v",
			"error",
			"-show_entries",
			"format=duration",
			"-of",
			"default=noprint_wrappers=1:nokey=1",
			path,
		]),
	);
}

function concatFilePath(slug) {
	return join(segmentsDir, `${slug}-concat.txt`);
}

function shellEscapeForConcat(path) {
	return path.replaceAll("'", "'\\''");
}

function writeConcatFile(slug, segmentPaths) {
	const body = segmentPaths
		.map((path) => `file '${shellEscapeForConcat(path)}'`)
		.join("\n");
	const path = concatFilePath(slug);
	writeFileSync(path, `${body}\n`);
	return path;
}

for (const item of items) {
	const audioPath = join(audioDir, `${item.slug}.wav`);
	const continuousVideoPath = join(
		backgroundsDir,
		`${item.slug}-continuous.mp4`,
	);
	const videoPath = join(reelsDir, `${item.slug}.mp4`);
	const posterPath = join(postersDir, `${item.slug}.png`);
	const firstFramePath = join(keyframesDir, `${item.slug}-frame-000.png`);

	runAIServices([
		"run",
		"--package",
		"text2audio",
		"text2audio",
		"--text",
		item.script,
		"--output",
		audioPath,
		"--voice",
		"partera-rioplatense",
		"--speed",
		"1.0",
		"--seed",
		String(item.seed),
	]);

	const audioDuration = durationSeconds(audioPath);
	if (audioDuration < 60 || audioDuration > 180) {
		throw new Error(
			`${item.slug} voiceover duration ${audioDuration.toFixed(
				1,
			)}s is outside the requested 1-3 minute range`,
		);
	}

	runAIServices([
		"run",
		"--package",
		"text2image",
		"text2image",
		"--prompt",
		`${item.backgroundPrompt}, first frame for a continuous educational reel, stable composition, no text overlay`,
		"--output",
		firstFramePath,
		"--width",
		String(SEGMENT_WIDTH),
		"--height",
		String(SEGMENT_HEIGHT),
		"--steps",
		"20",
		"--seed",
		String(item.seed),
	]);

	const segmentCount = Math.ceil(audioDuration / SEGMENT_SECONDS);
	const segmentPaths = [];
	let currentFramePath = firstFramePath;

	for (let segmentIndex = 0; segmentIndex < segmentCount; segmentIndex += 1) {
		const segmentNumber = String(segmentIndex + 1).padStart(3, "0");
		const segmentPath = join(
			segmentsDir,
			`${item.slug}-segment-${segmentNumber}.mp4`,
		);
		const endFramePath = join(
			keyframesDir,
			`${item.slug}-frame-${segmentNumber}.png`,
		);
		const continuityPrompt = `${item.backgroundPrompt}, continue from the exact previous frame with preserved room layout, same lighting, same objects, smooth slow motion, no jump cut, no text overlay`;

		runAIServices([
			"run",
			"--package",
			"image2video",
			"image2video",
			"--input",
			currentFramePath,
			"--prompt",
			continuityPrompt,
			"--output",
			segmentPath,
			"--seconds",
			String(SEGMENT_SECONDS),
			"--fps",
			String(SEGMENT_FPS),
			"--width",
			String(SEGMENT_WIDTH),
			"--height",
			String(SEGMENT_HEIGHT),
			"--steps",
			String(SEGMENT_STEPS),
			"--seed",
			String(item.seed + segmentIndex),
		]);

		run("ffmpeg", [
			"-y",
			"-sseof",
			"-0.05",
			"-i",
			segmentPath,
			"-frames:v",
			"1",
			"-update",
			"1",
			endFramePath,
		]);

		segmentPaths.push(segmentPath);
		currentFramePath = endFramePath;
	}

	const concatPath = writeConcatFile(item.slug, segmentPaths);

	run("ffmpeg", [
		"-y",
		"-f",
		"concat",
		"-safe",
		"0",
		"-i",
		concatPath,
		"-t",
		audioDuration.toFixed(3),
		"-c",
		"copy",
		continuousVideoPath,
	]);

	run("ffmpeg", [
		"-y",
		"-i",
		continuousVideoPath,
		"-i",
		audioPath,
		"-t",
		audioDuration.toFixed(3),
		"-vf",
		"scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,format=yuv420p",
		"-c:v",
		"libx264",
		"-preset",
		"medium",
		"-crf",
		"23",
		"-c:a",
		"aac",
		"-b:a",
		"160k",
		"-shortest",
		videoPath,
	]);

	run("ffmpeg", [
		"-y",
		"-ss",
		"00:00:02",
		"-i",
		videoPath,
		"-frames:v",
		"1",
		"-update",
		"1",
		posterPath,
	]);

	item.durationSec = Math.round(audioDuration);
	item.videoPath = `/generated-media/reels/${item.slug}.mp4`;
	item.audioPath = `/generated-media/audio/${item.slug}.wav`;
	item.backgroundPath = `/generated-media/backgrounds/${item.slug}-continuous.mp4`;
	item.posterPath = `/generated-media/posters/${item.slug}.png`;
	item.segmentCount = segmentCount;
	item.continuity =
		"Each image2video segment starts from the final frame extracted from the previous segment.";
}

writeFileSync(
	join(outRoot, "manifest.json"),
	JSON.stringify(
		{
			generatedAt: new Date().toISOString(),
			note: "Medios generados con AIServices text2audio + text2image + image2video. Cada segmento image2video empieza con el ultimo frame extraido del segmento anterior para preservar continuidad; ffmpeg solo concatena, muxea voz y extrae posters.",
			items,
		},
		null,
		2,
	),
);
