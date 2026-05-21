import type { ReelFeedItem } from "$lib/types";
import { describe, expect, it } from "vitest";
import {
	buildInfoItems,
	buildLoopedFeedItems,
	buildReelPages,
	virtualizeReels,
} from "./reelFeed";

function item(id: string): ReelFeedItem {
	return {
		id,
		factId: id,
		title: id,
		videoPath: `/${id}.mp4`,
		audioPath: `/${id}.wav`,
		posterPath: `/${id}.png`,
		durationSec: 8,
		generatedAt: "2026-05-08T10:04:00+02:00",
		assets: [],
		brief: {
			id,
			factId: id,
			title: id,
			format: "instagram_reel_9x16",
			durationSec: 8,
			hook: "",
			script: "",
			beats: [],
			imagePrompts: [],
			caption: "",
			hashtags: [],
			editorialChecks: [],
			renderPlan: [],
			status: "ready_for_pipeline",
		},
		quiz: {
			id,
			question: "",
			options: [],
			answerIndex: 0,
			explanation: "",
			optionNotes: [],
		},
	};
}

describe("reel feed helpers", () => {
	it("loops the first three reels in Instagram-style order", () => {
		const looped = buildLoopedFeedItems(
			[item("video1"), item("video2"), item("video3")],
			2,
		);

		expect(looped.map((reel) => reel.reelNumber)).toEqual([1, 2, 3, 1, 2, 3]);
		expect(looped.map((reel) => reel.item.id)).toEqual([
			"video1",
			"video2",
			"video3",
			"video1",
			"video2",
			"video3",
		]);
	});

	it("renders only nearby reels while preloading ahead", () => {
		const looped = buildLoopedFeedItems(
			[item("video1"), item("video2"), item("video3")],
			3,
		);
		const virtual = virtualizeReels(looped, 3, "down");

		expect(
			virtual.filter((reel) => reel.shouldRender).map((reel) => reel.loopIndex),
		).toEqual([1, 2, 3, 4, 5]);
		expect(
			virtual
				.filter((reel) => reel.shouldPreload)
				.map((reel) => reel.loopIndex),
		).toEqual([2, 3, 4, 5, 6]);
	});

	it("returns empty array for empty feed items", () => {
		expect(buildLoopedFeedItems([])).toEqual([]);
	});

	it("handles single item correctly", () => {
		const looped = buildLoopedFeedItems([item("solo")], 3);
		expect(looped).toHaveLength(3);
		expect(looped.map((r) => r.reelNumber)).toEqual([1, 1, 1]);
		expect(looped.map((r) => r.key)).toEqual([
			"solo-cycle-0",
			"solo-cycle-1",
			"solo-cycle-2",
		]);
	});

	it("marks only the active reel as isActive", () => {
		const looped = buildLoopedFeedItems([item("a"), item("b"), item("c")], 2);
		const virtual = virtualizeReels(looped, 2, "down");
		const active = virtual.filter((r) => r.isActive);
		expect(active).toHaveLength(1);
		expect(active[0].loopIndex).toBe(2);
	});

	it("scrollDirection up preloads items before active", () => {
		const looped = buildLoopedFeedItems([item("a"), item("b"), item("c")], 3);
		const virtual = virtualizeReels(looped, 6, "up");
		expect(virtual[5].shouldPreload).toBe(true);
		expect(virtual[4].shouldPreload).toBe(true);
	});

	it("first item is active at index 0", () => {
		const looped = buildLoopedFeedItems([item("x"), item("y"), item("z")], 2);
		const virtual = virtualizeReels(looped, 0, "down");
		expect(virtual[0].isActive).toBe(true);
		expect(virtual[0].shouldRender).toBe(true);
	});

	it("last item handles edge boundaries", () => {
		const looped = buildLoopedFeedItems([item("a"), item("b")], 3);
		const virtual = virtualizeReels(looped, 5, "down");
		expect(virtual[5].isActive).toBe(true);
		const preloaded = virtual.filter((r) => r.shouldPreload && r.loopIndex > 5);
		expect(preloaded).toHaveLength(0);
	});

	it("buildLoopedFeedItems generates unique keys per cycle", () => {
		const looped = buildLoopedFeedItems([item("p"), item("q")], 3);
		const keys = looped.map((r) => r.key);
		expect(new Set(keys).size).toBe(6);
	});

	it("default cycles constant is used when not specified", () => {
		const looped = buildLoopedFeedItems([item("a"), item("b")]);
		expect(looped).toHaveLength(24);
	});
});

