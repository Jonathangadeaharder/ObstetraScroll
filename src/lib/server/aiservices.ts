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
	type ParamValue =
		| keyof AIServicesRequest
		| ((r: AIServicesRequest) => string | undefined);
	const paramMap: Record<AIServicesOperation, Array<[string, ParamValue]>> = {
		text2video: [
			["--prompt", "prompt"],
			["--output", "output"],
			["--seconds", "seconds"],
			["--fps", "fps"],
			["--width", "width"],
			["--height", "height"],
			["--steps", "steps"],
			["--seed", "seed"],
		],
		image2video: [
			["--input", "input"],
			["--prompt", "prompt"],
			["--output", "output"],
			["--seconds", "seconds"],
			["--fps", "fps"],
			["--width", "width"],
			["--height", "height"],
			["--steps", "steps"],
			["--seed", "seed"],
		],
		text2image: [
			["--prompt", "prompt"],
			["--output", "output"],
			["--width", "width"],
			["--height", "height"],
			["--steps", "steps"],
			["--seed", "seed"],
		],
		text2audio: [
			["--text", (r) => r.text ?? r.prompt],
			["--output", "output"],
			["--voice", "voice"],
			["--speed", "speed"],
			["--seed", "seed"],
		],
		"kling-v1-6": [],
		elevenlabs: [],
	};

	const args = ["run", "--package", operation, operation];
	for (const [flag, key] of paramMap[operation]) {
		const value = typeof key === "function" ? key(request) : request[key];
		args.push(...option(flag, value));
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
