// "use client";
// import Link from "next/link";
// import { FaUser, FaChevronDown, FaTimes, FaBars } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { Additional } from "@/types/additional";
// import axios from "axios";
// import IMGURL from "@/constants/Constants";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const [additional, setAdditional] = useState<Additional | null>();
//   useEffect(() => {
//     axios
//       .get("https://taiga.tanuweb.cloud/api/v1/additional")
//       .then((res) => setAdditional(res.data.data));
//   });
//   const [isMedeelliDropdownOpen, setIsMedeelliDropdownOpen] = useState(false);
//   const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
//   const [isBidniiDropdownOpen, setIsBidniiDropdownOpen] = useState(false);

//   const toggleMedeelliDropdown = () => {
//     setIsMedeelliDropdownOpen(!isMedeelliDropdownOpen);
//   };

//   const toggleBlogDropdown = () => {
//     setIsBlogDropdownOpen(!isBlogDropdownOpen);
//   };

//   const toggleBidniiDropdown = () => {
//     setIsBidniiDropdownOpen(!isBidniiDropdownOpen);
//   };

//   const [isDropdownOpen, setIsDropdownOpen] = useState<{
//     [key: string]: boolean;
//   }>({
//     information: false,
//     aboutUs: false,
//     Language: false,
//     User: false,
//   });

//   const handleMouseEnter = (menu: string) => {
//     setIsDropdownOpen((prev) => ({ ...prev, [menu]: true }));
//   };

//   const handleMouseLeave = (menu: string) => {
//     setIsDropdownOpen((prev) => ({ ...prev, [menu]: false }));
//   };
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <header className="bg-[#6c757d] text-white font-sans w-full shadow-lg sticky top-0 z-50">
//       {/* Desktop header */}

//       <div className="hidden md:block">
//         <div className="bg-white text-black">
//           <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
//             {/* Logo */}
//             <a href="/">
//               <img
//                 src={IMGURL + additional?.logo}
//                 alt="Company Logo"
//                 className="w-24 h-12 object-cover"
//               />
//             </a>
//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex space-x-10 text-bold text-lg">
//               <Link href="/travel/all" className="hover:text-teal-500">
//                 {t.home}
//               </Link>

//               <Link href="/travel/custom" className="hover:text-teal-500">
//                 Аялал захиалах
//               </Link>

//               {/* Dropdown: Information */}
//               <div
//                 className="relative group"
//                 onMouseEnter={() => handleMouseEnter("information")}
//                 onMouseLeave={() => handleMouseLeave("information")}
//               >
//                 <button className="text-black flex items-center justify-center hover:text-teal-500">
//                   Мэдээлэл
//                   <svg
//                     className="w-2.5 h-2.5 ms-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l4 4 4-4"
//                     />
//                   </svg>
//                 </button>

//                 {isDropdownOpen.information && (
//                   <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <Link href="/informations/details/1"> Даатгал</Link>
//                       </li>
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <Link href="/informations/details/2"> Виз</Link>
//                       </li>
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <Link href="/informations/details/3"> Ачаа</Link>
//                       </li>
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <a
//                           href="https://eticket.ubtz.mn/schedule"
//                           target="blank"
//                         >
//                           Галт тэрэгний хуваарь
//                         </a>
//                       </li>
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <a
//                           href="https://www.ulaanbaatar-airport.mn/international-flights"
//                           target="blank"
//                         >
//                           Онгоцны хуваарь
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               {/* Dropdown: About Us */}
//               <div
//                 className="relative group"
//                 onMouseEnter={() => handleMouseEnter("aboutUs")}
//                 onMouseLeave={() => handleMouseLeave("aboutUs")}
//               >
//                 <button className="text-black flex items-center justify-center hover:text-teal-500">
//                   Бидний тухай
//                   <svg
//                     className="w-2.5 h-2.5 ms-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l4 4 4-4"
//                     />
//                   </svg>
//                 </button>

//                 {isDropdownOpen.aboutUs && (
//                   <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <a href="#">Компанийн тухай</a>
//                       </li>
//                       <li className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
//                         <a href="#">Бидний тухай</a>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               <div
//                 className="flex items-center space-x-2 relative group"
//                 onMouseEnter={() => handleMouseEnter("Language")}
//                 onMouseLeave={() => handleMouseLeave("Language")}
//               >
//                 <button className="text-black flex items-center justify-center ">
//                   <img
//                     src={
//                       locale == "mn"
//                         ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/1200px-Flag_of_Mongolia.svg.png"
//                         : locale == "en"
//                         ? "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
//                         : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/640px-Flag_of_South_Korea.svg.png"
//                     }
//                     alt="Mongolian Flag"
//                     className="w-6 h-6 rounded-full object-cover"
//                   />

