"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: Category[];
}

export default function Search({ categories }: Props) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter(); // Use router from next/navigation

  // Handler for radio button change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    // Push the selected category to the URL as a query parameter
    router.push(`?category=${selectedValue}`);
  };

  // Handler for filter button click (e.g., filtering by price)
  const handleFilter = async () => {
    // You can also push the price range in the URL if needed
    router.push(
      `?category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  // Update min price based on input
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  // Update max price based on input
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/3 bg-white rounded-lg shadow-2xl px-6 py-8 mb-8 md:mb-0 text-black">
      <h2 className="text-lg font-semibold mb-4">Ангилал</h2>
      <ul className="space-y-2">
        <li>
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              value="all"
              className="mr-2"
              onChange={handleCategoryChange}
            />
            Бүх Аялал
          </label>
        </li>
        {categories?.map((list) => (
          <li key={list._id}>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value={list._id} // Use the actual category name for value
                className="mr-2"
                onChange={handleCategoryChange}
              />
              {list.name}
            </label>
          </li>
        ))}
      </ul>

      {/* Price Filter */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Үнэ</h3>

        <div className="relative mt-2 mb-4 flex items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-thin text-sm">Доод үнэ</span>
            <input
              type="range"
              min={0}
              max={15000000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-thin text-sm">Дээд үнэ</span>
            <input
              type="range"
              min={0}
              max={15000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mt-2 "
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full border border-gray-300 p-2 text-center text-sm rounded"
          />
          <span className="mx-2">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full border border-gray-300 p-2 text-center text-sm rounded"
          />
        </div>
        <button
          className="mt-4 bg-teal-500 text-white py-2 w-full rounded hover:bg-teal-600 transition"
          onClick={handleFilter} // Call filter handler on click
        >
          Шүүлтүүр
        </button>
      </div>
    </div>
  );
}
