"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Toggle from "react-toggle";
import CategoryGallery from "@/components/(admin)/travels/CategoryGallery";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Travel } from "@/types/travel";
import { Services } from "@/types/services";
import { Destination } from "@/types/destination";

const Froala = dynamic(() => import("@/components/(admin)/travels/Froala"), {
  ssr: false,
});
const TravelGallery = dynamic(
  () => import("@/components/(admin)/travels/TravelGallery"),
  { ssr: false }
);
const ImageUploader = dynamic(
  () => import("@/components/(admin)/travels/ImageUploader"),
  { ssr: false }
);
const Modal = dynamic(() => import("react-minimal-modal"), { ssr: false });

interface Props {
  category: Category[];
}

const EditTravelView = ({ category }: Props) => {
  const router = useRouter();
  const { id } = useParams();
  const [language, setLanguage] = useState("en");
  const [isSpecial, setIsSpecial] = useState(false);
  const [single, setSingle] = useState<Travel | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sliderCount, setSliderCount] = useState(0);
  const [showSliders, setShowSliders] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [services, setServices] = useState<Services[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [destination, setDestination] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCat, setSelectedCat] = useState(category[0]?._id || "");
  const [formValues, setFormValues] = useState<
    Array<{ direction: string; program: string }>
  >([]);
  const [paxCount, setPaxCount] = useState(2);
  const [paxValues, setPaxValues] = useState(
    Array.from({ length: paxCount }, () => "")
  );
  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    category: "",
    sale: "",
  });
  useEffect(() => {
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/category")
      .then((res) => setCategories(res.data.data))
      .catch((er) => console.log(er));
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/services")
      .then((res) => setServices(res.data.data))
      .catch((er) => console.log(er));
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/destination")
      .then((res) => setDestination(res.data.data))
      .catch((er) => console.log(er));
  }, []);

  useEffect(() => {
    axios
      .get(`https://taiga.tanuweb.cloud/api/v1/travel/${id}`)
      .then((res) => {
        const travelData = res.data.data;

        // Set initial values for form and states based on fetched data
        setSingle(travelData);
        setForm({
          title: travelData.title || "",
          duration: travelData.duration || "",
          price: travelData.price || "",
          sale: travelData.sale || "",
          category: travelData.category || "",
        });
        setIsSpecial(travelData.isSpecial || false);
        setEditorValue(travelData.description || "");
        setSelectedCat(travelData.category || "");
        setSelectedServices(travelData.services || []);
        setSelectedDestination(travelData.destination || "");
        setFormValues(travelData.days || []);
        setPaxValues(travelData.pax || []);
        setFiles(travelData.files || []);
        setCover(travelData.cover || null);
      })
      .catch((error) => console.error("Error fetching travel data:", error));
  }, [id]);

  const handleToggle = () => setIsSpecial(!isSpecial);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditorChange = (text: string) => setEditorValue(text);

  const handleFileChange = (newFiles: File[]) => setFiles(newFiles);

  const handleSingleFileChange = (newCover: File | null) => setCover(newCover);

  const handleSliderChange = (index: number, field: string, value: string) => {
    const updatedValues = [...formValues];
    updatedValues[index] = { ...updatedValues[index], [field]: value };
    setFormValues(updatedValues);
  };

  const handlePaxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(parseInt(e.target.value, 10), 5);
    setPaxCount(count);
    setPaxValues(Array.from({ length: count }, (_, i) => paxValues[i] || ""));
  };

  const handlePaxValueChange = (index: number, value: string) => {
    const updatedPaxValues = [...paxValues];
    updatedPaxValues[index] = value;
    setPaxValues(updatedPaxValues);
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
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("destination", selectedDestination);
    formData.append("days", JSON.stringify(formValues));
    formData.append("pax", JSON.stringify(paxValues));

    files.forEach((file) => formData.append("files", file));
    if (cover) formData.append("cover", cover);

    axios
      .put(`https://taiga.tanuweb.cloud/api/v1/travel/${id}`, formData)
      .then(() => {
        alert("Travel updated successfully!");
        router.push("/travels");
      })
      .catch((error) => {
        console.error("Error updating travel:", error.response?.data || error);
      });
  };

  return (
    <>
      {/* Modal for Itinerary */}
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Хөтөлбөр засах"
        style={{ borderRadius: "5px" }}
      >
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
                    return [
                      ...prevValues,
                      ...Array(newCount - prevValues.length).fill({
                        direction: "",
                        program: "",
                      }),
                    ];
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
                    onChange={(e) =>
                      handleSliderChange(index, "direction", e.target.value)
                    }
                    className="border py-4 text-xs px-6 rounded text-[#162c43]"
                    placeholder="Чиглэл"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-4 py-2">
                  <span className="text-xs text-[#162c43]">Хөтөлбөр</span>
                  <textarea
                    value={formValues[index]?.program || ""}
                    onChange={(e) =>
                      handleSliderChange(index, "program", e.target.value)
                    }
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
                setFormValues(
                  Array.from({ length: sliderCount }, () => ({
                    direction: "",
                    program: "",
                  }))
                );
                setIsOpen(false);
              }}
            >
              Болих
            </div>
            <div
              className="rounded text-xs text-white bg-[#3749E5] px-4 py-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
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
                Та дор хаяж 5 зураг оруулна уу (Зурагын хэмжээ 5 mb - ээс
                хэтрэхгүй байх ёстой.)
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
            <div className="flex gap-2 w-full p-4 flex-col">
              <span className="text-xs text-[#162c43]">Аялал оруулах хэл</span>
              <select
                className="text-xs border rounded py-2 px-4 bg-white text-black"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">Англи</option>
                <option value="mn">Монгол</option>
              </select>
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
            <div className="flex flex-col gap-2  w-full p-4">
              <span className="text-xs text-[#162c43]">Үйлчилгээ</span>
              <div className="w-full grid grid-cols-2 place-items-center gap-4">
                {services?.map((list) => (
                  <div
                    className="flex items-center gap-4 w-full"
                    key={list._id}
                  >
                    <input
                      id={list._id}
                      type="checkbox"
                      checked={selectedServices.includes(list._id)} // Pre-select based on old data
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, list._id]);
                        } else {
                          setSelectedServices(
                            selectedServices.filter((el) => el !== list._id)
                          );
                        }
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={list._id}
                      className="text-xs text-[#162c43]"
                    >
                      {list.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2  w-full p-4">
              <span className="text-xs text-[#162c43]">Хүрэх газар</span>
              <div className="w-full grid grid-cols-2 place-items-center gap-4  ">
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedDestination(e.target.value);
                  }}
                  className="w-full text-xs border rounded py-2"
                >
                  {destination?.map((list) => (
                    <option value={list?._id} className="text-xs ">
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
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
                <span className="text-xs text-[#162c43]">Pax Count</span>
                <input
                  type="number"
                  min="1"
                  max="5" // Max set to 5
                  value={paxCount}
                  onChange={handlePaxCountChange}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="Number of Pax fields"
                />
              </div>

              {Array.from({ length: paxCount }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 w-full lg:w-[25%] p-4"
                >
                  <span className="text-xs text-[#162c43]">Pax{index + 1}</span>
                  <input
                    type="number"
                    value={paxValues[index]}
                    onChange={(e) =>
                      handlePaxValueChange(index, e.target.value)
                    }
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="1'000'000MNT"
                  />
                </div>
              ))}
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
