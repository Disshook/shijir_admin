import { Form } from "@/types/form";
import LawFeedbackEvent from "@/views/report/page";
import React from "react";

const Page = async () => {
  let form: Form[] = [];

  try {
    const res = await fetch("http://localhost:8001/api/v1/report", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    form = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }
  return (
    <>
      <LawFeedbackEvent form={form} />
    </>
  );
};

export default Page;
