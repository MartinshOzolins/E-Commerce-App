"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//Next.js components
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  return (
    <div className="relative w-45 text-xl select-box bottom-1">
      <select
        id="select"
        className=" w-full text-sm pl-3 pr-10 transition duration-300 ease-in-out cursor-pointer appearance-none focus:outline-none"
        style={{ fontSize: "1rem" }}
        onChange={(e) =>
          e.target.value === ""
            ? null
            : router.push(`/products/${e.target.value}`)
        }
      >
        <option value="">Browse Category</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      <ArrowDropDownIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-900 pointer-events-none" />
    </div>
  );
}
