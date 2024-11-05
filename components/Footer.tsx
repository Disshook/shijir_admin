import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
  
const Footer = () => {
  return (
    <footer className="bg-gray-900  text-white py-10 mt-8 w-full">
      <div className='hidden md:block'>
        <div className="container mx-auto px-4">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div>
              <div className="flex items-start  ">
                  <div className="text-5xl mt-2">
                      <FaPhoneAlt/>
                  </div>
                  <div className='flex flex-col px-4 '>
                      <h3 className="text-lg font-bold mb-4 ">Холбоо барих</h3>
                      <p className="text-lg  mb-4" >(+976) 7700-1005</p>
                  </div>
              </div>
            
              <p className="mb-2">Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, Эрхүүгийн гудамж, Ардчиллын ордон 114 тоот</p>
              <p className="mb-2 hover:text-gray-500">
                <FaPhoneAlt className="inline-block mr-2" /> (+976) 70109401
              </p>
              <p className="mb-2 hover:text-gray-500">
                <FaEnvelope className="inline-block mr-2" /> info@tanusoft.mn
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Аяллууд</h3>
              <ul>
                <li className="mb-2"><a href="/travel/out" className="hover:text-gray-500">Гадаад аялал</a></li>
                <li className="mb-2"><a href="/travel/in" className="hover:text-gray-500">Дотоод аялал</a></li>
                <li className="mb-2"><a href="/travel/custom" className="hover:text-gray-500">Захиалгат аялал</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Хэрэгцээт холбоос</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Блог</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Мэдээ</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Зураг</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Бичлэг</a></li>
              </ul>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Бидний тухай</h3>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Компанийн тухай</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Бидэнтэй холбогдох</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="mt-10 flex justify-between items-center border-t border-gray-700 pt-6">
            <p className="text-sm">&copy;  2023 - 2024 ТануСофт ХХК. Бүх эрх хуулиар хамгаалагдсан.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
              <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
              <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
      <div className='block md:hidden'>
        <div className="container mx-auto px-4">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* Contact Info */}
            <div>
              <div className="flex items-start  ">
                  <div className="text-5xl mt-2">
                      <FaPhoneAlt/>
                  </div>
                  <div className='flex flex-col px-4 '>
                      <h3 className="text-lg font-bold mb-4 ">Холбоо барих</h3>
                      <p className="text-lg  mb-4" >(+976) 7700-1005</p>
                  </div>
              </div>
            
              <p className="mb-2">Монгол улс, Улаанбаатар хот, Сүхбаатар дүүрэг, Эрхүүгийн гудамж, Ардчиллын ордон 114 тоот</p>
              <p className="mb-2 hover:text-gray-500">
                <FaPhoneAlt className="inline-block mr-2" /> (+976) 70109401
              </p>
              <p className="mb-2 hover:text-gray-500">
                <FaEnvelope className="inline-block mr-2" /> info@tanusoft.mn
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-1">Аяллууд</h3>
              <ul className='ml-4'>
                <li className="mb-2"><a href="/travel/out" className="hover:text-gray-500">Гадаад аялал</a></li>
                <li className="mb-2"><a href="/travel/in" className="hover:text-gray-500">Дотоод аялал</a></li>
                <li className="mb-2"><a href="/travel/custom" className="hover:text-gray-500">Захиалгат аялал</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-1">Хэрэгцээт холбоос</h3>
              <ul className='ml-4'>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Блог</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Мэдээ</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Зураг</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Бичлэг</a></li>
              </ul>
            </div>

            {/* About Section */}
            <div className='mb-48'>
              <h3 className="text-lg font-semibold mb-1 ">Бидний тухай</h3>
              <ul className='ml-4'>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Компанийн тухай</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-500">Бидэнтэй холбогдох</a></li>
              </ul>
            </div>
          </div>    
        </div>
      </div>
    </footer>
  );
};

export default Footer;
