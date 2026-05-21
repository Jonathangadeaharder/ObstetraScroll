export type EvidenceStatus = "seeded" | "needs_review" | "approved";

export type Fact = {
	id: string;
	rank: number;
	title: string;
	insight: string;
	whyNonObvious: string;
	audience: string;
	sourceNote: string;
	evidenceStatus: EvidenceStatus;
	riskLevel: "low" | "medium" | "high";
	tags: string[];
};

export type ReelBeat = {
	id: string;
	startSec: number;
	durationSec: number;
	visual: string;
	voiceover: string;
	overlay: string;
	camera: string;
};

export type RenderStep = {
	id: string;
	label: string;
	status: "ready" | "queued" | "blocked";
	detail: string;
};

export type ReelBrief = {
	id: string;
	factId: string;
	title: string;
	format: "instagram_reel_9x16";
	durationSec: number;
	hook: string;
	script: string;
	beats: ReelBeat[];
	imagePrompts: string[];
	caption: string;
	hashtags: string[];
	editorialChecks: string[];
	renderPlan: RenderStep[];
	status: "draft" | "review_required" | "ready_for_pipeline";
};

export type MediaProvider = "elevenlabs" | "text2image";

export type MediaAsset = {
	kind: "video" | "audio" | "image";
	path: string;
	prompt: string;
	provider: MediaProvider;
};

export type QuizQuestion = {
	id: string;
	question: string;
	options: string[];
	answerIndex: number;
	explanation: string;
	optionNotes: string[];
};

export type InfoReply = {
	author: string;
	text: string;
	likes: number;
	icon?: string;
};

export type InfoItem = {
	id: string;
	icon: string;
	author: string;
	badge?: string;
	text: string;
	likes: number;
	replies: InfoReply[];
};

export type ReelFeedItem = {
	id: string;
	factId: string;
	title: string;
	videoPath: string;
	audioPath: string;
	posterPath: string;
	durationSec: number;
	generatedAt: string;
	assets: MediaAsset[];
	brief: ReelBrief;
	quiz: QuizQuestion;
};
