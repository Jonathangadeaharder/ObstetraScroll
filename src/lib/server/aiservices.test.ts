import { describe, expect, it } from "vitest";
import { buildAIServicesCommand } from "./aiservices";

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
});
