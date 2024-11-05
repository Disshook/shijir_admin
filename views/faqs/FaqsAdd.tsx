"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FaqsAdd = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) {
      setError("Бүх талбаруудыг бөглөнө үү");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("https://taiga.tanuweb.cloud/api/v1/faq", {
        question,
        answer,
      });
      alert("Асуулт амжилттай нэмэгдлээ");
      router.push("/faqs");
    } catch (error) {
      setError("Алдаа гарлаа, дахин оролдоно уу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-10">
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Асуулт нэмэх</span>
        <Link
          href={"/faqs"}
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Буцах
        </Link>
      </div>

      <div className="w-full mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 border rounded-lg"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="question" className="text-sm text-[#162C43]">
              Асуулт
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-[#e5e5e5] rounded-lg p-3 text-sm"
              placeholder="Асуулт оруулна уу"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="answer" className="text-sm text-[#162C43]">
              Хариулт
            </label>
            <input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full border border-[#e5e5e5] rounded-lg p-3 text-sm"
              placeholder="Хариулт оруулна уу"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
            >
              {loading ? "Нэмэгдэж байна..." : "Нэмэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FaqsAdd;
