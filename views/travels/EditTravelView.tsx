"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import TravelGallery from "@/components/(admin)/travels/TravelGallery";
import Toggle from "react-toggle";
import CategoryGallery from "@/components/(admin)/travels/CategoryGallery";
import axios from "axios";
import Froala from "@/components/(admin)/travels/Froala";
import ImageUploader from "@/components/(admin)/travels/ImageUploader";
import { useParams, useRouter } from "next/navigation";
import { Travel } from "@/types/travel";
import dynamic from "next/dynamic";

// Dynamic import for modal
const Modal = dynamic(() => import("react-minimal-modal"), {
  ssr: false,
});

interface Props {
  category: Category[];
}

const EditTravelView = ({ category }: Props) => {
  const router = useRouter();
  const { id } = useParams();

  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [single, setSingle] = useState<Travel>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sliderCount, setSliderCount] = useState<number>(0);
  const [showSliders, setShowSliders] = useState<boolean>(false);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    category: "",
    sale: "",
    pax1: "",
    pax2: "",
    pax3: "",
    pax4: "",
  });

  const [editorValue, setEditorValue] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>(category[0]?._id!);
  const [code, setCode] = useState("");
  const [formValues, setFormValues] = useState<Array<{ direction: string; program: string }>>([]);

  // Fetch travel details for editing
  useEffect(() => {
    axios.get(`https://taiga.tanuweb.cloud/api/v1/travel/${id}`).then((res) => {
      const travelData = res.data.data;
      setSingle(travelData);
      setForm({
        title: travelData.title,
        duration: travelData.duration,
        price: travelData.price,
        sale: travelData.sale,
        pax1: travelData.pax1,
        pax2: travelData.pax2,
        pax3: travelData.pax3,
        pax4: travelData.pax4,
        category: travelData.category,
      });
      setIsSpecial(travelData.isSpecial);
      setEditorValue(travelData.description);
      setSelectedCat(travelData.category);
      setCode(travelData.code || "");
      setFormValues(travelData.days || []);
      setFiles(travelData.files || []);
      setCover(travelData.cover || null);
    });
  }, [id]);

  const handleToggle = () => setIsSpecial(!isSpecial);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditorChange = (text: string) => setEditorValue(text);

  const handleFileChange = (files: File[]) => setFiles(files);

  const handleSingleFileChange = (file: File | null) => setCover(file);

  const handleSliderChange = (index: number, field: string, value: string) => {
    const updatedValues = [...formValues];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    setFormValues(updatedValues);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("duration", form.duration);
    formData.append("description", editorValue);
    formData.append("sale", form.sale);
    formData.append("isSpecial", JSON.stringify(isSpecial));
    formData.append("price", form.price);
    formData.append("category", selectedCat);
    formData.append("code", code.replace("allowfullscreen", "allowFullScreen"));
    formData.append("days", JSON.stringify(formValues));

    files.forEach((file) => formData.append("files", file));
    if (cover) formData.append("cover", cover);

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/travel/${id}`, formData)
      .then(() => router.push("/travels"))
      .catch(console.log);
  };

  return (
    <>

   

      {/* Modal for Itinerary */}
      <Modal open={isOpen} onOpenChange={setIsOpen} title="Хөтөлбөр засах" style={{ borderRadius: "5px" }}>
        <div className="w-full min-h-[500px] flex flex-col max-h-[500px] overflow-auto">
          {/* Slider Count Input */}
          <div className="flex flex-col gap-2 w-full p-4">
            <span className="text-xs text-[#162c43]">Аялалын өдөр</span>
            <input
              type="number"
              value={sliderCount}
              onChange={(e) => {
                const newCount = Number(e.target.value);
                setSliderCount(newCount);
                setFormValues((prevValues) => {
                  // Adjust number of days in formValues based on slider count
                  if (newCount > prevValues.length) {
                    return [...prevValues, ...Array(newCount - prevValues.length).fill({ direction: "", program: "" })];
                  } else {
                    return prevValues.slice(0, newCount);
                  }
                });
              }}
              className="border py-2 text-xs px-4 rounded text-[#162c43]"
              placeholder="2 өдөр 3 шөнө г.м"
            />
          </div>

          {/* Generate Sliders Button */}
          <div className="px-4 w-full mb-4">
            <div
              className="w-full py-2 flex items-center border bg-[#3749E5] justify-center rounded cursor-pointer"
              onClick={() => setShowSliders(true)}
            >
              <span className="text-xs text-white">Үүсгэх</span>
            </div>
          </div>

          {/* Day Sliders for Itinerary */}
          {showSliders &&
            formValues.map((day, index) => (
              <div className="w-full flex flex-col gap-2 px-4" key={index}>
                <div className="text-sm text-center w-full border bg-slate-500 text-white">
                  Өдөр {index + 1}
                </div>
                <div className="flex flex-col gap-2 w-full px-4 py-2">
                  <span className="text-xs text-[#162c43]">Чиглэл</span>
                  <input
                    type="text"
                    value={formValues[index]?.direction || ""}
                    onChange={(e) => handleSliderChange(index, "direction", e.target.value)}
                    className="border py-4 text-xs px-6 rounded text-[#162c43]"
                    placeholder="Чиглэл"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-4 py-2">
                  <span className="text-xs text-[#162c43]">Хөтөлбөр</span>
                  <textarea
                    value={formValues[index]?.program || ""}
                    onChange={(e) => handleSliderChange(index, "program", e.target.value)}
                    className="border py-4 text-xs px-6 rounded text-[#162c43]"
                    placeholder="Хөтөлбөр"
                  ></textarea>
                </div>
              </div>
            ))}

          {/* Modal Buttons */}
          <div className="w-full flex items-center gap-2 justify-end pr-4">
            <div
              className="rounded text-xs text-red-500 bg-white border-red-500 border px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={() => {
                setFormValues(Array.from({ length: sliderCount }, () => ({ direction: "", program: "" })));
                setIsOpen(false);
              }}
            >
              Болих
            </div>
            <div className="rounded text-xs text-white bg-[#3749E5] px-4 py-2 cursor-pointer" onClick={() => setIsOpen(false)}>
              Хадгалах
            </div>
          </div>
        </div>
      </Modal>

      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялал засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Panel */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          {/* Travel Images */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын зураг</span>
            </div>
            <hr />
            <div className="p-4 w-full">
              <TravelGallery onChange={handleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                Та дор хаяж 5 зураг оруулна уу (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>

          {/* Configurations */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">Онцлох аялал эсэх</span>
              <Toggle
                id="cheese-status"
                defaultChecked={isSpecial}
                onChange={handleToggle}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Нэмэлт мэдээлэл</span>
            </div>
            <hr />
            <div className="flex flex-col gap-2 w-full p-4">
              <span className="text-xs text-[#162c43]">Аялалын хугацаа</span>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleFormValue}
                className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                placeholder="2 өдөр 3 шөнө г.м"
              />
            </div>
            <div className="flex p-4 w-full">
              <span
                className="rounded border w-full text-xs text-black bg-slate-200 transition-all duration-300 py-2 cursor-pointer text-center"
                onClick={() => setIsOpen(true)}
              >
                Хөтөлбөр оруулах
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Ковер зураг</span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader onFileChange={handleSingleFileChange} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* Travel Type */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрөл</span>
            </div>
            <hr />
            <div className="w-full p-4">
              <CategoryGallery
                category={category}
                handleAddCategory={() => console.log("gfh")}
                onClick={(id: string) => setSelectedCat(id)}
              />
            </div>
          </div>

          {/* Travel General Information */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын ерөнхий мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full p-4 flex flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                <span className="text-xs text-[#162c43]">Аялалын нэр</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="2 өдөр 3 шөнө г.м"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Аялалын үнэ</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="1'000'000MNT"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Аялалын хямдрал</span>
                <input
                  type="number"
                  name="sale"
                  value={form.sale}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="20% г.м"
                />
              </div>
            </div>
            <div className="w-full px-4 flex flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Pax1</span>
                <input
                  type="number"
                  name="pax1"
                  value={form.pax1}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="1'000'000MNT"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Pax2</span>
                <input
                  type="number"
                  name="pax2"
                  value={form.pax2}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="1'000'000MNT"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Pax3</span>
                <input
                  type="number"
                  name="pax3"
                  value={form.pax3}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="1'000'000MNT"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Pax4</span>
                <input
                  type="number"
                  name="pax4"
                  value={form.pax4}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="20% г.м"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center w-full pb-4 px-8">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                Хямдралгүй үед та 0 гэж оруулна уу
              </span>
            </div>
          </div>

          {/* Travel Description */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын тайлбар</span>
            </div>
            <hr />
            <div className="w-full p-4 text-black">
              <Froala value={editorValue} onValueChange={handleEditorChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTravelView;
