import type { Fact, InfoItem, ReelFeedItem } from "$lib/types";

export const REEL_REPEAT_CYCLES = 12;
export const VISIBLE_WINDOW = 2;
export const PRELOAD_AHEAD = 3;

export type PageType = "video" | "quiz";

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

export type ReelPage = {
	item: ReelFeedItem;
	loopIndex: number;
	reelNumber: number;
	key: string;
	pageType: PageType;
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

export function buildReelPages(
	feedItems: ReelFeedItem[],
	cycles = REEL_REPEAT_CYCLES,
): ReelPage[] {
	if (feedItems.length === 0) return [];

	return Array.from({ length: cycles }, (_, cycleIndex) =>
		feedItems.map((item, itemIndex) => {
			const base = cycleIndex * feedItems.length * 2 + itemIndex * 2;
			return [
				{
					item,
					loopIndex: base,
					reelNumber: itemIndex + 1,
					key: `${item.id}-c${cycleIndex}-v`,
					pageType: "video" as const,
				},
				{
					item,
					loopIndex: base + 1,
					reelNumber: itemIndex + 1,
					key: `${item.id}-c${cycleIndex}-q`,
					pageType: "quiz" as const,
				},
			];
		}),
	).flat(2);
}

export type VirtualPage = ReelPage & {
	shouldRender: boolean;
	shouldPreload: boolean;
	isActive: boolean;
};

export function virtualizePages(
	pages: ReelPage[],
	activeIndex: number,
	scrollDirection: "up" | "down",
): VirtualPage[] {
	return pages.map((page, index) => {
		const distance = Math.abs(index - activeIndex);
		const isAhead =
			scrollDirection === "down" ? index > activeIndex : index < activeIndex;
		return {
			...page,
			shouldRender: distance <= VISIBLE_WINDOW,
			shouldPreload:
				isAhead && distance <= PRELOAD_AHEAD && page.pageType === "video",
			isActive: index === activeIndex,
		};
	});
}

export function buildInfoItems(item: ReelFeedItem, fact?: Fact): InfoItem[] {
	const items: InfoItem[] = [];

	for (const [i, check] of item.brief.editorialChecks.entries()) {
		items.push({
			id: `check-${i}`,
			icon: "📋",
			author: "Check editorial",
			text: check,
			likes: 0,
			replies: [],
		});
	}

	for (const [i, beat] of item.brief.beats.entries()) {
		items.push({
			id: `beat-${i}`,
			icon: "🎬",
			author: `Momento ${i + 1}`,
			text: `${beat.visual} — ${beat.voiceover}`,
			likes: 0,
			replies: [],
		});
	}

	if (fact) {
		items.push({
			id: "insight",
			icon: "💡",
			author: "Dato clave",
			text: fact.insight,
			likes: 0,
			replies: [],
		});
		items.push({
			id: "source",
			icon: "📖",
			author: "Fuente",
			badge: "Demo",
			text: fact.sourceNote,
			likes: 0,
			replies: [],
		});
	}

	return items;
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
