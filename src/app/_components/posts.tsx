"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ColorLabel } from "@/lib/enums";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { DeletePostModal, useDeletePostModal } from "./delete-post-modal";
import { PostModal, usePostModal } from "./post-modal";

export function Posts() {
	const [posts] = api.post.getAll.useSuspenseQuery();
	const { openModal: editPost } = usePostModal();
	const { openModal: deletePost } = useDeletePostModal();
	const { setTheme } = useTheme();

	const postColor = posts[0]?.color || "default";
	useEffect(() => setTheme(postColor), [setTheme, postColor]);

	return (
		<section className="grid gap-4">
			{posts.map((post) => (
				<Card key={post.id}>
					<CardHeader>
						<CardTitle>{post.name}</CardTitle>
						<CardDescription className="flex items-center gap-2">
							<span
								className="size-4 rounded-full"
								style={{ backgroundColor: post.color.toLowerCase() }}
							/>
							{ColorLabel[post.color]}
						</CardDescription>
						<CardAction className="flex justify-end gap-2">
							<Button variant="secondary" onClick={() => editPost(post.id)}>
								<Edit className="size-4" /> Editar
							</Button>
							<Button variant="destructive" onClick={() => deletePost(post.id)}>
								<Trash2 className="size-4" /> Eliminar
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent>{post.content}</CardContent>
					<CardFooter>
						Creado el {format(post.createdAt, "PPPPp", { locale: es })}
					</CardFooter>
				</Card>
			))}
			<PostModal />
			<DeletePostModal />
		</section>
	);
}
