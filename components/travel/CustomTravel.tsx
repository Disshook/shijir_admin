"use client";

import { useState } from "react";

export default function CustomTravelPage() {  
  const [formData, setFormData] = useState({
    title: "Ноён.",
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    phoneNumber: "",
    message: "",
    childrenCount: 0,
    adultsCount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold mb-8">ТА ХААШАА АЯЛМААР БАЙНА ВЭ?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Title, Name, Email */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Хэргэм
            </label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            >
              <option value="Ноён.">Ноён.</option>
              <option value="Хатагтай.">Хатагтай.</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Нэр
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Таны нэр"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Имэйл
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Таны имэйл"
            />
          </div>
        </div>

        {/* Row 2: Start Date, End Date, Phone Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block font-medium mb-1">
              Аяллын огноо(ирэх огноо)
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-1">
              Аяллын огноо(буцах огноо)
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded text-gray-400"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block font-medium mb-1">
              Утасны дугаар
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Утасны дугаар"
            />
          </div>
        </div>

        {/* Row 3: Message */}
        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Захидал
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
            placeholder="Таны мессеж"
          />
        </div>

        {/* Row 4: Children Count, Adults Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="childrenCount" className="block font-medium mb-1">
              Хүүхдийн тоо
            </label>
            <input
              id="childrenCount"
              name="childrenCount"
              type="number"
              value={formData.childrenCount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="adultsCount" className="block font-medium mb-1">
              Том хүний тоо
            </label>
            <input
              id="adultsCount"
              name="adultsCount"
              type="number"
              value={formData.adultsCount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {/* Submit Button */}
          <div className="text-center mt-6">
        
                <button className="relative  mt-auto rounded-b-xl h-12 w-full overflow-hidden border border-teal-600 text-black  transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-teal-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-full hover:before:w-full hover:before:opacity-80"
                type="submit">                                          
                    <span className="relative z-10">Хүсэлт илгээх</span>
                </button>
    
          </div>
      </form>
    </div>
  );
}
