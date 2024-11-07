"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useParams, useRouter } from "next/navigation";
import Froala from "@/components/(admin)/travels/Froala";
import { Travel } from "@/types/travel";

const EditDestinationView = () => {
  const [single, setSingle] = useState<Travel | null>(null);
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    info: "",
    photo: "",
  });

  const [editorValue, setEditorValue] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://taiga.tanuweb.cloud/api/v1/destination/${id}`)
        .then((res) => {
          const data = res.data.data;
          setSingle(data);
          setForm({
            name: data.name || "",
            photo: data.file || "",
            info: data.info || "",
          });
          setEditorValue(data.info || "");
        })
        .catch((err) => console.error("Error fetching destination:", err));
    }
  }, [id]);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const handleEditorChange = (text: string) => {
    setEditorValue(text);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("info", editorValue);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/destination/${id}`, formData)
      .then(() => router.push("/destinations"))
      .catch((err) => console.error("Error updating destination:", err));
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10">
        <span className="text-[#162C43] text-lg">Засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зураг</span>
            </div>
            <hr />
            <div className="w-full">
              {form.photo ? (
                <img
                  src={`https://taiga.tanuweb.cloud/uploads/${form.photo}`}
                  alt="destination"
                  className="w-full aspect-square"
                />
              ) : (
                <ImageUploader isSquare onFileChange={handleSingleFileChange} />
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* General Information */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Ерөнхий мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="w-full p-4 lg:flex-row items-center">
                <div className="flex flex-col gap-2 w-full lg:w-[100%] p-4">
                  <span className="text-xs text-[#162c43]">Нэр</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                    placeholder="Аялалын нэр"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full lg:w-[100%] p-4">
                  <span className="text-xs text-[#162c43]">Мэдээлэл</span>
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
    </>
  );
};

export default EditDestinationView;
