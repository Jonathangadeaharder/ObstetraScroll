import { listFeedItems } from "$lib/server/feed";
import { json } from "@sveltejs/kit";

export function GET() {
	return json({ items: listFeedItems() });
}
