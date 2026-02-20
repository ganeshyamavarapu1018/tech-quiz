"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

type Score = {
  id: string;
  name: string;
  score: number;
  time_taken: number;
};

export default function Home() {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [rank, setRank] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const questions = [
    { text: "Which improves LLM factual accuracy MOST?", options: ["Bigger Model", "Prompt Engineering", "RAG", "Higher Temperature"], correct: 2 },
    { text: "What causes model accuracy drop in production?", options: ["More Data", "Data Drift", "Bigger Model", "Higher LR"], correct: 1 },
    { text: "What is RAG used for?", options: ["Faster training", "External knowledge retrieval", "Lower GPU", "Model compression"], correct: 1 },
    { text: "Which tool is used for ML experiment tracking?", options: ["Git", "MLflow", "Excel", "Docker"], correct: 1 },
    { text: "Which improves inference scalability?", options: ["Bigger Batch", "Model Sharding", "More Epochs", "Lower LR"], correct: 1 },
    { text: "Which is a vector database?", options: ["MySQL", "Pinecone", "MongoDB", "Redis"], correct: 1 },
    { text: "What helps reduce hallucination?", options: ["RAG", "Higher Temp", "Smaller Dataset", "More Tokens"], correct: 0 },
    { text: "Which monitors model drift?", options: ["Grafana", "EvidentlyAI", "Notepad", "Excel"], correct: 1 },
    { text: "Which is used for CI/CD?", options: ["GitHub Actions", "Photoshop", "Figma", "Canva"], correct: 0 },
    { text: "Which is used for containerization?", options: ["Kubernetes", "Docker", "TensorFlow", "NumPy"], correct: 1 }
  ];

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("quiz_scores")
      .select("*")
      .order("score", { ascending: false })
      .order("time_taken", { ascending: true });

    if (!error && data) {
      setLeaderboard(data);
    }
  };

  const startQuiz = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswer = async (index: number) => {
    if (submitting) return;

    const isCorrect = index === questions[currentQuestion].correct;
    const newScore = isCorrect ? score + 1 : score;

    if (currentQuestion < questions.length - 1) {
      setScore(newScore);
      setCurrentQuestion((prev) => prev + 1);
      return;
    }

    // LAST QUESTION
    setSubmitting(true);

    try {
      if (!supabase || !startTime) throw new Error("Missing data");

      const finalTime = Math.floor((Date.now() - startTime) / 1000);

      const { data, error } = await supabase
        .from("quiz_scores")
        .insert([
          {
            name: name.trim(),
            score: newScore,
            time_taken: finalTime,
          },
        ])
        .select();

      if (error) throw error;

      const { data: all, error: fetchError } = await supabase
        .from("quiz_scores")
        .select("*")
        .order("score", { ascending: false })
        .order("time_taken", { ascending: true });

      if (fetchError) throw fetchError;

      if (all && data) {
        const userRank =
          all.findIndex((item) => item.id === data[0].id) + 1;

        setRank(userRank);
        setLeaderboard(all);
      }

      setScore(newScore);
      setFinished(true);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Error submitting score. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex flex-col items-center p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">
        🔥 GenAI Professional Quiz
      </h1>

      {!started ? (
        <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg">
          <input
            type="text"
            placeholder="Enter your name"
            className="border p-2 w-full mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={startQuiz}
            className="bg-indigo-600 text-white p-2 w-full rounded"
          >
            Start Quiz
          </button>
        </div>
      ) : !finished ? (
        <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg">
          <p className="mb-4 font-semibold">
            Question {currentQuestion + 1} / {questions.length}
          </p>

          <p className="mb-4">
            {questions[currentQuestion].text}
          </p>

          {questions[currentQuestion].options.map((opt, i) => (
            <button
              key={i}
              disabled={submitting}
              onClick={() => handleAnswer(i)}
              className="bg-indigo-500 text-white p-2 w-full rounded mb-2 hover:bg-indigo-600 disabled:opacity-50"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-2">
            Final Score: {score} / {questions.length}
          </h2>

          {rank && (
            <h3 className="mb-4">
              Your Rank: #{rank}
            </h3>
          )}

          <button
            onClick={() => {
              const shareUrl =
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                encodeURIComponent(window.location.href);
              window.open(shareUrl, "_blank");
            }}
            className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 mt-4"
          >
            Share on LinkedIn
          </button>
        </div>
      )}

      <div className="mt-10 bg-white text-black p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Leaderboard
        </h2>

        {leaderboard.map((user, index) => (
          <div
            key={user.id}
            className={`flex justify-between mb-2 ${
              user.name === name && finished
                ? "font-bold text-indigo-600"
                : ""
            }`}
          >
            <span>
              {index + 1}. {user.name}
            </span>
            <span>
              {user.score}/10
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
