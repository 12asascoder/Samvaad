import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Samvaad - Your Cognitive Twin for Learning & Advocacy",
  description: "Samvaad is a human-centered AI platform that creates a secure digital twin of your learning and communication style, helping you learn effectively and advocate confidently in any situation.",
  keywords: ["AI", "cognitive twin", "learning", "advocacy", "accessibility", "communication", "education", "Azure AI"],
  authors: [{ name: "Samvaad AI" }],
  openGraph: {
    title: "Samvaad - Your Cognitive Twin",
    description: "Learn in your unique way. Communicate with confidence. Samvaad amplifies your voice.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
