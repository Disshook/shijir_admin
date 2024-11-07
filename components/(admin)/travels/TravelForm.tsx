"use client"
import { useState, useEffect } from "react";
import axios from "axios";

interface TravelFormProps {
  travelId?: string; // Optional travelId for editing
}

export default function TravelForm({ travelId }: TravelFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (travelId) {
      // Fetch travel data for editing
      const fetchTravel = async () => {
        const response = await axios.get(`/api/travels/${travelId}`);
        setTitle(response.data.title);
        setPrice(response.data.price);
      };
      fetchTravel();
    }
  }, [travelId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const travelData = { title, price };
    if (travelId) {
      await axios.put(`/api/travels/${travelId}`, travelData);
    } else {
      await axios.post("/api/travels", travelData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className="bg-teal-500 text-white px-4 py-2 rounded-md" type="submit">
        {travelId ? "Update Travel" : "Add Travel"}
      </button>
    </form>
  );
}
