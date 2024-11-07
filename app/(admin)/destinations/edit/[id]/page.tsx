import EditDestinationView from "@/views/destinations/EditDestinations";
import EditTravelView from "@/views/travels/EditTravelView";

export default async function EditDestinationPage() {
  let destinations: Category1[] = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/destination", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    destinations = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <EditDestinationView />
    </>
  );
}
