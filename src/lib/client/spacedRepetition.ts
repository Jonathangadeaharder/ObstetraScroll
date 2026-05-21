// SM-2-lite spaced repetition for quiz cards.
// Quality: 0 = wrong, 1 = right. Persisted to localStorage.

export type ReviewState = {
	factId: string;
	wrongs: number;
	rights: number;
	reps: number;
	ease: number;
	intervalDays: number;
	dueAt: number; // epoch ms — retained for stats; picker uses weights now
	lastReviewAt: number;
};

const STORAGE_KEY = "obstetrascroll.srs.v1";
const DAY_MS = 86_400_000;
const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

export type ReviewMap = Record<string, ReviewState>;

export function loadReviewState(): ReviewMap {
	if (typeof localStorage === "undefined") return {};
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as ReviewMap) : {};
	} catch {
		return {};
	}
}

export function saveReviewState(state: ReviewMap): void {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch {
		// Quota or private mode — silently skip.
	}
}

export function recordAnswer(
	state: ReviewMap,
	factId: string,
	quality: 0 | 1,
	now = Date.now(),
): ReviewMap {
	const prev = state[factId];
	const ease = prev?.ease ?? DEFAULT_EASE;
	const reps = prev?.reps ?? 0;

	let nextReps: number;
	let nextEase: number;
	let nextInterval: number;

	if (quality === 0) {
		// Wrong: reset progress, due at next quiz slot (~1 min).
		// Picker prefers most-overdue → wrong cards resurface ahead of unseen
		// until user gets them right, matching anki/leitner urgency.
		nextReps = 0;
		nextEase = Math.max(MIN_EASE, ease - 0.2);
		nextInterval = 1 / (60 * 24); // ~1 min as fraction of day
	} else {
		nextReps = reps + 1;
		nextEase = Math.min(2.8, ease + 0.05);
		if (nextReps === 1) nextInterval = 1;
		else if (nextReps === 2) nextInterval = 3;
		else nextInterval = Math.round((prev?.intervalDays ?? 1) * nextEase);
	}

	return {
		...state,
		[factId]: {
			factId,
			wrongs: (prev?.wrongs ?? 0) + (quality === 0 ? 1 : 0),
			rights: (prev?.rights ?? 0) + (quality === 1 ? 1 : 0),
			reps: nextReps,
			ease: nextEase,
			intervalDays: nextInterval,
			dueAt: now + nextInterval * DAY_MS,
			lastReviewAt: now,
		},
	};
}

// Selection weight: cards with more wrongs (vs rights) are far more likely
// to surface. Unseen cards get a baseline weight so they enter rotation too.
const UNSEEN_WEIGHT = 2;
const WRONG_BOOST = 4; // each wrong adds 4x base weight
const RIGHT_DAMP = 0.4; // each right halves importance roughly

export function quizWeight(state: ReviewState | undefined): number {
	if (!state) return UNSEEN_WEIGHT;
	const score = 1 + state.wrongs * WRONG_BOOST - state.rights * RIGHT_DAMP;
	return Math.max(0.25, score);
}

// Weighted random pick: cards wrong more often dominate the pool, unseen
// cards stay in rotation via baseline weight. Rhythm is fixed (every 5
// reels) — this only decides WHICH fact gets the next quiz slot.
export function pickNextQuizFactId(
	factIds: string[],
	state: ReviewMap,
	_now = Date.now(),
	rng: () => number = Math.random,
): string | null {
	if (factIds.length === 0) return null;

	const weights = factIds.map((id) => quizWeight(state[id]));
	const total = weights.reduce((a, b) => a + b, 0);
	if (total <= 0) return factIds[Math.floor(rng() * factIds.length)];

	let r = rng() * total;
	for (let i = 0; i < factIds.length; i++) {
		r -= weights[i];
		if (r <= 0) return factIds[i];
	}
	return factIds[factIds.length - 1];
}
