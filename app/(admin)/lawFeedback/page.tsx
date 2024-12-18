import { Form } from "@/types/form";
import LawFeedback from "@/views/allContacts/lawFeedback/page";
import React from "react";

const Page = async () => {
  let form: Form[] = [];

  try {
    const res = await fetch(
      "https://shijirback.tanuweb.cloud/api/v1/lawfeedback",
      {
        cache: "no-store",
      }
    );

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
      <LawFeedback form={form} />
    </>
  );
};

export default Page;
