import { Additional } from "@/types/additional";
import AdditionalView from "@/views/additional/AdditionalView";
import React from "react";

const AdditionalPage = async () => {
  let add: Additional | null = null;

  try {
    const res = await fetch("http://localhost:8001/api/v1/additional", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();

    add = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      {add ? (
        <AdditionalView additional={add} />
      ) : (
        <p>Error loading data, please try again later.</p> // Fallback UI in case of error or no data
      )}
    </>
  );
};

export default AdditionalPage;
