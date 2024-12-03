"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import ImageUploader from "@/components/(admin)/ImageUploader";
import { IMGURL } from "@/hooks/axios";
import { HexColorPicker } from "react-colorful";
interface BannerForm {
  little: string;
  big: string;
  fileType: string;
  textcolor: string;
  file: File | null;
  description?: string;
  title?: string;
}

const AddBanner = () => {
  const router = useRouter();
  const [textcolor, setColor] = useState("#aabbcc"); // Default color value
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); //

  const [form, setForm] = useState<any>({
    little: "",
    big: "",
    fileType: "image",
    textcolor: "#000000",
    file: null,
  });

  const [cover, setCover] = useState<File | null>(null);
  const handleSingleFileChange = (file: File | null) => {
    setCover(file); // Update state with the new file
  };
  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleColorChange = (newColor: string) => {
    setForm((prevForm: BannerForm) => ({
      ...prevForm,
      textcolor: newColor,
    }));
    setColor(newColor);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("description", form.description);
    formData.append("title", form.title);
    formData.append("textcolor", form.textcolor);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://shijir.tanuweb.cloud/api/v1home", formData)
      .then(() => {
        alert("Баннерыг амжилттай нэмлээ!");
        router.push("/home");
      })
      .catch((err) => console.error("Error adding banner:", err));
  };
  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen); // Toggle modal visibility
  };
  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Баннер нэмэх
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-[50%] bg-white border p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col  relative">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-[#162c43]">
                  <div className="w-full flex items-center justify-between">
                    <span>Гарчиг</span>
                    <span className="text-sm">{form.title?.length}/25</span>
                  </div>
                </label>
                <div className="flex">
                  <input
                    type="text"
                    maxLength={25}
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className={`border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none text-[${form.textcolor}]`}
                    style={{ color: form.textcolor, width: "100%" }}
                  />
                  <button
                    className="ml-4 py-1 px-2 bg-blue-500 text-white rounded-lg"
                    onClick={toggleColorPicker}
                  >
                    Өнгө сонгох
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-[#162c43]">
                  <div className="w-full flex items-center justify-between">
                    <span> Тайлбар</span>
                    <span className="text-sm">
                      {form.description?.length}/100
                    </span>
                  </div>
                </label>
                <input
                  type="text"
                  name="description"
                  maxLength={100}
                  value={form.description}
                  onChange={handleFormValue}
                  className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                />
              </div>
              <div className="w-full px-4 py-4">
                <span className="text-[#162C43] text-base sm:text-lg">
                  Баннер зураг
                </span>
              </div>
              <hr />
              <div className="w-full ">
                {/* Display uploaded image or selected new image */}
                {cover ? (
                  <div>
                    <img
                      src={URL.createObjectURL(cover)} // Preview the new image
                      alt="news"
                      className="w-full aspect-square object-cover max-h-[400px] p-12"
                    />
                  </div>
                ) : (
                  <ImageUploader
                    isSquare
                    onFileChange={handleSingleFileChange}
                  />
                )}
              </div>

              <div className="flex gap-2 items-center w-full px-4 pt-4 mb-4">
                <CircleAlert color="#162c43" />
                <span className="text-xs text-[#162c43] w-full">
                  (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
                </span>
              </div>
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
      </div>
    </>
  );
};

export default AddBanner;
