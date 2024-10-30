"use client";
import Sidebar from "@/components/(admin)/AdminSidebar";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      const user = window.localStorage.getItem("user");
      if (!token || !user) {
        router.push("/login");
      }
    }
  }, []);
     
  return (
    <div lang="en" className={`flex flex-row w-full min-h-screen bg-[#F8F8F8] ${inter.className}`}>
      <div className="max-w-[12%] md:max-w-[12%] lg:max-w-[12%] sm:max-w-[12%]  w-full">
        <Sidebar />
      </div>
      <main className="max-w-[100%] md:max-w-[88%] lg:max-w-[88%] sm:max-w-[88%] md:ml-60 lg:ml-4 flex-1 flex flex-col w-full md:mt-0 mt-24">
        {children}
      </main>
    </div> 
  );
}
