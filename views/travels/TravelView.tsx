"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Toggle from "react-toggle";
import CategoryGallery from "@/components/(admin)/travels/CategoryGallery";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Services } from "@/types/services";
import dynamic from "next/dynamic";
import { Spinner } from "flowbite-react";
import { Destination } from "@/types/destination";

const Froala = dynamic(() => import("@/components/(admin)/travels/Froala"), {
  ssr: false,
});

const TravelGallery = dynamic(
  () => import("@/components/(admin)/travels/TravelGallery"),
  {
    ssr: false,
  }
);

const ImageUploader = dynamic(
  () => import("@/components/(admin)/travels/ImageUploader"),
  {
    ssr: false,
  }
);

const Modal = dynamic(() => import("react-minimal-modal"), {
  ssr: false,
});

const TravelView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Services[]>([]);
  const [destination, setDestination] = useState<Destination[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [selectedServices, setSelectedServices] = useState<String[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<String>("");
  const [language, setLanguage] = useState("en");
  const [editorValue, setEditorValue] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>(category[0]?._id!);
  const [code, setCode] = useState("");

  useEffect(() => {
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/category")
      .then((res) => setCategory(res.data.data))
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

  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsSpecial(!isSpecial);
  };

  const [form, setForm] = useState({
    title: "",
    information: "",
    duration: "",
    price: "",
    category: "",
    sale: "",
    days: [],
    pax: [],
  });

  const [paxCount, setPaxCount] = useState<number>(1);
  const [paxValues, setPaxValues] = useState<
    { title: string; price: string }[]
  >(Array.from({ length: paxCount }, () => ({ title: "", price: "" })));

  const handlePaxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(Math.max(parseInt(e.target.value, 10), 1), 5);
    setPaxCount(count);
    setPaxValues(
      Array.from(
        { length: count },
        (_, index) => paxValues[index] || { title: "", price: "" }
      )
    );
  };

  const handlePaxTitleChange = (index: number, value: string) => {
    const updatedPaxValues = [...paxValues];
    updatedPaxValues[index].title = value;
    setPaxValues(updatedPaxValues);
  };

  const handlePaxPriceChange = (index: number, value: string) => {
    const updatedPaxValues = [...paxValues];
    updatedPaxValues[index].price = value;
    setPaxValues(updatedPaxValues);
  };

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEditorChange = (text: string) => {
    setEditorValue(text);
  };

  const handleFileChange = (file: File[]) => {
    setFiles(file);
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };
  // const handleSingleFileChange1 = (file: File | null, index: number) => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       // Update formValues with the photo URL at the correct index
  //       handleInputChange(index, "photo", reader.result as string);
  //     };
  //     reader.readAsDataURL(file); // Convert file to a base64 URL
  //   } else {
  //     // If no file is selected, clear the photo field at the index
  //     handleInputChange(index, "photo", "");
  //   }
  // };

  const validateForm = () => {
    let errors = [];
    if (!form.title) errors.push("Аялалын нэр оруулах шаардлагатай.");
    if (!form.duration) errors.push("Хугацаа оруулах шаардлагатай.");
    if (!form.price || isNaN(Number(form.price)))
      errors.push("Үнэ оруулах шаардлагатай.");
    if (!editorValue) errors.push("Тайлбар оруулах шаардлагатай.");
    if (files.length < 5) errors.push("Та дор хаяж 5 зураг оруулна уу.");
    if (errors.length > 0) {
      alert("Дараах алдаануудыг засна уу:\n" + errors.join("\n"));
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("duration", form.duration);
    formData.append("description", editorValue);
    formData.append("information", form.information);
    formData.append("sale", form.sale);
    formData.append("isSpecial", JSON.stringify(isSpecial));
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("destination", selectedDestination as string);
    formData.append("price", form.price);
    formData.append("category", selectedCat);
    formData.append("language", language);
    formData.append("pax", JSON.stringify(paxValues));
    formData.append("days", JSON.stringify(formValues));
    files.forEach((file: any) => {
      formData.append("files", file);
    });

    if (cover) {
      formData.append("cover", cover);
    }

    axios
      .post("https://taiga.tanuweb.cloud/api/v1/travel", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/travels");
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  };

  const [showSliders, setShowSliders] = useState<boolean>(false);
  const [sliderCount, setSliderCount] = useState<number>(0);
  const [formValues, setFormValues] = useState(
    Array.from({ length: sliderCount }, () => ({
      direction: "",
      program: "",
      photo: "",
    }))
  );
  const handleInputChange = (index: number, field: string, value: string) => {
    const newValues = [...formValues];
    newValues[index] = {
      ...newValues[index],
      [field]: value,
    };
    setFormValues(newValues);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Хөтөлбөр нэмэх"
        style={{ borderRadius: "5px" }}
      >
        <div className="w-full min-h-[500px] flex flex-col max-h-[500px] overflow-auto">
          <div className="flex flex-col gap-2  w-full p-4">
            <span className="text-xs text-[#162c43]">Аялалын өдөр</span>
            <input
              type="number"
              value={sliderCount}
              onChange={(e) => setSliderCount(Number(e.target.value))}
              className="border py-2 text-xs px-4 rounded text-[#162c43]"
              placeholder="2 өдөр 3 шөнө г.м"
            />
          </div>
          <div className="px-4 w-full mb-4">
            <div
              className="w-full py-2 flex items-center border bg-[#3749E5] justify-center rounded cursor-pointer"
              onClick={() => {
                setShowSliders(true);
              }}
            >
              <span className="text-sm text-white">Үүсгэх</span>
            </div>
          </div>
          {showSliders &&
            Array.from({ length: sliderCount }).map((_, index) => (
              <div className="w-full flex flex-col gap-2  px-4" key={index}>
                <div className="text-sm text-center w-full py-2 border bg-slate-500 text-white">
                  Өдөр {index + 1}
                </div>
                <div className="flex flex-col gap-2 w-full px-4 py-2">
                  <span className="text-xs text-[#162c43]">Чиглэл</span>
                  <input
                    type="text"
                    value={formValues[index]?.direction || ""}
                    onChange={(e) =>
                      handleInputChange(index, "direction", e.target.value)
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
                      handleInputChange(index, "program", e.target.value)
                    }
                    className="border py-4 text-xs px-6 rounded text-[#162c43]"
                    placeholder="Хөтөлбөр"
                  ></textarea>
                </div>
                {/* <div className="flex flex-col gap-2 w-full px-4 py-2">
                  <span className="text-xs text-[#162c43]">Зураг оруулах</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSingleFileChange1(e.target.files ? e.target.files[0] : null, index)}
                    className="border py-2 px-6 rounded text-[#162c43]"
                  />
                  {formValues[index]?.photo && (
                    <img
                      src={formValues[index].photo}
                      alt="Preview"
                      className="w-full h-auto mt-2 rounded"
                    />
                  )}
                </div> */}
              </div>
            ))}

          <div className="w-full flex items-center gap-2 justify-end pr-4">
            <div
              className="rounded text-xs text-red-500 bg-white border-red-500 border px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={() => {
                setFormValues(
                  Array.from({ length: sliderCount }, () => ({
                    direction: "",
                    program: "",
                    photo: "",
                  }))
                );
                setIsOpen(false);
              }}
            >
              Болих
            </div>
            <div
              className="rounded text-xs text-white bg-[#3749E5] px-4 py-2 cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Хадгалах
            </div>
          </div>
        </div>
      </Modal>

      {/* Form UI */}
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялал нэмэх</span>
        <div
          className="px-4 py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
          aria-disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Илгээх"}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
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
                хэтрэхгүй байх ёстой. )
              </span>
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white ">
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
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">Англи</option>
                <option value="mn">Монгол</option>
              </select>
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white ">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Нэмэлт мэдээлэл</span>
            </div>
            <hr />
            <div className="flex flex-col gap-2  w-full p-4">
              <span className="text-xs text-[#162c43]">Аялалын хугацаа</span>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleFormValue}
                className="border py-2 text-xs px-4 rounded text-[#162c43]"
                placeholder="2 өдөр 3 шөнө г.м"
              />
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-[100%] p-4">
                <span className="text-xs text-[#162c43]">Нэмэлт мэдээлэл</span>
                <input
                  type="text"
                  name="information"
                  value={form.information}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="Нэмэлт мэдээлэл оруулна уу"
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
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, list._id]);
                        } else {
                          setSelectedServices(
                            selectedServices.filter((el) => el !== list._id)
                          );
                        }
                      }}
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={list._id}
                      className=" text-xs text-[#162c43]"
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

        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын төрөл</span>
            </div>
            <hr />
            <div className="w-full p-4">
              <CategoryGallery
                category={category}
                handleAddCategory={() => {
                  console.log("gfh");
                }}
                onClick={(id: string) => {
                  setSelectedCat(id);
                }}
              />
            </div>
          </div>

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
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="Хөвсгөлийн тайга,цаатангийн аялал г.м"
                />
              </div>
              <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
                <span className="text-xs text-[#162c43]">Аялалын үнэ</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
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
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
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
                  max="5"
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
                  <span className="text-xs text-[#162c43]">Pax</span>
                  <input
                    type="text"
                    value={paxValues[index]?.title}
                    onChange={(e) =>
                      handlePaxTitleChange(index, e.target.value)
                    }
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="Enter Pax "
                  />
                  <span className="text-xs text-[#162c43]">
                    {" "}
                    Price per person
                  </span>
                  <input
                    type="number"
                    value={paxValues[index]?.price}
                    onChange={(e) =>
                      handlePaxPriceChange(index, e.target.value)
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

export default TravelView;
