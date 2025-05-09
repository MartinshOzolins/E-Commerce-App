"use client";

// Next.js components
import Image from "next/image";

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function SwiperComponent({ product }) {
  return (
    <div className="h-1/2 relative min-h-[400px] max-h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ type: "progressbar", clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        className="w-full h-[400px]"
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={img}
              alt={`Product image ${index + 1}`}
              fill
              className="object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
