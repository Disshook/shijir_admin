"use client";
import React, { useEffect, useState } from "react";
import View from "@/views/introduction/View";

const BannerPage = () => {
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/v1/introduction"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        setJournals(data.data); // Assuming `data.data` contains an array of journals
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!journals.length) {
    return <p>No journals found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {journals.map((journal) => (
        <View journal={journal} />
      ))}
    </div>
  );
};

export default BannerPage;
