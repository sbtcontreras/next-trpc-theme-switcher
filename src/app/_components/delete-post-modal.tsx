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
import { api } from "@/trpc/react";
import { Loader2, Trash2 } from "lucide-react";
import { create } from "zustand";

interface DeletePostModalState {
	isOpen: boolean;
	id?: number;
	openModal: (id: number) => void;
	closeModal: () => void;
}

export const useDeletePostModal = create<DeletePostModalState>((set) => ({
	isOpen: false,
	id: undefined,
	openModal: (id) => set({ isOpen: true, id }),
	closeModal: () => set({ isOpen: false, id: undefined }),
}));

export function DeletePostModal() {
	const { isOpen, id, closeModal } = useDeletePostModal();
	const utils = api.useUtils();

	const deleteMutation = api.post.delete.useMutation({
		onSuccess: () => handleSuccess("Post eliminado correctamente"),
		onError: (error) =>
			console.error("Error al eliminar el post:", error.message),
	});

	const handleDelete = () => {
		if (id) deleteMutation.mutate({ id });
	};

	const handleSuccess = async (message: string) => {
		await utils.post.invalidate();
		console.log(message);
		closeModal();
	};

	const isLoading = deleteMutation.isPending;

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent>
				<DialogHeader className="flex flex-col items-start gap-6">
					<div className="flex items-start gap-3">
						<div className="rounded-lg bg-primary/10 p-2 text-primary">
							<Trash2 className="size-5" />
						</div>
						<div className="flex-1">
							<DialogTitle>Eliminar Post</DialogTitle>
							<DialogDescription>
								¿Estás seguro de que deseas eliminar este post?
								<br />
								Esta acción no se puede deshacer
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<DialogFooter>
					<Button variant="outline" onClick={closeModal} disabled={isLoading}>
						Cancelar
					</Button>
					<Button
						variant="destructive"
						onClick={handleDelete}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" />
								Eliminando...
							</>
						) : (
							<>
								<Trash2 className="mr-2 size-4" />
								Eliminar
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
