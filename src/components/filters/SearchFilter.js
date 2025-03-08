"use client";

// react hooks
import { useActionState } from "react";

// mui components
import SearchIcon from "@mui/icons-material/Search";

// server actions
import { validateInput } from "../../../actions/actions";

// Next.js functions
import { notFound } from "next/navigation";

export default function SearchFilter({ searchIconSize }) {
  const [state, formAction, isPending] = useActionState(handleSubmit, {});

  async function handleSubmit(prevState, formData) {
    const input = formData.get("input");
    if (!input) return;

    const response = await validateInput(input);
    if (response.error) return notFound();
  }

  return (
    <>
      <form action={formAction}>
        <input
          type="text"
          className="border border-gray-400 px-1 py-1 h-7 w-2/3 outline-none"
          style={{ maxWidth: "480px" }}
          placeholder="Search products..."
          name="input"
          required
        />
        <button type="submit" disabled={isPending}>
          <SearchIcon
            sx={{ width: `${searchIconSize}` }}
            className="w-1/3 hover:cursor-pointer"
          />
        </button>
      </form>
    </>
  );
}
