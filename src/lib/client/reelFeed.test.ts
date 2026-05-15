import { describe, expect, it } from "vitest";
import type { ReelFeedItem } from "$lib/types";
import type { VirtualPage } from "./reelFeed";
import {
	buildInfoItems,
	buildLoopedFeedItems,
	buildReelPages,
	virtualizePages,
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
	it("interleaves video and quiz pages", () => {
		const pages = buildReelPages([item("a"), item("b")], 1);

		expect(pages).toHaveLength(4);
		expect(pages[0].pageType).toBe("video");
		expect(pages[0].item.id).toBe("a");
		expect(pages[1].pageType).toBe("quiz");
		expect(pages[1].item.id).toBe("a");
		expect(pages[2].pageType).toBe("video");
		expect(pages[2].item.id).toBe("b");
		expect(pages[3].pageType).toBe("quiz");
		expect(pages[3].item.id).toBe("b");
	});

	it("assigns correct reel numbers", () => {
		const pages = buildReelPages([item("a"), item("b")], 1);
		expect(pages[0].reelNumber).toBe(1);
		expect(pages[1].reelNumber).toBe(1);
		expect(pages[2].reelNumber).toBe(2);
		expect(pages[3].reelNumber).toBe(2);
	});

	it("generates unique keys per page", () => {
		const pages = buildReelPages([item("a"), item("b")], 2);
		const keys = pages.map((p) => p.key);
		expect(new Set(keys).size).toBe(8);
	});

	it("cycles through pages", () => {
		const pages = buildReelPages([item("a")], 3);
		expect(pages).toHaveLength(6);
		expect(pages[0].key).toContain("c0");
		expect(pages[2].key).toContain("c1");
		expect(pages[4].key).toContain("c2");
	});

	it("returns empty array for empty feed", () => {
		expect(buildReelPages([])).toEqual([]);
	});
});

describe("virtualizePages", () => {
	it("active page renders and preloads video", () => {
		const pages = buildReelPages([item("a")], 1);
		const virtual = virtualizePages(pages, 0, "down");
		expect(virtual[0].isActive).toBe(true);
		expect(virtual[0].shouldRender).toBe(true);
		expect(virtual[0].shouldPreload).toBe(true);
	});

	it("pages within VISIBLE_WINDOW render", () => {
		const pages = buildReelPages([item("a"), item("b")], 1);
		const virtual = virtualizePages(pages, 0, "down");
		expect(virtual[0].shouldRender).toBe(true);
		expect(virtual[1].shouldRender).toBe(true);
	});

	it("quiz pages do not preload even when ahead", () => {
		const pages = buildReelPages([item("a"), item("b")], 1);
		const virtual = virtualizePages(pages, 2, "down");
		expect(virtual[3].pageType).toBe("quiz");
		expect(virtual[3].shouldPreload).toBe(false);
	});

	it("scrollDirection up preloads videos before active", () => {
		const pages = buildReelPages([item("a")], 3);
		const virtual = virtualizePages(pages, 4, "up");
		expect(virtual[2].pageType).toBe("video");
		expect(virtual[2].shouldPreload).toBe(true);
	});

	it("pages beyond VISIBLE_WINDOW do not render", () => {
		const pages = buildReelPages([item("a"), item("b")], 4);
		const virtual = virtualizePages(pages, 0, "down");
		expect(virtual[6].shouldRender).toBe(false);
		expect(virtual[7].shouldRender).toBe(false);
	});
});

describe("buildInfoItems", () => {
	it("builds items from editorial checks and beats", () => {
		const feedItem = item("test");
		feedItem.brief.editorialChecks = ["Verify OMS data"];
		feedItem.brief.beats = [
			{
				id: "b1",
				startSec: 0,
				durationSec: 10,
				visual: "Animation",
				voiceover: "Voice",
				overlay: "",
				camera: "",
			},
		];

		const infoItems = buildInfoItems(feedItem);

		expect(infoItems.length).toBeGreaterThanOrEqual(2);
		expect(infoItems.some((i) => i.author === "Check editorial")).toBe(true);
		expect(infoItems.some((i) => i.author.startsWith("Momento"))).toBe(true);
	});

	it("includes fact data when fact is provided", () => {
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

		expect(infoItems.some((i) => i.author === "Dato clave")).toBe(true);
		expect(infoItems.some((i) => i.author === "Fuente")).toBe(true);
	});

	it("returns empty array for item with no data", () => {
		const feedItem = item("empty");
		const infoItems = buildInfoItems(feedItem);
		expect(infoItems).toEqual([]);
	});
});
