"use client";

// react hooks
import { useActionState } from "react";

// mui components
import SearchIcon from "@mui/icons-material/Search";

// server actions
import { validateSearchInput } from "../../actions/actions";

// Next.js functions
import { notFound } from "next/navigation";

export default function SearchFilter({ searchIconSize }) {
  const [state, formAction, isPending] = useActionState(handleSubmit, {});

  function handleSubmit(prevState, formData) {
    const input = formData.get("input");
    if (!input) return;

    const response = validateSearchInput(input);
    if (response.error) return notFound();
  }

  return (
    <>
      <form
        action={formAction}
        className="flex items-center w-full pr-2  max-w-[600px]"
      >
        <input
          type="text"
          className="border border-gray-400 rounded-l-md px-3 py-2 w-full h-10 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          style={{ maxWidth: "480px" }}
          placeholder="Search products..."
          name="input"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-gray-400 text-white p-2 rounded-r-md hover:bg-gray-500 transition duration-200"
        >
          <SearchIcon sx={{ width: `${searchIconSize}` }} className="w-full" />
        </button>
      </form>
    </>
  );
}