//                   <svg
//                     className="w-2.5 h-2.5 ms-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l4 4 4-4"
//                     />
//                   </svg>
//                 </button>
//                 {/* Dropdown Menu */}
//                 {isDropdownOpen.Language && (
//                   <div className="absolute z-10 mt-36 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//                       <li
//                         className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//                         onClick={() => {
//                           handleLocaleChange("mn");
//                         }}
//                       >
//                         <img
//                           src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/1200px-Flag_of_Mongolia.svg.png"
//                           alt="Mongolian Flag"
//                           className="w-6 h-6 rounded-full object-cover"
//                         />
//                         <p className="mx-2">Mongolia (MN)</p>
//                       </li>
//                       <li
//                         className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//                         onClick={() => {
//                           handleLocaleChange("en");
//                         }}
//                       >
//                         <img
//                           src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
//                           alt="Mongolian Flag"
//                           className="w-6 h-6 rounded-full object-cover"
//                         />
//                         <p className="mx-2">English (UK)</p>
//                       </li>
//                       <li
//                         className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//                         onClick={() => {
//                           handleLocaleChange("kr");
//                         }}
//                       >
//                         <img
//                           src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/640px-Flag_of_South_Korea.svg.png"
//                           alt="Mongolian Flag"
//                           className="w-6 h-6 rounded-full object-cover"
//                         />
//                         <p className="mx-2">Korea</p>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 href={"/login"}
//                 className="flex items-center space-x-2 relative group"
//               >
//                 <button className="text-black flex items-center justify-center hover:text-teal-500">
//                   <FaUser />
//                 </button>
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Mobile header */}
//       <div className="block md:hidden">
//         {/* <div className="flex items-center justify-center py-8 space-x-5 bg-gray-900 text-sm">
//           <a href="#" className="hover:text-gray-400">
//             <FaFacebookF />
//           </a>
//           <a href="#" className="hover:text-gray-400">
//             <FaTwitter />
//           </a>
//           <a href="#" className="hover:text-gray-400">
//             <FaYoutube />
//           </a>
//           <a href="#" className="hover:text-gray-400">
//             <FaInstagram />
//           </a>
//         </div> */}
//         <div className="bg-white text-black">
//           <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//             {/* Logo */}
//             <a href="/">
//               <img
//                 src="https://i.pinimg.com/originals/16/70/a2/1670a288e777887b1e5d1369399b7d54.jpg"
//                 alt="Company Logo"
//                 className="w-28 h-20 object-cover"
//               />
//             </a>

//             {/* Hamburger Menu (visible on mobile) */}
//             <div className="">
//               <button onClick={toggleMenu} className="text-black">
//                 {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu (hidden on desktop) */}
//           {isMenuOpen && (
//             <nav className="md:hidden bg-white text-black p-4 space-y-2">
//               <Link
//                 href="/travel/out"
//                 className="block hover:text-teal-500"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Гадаад аялал
//               </Link>
//               <Link
//                 href="/travel/in"
//                 className="block hover:text-teal-500"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Дотоод аялал
//               </Link>
//               <a
//                 href="/travel/custom"
//                 className="block hover:text-teal-500"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Аялал захиалах
//               </a>

//               {/* Мэдээлэл Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={toggleMedeelliDropdown}
//                   className="hover:text-teal-500 flex items-center justify-between w-full"
//                 >
//                   Мэдээлэл
//                   <FaChevronDown />
//                 </button>
//                 {isMedeelliDropdownOpen && (
//                   <div className="mt-2">
//                     <Link
//                       href="/informations/details/1"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Даатгал
//                     </Link>
//                     <Link
//                       href="/informations/details/2"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Виз
//                     </Link>
//                     <Link
//                       href="/informations/details/3"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Ачаа
//                     </Link>
//                     <Link
//                       href="https://eticket.ubtz.mn/schedule"
//                       target="blank"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Галт тэрэгний хуваарь
//                     </Link>
//                     <Link
//                       href="https://www.ulaanbaatar-airport.mn/international-flights"
//                       target="blank"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Онгоцны хуваарь
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Бидний тухай Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={toggleBidniiDropdown}
//                   className="hover:text-teal-500 flex items-center justify-between w-full"
//                 >
//                   Бидний тухай
//                   <FaChevronDown />
//                 </button>
//                 {isBidniiDropdownOpen && (
//                   <div className="mt-2 ">
//                     <Link
//                       href="/about-company"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Компаний тухай
//                     </Link>
//                     <Link
//                       href="/contact"
//                       className="block px-4 py-1 hover:bg-gray-100 hover:text-teal-500"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Холбоо барих
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </nav>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
