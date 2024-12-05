"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import ImageUploader from "@/components/(admin)/ImageUploader";
import { useRouter, useParams } from "next/navigation";
import { IMGURL } from "@/hooks/axios";
import axiosInstance from "@/hooks/axios";
import { HexColorPicker } from "react-colorful";

const NewsEditView = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const [textcolor, setColor] = useState("#aabbcc"); // Default color value
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); //
  const router = useRouter();
  const [form, setForm] = useState({
    description: "",
    title: "",
    textcolor: "#000000",
    file: "", // Image URL from the server
  });

  // Fetch existing home data from the server
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`home/${id}`)
        .then((res) => {
          const newsData = res.data.data;
          setSingle(newsData);
          setForm({
            description: newsData.description,
            textcolor: newsData.textcolor,

            title: newsData.title,
            file: newsData.file,
          });
          setColor(newsData.textcolor);
        })
        .catch((err) => console.error("Error fetching home:", err));
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
  const handleColorChange = (newColor: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      textcolor: newColor,
    }));
    setColor(newColor);
  };

  // Handle newly uploaded image
  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file); // Update state with the new file
  };

  // Submit form with updated data
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("textcolor", form.textcolor);

    // If there's a new image, append it to the form data
    if (cover) {
      formData.append("file", cover);
    } else if (form.file) {
      formData.append("file", form.file); // If no new image, include the existing one
    }

    axiosInstance
      .put(`home/${id}`, formData)
      .then(() => {
        alert("Banner picture updated successfully!");
        router.push("/home");
      })
      .catch((err) => console.error("Error updating home:", err));
  };

  // Function to handle image removal
  const handleRemoveImage = () => {
    setCover(null); // Reset the cover image to allow a new image upload
    setForm((prevForm) => ({
      ...prevForm,
      file: "", // Reset the file URL in the form
    }));
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen); // Toggle modal visibility
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Баннер засах
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full p-4 sm:p-6">
        <div className="w-full md:w-[50%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <hr />
            <div className="w-full p-10">
              <div className="flex md:flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full ">
                  <label className="text-sm sm:text-base text-[#162c43]">
                    <div className="w-full flex items-center justify-between">
                      <span>Гарчиг</span>
                      <span className="text-sm">{form.title?.length}/25</span>
                    </div>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="title"
                      maxLength={25}
                      value={form.title}
                      onChange={handleFormValue}
                      className={`border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[${form.textcolor}]`}
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
                <div className="flex flex-col gap-2 w-full ">
                  <div className="w-full flex items-center justify-between">
                    <span> Тайлбар</span>
                    <span className="text-sm">
                      {form.description?.length}/100
                    </span>
                  </div>
                  <input
                    type="text"
                    name="description"
                    maxLength={100}
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                  />
                </div>

                {/* Image upload section */}
                <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white relative">
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
                          alt="home"
                          className="w-full aspect-square object-cover max-h-[300px] p-12"
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="text-red-500 absolute right-8 bottom-6"
                        >
                          Устгах
                        </button>
                      </div>
                    ) : form.file ? (
                      // Display existing image from the server
                      <div>
                        <img
                          src={IMGURL + form.file}
                          alt="home"
                          className="w-full aspect-square object-cover max-h-[300px] p-12"
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="text-red-500 absolute right-8 bottom-6"
                        >
                          Устгах
                        </button>
                      </div>
                    ) : (
                      <ImageUploader
                        isSquare
                        onFileChange={handleSingleFileChange}
                      />
                    )}
                  </div>

                  <div className="flex gap-2 items-center w-full px-4 pt-4">
                    <CircleAlert color="#162c43" />
                    <span className="text-xs text-[#162c43] w-full">
                      (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  className="px-3 sm:px-4 mt-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
                  onClick={onSubmit}
                >
                  Илгээх
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default NewsEditView;
