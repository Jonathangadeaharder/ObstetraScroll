import { findFact } from "$lib/server/facts";
import { planReel, reelRequestSchema } from "$lib/server/reelPlanner";
import { type RequestEvent, error, json } from "@sveltejs/kit";

export async function POST({ request }: RequestEvent) {
	const parsed = reelRequestSchema.safeParse(await request.json());

	if (!parsed.success) {
		error(400, parsed.error.issues.map((issue) => issue.message).join(", "));
	}

	const fact = findFact(parsed.data.factId);

	if (!fact) {
		error(404, "Fact not found");
	}

	return json({ brief: planReel(fact, parsed.data) });
}
