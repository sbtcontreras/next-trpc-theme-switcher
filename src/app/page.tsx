export const dynamic = "force-dynamic";

import { HydrateClient, api } from "@/trpc/server";
import { PageContent } from "./_components/page-content";

export default async function Posts() {
	void api.post.getAll.prefetch();

	return (
		<HydrateClient>
			<PageContent />
		</HydrateClient>
	);
}
