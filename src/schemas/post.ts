import { Color } from "@prisma/client";
import { z } from "zod";

const basePostSchema = z.object({
	color: z.nativeEnum(Color, { required_error: "El color es requerido" }),
	name: z.string().nonempty("El nombre es requerido"),
	content: z.string().nonempty("El contenido es requerido"),
});

export const createPostSchema = basePostSchema;

export const postIdSchema = z.object({
	id: z.number().int(),
});

export const updatePaymentSchema = createPostSchema.extend({
	id: z.number().int(),
});