describe("buildReelPages", () => {
	it("inserts a quiz after every Nth video", () => {
		const items = Array.from({ length: 10 }, (_, i) => item(`v${i}`));
		const pages = buildReelPages(items, 1, { quizEveryN: 5 });

		// 10 videos + 2 quizzes (after v4 and v9).
		expect(pages).toHaveLength(12);
		expect(pages.slice(0, 5).every((p) => p.pageType === "video")).toBe(true);
		expect(pages[5].pageType).toBe("quiz");
		expect(pages.slice(6, 11).every((p) => p.pageType === "video")).toBe(true);
		expect(pages[11].pageType).toBe("quiz");
	});

	it("uses quizPicker to choose quiz fact (spaced repetition hook)", () => {
		const items = Array.from({ length: 5 }, (_, i) => item(`v${i}`));
		const calls: number[] = [];
		const pages = buildReelPages(items, 1, {
			quizEveryN: 5,
			quizPicker: (pos) => {
				calls.push(pos);
				return items[2];
			},
		});

		expect(calls).toEqual([5]);
		expect(pages[5].pageType).toBe("quiz");
		expect(pages[5].item.id).toBe("v2");
	});

	it("falls back to current item when picker returns null", () => {
		const items = [item("a"), item("b"), item("c"), item("d"), item("e")];
		const pages = buildReelPages(items, 1, {
			quizEveryN: 5,
			quizPicker: () => null,
		});
		expect(pages[5].pageType).toBe("quiz");
		expect(pages[5].item.id).toBe("e");
	});

	it("generates unique keys per page", () => {
		const items = Array.from({ length: 5 }, (_, i) => item(`v${i}`));
		const pages = buildReelPages(items, 2, { quizEveryN: 5 });
		const keys = pages.map((p) => p.key);
		expect(new Set(keys).size).toBe(pages.length);
	});

	it("returns empty array for empty feed", () => {
		expect(buildReelPages([])).toEqual([]);
	});
});

describe("buildInfoItems", () => {
	it("returns empty when no fact provided", () => {
		const feedItem = item("test");
		expect(buildInfoItems(feedItem)).toEqual([]);
	});

	it("includes glossary terms found in fact text", () => {
		const feedItem = item("hpp-test");
		const fact = {
			id: "hpp-test",
			rank: 1,
			title: "HPP y oxitocina",
			insight: "10 UI de oxitocina IM reducen HPP 60%.",
			whyNonObvious: "Muchos equipos esperan.",
			audience: "Midwives",
			sourceNote: "Cochrane",
			evidenceStatus: "approved" as const,
			riskLevel: "high" as const,
			tags: [],
		};

		const infoItems = buildInfoItems(feedItem, fact);
		const terms = infoItems.filter((i) => i.icon === "🔎");
		expect(terms.some((t) => t.author === "HPP")).toBe(true);
		expect(terms.some((t) => t.author === "UI")).toBe(true);
	});

	it("includes detail, why-non-obvious, and source", () => {
		const feedItem = item("test-id");
		const fact = {
			id: "test-id",
			rank: 1,
			title: "Test",
			insight: "Key insight",
			whyNonObvious: "Why",
			audience: "Midwives",
			sourceNote: "Source note",
			evidenceStatus: "needs_review" as const,
			riskLevel: "low" as const,
			tags: [],
		};
		const infoItems = buildInfoItems(feedItem, fact);
		expect(infoItems.some((i) => i.author === "Detalle clínico")).toBe(true);
		expect(
			infoItems.some((i) => i.author === "Lo que se suele pasar por alto"),
		).toBe(true);
		expect(infoItems.some((i) => i.author === "Fuente")).toBe(true);
	});
});
