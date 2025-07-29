import "@/styles/globals.css";
import { ColorLabel } from "@/lib/enums";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";

const availableThemes = [...Object.keys(ColorLabel), "system"];

export const metadata: Metadata = {
	title: "Theme Switcher Post App",
	description: "Created by Sebastián Contreras",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className={`${geist.variable}`} suppressHydrationWarning>
			<body>
				<TRPCReactProvider>
					<ThemeProvider themes={availableThemes}>{children}</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
