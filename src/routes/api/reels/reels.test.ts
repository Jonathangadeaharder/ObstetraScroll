import { facts, findFact } from "$lib/server/facts";
import { planReel, reelRequestSchema } from "$lib/server/reelPlanner";
import { describe, expect, it } from "vitest";

describe("POST /api/reels", () => {
	it("validates the reel request schema", () => {
		const valid = reelRequestSchema.safeParse({
			factId: "hpp-oxitocina-profilaxis-10ui",
			tone: "mentor",
			targetDurationSec: 30,
		});
		expect(valid.success).toBe(true);
	});

	it("rejects invalid tone", () => {
		const result = reelRequestSchema.safeParse({
			factId: "test",
			tone: "invalid_tone",
			targetDurationSec: 30,
		});
		expect(result.success).toBe(false);
	});

	it("rejects missing fields", () => {
		const result = reelRequestSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	it("rejects negative duration", () => {
		const result = reelRequestSchema.safeParse({
			factId: "test",
			tone: "mentor",
			targetDurationSec: -1,
		});
		expect(result.success).toBe(false);
	});

	it("accepts all valid tones", () => {
		const tones = ["calm", "urgent", "mentor"];
		for (const tone of tones) {
			const result = reelRequestSchema.safeParse({
				factId: "hpp-oxitocina-profilaxis-10ui",
				tone,
				targetDurationSec: 30,
			});
			expect(result.success).toBe(true);
		}
	});

	it("returns brief for valid fact", () => {
		const fact = findFact("hpp-oxitocina-profilaxis-10ui");
		expect(fact).toBeTruthy();
		if (!fact) return;

		const brief = planReel(fact, {
			factId: fact.id,
			tone: "mentor",
			targetDurationSec: 60,
		});
		expect(brief.factId).toBe(fact.id);
		expect(brief.format).toBe("instagram_reel_9x16");
	});

	it("returns 404 for unknown fact", () => {
		const fact = findFact("non-existent-fact-id");
		expect(fact).toBeUndefined();
	});

	it("all facts produce valid briefs", () => {
		for (const fact of facts) {
			const brief = planReel(fact, {
				factId: fact.id,
				tone: "mentor",
				targetDurationSec: 60,
			});
			expect(brief.factId).toBe(fact.id);
			expect(brief.beats).toHaveLength(5);
			expect(brief.imagePrompts.length).toBeGreaterThan(0);
		}
	});
});
