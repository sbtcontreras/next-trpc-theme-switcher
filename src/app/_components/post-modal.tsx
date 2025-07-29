"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ColorLabel } from "@/lib/enums";
import { createPostSchema as formSchema } from "@/schemas/post";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Palette, Plus, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { create } from "zustand";

interface PostModalState {
	isOpen: boolean;
	id?: number;
	initialValues?: Partial<z.infer<typeof formSchema>>;
	openModal: (
		id?: number,
		initialValues?: Partial<z.infer<typeof formSchema>>,
	) => void;
	closeModal: () => void;
}

export const usePostModal = create<PostModalState>((set) => ({
	isOpen: false,
	id: undefined,
	initialValues: undefined,
	openModal: (id, initialValues) => set({ isOpen: true, id, initialValues }),
	closeModal: () => set({ isOpen: false }),
}));

export function PostModal() {
	const { isOpen, id, closeModal, initialValues } = usePostModal();
	const utils = api.useUtils();

	const { data: post, isLoading: isPostLoading } = api.post.getOne.useQuery(
		{ id: id ?? -1 },
		{ enabled: !!id },
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		if (post) {
			form.reset(post);
			return;
		}

		if (!id) {
			form.reset({
				name: "",
				color: undefined,
				content: "",
				...initialValues,
			});
		}
	}, [post, id, initialValues, form]);

	const createMutation = api.post.create.useMutation({
		onSuccess: () => handleSuccess("Post creado correctamente"),
		onError: (error) => console.error("Error al crear el post:", error),
	});

	const updateMutation = api.post.update.useMutation({
		onSuccess: () => handleSuccess("Post editado correctamente"),
		onError: (error) => console.error("Error al editar el post:", error),
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (id) updateMutation.mutate({ ...data, id });
		else createMutation.mutate(data);
	};

	const handleSuccess = async (message: string) => {
		closeModal();
		await utils.post.invalidate();
		console.log(message);
		form.reset();
	};

	const isLoading =
		createMutation.isPending || updateMutation.isPending || isPostLoading;

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader className="flex flex-col items-start gap-6">
					<div className="flex items-start gap-3">
						<div className="rounded-lg bg-primary/10 p-2 text-primary">
							<Palette className="size-5" />
						</div>
						<div className="flex-1">
							<DialogTitle>{id ? "Editar Post" : "Nuevo Post"}</DialogTitle>
							<DialogDescription>
								{id
									? "Modifica los detalles de este post"
									: "Crea un nuevo post con los detalles que desees"}
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre *</FormLabel>
									<FormControl>
										<Input disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contenido *</FormLabel>
									<FormControl>
										<Textarea
											disabled={isLoading}
											{...field}
											rows={4}
											className="max-h-40"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color *</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={isLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecciona un color" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(ColorLabel).map(([color, label]) => (
												<SelectItem
													key={color}
													value={color}
													className="flex items-center gap-2"
												>
													<span
														className="size-4 rounded-full"
														style={{ backgroundColor: color.toLowerCase() }}
													/>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 size-4 animate-spin" />
										{id ? "Guardando..." : "Creando..."}
									</>
								) : id ? (
									<>
										<Save className="mr-2 size-4" />
										Editar post
									</>
								) : (
									<>
										<Plus className="mr-2 size-4" />
										Crear post
									</>
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
