import { json } from "@sveltejs/kit";
import { listFeedItems } from "$lib/server/feed";

export function GET() {
	return json({ items: listFeedItems() });
}
