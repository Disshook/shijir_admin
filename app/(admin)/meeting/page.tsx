import { Form } from "@/types/form";
import Meeting from "@/views/meeting/page";
import React from "react";

const Page = async () => {
  let form: Form[] = [];

  try {
    const res = await fetch("https://shijir.tanuweb.cloud/api/v1meeting", {
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
      <Meeting form={form} />
    </>
  );
};

export default Page;
