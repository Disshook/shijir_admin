"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import ImageUploader from "@/components/(admin)/ImageUploader";
import { useRouter, useParams } from "next/navigation";
import { IMGURL } from "@/hooks/axios";
import axiosInstance from "@/hooks/axios";
import dynamic from "next/dynamic";

const Froala = dynamic(() => import("@/components/Froala/Froala"), {
  ssr: false,
});

const NewsEditView = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    editorContent2: "",
    editorContent1: "",
    photo: "", // Image URL from the server
    isSpecial: false, // Add the isSpecial field to the form state
  });

  // Fetch existing news data from the server
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`news/${id}`)
        .then((res) => {
          const newsData = res.data.data;
          setSingle(newsData);
          setForm({
            editorContent1: newsData.title || "", // Ensure editorContent1 is a string
            editorContent2: newsData.description || "",
            photo: newsData.photo,
            isSpecial: newsData.isSpecial,
          });
          setEditorContent1(newsData.title || "");
          setEditorContent2(newsData.description || "");
        })
        .catch((err) => console.error("Error fetching news:", err));
    }
  }, [id]);

  const [editorContent1, setEditorContent1] = useState("");
  const [editorContent2, setEditorContent2] = useState("");

  const onEditorChange1 = (data: string) => {
    setEditorContent1(data);
  };
  const onEditorChange2 = (data: string) => {
    setEditorContent2(data);
  };
  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle newly uploaded image
  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file); // Update state with the new file
  };

  // Submit form with updated data
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("description", form.editorContent2);
    formData.append("title", form.editorContent1);
    formData.append("isSpecial", form.isSpecial.toString());

    // If there's a new image, append it to the form data
    if (cover) {
      formData.append("file", cover);
    }

    axiosInstance
      .put(`news/${id}`, formData)
      .then(() => {
        alert("News updated successfully!");
        router.push("/news");
      })
      .catch((err) => console.error("Error updating news:", err));
  };

  // Function to handle image removal
  const handleRemoveImage = () => {
    setCover(null); // Reset the cover image to allow a new image upload
    setForm((prevForm) => ({
      ...prevForm,
      photo: "", // Reset the photo URL in the form
    }));
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
                <div className="flex flex-col gap-2 w-full md:w-[50%]">
                  <label className="text-xs sm:text-sm text-[#162c43]">
                    Гарчиг
                  </label>
                  <Froala
                    onValueChange={onEditorChange1}
                    value={editorContent1}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[50%]">
                  <label className="text-xs sm:text-sm text-[#162c43]">
                    Тайлбар
                  </label>
                  <Froala
                    onValueChange={onEditorChange2}
                    value={editorContent2}
                  />
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
                          alt="news"
                          className="w-full aspect-square object-cover max-h-[300px] p-12"
                        />
                        <button
                          onClick={handleRemoveImage}
                          className="text-red-500 mt-2"
                        >
                          Устгах
                        </button>
                      </div>
                    ) : form.photo ? (
                      // Display existing image from the server
                      <div>
                        <img
                          src={IMGURL + form.photo}
                          alt="news"
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
                    <span className="text-xs text-[#162c43] w-full"></span>
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-sm sm:text-base"
                  onClick={onSubmit}
                >
                  Илгээх
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsEditView;
