import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tech-quiz-coral.vercel.app"),

  title: "🔥 GenAI Professional Quiz Challenge",

  description:
    "Take the GenAI Professional Quiz and test your AI/ML expertise with 10 real-world questions. Get instant ranking, compete on the live leaderboard, and challenge your network to beat your score today.",

  openGraph: {
    title: "🔥 GenAI Professional Quiz Challenge",
    description:
      "Take the GenAI Professional Quiz with 10 AI/ML questions. Get instant ranking and compete globally on the live leaderboard.",
    url: "https://tech-quiz-coral.vercel.app/",
    siteName: "GenAI Quiz",
    images: [
      {
        url: "https://tech-quiz-coral.vercel.app/preview.png",
        width: 1200,
        height: 630,
        alt: "GenAI Professional Quiz Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "🔥 GenAI Professional Quiz",
    description:
      "Compete in the GenAI Professional Quiz and rank on the live leaderboard.",
    images: ["https://tech-quiz-coral.vercel.app/preview.png"],
  },

  authors: [
    { name: "Ganesh Yamavarapu" }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Force LinkedIn Classic OG Tags */}
        <meta property="og:title" content="🔥 GenAI Professional Quiz Challenge" />
        <meta
          property="og:description"
          content="Take the GenAI Professional Quiz and compete globally with professionals on the live leaderboard."
        />
        <meta
          property="og:image"
          content="https://tech-quiz-coral.vercel.app/preview.png"
        />
        <meta property="og:url" content="https://tech-quiz-coral.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="author" content="Ganesh Yamavarapu" />
      </head>
      <body>{children}</body>
    </html>
  );
}
