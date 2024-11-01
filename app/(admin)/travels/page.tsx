"use client";
import TravelList from "@/views/travels/TravelList";
import { Travel } from "@/types/travel";
import { useEffect, useState } from "react";
import axios from "axios";
import Test from "@/views/travels/Pax";
import Pax from "@/views/travels/Pax";

export default function AdminTravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  useEffect(() => {
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/travel")
      .then((res) => setTravels(res.data.data));
  }, []);

  return (
    <>
      <TravelList travels={travels} />
    </>
  );
}
