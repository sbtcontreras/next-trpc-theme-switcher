"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ColorLabel } from "@/lib/enums";
import { api } from "@/trpc/react";
import { LucideMessageSquarePlus, MessageCircleHeartIcon } from "lucide-react";
import { usePostModal } from "./post-modal";

export function PostsHeader() {
	const { openModal } = usePostModal();
	const [posts] = api.post.getAll.useSuspenseQuery();
	const postColor = posts[0]?.color;

	return (
		<Card>
			<CardHeader className="flex flex-col justify-between gap-4 sm:flex-row">
				<div className="flex items-start gap-3">
					<div className="rounded-lg bg-primary/10 p-2 text-primary">
						<MessageCircleHeartIcon className="size-5" />
					</div>
					<div className="flex-1">
						<CardTitle>Mis posts</CardTitle>
						<CardDescription>
							{postColor ? (
								<p className="flex items-center gap-2">
									El último post fue creado con el color{" "}
									<span
										className="size-3 rounded-full"
										style={{ backgroundColor: postColor.toLowerCase() }}
									/>
									{ColorLabel[postColor]}
								</p>
							) : (
								"Aún no hay posts creados."
							)}
						</CardDescription>
					</div>
				</div>
				<Button onClick={() => openModal()} className="w-full sm:w-auto">
					<LucideMessageSquarePlus className="mr-2 size-4" />
					Crear post
				</Button>
			</CardHeader>
		</Card>
	);
}
