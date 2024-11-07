"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import dynamic from "next/dynamic";

// Dynamic imports for components
const Froala = dynamic(() => import("@/components/(admin)/travels/Froala"), {
  ssr: false,
});

const ImageUploader = dynamic(
  () => import("@/components/(admin)/travels/ImageUploader"),
  {
    ssr: false,
  }
);

const DestinationAdd = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");

  const handleEditorChange = (text: string) => {
    setEditorValue(text);
  };

  const [form, setForm] = useState({
    name: "",
    info: "",
  });

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("info", editorValue); // Use editor content here
    files.forEach((file: any) => {
      formData.append("files", file);
    });
    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://taiga.tanuweb.cloud/api/v1/destination", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/destinations");
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {/* Header Section */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10">
        <span className="text-[#162C43] text-lg">Хүрэх газар нэмэх</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          {isLoading ? <Spinner /> : "Илгээх"}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Column */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          {/* Image Uploader */}
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <div className="flex justify-between">
                <span className="text-[#162C43]">Зураг</span>
                <div className="flex items-center w-full px-4">
                  <CircleAlert color="#162c43" />
                  <span className="text-xs text-[#162c43] w-full">
                    (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader onFileChange={handleSingleFileChange} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* Destination Info */}
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Хүрэх газрын мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full p-4">
              <div className="w-full lg:flex-row items-center">
                <div className="flex flex-col gap-2 w-full lg:w-[100%] p-4">
                  <span className="text-xs text-[#162c43]">Нэр</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="Улаанбаатар г.м"
                  />
                </div>
                <div className="flex gap-2 w-full lg:w-[100%] p-4">
                  <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
                    <div className="w-full px-4 py-4">
                      <span className="text-[#162C43]">Мэдээлэл</span>
                    </div>
                    <hr />
                    <div className="w-full p-4 text-black">
                      <Froala
                        value={editorValue}
                        onValueChange={handleEditorChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationAdd;
