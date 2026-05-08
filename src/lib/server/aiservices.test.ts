import { describe, expect, it } from "vitest";
import {
	AIServicesClient,
	buildAIServicesCommand,
	createAIServicesClient,
} from "./aiservices";

describe("AIServices command builder", () => {
	it("maps text2video to the clean AIServices CLI", () => {
		const command = buildAIServicesCommand("text2video", {
			prompt: "vertical birth education reel background",
			output: "out/background.mp4",
			seconds: 8,
			width: 720,
			height: 1280,
			steps: 8,
		});

		expect(command.command).toBe("uv");
		expect(command.args).toContain("--package");
		expect(command.args).toContain("text2video");
		expect(command.args).toContain("--prompt");
		expect(command.args).toContain("vertical birth education reel background");
		expect(command.args).toContain("--height");
		expect(command.args).toContain("1280");
	});

	it("maps text2audio to the voiceover generator", () => {
		const command = buildAIServicesCommand("text2audio", {
			text: "Este es el texto de la voz en off.",
			output: "out/voice.wav",
			voice: "partera-rioplatense",
			speed: 1.02,
		});

		expect(command.args).toEqual([
			"run",
			"--package",
			"text2audio",
			"text2audio",
			"--text",
			"Este es el texto de la voz en off.",
			"--output",
			"out/voice.wav",
			"--voice",
			"partera-rioplatense",
			"--speed",
			"1.02",
		]);
	});

	it("maps text2image to the image generator", () => {
		const command = buildAIServicesCommand("text2image", {
			prompt: "a calm birth room illustration",
			output: "out/poster.png",
			width: 720,
			height: 1280,
			steps: 12,
			seed: 42,
		});

		expect(command.operation).toBe("text2image");
		expect(command.args).toContain("--package");
		expect(command.args).toContain("text2image");
		expect(command.args).toContain("--prompt");
		expect(command.args).toContain("a calm birth room illustration");
		expect(command.args).toContain("--width");
		expect(command.args).toContain("720");
		expect(command.args).toContain("--seed");
		expect(command.args).toContain("42");
	});

	it("maps image2video to the animation pipeline", () => {
		const command = buildAIServicesCommand("image2video", {
			input: "out/poster.png",
			prompt: "gentle movement, soft lighting",
			output: "out/animated.mp4",
			seconds: 8,
			fps: 24,
			width: 720,
			height: 1280,
		});

		expect(command.operation).toBe("image2video");
		expect(command.args).toContain("--input");
		expect(command.args).toContain("out/poster.png");
		expect(command.args).toContain("--fps");
		expect(command.args).toContain("24");
	});

	it("omits undefined optional options from args", () => {
		const command = buildAIServicesCommand("text2video", {
			prompt: "test",
			output: "out/test.mp4",
		});

		expect(command.args).not.toContain("--seconds");
		expect(command.args).not.toContain("--fps");
		expect(command.args).not.toContain("--seed");
	});

	it("includes correct env variables for MLX models", () => {
		const command = buildAIServicesCommand("text2video", {
			prompt: "test",
			output: "out/test.mp4",
		});

		expect(command.env).toBeTruthy();
		expect(command.env?.PYTHONPATH).toContain("aiservices_core");
		expect(command.env?.TEXT2VIDEO_MODEL_DIR).toContain("ltx");
		expect(command.env?.IMAGE2VIDEO_MODEL_DIR).toContain("ltx");
		expect(command.env?.HF_HUB_DISABLE_XET).toBe("1");
	});

	it("text2audio uses prompt as fallback when text is missing", () => {
		const command = buildAIServicesCommand("text2audio", {
			prompt: "fallback prompt text",
			output: "out/audio.wav",
		});

		expect(command.args).toContain("--text");
		const textIdx = command.args.indexOf("--text");
		expect(command.args[textIdx + 1]).toBe("fallback prompt text");
	});

	it("all operations produce valid command structure", () => {
		const operations = [
			"text2video",
			"image2video",
			"text2image",
			"text2audio",
		] as const;
		for (const op of operations) {
			const command = buildAIServicesCommand(op, {
				prompt: "test",
				output: "out/test",
			});
			expect(command.operation).toBe(op);
			expect(command.command).toBe("uv");
			expect(command.args[0]).toBe("run");
			expect(command.output).toBe("out/test");
		}
	});

	it("generates unique env for each invocation", () => {
		const cmd1 = buildAIServicesCommand("text2video", {
			prompt: "a",
			output: "1.mp4",
		});
		const cmd2 = buildAIServicesCommand("text2image", {
			prompt: "b",
			output: "2.png",
		});
		expect(cmd1.env).toBeDefined();
		expect(cmd2.env).toBeDefined();
	});
});

describe("AIServicesClient", () => {
	it("createAIServicesClient returns an instance", () => {
		const client = createAIServicesClient();
		expect(client).toBeInstanceOf(AIServicesClient);
	});

	it("mediaPath resolves paths under generated-media", () => {
		const client = new AIServicesClient();
		const path = client.mediaPath("reels", "test.mp4");
		expect(path).toContain("generated-media");
		expect(path).toContain("reels");
		expect(path).toContain("test.mp4");
	});

	it("mediaDirectory returns the directory portion of a path", () => {
		const client = new AIServicesClient();
		const dir = client.mediaDirectory("/some/path/to/file.mp4");
		expect(dir).toBe("/some/path/to");
	});

	it("client exposes all four service methods", () => {
		const client = new AIServicesClient();
		expect(typeof client.text2video).toBe("function");
		expect(typeof client.image2video).toBe("function");
		expect(typeof client.text2image).toBe("function");
		expect(typeof client.text2audio).toBe("function");
	});
});
