"use client";
import React, { useEffect, useState, Fragment } from "react";
import ImageUploader from "@/components/(admin)/ImageUploader";
import { useRouter, useParams } from "next/navigation";
import { IMGURL } from "@/hooks/axios";
import axiosInstance from "@/hooks/axios";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "@/components/FileUpload";
import dynamic from "next/dynamic";

const Froala = dynamic(() => import("@/components/Froala/Froala"), {
  ssr: false,
});

const NewsEditView = () => {
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    editorContent2: "",
    editorContent1: "",
    photo: "", // Image URL from the server
    video: null as File | null, // Image URL from the server
  });

  // Fetch existing home data from the server
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`videosbanner/${id}`)
        .then((res) => {
          const newsData = res.data.data;
          setSingle(newsData);
          setForm({
            editorContent1: newsData.title || "", // Ensure editorContent1 is a string
            editorContent2: newsData.description || "",
            photo: newsData.photo ? `${IMGURL}/${newsData.photo}` : "",
            video: newsData.video,
          });
          setEditorContent1(newsData.title || "");
          setEditorContent2(newsData.description || "");
        })
        .catch((err) => console.error("Error fetching BannerVideos:", err));
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

  // Handle newly uploaded image
  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (photo: File | null) => {
    setCover(photo); // Update state with the new file
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;

    if (
      input &&
      input instanceof HTMLInputElement &&
      input.files &&
      input.files.length > 0
    ) {
      const file = input.files[0];
      setForm({
        ...form,
        video: file,
      });
    } else {
      console.error("No file selected or files property is missing.");
    }
  };

  // Submit form with updated data
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", editorContent1);
    formData.append("description", editorContent2);
    // If there's a new image, append it to the form data
    if (cover) {
      formData.append("photo", cover);
    }
    if (form.video) {
      formData.append("file", form.video);
    }

    setShowLoader(true);
    setLoadingVideo(true);
    setModal1(true);

    const onUploadProgress = (progressEvent: any) => {
      const total = progressEvent.total;
      if (total) {
        const progress = Math.round((progressEvent.loaded * 100) / total);
        setPercentCompleted(progress);

        if (progress === 100) {
          setTimeout(() => {
            setModal1(false);
            setPercentCompleted(0);
          }, 500); // Delay for user feedback
        }
      }
    };
    console.log([...formData]);
    axiosInstance
      .put("videosbanner/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
        timeout: 0, // You can increase this if needed
      })
      .then(() => {
        alert("Banner updated successfully!");
        router.push("/videosnews");
      })
      .catch((err) => console.error("Error updating videos:", err))
      .finally(() => {
        setShowLoader(false);
        setLoadingVideo(false);
      });
  };

  // Function to handle image removal
  const handleRemoveImage = () => {
    setCover(null); // Reset the cover image to allow a new image upload
    setForm((prevForm) => ({
      ...prevForm,
      photo: "", // Reset the file URL in the form
    }));
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Видео Баннер засах
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
                    </div>
                  </label>
                  <Froala
                    onValueChange={onEditorChange1}
                    value={editorContent1}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full ">
                  <div className="w-full flex items-center justify-between">
                    <span> Тайлбар</span>
                    <span className="text-sm"></span>
                  </div>
                  <Froala
                    onValueChange={onEditorChange2}
                    value={editorContent2}
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
                  <div className="w-full relative">
                    {/* Display uploaded image or selected new image */}
                    {cover || form.photo ? (
                      <div>
                        <img
                          src={cover ? URL.createObjectURL(cover) : form.photo} // Use form.photo if cover is not available
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

                  {loadingVideo ? (
                    <div className="flex h-[300px] w-full items-center justify-center font-semibold">
                      Бичлэгийг ачаалж байна...
                    </div>
                  ) : (
                    <FileUpload onchange={handleFileUpload} />
                  )}
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
        <Transition appear show={modal1} as={Fragment}>
          <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-lg font-semibold text-center">
                  Uploading... {percentCompleted}%
                </p>
                {percentCompleted === 100 && (
                  <p className="text-green-600 text-center mt-2">
                    Upload Complete!
                  </p>
                )}
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default NewsEditView;
