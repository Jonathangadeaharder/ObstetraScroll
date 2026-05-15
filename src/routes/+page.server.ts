import { listFacts } from "$lib/server/facts";
import { listFeedItems } from "$lib/server/feed";
import { planReel, reelRequestSchema } from "$lib/server/reelPlanner";

export function load() {
	const facts = listFacts();
	const request = reelRequestSchema.parse({
		factId: facts[0]?.id ?? "",
		tone: "mentor",
		targetDurationSec: 60,
	});

	return {
		facts,
		feedItems: listFeedItems(),
		initialBrief: facts[0] ? planReel(facts[0], request) : null,
	};
}
