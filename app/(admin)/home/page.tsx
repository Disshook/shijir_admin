import { BannerModel } from "@/types/banner";
import HomeView from "@/views/home/HomeView";
import React from "react";

const BannerPage = async () => {
  let banner: BannerModel[] = [];
  let bannertext: BannerModel[] = [];

  try {
    const res = await fetch("https://shijirback.tanuweb.cloud/api/v1/home", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    banner = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }
  return (
    <>
      <HomeView banner={banner} />
    </>
  );
};

export default BannerPage;
