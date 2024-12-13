"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Froala = dynamic(() => import("@/components/Froala/Froala"), {
  ssr: false,
});
import dynamic from "next/dynamic";

const AddBanner = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    little: "",
    big: "",
    fileType: "image",
    file: null,
    isSpecial: false, // Add the isSpecial field to the form state
  });

  const [cover, setCover] = useState<File | null>(null);

  const [editorContent1, setEditorContent1] = useState("");
  const [editorContent2, setEditorContent2] = useState("");

  const onEditorChange1 = (data: string) => {
    setEditorContent1(data);
  };
  const onEditorChange2 = (data: string) => {
    setEditorContent2(data);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCover(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("description", editorContent2);
    formData.append("title", editorContent1);
    formData.append("isSpecial", form.isSpecial);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://shijirback.tanuweb.cloud/api/v1/news", formData)
      .then(() => {
        alert("Мэдээг амжилттай нэмлээ!");
        router.push("/news");
      })
      .catch((err) => console.error("Error adding banner:", err));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">Мэдээ нэмэх</span>
        <button
          onClick={onSubmit}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
        >
          Илгээх
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-full bg-white border p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <label className="text-sm sm:text-base text-[#162c43]">
              Гарчиг
            </label>
            <Froala onValueChange={onEditorChange1} value={editorContent1} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Тайлбар
              </label>
              <Froala onValueChange={onEditorChange2} value={editorContent2} />
            </div>
            <label className="mt-4 inline-flex items-center font-bold">
              <input
                type="checkbox"
                className="mr-1 h-5 w-5 rounded border-gray-300 shadow-sm focus:ring-gray-500"
                name="isSpecial" // Make sure to include the name for the checkbox
                checked={form.isSpecial} // Bind the checked state to form.isSpecial
                onChange={(e) =>
                  setForm({ ...form, isSpecial: e.target.checked })
                } // Update the isSpecial state
              />
              Онцлох Мэдээ
            </label>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base text-[#162c43]">
                Файл оруулах
              </label>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
