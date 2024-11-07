import TravelList from "@/views/travels/TravelList";
import { Travel } from "@/types/travel";
import CategoryList from "@/views/travel-categories/CategoryList";
import TipList from "@/views/tip/TipList";

export default async function AdminTipPage() {
  let tips = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/tip", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    tips = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <TipList tips={tips} />
    </>
  );
}
