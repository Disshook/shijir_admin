import { BannerModel } from "@/types/banner";
import BannerView from "@/views/banner/BannerView";
import React from "react";

const BannerPage = async () => {
  let banner: BannerModel[] = [];

  try {
    const res = await fetch("https://taiga.tanuweb.cloud/api/v1/banner", {
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
      <BannerView banner={banner} />
    </>
  );
};

export default BannerPage;
