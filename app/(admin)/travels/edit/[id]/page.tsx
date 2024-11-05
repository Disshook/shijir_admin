import EditTravelView from "@/views/travels/EditTravelView";

export default async function EditTravelsPage() {
  let travels: Category[] = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/category", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    travels = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <EditTravelView category={travels} />
    </>
  );
}
