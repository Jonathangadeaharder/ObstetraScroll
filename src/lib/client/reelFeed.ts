import type { ReelFeedItem } from "$lib/types";

export const REEL_REPEAT_CYCLES = 12;
export const VISIBLE_WINDOW = 2;
export const PRELOAD_AHEAD = 3;

export type LoopedReel = {
	item: ReelFeedItem;
	loopIndex: number;
	reelNumber: number;
	key: string;
};

export type VirtualReel = LoopedReel & {
	shouldRender: boolean;
	shouldPreload: boolean;
	isActive: boolean;
};

export function buildLoopedFeedItems(
	feedItems: ReelFeedItem[],
	cycles = REEL_REPEAT_CYCLES,
): LoopedReel[] {
	if (feedItems.length === 0) return [];

	return Array.from({ length: cycles }, (_, cycleIndex) =>
		feedItems.map((item, itemIndex) => {
			const loopIndex = cycleIndex * feedItems.length + itemIndex;

			return {
				item,
				loopIndex,
				reelNumber: itemIndex + 1,
				key: `${item.id}-cycle-${cycleIndex}`,
			};
		}),
	).flat();
}

export function virtualizeReels(
	loopedFeedItems: LoopedReel[],
	activeReelIndex: number,
	scrollDirection: "up" | "down",
): VirtualReel[] {
	return loopedFeedItems.map((reel, index) => {
		const distance = Math.abs(index - activeReelIndex);
		const isAhead =
			scrollDirection === "down"
				? index > activeReelIndex
				: index < activeReelIndex;
		const shouldPreload =
			(isAhead && distance <= PRELOAD_AHEAD) || (!isAhead && distance <= 1);

		return {
			...reel,
			shouldRender: distance <= VISIBLE_WINDOW,
			shouldPreload,
			isActive: index === activeReelIndex,
		};
	});
}
