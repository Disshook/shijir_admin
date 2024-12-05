"use client";
import TravelList from "@/views/newsVideos/page";
import { Travel } from "@/types/travel";
import { BannerModel } from "@/types/banner";
import { useEffect, useState } from "react";
import axiosInstance from "@/hooks/axios";

export default function AdminTravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [banner, setBanner] = useState<BannerModel[]>([]);
  useEffect(() => {
    axiosInstance.get("videos").then((res) => setTravels(res.data.data));
  }, []);
  useEffect(() => {
    axiosInstance.get("videosbanner").then((res) => setBanner(res.data.data));
  }, []);

  return (
    <>
      <TravelList news={travels} banner={banner} />
    </>
  );
}
