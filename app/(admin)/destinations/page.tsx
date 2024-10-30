"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Destination } from "@/types/destination";
import DestinationList from "@/views/destinations/DestinationList";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  useEffect(() => {
    axios
      .get("https://taiga.tanuweb.cloud/api/v1/destination")
      .then((res) => setDestinations(res.data.data));
  }, []);

  return (
    <>
      <DestinationList destinations={destinations} />
    </>
  );
}
