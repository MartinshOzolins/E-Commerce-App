"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Will use revalidatePath for catalog

export default function SortingFilters({ currParams, currSearchParams }) {
  const [currSorting, setCurrentSorting] = useState("?sortBy=most-relevant");
  const router = useRouter();

  // updates state value based on current url search params
  useEffect(() => {
    if (!currSearchParams) return;
    if (currSearchParams)
      setCurrentSorting(`sortBy=${currSearchParams.sortBy}`);
  }, [currSearchParams]);

  // updates url search params with sorting filters
  const handleClick = (e) => {
    e.preventDefault();

    // If no category params, just apply sorting filters
    if (!currParams) {
      router.push(`/products${e.target.value}`);
    }
    // If both category params and search input exist, keep both in the URL
    else if (currParams && currSearchParams.q) {
      router.push(
        `/products/${currParams}?q=${currSearchParams.q}&${e.target.value}`
      );
    }
    // If only category params exist (but no search input), add sorting filters
    else {
      router.push(`/products/${currParams}?${e.target.value}`);
    }
  };

  return (
    <div className="w-full flex justify-start pt-10 pl-3">
      <div className="relative w-45">
        <select
          id="select"
          className="w-full bg-white text-sm border rounded-md pl-3 pr-10 py-2 border-gray-400 transition duration-300 ease-in-out focus:outline-none shadow-sm focus:shadow-md cursor-pointer  appearance-none"
          onChange={(e) => handleClick(e)}
          value={currSorting}
        >
          <option value="sortBy=most-relevant">Sort: Most Relevant</option>
          <option value="sortBy=price-low-to-high">Price Low to High</option>
          <option value="sortBy=price-high-to-low">Price High to Low</option>
          <option value="sortBy=lowest-rating">Lowest Rated</option>
          <option value="sortBy=highest-rating">Top Rated</option>
          <option value="sortBy=createdAt">Newest</option>
        </select>
        <KeyboardArrowDownIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
