"use client";
import dynamic from "next/dynamic";
import { HexColorPicker } from "react-colorful";
const Froala = dynamic(() => import("@/components/Froala/Froala"), {
  ssr: false,
});

import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Upload from "@/components/Upload/Upload";
import { useRouter } from "next/navigation";
import axiosInstance from "@/hooks/axios";

// Define the interface for the form state
interface JournalForm {
  name: string;
  headerText: string;
  uria: string;
  textcolor: string;
  bgcolor: string;
  bodyImages: File[];
  profile: File[] | null;
  audio: File[] | null;
  sliderImages: File[];
}
const CreateJournal = () => {
  const [textcolor, setColor] = useState("#aabbcc"); // Default color value
  const [bgcolor, setBgColor] = useState("#aabbcc"); // Default color value
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); //
  const [isColorPickerOpen2, setIsColorPickerOpen2] = useState(false); //
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<JournalForm>({
    name: "",
    uria: "",
    headerText: "",
    bodyImages: [],
    profile: null,
    audio: null,
    sliderImages: [],
    textcolor: "#000000",
    bgcolor: "#00878E",
  });
  const [editorContent1, setEditorContent1] = useState("");
  const [editorContent2, setEditorContent2] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const onEditorChange1 = (data: string) => {
    setEditorContent1(data);
  };
  const onEditorChange2 = (data: string) => {
    setEditorContent2(data);
  };

  const handleSingleFile = (file: File, fieldName: string) => {
    setForm((prevForm: any) => ({
      ...prevForm,
      [fieldName]: [file],
    }));

    // Create image URL and update the state
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };
  const handleAudioFileChange = (file: File) => {
    setForm((prevForm) => ({
      ...prevForm,
      audio: [file],
    }));
  };
  const handleSend = () => {
    setLoading(true);
    const formData = new FormData();

    // Append text fields to FormData
    formData.append("name", form.name);
    formData.append("headerText", form.headerText);
    formData.append("uria", form.uria);
    formData.append("desc1", editorContent1);
    formData.append("desc2", editorContent2);
    formData.append("textcolor", form.textcolor);
    formData.append("bgcolor", form.bgcolor);
    // span classNam={`text-[${data.textColor}]`}

    // Append profile image file (only one)
    if (form.profile && form.profile.length > 0) {
      formData.append("profile", form.profile[0]);
    }
    if (form.audio && form.audio.length > 0) {
      formData.append("audio", form.audio[0]);
    }

    // Append slider images (multiple files)
    form.sliderImages.forEach((file: any) => {
      formData.append("sliderImg", file);
    });

    // Append body images (multiple files)
    form.bodyImages.forEach((file: any) => {
      formData.append("bodyImg", file);
    });

    fetch("https://shijirback.tanuweb.cloud/api/v1/introduction", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Амжилттай");
        router.push("/introduction");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  };
  const onHandleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleColorChange = (newColor: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      textcolor: newColor,
    }));
    setColor(newColor);
  };
  const handleColorChange2 = (newColor: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      textcolor: newColor,
    }));
    setColor(newColor);
  };
  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen); // Toggle modal visibility
  };
  const toggleColorPicker2 = () => {
    setIsColorPickerOpen2(!isColorPickerOpen2); // Toggle modal visibility
  };

  return (
    <div className="w-full flex p-8 gap-10 h-full font-mplus md:flex-row flex-col">
      <div className="md:w-[70%] w-full flex flex-col gap-10">
        <section className="w-full flex flex-col bg-white rounded-2xl border p-10 shadow">
          <span className="my-6">Үндсэн мэдээлэл</span>
          <div className="flex flex-col">
            <span className="text-sm mb-1 text-gray-500">Сэтгүүлийн нэр</span>
            <div className="flex">
              <input
                name="name"
                type="text"
                className={`border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none text-[${form.textcolor}]`}
                style={{ color: form.textcolor, width: "100%" }}
                onChange={onHandleChange}
              />{" "}
              <button
                className="ml-4 py-1 px-2 bg-blue-500 text-white rounded-lg"
                onClick={toggleColorPicker}
              >
                Өнгө сонгох
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <span className="text-sm mb-1 text-gray-500">
              Сэтгүүлийн тайлбар
            </span>
            <textarea
              className="border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none"
              onChange={onHandleChange}
              name="headerText"
            ></textarea>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-sm mb-1 text-gray-500">Сэтгүүлийн уриа</span>
            <textarea
              className="border border-gray-200 rounded py-0 px-4 bg-[#F7FAFB] outline-none"
              onChange={onHandleChange}
              name="uria"
            ></textarea>
          </div>
        </section>
        <section className="w-full flex flex-col bg-white rounded-2xl border p-10 shadow">
          <div className="flex gap-4 flex-col items-center">
            <div className="flex flex-col ">
              <span className="mb-10 max-w-[700px]">Үндсэн мэдээлэл</span>
              <span className="text-sm mb-1 text-gray-500">
                Сэтгүүлийн мэдээлэл 1
              </span>
              <Froala onValueChange={onEditorChange1} value={editorContent1} />
            </div>

            <div className="flex flex-col ">
              <span className="text-sm mb-1 text-gray-500">
                Сэтгүүлийн мэдээлэл 2
              </span>
              <Froala onValueChange={onEditorChange2} value={editorContent2} />
            </div>
          </div>
        </section>
      </div>
      <div className="md:w-[30%] w-full border shadow rounded-2xl">
        <section className="w-full flex flex-col bg-white rounded-2xl p-10 gap-4">
          <span className="my-6">Нэмэлт мэдээлэл</span>
          <div className=" flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Нүүр зураг</span>
            <label
              htmlFor="profile"
              className="w-[60%] h-[15vh] rounded bg-gray-400 flex items-center justify-center cursor-pointer"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Camera color="white" size={30} />
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="profile"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleSingleFile(file, "profile");
                }
              }}
            />
          </div>
          <div className="w-full flex flex-col">
            <span className="text-sm mb-1 text-gray-500">Ярилцлага</span>
            <input
              type="file"
              id="audio"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAudioFileChange(file); // Use the specific handler for audio file
                }
              }}
            />
          </div>
          <div className="w-full flex flex-col">
            <span className="text-sm mb-1 text-gray-500">Биеийн зураг</span>
            <Upload
              title="body"
              file={form.bodyImages}
              onFileChange={(files) =>
                setForm({
                  ...form,
                  bodyImages: files,
                })
              }
            />
          </div>
          <div className="w-full flex flex-col">
            <span className="text-sm mb-1 text-gray-500">Слайдер зураг</span>
            <Upload
              title="slider"
              file={form.sliderImages}
              onFileChange={(files) =>
                setForm({
                  ...form,
                  sliderImages: files,
                })
              }
            />
          </div>
          <button
            className="w-full flex py-2 text-center bg-blue-500 items-center justify-center rounded-lg text-white hover:opacity-80 mt-10"
            onClick={handleSend}
            disabled={loading}
          >
            Илгээх
          </button>
        </section>
      </div>

      {/* Modal for HexColorPicker */}
      {isColorPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <HexColorPicker color={textcolor} onChange={handleColorChange} />
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg"
              onClick={toggleColorPicker}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isColorPickerOpen2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <HexColorPicker color={bgcolor} onChange={handleColorChange2} />
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg"
              onClick={toggleColorPicker2}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJournal;
