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
});
