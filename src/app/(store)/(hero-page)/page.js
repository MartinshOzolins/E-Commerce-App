//# HERO page with Popular Categories & Trending Items (Server)

import CategorySwiper from "../../../../components/heroPage/CategorySwiper";
import PopularProductsSwiper from "../../../../components/heroPage/PopularProductsSwiper";

export default async function HeroPage() {
  return (
    <div className="w-full h-full flex flex-col pt-5">
      <h2 className="text-red-600 font-semibold text-center text-xl">
        Currently Trending Categories
      </h2>
      <CategorySwiper />
      <h2 className="font-semibold text-center text-xl">
        GoodsHub&apos;s Favorites
      </h2>
      <PopularProductsSwiper />
    </div>
  );
}
