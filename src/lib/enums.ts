import { Color } from "@prisma/client";

export const ColorLabel: Record<Color, string> = {
	[Color.RED]: "Rojo",
	[Color.PINK]: "Rosa",
	[Color.ORANGE]: "Naranja",
	[Color.GREEN]: "Verde",
	[Color.BLUE]: "Azul",
	[Color.YELLOW]: "Amarillo",
	[Color.VIOLET]: "Violeta",
};
