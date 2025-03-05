import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Will use revalidatePath for catalog

export default function SortingFilters() {
  return (
    <div className="w-full flex justify-start pt-10 px-3">
      <div className="relative w-45">
        <select className="w-full bg-white text-sm border rounded-md pl-3 pr-10 py-2 border-gray-400 transition duration-300 ease-in-out focus:outline-none shadow-sm focus:shadow-md cursor-pointer  appearance-none">
          <option value="">Sort: Most Relevant</option>
          <option value="">Price Low to High</option>
          <option value="">Price High to Low</option>
          <option value="">Top Rated</option>
          <option value="">Newest</option>
        </select>
        <KeyboardArrowDownIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
