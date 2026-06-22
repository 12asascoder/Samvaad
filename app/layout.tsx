import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Samvaad - The Cognitive Operating System",
  description: "An immersive digital twin for personalized learning and expression.",
  keywords: ["AI", "cognitive twin", "learning", "advocacy", "accessibility", "communication"],
  authors: [{ name: "Samvaad AI" }],
  openGraph: {
    title: "Samvaad - The Cognitive Operating System",
    description: "An immersive digital twin for personalized learning and expression.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable} font-sans antialiased bg-space-900 text-ink-900`}>
        {children}
      </body>
    </html>
  );
}
