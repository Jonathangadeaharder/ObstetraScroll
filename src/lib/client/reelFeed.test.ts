import type { ReelFeedItem } from "$lib/types";
import { describe, expect, it } from "vitest";
import { buildLoopedFeedItems, virtualizeReels } from "./reelFeed";

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
		// scrolling up: items with lower indices than active should preload
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
		// last item is at index 5
		expect(virtual[5].isActive).toBe(true);
		// no preload beyond bounds
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
		expect(looped).toHaveLength(24); // 2 items * 12 cycles
	});
});
