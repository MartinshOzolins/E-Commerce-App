"use client";

// React
import { useRef } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

// Next.js components
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "./ArrowIcons";

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
                <h2 className="text-black font-semibold text-sm sm:text-lg capitalize truncate overflow-hidden whitespace-nowrap w-full text-center">
                  {product.title}
                </h2>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 left-0 z-10">
        <button
          onClick={handlePrev}
          className="py-2 pl-1 text-gray-400 hover:text-gray-500 transform -translate-y-1/2"
        >
          <ArrowLeftIcon className="size-9 md:size-11" />
        </button>
      </div>

      <div className="absolute top-1/2 right-0 z-10">
        <button
          onClick={handleNext}
          className="py-2 pr-1 text-gray-400 hover:text-gray-500 transform -translate-y-1/2"
        >
          <ArrowRightIcon className="size-9 md:size-11" />
        </button>
      </div>
    </div>
  );
}
