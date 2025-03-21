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

const products = [
  {
    id: 4,
    title: "Red Lipstick",
    url: "/single-product/2",
    img: "/top-products/red-lipstick.png",
  },
  {
    id: 100,
    title: "Apple Airpods",
    url: "/single-product/100",
    img: "/top-products/apple-airpods.png",
  },
  {
    id: 14,
    title: "Knoll Saarinen Executive Conference Chair",
    url: "/single-product/14",
    img: "/top-products/chair.png",
  },
  {
    id: 80,
    title: "Huawei Matebook X Pro",
    url: "/single-product/80",
    img: "/top-products/huawei-matebook.png",
  },
  {
    id: 34,
    title: "Nescafe Coffee",
    url: "/single-product/34",
    img: "/top-products/coffee.png",
  },
  {
    id: 22,
    title: "Dog Food",
    url: "/single-product/22",
    img: "/top-products/dog-food.png",
  },
  {
    id: 99,
    title: "Amazon Echo Plus",
    url: "/single-product/99",
    img: "/top-products/amazon.png",
  },
];

export default function PopularProductsSwiper() {
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
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="relative cursor-pointer">
            <Link
              href={product.url}
              className="flex flex-col relative w-full h-[200px] sm:h-[250px] md:h-[300px] border border-gray-200 items-center"
            >
              <Image
                src={product.img}
                alt={product.title}
                height={350}
                width={350}
                className="object-contain h-2/3 w-full"
              />
              <div className="w-full h-full flex flex-col items-center justify-end px-5 sm:px-2 md:px-5 pb-2 md:pb-3">
                <h2 className="text-black font-semibold text-sm sm:text-base capitalize truncate overflow-hidden whitespace-nowrap w-full text-center">
                  {product.title}
                </h2>

                <button className="text-sm sm:text-base bg-white text-blue-900 border border-blue-900 w-full py-1 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 hover:cursor-pointer transform hover:-translate-y-[1px]">
                  SHOP NOW
                </button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
