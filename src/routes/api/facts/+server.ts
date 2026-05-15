import { listFacts } from "$lib/server/facts";
import { json } from "@sveltejs/kit";

export function GET() {
	return json({ facts: listFacts() });
}
