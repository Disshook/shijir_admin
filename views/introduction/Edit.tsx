"use client";
import dynamic from "next/dynamic";

const Froala = dynamic(() => import("@/components/Froala/Froala"), {
  ssr: false,
});
import { HexColorPicker } from "react-colorful";
import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Upload from "@/components/Upload/Upload";
import { useRouter } from "next/navigation";
import axiosInstance from "@/hooks/axios";
import { useParams } from "next/navigation";
import axios from "axios";
interface JournalForm {
  _id: string;
  name: string;
  uria: string;
  headerText: string;
  textcolor: string;
  bgcolor: string;
  bodyImages: File[];
  profile: File[] | null;
  audio: File[] | null;
  sliderImages: File[];
}
const EditSingleJournal = () => {
  const [isMounted, setIsMounted] = useState(false); // Track component mount status
  const [textcolor, setColor] = useState("#aabbcc"); // Default color value
  const [bgcolor, setBgColor] = useState("#aabbcc"); // Default color value
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); //
  const [isColorPickerOpen2, setIsColorPickerOpen2] = useState(false); //

  useEffect(() => {
    setIsMounted(true); // Set to true once the component is mounted
  }, []);

  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`/introduction/${id}`).then((res) => {
      const response = res.data.data;
      console.log(response);
      setForm((prevForm) => ({
        ...prevForm,
        name: response.name || "", // Assign the response values, or fallback to defaults
        headerText: response.headerText || "",
        _id: response._id || prevForm._id, // Ensure _id is carried over
        // Preserve existing fields that aren't in the response
        uria: response.uria || "",
        textcolor: response.textcolor,
        bgcolor: response.bgcolor,
        bodyImages: prevForm.bodyImages,
        profile: prevForm.profile,
        audio: prevForm.audio,
        sliderImages: prevForm.sliderImages,
      }));
      setColor(response.textcolor);
      setEditorContent1(response.desc1 || "");
      setEditorContent2(response.desc2 || "");
    });
  }, [id]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<JournalForm>({
    _id: "",
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
  const onEditorChange1 = (data: string) => {
    setEditorContent1(data);
  };
  const onEditorChange2 = (data: string) => {
    setEditorContent2(data);
  };
  const handleSend = () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", form.name);

    formData.append("desc1", editorContent1);

    formData.append("desc2", editorContent2);
    formData.append("uria", form.uria);

    formData.append("textcolor", form.textcolor);
    formData.append("bgcolor", form.bgcolor);

    if (form.profile && form.profile.length > 0) {
      formData.append("profile", form.profile[0]);
    }
    console.log("fhfg");
    if (form.audio && form.audio.length > 0) {
      formData.append("audio", form.audio[0]);
    }

    try {
      if (Array.isArray(form.sliderImages) && form.sliderImages.length > 0) {
        form.sliderImages.forEach((file: any) => {
          formData.append("sliderImg", file);
        });
      }
    } catch (error) {
      console.error("Error processing sliderImages:", error);
    }

    try {
      if (Array.isArray(form.bodyImages) && form.bodyImages.length > 0) {
        form.bodyImages.forEach((file: any) => {
          formData.append("bodyImg", file);
        });
      }
    } catch (error) {
      console.error("Error processing bodyImages:", error);
    }

    // fetch("https://order.tanuweb.cloud/api/v1/newjournal/" + id, {
    //   method: "PUT",
    //   body: formData,
    // })

    axiosInstance
      .put("/introduction/" + id, formData)
      .then((data) => {
        alert("Амжилттай");
        router.push("/introduction");
      })
      .catch((error) => {
        console.log(error);
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

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen); // Toggle modal visibility
  };
  const handleColorChange = (newColor: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      textcolor: newColor,
    }));
    setColor(newColor);
  };
  const toggleColorPicker2 = () => {
    setIsColorPickerOpen2(!isColorPickerOpen2); // Toggle modal visibility
  };

  const handleBgColorChange2 = (newColor: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      bgcolor: newColor,
    }));
    setBgColor(newColor);
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
                value={form.name}
                className={`border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none text-[${form.textcolor}]`}
                style={{ color: form.textcolor, width: "100%" }}
                onChange={onHandleChange}
              />
              <button
                className="ml-4 py-1 px-2 bg-blue-500 text-white rounded-lg"
                onClick={toggleColorPicker}
              >
                Өнгө сонгох
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <span className="text-sm mb-1 text-gray-500">Сэтгүүлийн уриа</span>
            <textarea
              className="border border-gray-200 rounded py-2 px-4 bg-[#F7FAFB] outline-none"
              onChange={onHandleChange}
              value={form.uria}
              name="uria"
            ></textarea>
          </div>
        </section>
        {isMounted && (
          <section className="w-full flex flex-col bg-white rounded-2xl border p-10 shadow">
            <span className="my-6">Үндсэн мэдээлэл</span>
            <div className="flex gap-4 flex-col w-full">
              <div className="flex flex-col">
                <span className="text-sm mb-1 text-gray-500">
                  Сэтгүүлийн мэдээлэл 1
                </span>
                <Froala
                  onValueChange={onEditorChange1}
                  value={editorContent1}
                />
              </div>

              <div className="flex flex-col ">
                <span className="text-sm mb-1 text-gray-500">
                  Сэтгүүлийн мэдээлэл 2
                </span>
                <Froala
                  onValueChange={onEditorChange2}
                  value={editorContent2}
                />
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="md:w-[30%] w-full border shadow rounded-2xl">
        <section className="w-full flex flex-col bg-white rounded-2xl p-10 gap-4">
          <span className="my-6">Нэмэлт мэдээлэл</span>
          <div className=" flex flex-col">
            <span className="text-sm text-gray-500 mb-1">Нүүр зураг</span>
            <label
              htmlFor="profile"
              className="w-[60%] h-[25vh] rounded bg-gray-400 flex items-center justify-center cursor-pointer"
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
            className="w-full flex py-2 text-center bg-blue-500 items-center justify-center rounded-lg text-white hover:opacity-80 mt-10 cursor-pointer"
            onClick={() => {
              handleSend();
            }}
            disabled={loading}
          >
            Илгээх
          </button>
        </section>
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
      {isColorPickerOpen2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <HexColorPicker color={bgcolor} onChange={handleBgColorChange2} />
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

export default EditSingleJournal;
