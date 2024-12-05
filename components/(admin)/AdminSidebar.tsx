"use client";
import Image from "next/image";
import Logo from "@/public/LOGO.svg";
import Link from "next/link";
import {
  Newspaper,
  Home,
  Menu,
  X,
  LogOut,
  User,
  NotebookPen,
  Handshake,
  BriefcaseBusiness,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      title: "Нүүр хуудас",
      icon: <Home color="#000000" />,
      path: "/home",
    },
    {
      title: "Танилцуулга",
      icon: <User color="#000000" />,
      path: "/introduction",
    },

    {
      title: "Мэдээ",
      icon: <Newspaper color="#000000" />,
      path: "/news",
    },
    {
      title: "Видео мэдээ",
      icon: <Newspaper color="#000000" />,
      path: "/videosnews",
    },
    {
      title: "Тайлан",
      icon: <BriefcaseBusiness color="#000000" />,
      path: "/report",
    },

    {
      title: "Хуулийн төсөл нэмэх",
      icon: <NotebookPen color="#000000" />,
      path: "/FeedbackEvent",
    },
    {
      title: "Хуулийн төслийн саналууд",
      icon: <NotebookPen color="#000000" />,
      path: "/lawFeedback",
    },
    {
      title: "Санал хүсэлт",
      icon: <NotebookPen color="#000000" />,
      path: "/feedback",
    },

    {
      title: "Уулзалт",
      icon: <Handshake color="#000000" />,
      path: "/meeting",
    },

    {
      title: "Гарах",
      icon: <LogOut color="#000000" />,
      path: "/login",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu - Visible only on small screens */}
      <div className="md:hidden block bg-gray-100 z-20 fixed top-0 w-full ">
        {/* Top Bar with Logo and Toggle Button */}
        <div className="flex justify-between items-center px-4 py-3 max-h-[80px]">
          <Link href="/" className="flex items-start justify-start text-start">
            <Image src={Logo} alt="Logo" className=" brightness-50 w-20 h-20" />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-black focus:outline-none"
          >
            {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Sidebar Navigation Links - Visible only when the sidebar is open */}
        {isSidebarOpen && (
          <div className="flex flex-col bg-gray-100 mt-2">
            {navLinks.map((list, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-1 cursor-pointer"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push(list.path);
                }}
              >
                <div
                  className={`w-12 h-12 rounded-lg border-[#E5E5E5] bg-white border flex items-center justify-center ${
                    path.includes(list.path) ? "border-[#3749E5] font-bold" : ""
                  }`}
                >
                  {list.icon}
                </div>
                <span
                  className={`text-sm text-[#000000] ${
                    path.includes(list.path) ? "text-[#3749E5] font-bold" : ""
                  }`}
                >
                  {list.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar - Visible only on larger screens */}
      <div className={`hidden md:block`}>
        <div
          className={`fixed top-0 z-50 h-screen bg-[#F8F8F8]  w-[200px] border-r border-[#E5E5E5] flex flex-col items-center`}
        >
          <div className="flex items-start justify-start text-start ">
            <Link
              href="/"
              className="flex items-start justify-start text-start"
            >
              <Image
                src={Logo}
                alt="Logo"
                className=" brightness-50 w-28 h-28"
              />
            </Link>
          </div>
          {navLinks.map((list, index) => (
            <div
              key={index}
              className="flex items-center w-full gap-2 justify-start px-4 text-start cursor-pointer "
              onClick={() => {
                setIsSidebarOpen(false);
                router.push(list.path);
              }}
            >
              <div
                className={`min-w-12 min-h-12 rounded-lg border-[#E5E5E5] bg-white border my-1 flex items-center justify-center ${
                  path.includes(list.path) ? "border-[#3749E5] font-bold" : ""
                }`}
              >
                {list.icon}
              </div>
              <span
                className={`text-xs text-[#000000] ${
                  path.includes(list.path) ? "text-[#3749E5] font-bold" : ""
                }`}
              >
                {list.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
