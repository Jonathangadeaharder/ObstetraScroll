import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import type { AIServicesOperation } from "$lib/types";

const aiservicesRoot = resolve(process.cwd(), "../AIServices");
const aiservicesPythonPath = [
	resolve(aiservicesRoot, "packages/aiservices_core/src"),
	resolve(aiservicesRoot, "packages/text2video/src"),
	resolve(aiservicesRoot, "packages/image2video/src"),
	resolve(aiservicesRoot, "packages/text2image/src"),
	resolve(aiservicesRoot, "packages/text2audio/src"),
].join(":");

export type AIServicesRequest = {
	prompt?: string;
	text?: string;
	input?: string;
	output: string;
	seconds?: number;
	fps?: number;
	width?: number;
	height?: number;
	steps?: number;
	seed?: number;
	voice?: string;
	speed?: number;
};

export type AIServicesCommand = {
	cwd: string;
	command: string;
	args: string[];
	env?: Record<string, string>;
	operation: AIServicesOperation;
	output: string;
};

function option(name: string, value: string | number | undefined): string[] {
	if (value === undefined) return [];
	return [name, String(value)];
}

export function buildAIServicesCommand(
	operation: AIServicesOperation,
	request: AIServicesRequest,
): AIServicesCommand {
	const args: string[] = [];

	if (operation === "text2video") {
		args.push(
			"run",
			"--package",
			"text2video",
			"text2video",
			...option("--prompt", request.prompt),
			...option("--output", request.output),
			...option("--seconds", request.seconds),
			...option("--fps", request.fps),
			...option("--width", request.width),
			...option("--height", request.height),
			...option("--steps", request.steps),
			...option("--seed", request.seed),
		);
	}

	if (operation === "image2video") {
		args.push(
			"run",
			"--package",
			"image2video",
			"image2video",
			...option("--input", request.input),
			...option("--prompt", request.prompt),
			...option("--output", request.output),
			...option("--seconds", request.seconds),
			...option("--fps", request.fps),
			...option("--width", request.width),
			...option("--height", request.height),
			...option("--steps", request.steps),
			...option("--seed", request.seed),
		);
	}

	if (operation === "text2image") {
		args.push(
			"run",
			"--package",
			"text2image",
			"text2image",
			...option("--prompt", request.prompt),
			...option("--output", request.output),
			...option("--width", request.width),
			...option("--height", request.height),
			...option("--steps", request.steps),
			...option("--seed", request.seed),
		);
	}

	if (operation === "text2audio") {
		args.push(
			"run",
			"--package",
			"text2audio",
			"text2audio",
			...option("--text", request.text ?? request.prompt),
			...option("--output", request.output),
			...option("--voice", request.voice),
			...option("--speed", request.speed),
			...option("--seed", request.seed),
		);
	}

	return {
		cwd: aiservicesRoot,
		command: "uv",
		args,
		env: {
			HF_HUB_DISABLE_XET: "1",
			IMAGE2VIDEO_MODEL_DIR: "dgrauet/ltx-2.3-mlx-q8",
			PYTHONPATH: aiservicesPythonPath,
			TEXT2VIDEO_MODEL_DIR: "dgrauet/ltx-2.3-mlx-q8",
		},
		operation,
		output: request.output,
	};
}

function runCommand(command: AIServicesCommand) {
	return new Promise<string>((resolvePromise, reject) => {
		let stderr = "";
		let stdout = "";
		const child = spawn(command.command, command.args, {
			cwd: command.cwd,
			env: { ...process.env, ...command.env },
			stdio: ["ignore", "pipe", "pipe"],
		});

		child.stdout.on("data", (chunk) => {
			stdout += chunk;
		});
		child.stderr.on("data", (chunk) => {
			stderr += chunk;
		});
		child.on("error", reject);
		child.on("close", (code) => {
			if (code === 0) {
				resolvePromise(command.output);
				return;
			}
			reject(
				new Error(
					`${command.operation} failed with exit ${code}: ${stderr || stdout}`,
				),
			);
		});
	});
}

export class AIServicesClient {
	async text2video(request: AIServicesRequest) {
		return runCommand(buildAIServicesCommand("text2video", request));
	}

	async image2video(request: AIServicesRequest) {
		return runCommand(buildAIServicesCommand("image2video", request));
	}

	async text2image(request: AIServicesRequest) {
		return runCommand(buildAIServicesCommand("text2image", request));
	}

	async text2audio(request: AIServicesRequest) {
		return runCommand(buildAIServicesCommand("text2audio", request));
	}

	mediaPath(...parts: string[]) {
		return resolve(process.cwd(), "static", "generated-media", ...parts);
	}

	mediaDirectory(filePath: string) {
		return dirname(filePath);
	}
}

export function createAIServicesClient() {
	return new AIServicesClient();
}
