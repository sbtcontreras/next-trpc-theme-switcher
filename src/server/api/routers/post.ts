import {
	createPostSchema,
	postIdSchema,
	updatePaymentSchema,
} from "@/schemas/post";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.post.findMany({
			orderBy: { createdAt: "desc" },
		});
	}),

	getOne: publicProcedure.input(postIdSchema).query(({ ctx, input }) => {
		return ctx.db.post.findUnique({
			where: { id: input.id },
		});
	}),

	create: publicProcedure.input(createPostSchema).mutation(({ ctx, input }) => {
		return ctx.db.post.create({
			data: input,
		});
	}),

	update: publicProcedure
		.input(updatePaymentSchema)
		.mutation(({ ctx, input }) => {
			const { id, ...data } = input;
			return ctx.db.post.update({
				where: { id },
				data,
			});
		}),

	delete: publicProcedure.input(postIdSchema).mutation(({ ctx, input }) => {
		return ctx.db.post.delete({
			where: { id: input.id },
		});
	}),
});
