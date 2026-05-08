import { describe, expect, it } from "vitest";
import { facts } from "./facts";
import { planReel, reelRequestSchema } from "./reelPlanner";

describe("reel planner", () => {
	it("turns a reviewed fact into a beat-based 9:16 brief", () => {
		const fact = {
			...facts[0],
			evidenceStatus: "approved" as const,
			riskLevel: "medium" as const,
		};
		const request = reelRequestSchema.parse({
			factId: fact.id,
			tone: "mentor",
			targetDurationSec: 30,
		});

		const brief = planReel(fact, request);

		expect(brief.format).toBe("instagram_reel_9x16");
		expect(brief.beats).toHaveLength(5);
		expect(
			brief.imagePrompts.every((prompt) => prompt.includes("vertical 9:16")),
		).toBe(true);
		expect(
			brief.renderPlan.find((step) => step.id === "keyframes")?.status,
		).toBe("queued");
	});

	it("blocks risky unreviewed facts before rendering", () => {
		const request = reelRequestSchema.parse({
			factId: facts[0].id,
			tone: "urgent",
			targetDurationSec: 28,
		});

		const brief = planReel(facts[0], request);

		expect(brief.status).toBe("review_required");
		expect(brief.renderPlan.some((step) => step.status === "blocked")).toBe(
			true,
		);
		expect(brief.editorialChecks).toContain(
			"Poner el estado de fuentes en approved antes de exportar",
		);
	});
});
