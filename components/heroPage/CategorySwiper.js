"use client";

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

// Next.js components
import Image from "next/image";
import Link from "next/link";

const categories = [
  "/categories/fragrances.png",
  "/categories/home-decoration.png",
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
          const categoryUrl = img.split("/")[2].split(".")[0];
          return (
            <SwiperSlide key={index} className="relative cursor-pointer">
              <Link
                href={`/products/${categoryUrl}`}
                className="flex flex-col relative w-full h-[200px] sm:h-[250px] md:h-[300px] border border-gray-200 items-center"
              >
                <Image
                  src={img}
                  alt={categoryName}
                  height={350}
                  width={350}
                  className="object-contain h-2/3 w-full"
                />
                <div className="w-full h-full flex flex-col items-center justify-end px-5 sm:px-2 md:px-5 pb-2 md:pb-3">
                  <h2 className="text-black font-semibold text-sm sm:text-base capitalize truncate overflow-hidden whitespace-nowrap w-full text-center">
                    {categoryName}
                  </h2>

                  <button className="text-sm sm:text-base bg-blue-900 text-white w-full py-1 rounded-md cursor-pointer">
                    SHOP NOW
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
