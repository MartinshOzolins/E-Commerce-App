"use client";

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Next.js components
import Image from "next/image";

const categories = [
  "/categories/fragrances.png",
  "/categories/home-decorations.png",
  "/categories/mens-shirts.png",
  "/categories/mens-watches.png",
  "/categories/skin-care.png",
  "/categories/sunglasses.png",
];

export default function CategorySwiper() {
  return (
    <div className="relative w-full max-w-[1440px] mx-auto py-6 px-3 md:px-5">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={20}
        className="w-full"
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1700: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {categories.map((img, index) => {
          const categoryName = img
            .split("/")[2]
            .split(".")[0]
            .replace(/-/g, " ");
          return (
            <SwiperSlide key={index} className="relative cursor-pointer">
              <div className="flex flex-col relative w-full h-[200px] sm:h-[300px] md:h-[400px] border border-gray-200 items-center">
                <Image
                  src={img}
                  alt={categoryName}
                  height={350}
                  width={350}
                  className="object-contain h-2/3 sm:h-full w-full"
                />
                <div className="h-20 w-full flex flex-col items-center px-5 sm:px-2 md:px-5 ">
                  <h2 className="text-black font-semibold text-sm sm:text-base capitalize truncate overflow-hidden whitespace-nowrap w-full text-center">
                    {categoryName}
                  </h2>

                  <button className="text-sm sm:text-base bg-blue-900 text-white w-full py-1 rounded-md">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
