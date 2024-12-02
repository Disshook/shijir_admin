"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/hooks/axios";
import { IMGURL } from "@/hooks/axios";

const NewsEditView = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<{
    year: string;
    months: { month: string; score: string }[];
    file: string;
    pdfFile: string | File; // Allow pdfFile to be a string or File
  }>({
    year: "",
    months: [{ month: "", score: "" }],
    file: "",
    pdfFile: "", // Initialize as string
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State for file upload

  // Fetch existing report data from the server
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`report/${id}`)
        .then((res) => {
          const newsData = res.data.data;
          setForm({
            year: newsData.year,
            months: newsData.months || [{ month: "", score: "" }],
            file: newsData.file,
            pdfFile: newsData.pdfFile || "", // Set existing PDF file if available
          });
        })
        .catch((err) => console.error("Error fetching report:", err));
    }
  }, [id]);

  // Handle form field changes
  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle changes to the `months` array
  const handleMonthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newMonths = [...form.months];
    if (name.startsWith("month")) {
      newMonths[index].month = value;
    } else if (name.startsWith("score")) {
      newMonths[index].score = value;
    }
    setForm({
      ...form,
      months: newMonths,
    });
  };

  // Handle newly uploaded PDF file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setSelectedFile(newFile); // Store the selected file
    }
  };

  // Form submission
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("year", form.year);
    formData.append("months", JSON.stringify(form.months));

    // If a new file is selected, append it
    if (selectedFile) {
      formData.append("pdfFile", selectedFile); // Attach the new PDF file
    } else if (form.pdfFile && typeof form.pdfFile === "string") {
      formData.append("pdfFile", form.pdfFile); // Keep the existing file if no new file is selected
    }

    // Submit the form data to the API
    axiosInstance
      .put(`report/${id}`, formData)
      .then(() => {
        alert("Тайлан амжилттай засагдлаа");
        router.push("/report");
      })
      .catch((err) => {
        console.error(
          "Error updating report:",
          err.response?.data?.message || "Unknown error"
        );
        alert("Алдаа гарлаа");
      });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full p-12">
        <div className="w-full md:w-[50%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <hr />
            <div className="w-full p-10">
              <div className="flex md:flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm sm:text-base text-[#162c43]">
                    <div className="w-full flex items-center justify-between">
                      <span>Гарчиг</span>
                    </div>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="year"
                      value={form.year}
                      onChange={handleFormValue}
                      className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                    />
                  </div>
                </div>

                {/* Months input */}
                <div className="flex flex-col gap-2 w-full">
                  {form.months.map((monthObj, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <label className="text-sm sm:text-base text-[#162c43]">
                        <div className="w-full flex items-center justify-between">
                          <span>Сар</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        name={`month-${index}`}
                        value={monthObj.month}
                        onChange={(e) => handleMonthChange(e, index)}
                        className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                        placeholder="Month"
                      />
                      <label className="text-sm sm:text-base text-[#162c43]">
                        <div className="w-full flex items-center justify-between">
                          <span>Тайлбар</span>
                        </div>
                      </label>
                      <input
                        type="text"
                        name={`score-${index}`}
                        value={monthObj.score}
                        onChange={(e) => handleMonthChange(e, index)}
                        className="border py-2 text-xs sm:text-sm px-4 rounded bg-white text-[#162c43]"
                        placeholder="Score"
                      />
                    </div>
                  ))}
                </div>
                {/* 
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm sm:text-base text-[#162c43]">
                    <div className="w-full flex items-center justify-between">
                      <span>PDF файл</span>
                    </div>
                  </label>
                  {form.pdfFile && typeof form.pdfFile === "string" ? (
                    <div className="flex justify-between items-center border p-4">
                      <a
                        href={form.pdfFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {form.pdfFile.split("\\").pop()}
                      </a>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, pdfFile: "" })}
                        className="text-red-500 p-2 mt-6 text-sm"
                      >
                        Устгах
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                      required
                    />
                  )}
                </div> */}
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
    </>
  );
};

export default NewsEditView;
