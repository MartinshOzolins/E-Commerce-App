import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Sorry, page not found</h1>
      <p>This page doesn&apos;t seem to exist.</p>
      <Link href="/">Home Page</Link>
    </div>
  );
}
