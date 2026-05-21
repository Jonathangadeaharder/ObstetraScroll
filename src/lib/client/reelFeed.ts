import type { Fact, InfoItem, ReelFeedItem } from "$lib/types";
import { findTermsInText } from "./glossary";

export const REEL_REPEAT_CYCLES = 12;
export const VISIBLE_WINDOW = 2;
export const PRELOAD_AHEAD = 3;
export const QUIZ_EVERY_N_VIDEOS = 5;

export type PageType = "video" | "quiz";

export type QuizPicker = (position: number) => ReelFeedItem | null;

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
	opts: { quizEveryN?: number; quizPicker?: QuizPicker } = {},
): ReelPage[] {
	if (feedItems.length === 0) return [];

	const quizEveryN = opts.quizEveryN ?? QUIZ_EVERY_N_VIDEOS;
	const quizPicker: QuizPicker =
		opts.quizPicker ??
		((pos) => feedItems[Math.floor(pos / quizEveryN) % feedItems.length]);

	const pages: ReelPage[] = [];
	let videoCount = 0;
	let quizCount = 0;

	for (let cycleIndex = 0; cycleIndex < cycles; cycleIndex++) {
		for (let itemIndex = 0; itemIndex < feedItems.length; itemIndex++) {
			const item = feedItems[itemIndex];
			pages.push({
				item,
				loopIndex: pages.length,
				reelNumber: itemIndex + 1,
				key: `${item.id}-c${cycleIndex}-v`,
				pageType: "video",
			});
			videoCount++;

			if (videoCount % quizEveryN === 0) {
				const quizItem = quizPicker(videoCount) ?? item;
				pages.push({
					item: quizItem,
					loopIndex: pages.length,
					reelNumber: itemIndex + 1,
					key: `quiz-${quizItem.id}-n${quizCount}`,
					pageType: "quiz",
				});
				quizCount++;
			}
		}
	}

	return pages;
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

	if (!fact) return items;

	// Term clarifications first — what jargon means in the video.
	const text = `${fact.insight} ${fact.whyNonObvious} ${fact.title}`;
	const terms = findTermsInText(text);
	for (const [i, entry] of terms.entries()) {
		items.push({
			id: `term-${i}-${entry.term}`,
			icon: "🔎",
			author: entry.term,
			badge: entry.short,
			text: entry.full,
			likes: 0,
			replies: [],
		});
	}

	// Expanded clinical context that goes beyond the spoken reel.
	items.push({
		id: "insight",
		icon: "💡",
		author: "Detalle clínico",
		text: fact.insight,
		likes: 0,
		replies: [],
	});

	items.push({
		id: "why",
		icon: "⚠️",
		author: "Por qué no es obvio",
		text: fact.whyNonObvious,
		likes: 0,
		replies: [],
	});

	items.push({
		id: "source",
		icon: "📖",
		author: "Fuente",
		badge: fact.evidenceStatus,
		text: fact.sourceNote,
		likes: 0,
		replies: [],
	});

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

		return {
			...reel,
			shouldRender: distance <= VISIBLE_WINDOW,
			shouldPreload:
				(isAhead && distance <= PRELOAD_AHEAD) || (!isAhead && distance <= 1),
			isActive: index === activeReelIndex,
		};
	});
}
