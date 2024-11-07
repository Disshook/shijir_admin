import React from 'react';

const Banner = () => {
  return (
    <div className=" ">
        <section className="relative   bg-cover mt-10 min-h-screen flex items-center justify-center rounded-lg" style={{ backgroundImage: `url('/images/sakura7.jpg')` }}>
          {/* Main Content */}
          <div className="relative container flex flex-col lg:flex-row justify-between items-center px-4 lg:px-16">
            {/* Left Section with Text */}
            <div className="text-white lg:w-1/2 max-w-lg mx-24">
            <h1 className="text-5xl font-bold leading-tight mt-48 ">Сакура Аялал</h1>
              <p className="    text-lg">At TripTrap, we believe that every journey is an opportunity for adventure, discovery, and unforgettable experiences.</p>
              {/* <button className="bg-black text-white px-6 py-3 rounded-full flex items-center shadow-lg hover:bg-opacity-80">
                <span className="mr-2">🚗</span> Booking Now
              </button> */}
            </div>
          </div>
          <div className="absolute top-24 right-0  flex items-start">
            {/* Main Label */}
            <div className=" border-t-[24px] border-t-transparent border-l-[30px] border-l-teal-600 border-b-[24px] border-b-transparent rotate-180"></div>
            <div className="bg-teal-600 text-white font-bold py-3 px-4 ">
                Онцлох
            </div>
            {/* Triangular Cut-out */}
            
          </div>
      </section>
    </div>
  );
};

export default Banner;
