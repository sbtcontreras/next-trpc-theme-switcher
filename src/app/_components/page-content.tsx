"use client";

import { Posts } from "./posts";
import { PostsHeader } from "./posts-header";

export function PageContent() {
	return (
		<main className="container mx-auto flex flex-col gap-6 pt-8">
			<PostsHeader />
			<Posts />
		</main>
	);
}
