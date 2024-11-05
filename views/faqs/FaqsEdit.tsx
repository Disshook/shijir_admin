"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const FaqsEdit = () => {
  const [form, setForm] = useState({ question: "", answer: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  // Fetch FAQ data based on the 'id'
  useEffect(() => {
    if (id) {
      axios
        .get(`https://taiga.tanuweb.cloud/api/v1/faq/${id}`)
        .then((res) => {
          setForm({
            question: res.data.data.question || "",
            answer: res.data.data.answer || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching FAQ:", err);
          alert("Асуултыг ачаалахад алдаа гарлаа.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.put(`https://taiga.tanuweb.cloud/api/v1/faq/${id}`, {
        question: form.question,
        answer: form.answer,
      });
      alert("Асуулт амжилттай засагдлаа");
      router.push("/faqs");
    } catch (err) {
      console.error("Error updating FAQ:", err);
      alert("Засвар хийхэд алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span>Асуултыг ачааллаж байна...</span>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 md:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Асуулт засах</span>
        <button
          onClick={onSubmit}
          className={`px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Илгээж байна..." : "Илгээх"}
        </button>
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-4 w-full p-4 md:p-10">
        <div className="w-full md:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Асуулт болон хариулт</span>
            </div>
            <hr />
            <div className="w-full p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="question" className="text-xs text-[#162c43]">
                  Асуулт
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  value={form.question}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded bg-white text-[#162c43]"
                  placeholder="Асуултаа оруулна уу"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="answer" className="text-xs text-[#162c43]">
                  Хариулт
                </label>
                <textarea
                  id="answer"
                  name="answer"
                  value={form.answer}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded bg-white text-[#162c43]"
                  placeholder="Хариултаа оруулна уу"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqsEdit;
