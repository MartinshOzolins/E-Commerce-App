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
import { useRef } from "react";

const categories = [
  "/categories/fragrances.png",
  "/categories/home-decoration.png",
  "/categories/mens-shirts.png",
  "/categories/mens-watches.png",
  "/categories/skin-care.png",
  "/categories/sunglasses.png",
];

export default function CategorySwiper() {
  const swiperRef = useRef(null);

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="relative w-full max-w-[1440px] mx-auto py-6 px-3 md:px-5">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        spaceBetween={10}
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
                  <h2 className="text-black font-semibold text-sm sm:text-lg capitalize truncate overflow-hidden whitespace-nowrap w-full text-center">
                    {categoryName}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute top-1/2 left-0 z-10">
        <button
          onClick={handlePrev}
          className="py-2 pl-1 text-gray-400 hover:text-gray-500 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 md:size-11"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 right-0 z-10">
        <button
          onClick={handleNext}
          className="py-2 pr-1 text-gray-400 hover:text-gray-500 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 md:size-11"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
