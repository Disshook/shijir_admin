"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const TipEditView = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter(); 
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    fileType: "image",
    photo: "",
  });

  // Fetch data when the component mounts or 'id' changes
  useEffect(() => {
    if (id) {
      axios
        .get(`https://taiga.tanuweb.cloud/api/v1/tip/${id}`)
        .then((res) => {
          const tipData = res.data.data;
          setSingle(tipData);
          setForm({
            title: tipData.title,
            subtitle: tipData.subtitle,
            fileType: tipData.fileType,
            photo: tipData.file,
          });
        })
        .catch((err) => console.error("Error fetching tip:", err));
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("fileType", form.fileType);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/tip/${id}`, formData)
      .then((res) => {
        alert("Tip updated successfully!");
        router.push("/tip");})
      .catch((err) => console.error("Error updating tip:", err));
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">Зөвлөмж засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Section) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зөвлөмж зураг</span>
            </div>
            <hr />
            <div className="w-full">
              {form.photo ? (
                <img
                  src={"https://taiga.tanuweb.cloud/uploads/" + form.photo}
                  alt="Tip"
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <ImageUploader isSquare onFileChange={handleSingleFileChange} />
              )}
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43]">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Form Section) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зөвлөмж </span>
            </div>
            <hr />
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full p-4">
                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                    Зөвлөмжийн нэр
                  </span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                    Зөвлөмжийн агуулга
                  </span>
                  <input
                    type="text"
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipEditView;
