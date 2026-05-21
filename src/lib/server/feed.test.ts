import { listFeedItems } from "$lib/server/feed";
import { describe, expect, it } from "vitest";

describe("listFeedItems", () => {
	it("returns feed items matching manifest contents", () => {
		const items = listFeedItems();
		expect(items.length).toBeGreaterThanOrEqual(100);
	});

	it("each feed item has required fields", () => {
		const items = listFeedItems();
		for (const item of items) {
			expect(item.id).toBeTruthy();
			expect(item.factId).toBeTruthy();
			expect(item.title).toBeTruthy();
			expect(item.videoPath).toContain("reel-");
			expect(item.audioPath).toMatch(/audio\/|reel-poc\//);
			expect(item.posterPath).toContain("posters/");
			expect(item.durationSec).toBeGreaterThan(0);
			expect(item.assets).toBeInstanceOf(Array);
			expect(item.assets.length).toBeGreaterThanOrEqual(3);
			expect(item.brief).toBeTruthy();
			expect(item.brief.beats).toBeInstanceOf(Array);
			expect(item.quiz.question).toBeTruthy();
			expect(item.quiz.options).toHaveLength(4);
			expect(item.quiz.answerIndex).toBeGreaterThanOrEqual(0);
			expect(item.quiz.answerIndex).toBeLessThanOrEqual(3);
			expect(item.quiz.explanation).toBeTruthy();
			expect(item.quiz.optionNotes).toHaveLength(4);
		}
	});

	it("first feed item has the top-ranked fact", () => {
		const items = listFeedItems();
		expect(items[0].factId).toBe("hpp-oxitocina-profilaxis-10ui");
	});

	it("all quizzes have exactly 4 options with one correct answer", () => {
		const items = listFeedItems();
		for (const item of items) {
			expect(item.quiz.options).toHaveLength(4);
			const answerIdx = item.quiz.answerIndex;
			expect(item.quiz.options[answerIdx]).toBeTruthy();
		}
	});

	it("all briefs have 9:16 Instagram reel format", () => {
		const items = listFeedItems();
		for (const item of items) {
			expect(item.brief.format).toBe("instagram_reel_9x16");
		}
	});

	it("feed item IDs are unique", () => {
		const items = listFeedItems();
		const ids = items.map((i) => i.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("feed items reference distinct facts", () => {
		const items = listFeedItems();
		const factIds = items.map((i) => i.factId);
		expect(new Set(factIds).size).toBe(factIds.length);
	});

	it("high-risk facts have review_required briefs", () => {
		const items = listFeedItems();
		const highRiskIds = new Set(
			items
				.filter((i) => i.brief.status === "review_required")
				.map((i) => i.factId),
		);
		const factsWithReview = items.filter((i) => highRiskIds.has(i.factId));
		expect(factsWithReview.length).toBeGreaterThan(0);
		for (const item of factsWithReview) {
			expect(item.brief.status).toBe("review_required");
		}
	});

	it("feed items have valid asset types", () => {
		const items = listFeedItems();
		const validKinds = new Set(["video", "audio", "image"]);
		for (const item of items) {
			for (const asset of item.assets) {
				expect(validKinds.has(asset.kind)).toBe(true);
				expect(asset.path).toBeTruthy();
				expect(asset.provider).toBeTruthy();
			}
		}
	});
});
