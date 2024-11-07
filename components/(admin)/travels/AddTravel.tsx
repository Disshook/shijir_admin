"use client";

import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import Link from 'next/link';

interface Travel {
  id: string;
  name: string;
  price: string;
  // Add any other fields relevant to your travel data
}

export default function TravelList() {
  const [travels, setTravels] = useState<Travel[]>([]); // Typing the state

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await axios.get('/api/travels');
        setTravels(response.data);
      } catch (error) {
        console.error('Error fetching travels:', error);
      }
    };

    fetchTravels();
  }, []);

  const deleteTravel = async (id: string) => {
    try {
      await axios.delete(`/api/travels/${id}`);
      setTravels(travels.filter((travel) => travel.id !== id));
    } catch (error) {
      console.error('Error deleting travel:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Travel Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel) => (
            <tr key={travel.id}>
              <td className="border px-4 py-2">{travel.name}</td>
              <td className="border px-4 py-2">{travel.price}</td>
              <td className="border px-4 py-2">
                <Link href={`/admin/travels/edit/${travel.id}`} className="text-blue-500 mr-4">Edit</Link>
                <button onClick={() => deleteTravel(travel.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
