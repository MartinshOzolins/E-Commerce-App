// HERO page with Popular Categories & Trending Items (Server)

import CategorySwiper from "../../../../components/heroPage/CategorySwiper";
import PopularProductsSwiper from "../../../../components/heroPage/PopularProductsSwiper";

export default async function HeroPage() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-5">
      <div>
        <h2 className=" font-semibold text-center text-xl">
          Trending Categories
        </h2>
        <CategorySwiper />
        <h2 className="font-semibold text-center text-xl">
          GoodsHub&apos;s Favorites
        </h2>
        <PopularProductsSwiper />
      </div>
    </div>
  );
}
