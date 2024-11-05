import FaqsList from "@/views/faqs/FaqsList";

export default async function AdminFaqPage() {
  let faqs = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/faq", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    faqs = data.data;
  } catch (error) {
    console.error("Error fetching faqs:", error);
  }

  return (
    <>
      <FaqsList faqs={faqs} />
    </>
  );
}
