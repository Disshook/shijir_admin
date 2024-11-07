import React from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';

const TravelMap = () => {
  return (
    <div className="w-full  mx-auto ">
      {/* Travel Title */}
      <h2 className="text-2xl font-bold mb-4">Таны Аялал :</h2>

      {/* Map Section */}
      <div className="mb-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094276!2d144.95373631531672!3d-37.81627917975192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ea9f12a12345!2sTokyo!5e0!3m2!1sen!2sjp!4v1609992374423!5m2!1sen!2sjp"
          width="100%"
          height="300"
          allowFullScreen={true}
          loading="lazy"
          className="rounded"
          title="Travel Map"
        ></iframe>
      </div>

      <div className='w-full h-[1px] bg-black my-4'> </div>

      {/* Travel Information */}
      <div className="space-y-2 ">
        <p className='text-lg'><span className="font-bold">Аяллын Төрөл:</span> Японы Аялал</p>
        <p className='text-lg'><span className="font-bold">Аяллын Зай:</span> 500 км</p>
        <p className='text-lg'><span className="font-bold">Аяллын Активити:</span> Ууланд авирах, Хотоор зочлох</p>
        <p className='text-lg'><span className="font-bold">Онцлох Цэгүүд:</span> Фүжи уул, Токио хот</p>
        <p className='text-lg'><span className="font-bold">Улирал:</span> Хавар</p>
        <p className='text-lg'><span className="font-bold">Хотууд:</span> Токио, Осака</p>
      </div>
    </div>
  );
};

export default TravelMap;
