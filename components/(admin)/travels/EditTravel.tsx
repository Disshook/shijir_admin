"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Travel {
  id: string;
  title: string;
  name: string;
  price: string;
  // Add any other properties that exist on your tour object
}

const EditTravel = ({ travelId }: { travelId: string }) => {
  const [travel, setTravel] = useState<Travel | null>(null);  // Specify type for state
  const router = useRouter();

  useEffect(() => {
    // Fetch the tour data by tourId and populate form fields
    fetch(`/api/tours/${travelId}`)
      .then((res) => res.json())
      .then((data) => setTravel(data))
      .catch((error) => console.error('Error fetching tour:', error));
  }, [travelId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (travel) {
      setTravel({
        ...travel,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (travel) {
      // Send updated data to API
      fetch(`/api/tours/${travelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travel),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Travel updated successfully:', data);
          router.push('/admin/travels'); // Redirect after successful update
        })
        .catch((error) => console.error('Error updating trvel:', error));
    }
  };

  if (!travel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-xl font-bold mb-4">Edit Tour</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Travel Name
          </label>
          <input
            type="text"
            name="name"
            value={travel.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={travel.price}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-md">
          Update Travel
        </button>
      </form>
    </div>
  );
};

export default EditTravel;
