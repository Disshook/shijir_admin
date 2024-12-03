"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddBanner = () => {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    title: "",
  });

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const formData = {
      title: form.title,
    };

    axios
      .post("https://shijir.tanuweb.cloud/api/v1lawevent", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Хуулийн санал амжилттай нэмлээ!");
        router.push("/FeedbackEvent");
      })
      .catch((err) => console.error("Error adding banner:", err));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Хуулийн санал нэмэх
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-[50%] bg-white border p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col  relative">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-[#162c43]">
                  <div className="w-full flex items-center justify-between">
                    <span>Хуулийн нэр</span>
                  </div>
                </label>
                <textarea
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none"
                  style={{
                    minHeight: "100px", // Allow enough space for multiline text
                    resize: "vertical", // Allow resizing vertically
                    paddingTop: "4", // Align content at the top
                    textAlign: "start", // Align text to the left
                  }}
                />
              </div>
              <hr />
            </div>
          </div>
          <div className="py-4">
            <button
              onClick={onSubmit}
              className="px-3 sm:px-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
            >
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
