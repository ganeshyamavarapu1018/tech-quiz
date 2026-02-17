import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://tech-quiz-git-main-ganesh-yamavarapus-projects.vercel.app/"
  ),
  title: "🔥 GenAI Professional Quiz | Live Leaderboard",
  description:
    "Test your AI/ML knowledge with 10 GenAI questions. Get instant ranking and compete on the live leaderboard.",
  openGraph: {
    title: "🔥 GenAI Professional Quiz Challenge",
    description:
      "10 GenAI Questions • Instant Rank • Live Leaderboard. Can you score 10/10?",
    url: "https://tech-quiz-git-main-ganesh-yamavarapus-projects.vercel.app/",
    siteName: "GenAI Quiz",
    images: [
      {
        url: "/preview.png", // This must exist inside /public folder
        width: 1200,
        height: 630,
        alt: "GenAI Professional Quiz Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🔥 GenAI Professional Quiz",
    description:
      "Take the GenAI challenge and see where you rank on the leaderboard.",
    images: ["/preview.png"],
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
