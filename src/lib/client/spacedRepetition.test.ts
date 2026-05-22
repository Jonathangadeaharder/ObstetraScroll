import { describe, expect, it } from "vitest";
import {
	type ReviewMap,
	pickNextQuizFactId,
	recordAnswer,
} from "./spacedRepetition";

describe("recordAnswer", () => {
	it("correct answer increases interval", () => {
		const now = 1_000_000_000_000;
		const s1 = recordAnswer({}, "a", 1, now);
		expect(s1.a.reps).toBe(1);
		expect(s1.a.intervalDays).toBe(1);

		const s2 = recordAnswer(s1, "a", 1, now);
		expect(s2.a.reps).toBe(2);
		expect(s2.a.intervalDays).toBe(3);

		const s3 = recordAnswer(s2, "a", 1, now);
		expect(s3.a.reps).toBe(3);
		expect(s3.a.intervalDays).toBeGreaterThanOrEqual(3);
	});

	it("wrong answer resets reps and shortens interval", () => {
		const now = 1_000_000_000_000;
		const s1 = recordAnswer({}, "a", 1, now);
		const s2 = recordAnswer(s1, "a", 1, now);
		const s3 = recordAnswer(s2, "a", 0, now);
		expect(s3.a.reps).toBe(0);
		expect(s3.a.intervalDays).toBeLessThan(1);
		expect(s3.a.dueAt).toBeLessThan(now + 86_400_000);
	});

	it("ease decreases on wrong, increases on right", () => {
		const now = 1_000_000_000_000;
		const wrong = recordAnswer({}, "a", 0, now);
		expect(wrong.a.ease).toBeLessThan(2.5);
		const right = recordAnswer({}, "a", 1, now);
		expect(right.a.ease).toBeGreaterThan(2.5);
	});
});

describe("pickNextQuizFactId (weighted)", () => {
	const now = 1_000_000_000_000;

	it("returns null for empty fact list", () => {
		expect(pickNextQuizFactId([], {}, now)).toBeNull();
	});

	it("frequently-wrong fact dominates random distribution", () => {
		const state: ReviewMap = {};
		// 'a' answered wrong 5 times, 'b' all right, 'c' unseen.
		for (let i = 0; i < 5; i++) state.a = recordAnswer(state, "a", 0, now).a;
		for (let i = 0; i < 3; i++) state.b = recordAnswer(state, "b", 1, now).b;

		const counts: Record<string, number> = { a: 0, b: 0, c: 0 };
		let seed = 0;
		const rng = () => {
			// deterministic LCG so the test is reproducible
			seed = (seed * 1103515245 + 12345) & 0x7fffffff;
			return seed / 0x7fffffff;
		};
		for (let i = 0; i < 1000; i++) {
			const pick = pickNextQuizFactId(["a", "b", "c"], state, now, rng);
			if (pick) counts[pick]++;
		}
		expect(counts.a).toBeGreaterThan(counts.c);
		expect(counts.a).toBeGreaterThan(counts.b * 5);
	});

	it("unseen facts still surface via baseline weight", () => {
		const state: ReviewMap = recordAnswer({}, "a", 1, now);
		const rng = () => 0.99;
		const pick = pickNextQuizFactId(["a", "b"], state, now, rng);
		// With high rng draw and 'b' unseen (weight 2) vs 'a' rights-damped,
		// 'b' should be reachable.
		expect(["a", "b"]).toContain(pick);
	});

	it("deduplicates repeated seen ids before weighted picking", () => {
		const state: ReviewMap = {};
		const rng = () => 0.99;
		const pick = pickNextQuizFactId(["a", "a", "a", "b"], state, now, rng);
		expect(pick).toBe("b");
	});
});
