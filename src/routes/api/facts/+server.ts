import { json } from "@sveltejs/kit";
import { listFacts } from "$lib/server/facts";

export function GET() {
	return json({ facts: listFacts() });
}
