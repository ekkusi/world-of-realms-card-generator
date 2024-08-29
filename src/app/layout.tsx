import type { Metadata } from "next";
import { Amatic_SC, Comic_Neue, Kalam } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const amaticSc = Amatic_SC({ weight: "700", subsets: ["latin"], variable: "--font-amatic-sc" });
const comicNeue = Comic_Neue({ weight: ["300", "400"], style: ["normal", "italic"], subsets: ["latin"], variable: "--font-comic-neue" });
const kalam = Kalam({ weight: "400", subsets: ["latin"], variable: "--font-kalam" });

export const metadata: Metadata = {
  title: "World of Realms card generator",
  description: "Card generator for the world's most awesome card game World of Realms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen", amaticSc.className, amaticSc.variable, comicNeue.variable, kalam.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
