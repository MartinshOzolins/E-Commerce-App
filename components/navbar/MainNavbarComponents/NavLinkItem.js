// Next.js components
import Link from "next/link";

export default function NavLinkItem({ href, children }) {
  return (
    <Link
      href={href}
      className="hover:cursor-pointer hover:text-blue-700 transition duration-200 select-category"
    >
      {children}
    </Link>
  );
}
