import { Form } from "@/types/form";
import Feedback from "@/views/feedback/page";
import React from "react";

const Feedbacks = async () => {
  let form: Form[] = [];

  try {
    const res = await fetch("https://shijir.tanuweb.cloud/api/v1feedback", {
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
      <Feedback form={form} />
    </>
  );
};

export default Feedbacks;
