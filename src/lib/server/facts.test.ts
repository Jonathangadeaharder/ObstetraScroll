import { findFact, listFacts } from "$lib/server/facts";
import { describe, expect, it } from "vitest";

describe("listFacts", () => {
	it("returns 6 seeded facts", () => {
		expect(listFacts()).toHaveLength(6);
	});

	it("all facts have required shape", () => {
		const facts = listFacts();
		for (const fact of facts) {
			expect(typeof fact.id).toBe("string");
			expect(typeof fact.rank).toBe("number");
			expect(fact.rank).toBeGreaterThan(0);
			expect(typeof fact.title).toBe("string");
			expect(typeof fact.insight).toBe("string");
			expect(typeof fact.whyNonObvious).toBe("string");
			expect(typeof fact.audience).toBe("string");
			expect(typeof fact.sourceNote).toBe("string");
			expect(["seeded", "needs_review", "approved"]).toContain(
				fact.evidenceStatus,
			);
			expect(["low", "medium", "high"]).toContain(fact.riskLevel);
			expect(Array.isArray(fact.tags)).toBe(true);
			expect(fact.tags.length).toBeGreaterThan(0);
		}
	});

	it("facts are sorted by rank ascending", () => {
		const facts = listFacts();
		for (let i = 1; i < facts.length; i++) {
			expect(facts[i].rank).toBeGreaterThan(facts[i - 1].rank);
		}
	});

	it("findFact returns the correct fact by id", () => {
		const fact = findFact("skin-to-skin-temperature");
		expect(fact).toBeTruthy();
		expect(fact?.title).toContain("Piel con piel");
	});

	it("findFact returns undefined for unknown id", () => {
		expect(findFact("non-existent")).toBeUndefined();
	});

	it("all fact ids are unique", () => {
		const facts = listFacts();
		const ids = facts.map((f) => f.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("has at least one high-risk fact", () => {
		const facts = listFacts();
		expect(facts.some((f) => f.riskLevel === "high")).toBe(true);
	});

	it("has at least one low-risk fact", () => {
		const facts = listFacts();
		expect(facts.some((f) => f.riskLevel === "low")).toBe(true);
	});
});
