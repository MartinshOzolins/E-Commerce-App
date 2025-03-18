import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-5">
      <h1 className="text-2xl md:text-4xl">Sorry, page not found</h1>
      <p className="py-2 text-lg">This page doesn&apos;t seem to exist.</p>
      <Link href="/">
        <button className="bg-blue-900 text-white px-2 py-1 sm:px-3 sm:py-2 rounded">
          Home Page
        </button>
      </Link>
    </div>
  );
}
