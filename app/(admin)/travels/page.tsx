"use client";
import TravelList from "@/views/travels/TravelList";
import { Travel } from "@/types/travel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/v1/travel")
      .then((res) => setTravels(res.data.data));
  }, []);
  //fhgf

  return (
    <>
      <TravelList travels={travels} />
    </>
  );
}
