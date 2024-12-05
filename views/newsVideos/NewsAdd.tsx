"use client";
import React, { useState, Fragment } from "react";
import axios from "axios";
import { CircleAlert } from "lucide-react";
import ImageUploader from "@/components/(admin)/ImageUploader";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";

const AddBanner = () => {
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const [modal1, setModal1] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    fileType: "image",
    video: null,
    isSpecial: false,
  });

  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file); // Update state with the new file
  };

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRemoveImage = () => {
    setCover(null); // Reset the cover image to allow a new image upload
    setForm((prevForm: typeof form) => ({
      ...prevForm,
      file: "", // Reset the file URL in the form
    }));
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

  const onSubmit = () => {
    if (!form.title || !form.description) {
      alert("Гарчиг болон тайлбар оруулна уу.");
      return;
    }

    const formData = new FormData();
    formData.append("description", form.description);
    formData.append("title", form.title);
    formData.append("isSpecial", form.isSpecial);
    if (cover) {
      formData.append("photo", cover);
    }
    formData.append("file", form.video); // Ensure 'file' matches the backend

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

    axios
      .post("http://localhost:8001/api/v1/videos", formData, {
        onUploadProgress,
      })
      .then(() => {
        alert("Баннерыг амжилттай нэмлээ!");
        router.push("/videosnews");
      })
      .catch((err) => {
        console.error("Error adding videos banner:", err);
        alert("Баннер нэмэх явцад алдаа гарлаа.");
      })
      .finally(() => {
        setShowLoader(false);
        setLoadingVideo(false);
      });
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 sm:px-10 top-0 z-0">
        <span className="text-[#162C43] text-base sm:text-lg">
          Видео мэдээ нэмэх
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full p-4 sm:p-10">
        <div className="w-[50%] bg-white border p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col relative">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-[#162c43]">
                  <div className="w-full flex items-center justify-between">
                    <span>Гарчиг</span>
                    <span className="text-sm">{form.title.length}/100</span>
                  </div>
                </label>
                <input
                  type="text"
                  maxLength={100}
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-[#162c43]">
                  <div className="w-full flex items-center justify-between">
                    <span>Тайлбар</span>
                  </div>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormValue}
                  className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                  style={{
                    minHeight: "100px",
                    resize: "vertical",
                  }}
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

              <div className="w-full py-4">
                <span className="text-[#162C43] text-base sm:text-lg">
                  Баннер зураг
                </span>
              </div>
              <hr />
              <div className="w-full relative">
                {cover ? (
                  <div>
                    <img
                      src={URL.createObjectURL(cover)}
                      alt="news"
                      className="w-full aspect-square object-cover max-h-[400px] p-12"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="text-red-500 absolute right-12 bottom-2"
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

export default AddBanner;
