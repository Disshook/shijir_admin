import ServiceList from "@/views/service/ServiceList";

export default async function AdminServicePage() {
  let service = [];

  try {
    const res = await fetch("http://localhost:8001/api/v1/services", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    service = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <ServiceList service={service} />
    </>
  );
}
