"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useRouter } from "next/navigation";

export default function CategoryFilter({ categories, toggleModal }) {
  const router = useRouter();
  return (
    <div className="relative w-47 bottom-1 flex top-[0.4px]">
      <select
        id="select"
        className=" w-full pr-10 transition duration-300 ease-in-out cursor-pointer appearance-none focus:outline-none select-category select-category-small"
        onChange={(e) => {
          e.target.value === ""
            ? null
            : router.push(`/products/${e.target.value}`);
          if (toggleModal) toggleModal(false);
        }}
      >
        <option value="" className="">
          Shop by Category
        </option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <ArrowDropDownIcon className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-900 pointer-events-none" />
    </div>
  );
}
