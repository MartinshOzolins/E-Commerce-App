import Link from "next/link";

// # Server Component
export default function Footer() {
  return (
    <footer className="pb-5 pt-16">
      <div className="bg-blue-100 h-[2px] " />
      <div className="w-full pt-2 mx-auto flex flex-col sm:flex-row items-start justify-between px-2 sm:px-5 md:px-10">
        <div className="flex flex-col space-y-2 items-start text-sm sm:text-base">
          <h3 className="font-semibold text-blue-900 font-bold ">
            Customer Service
          </h3>

          <p>
            <a href="tel:+123456789">📞 +1 234 567 890</a>
          </p>
          <p>
            <a href="mailto:someone@example.com">📧 goodshub@example.com</a>
          </p>
          <p>📍 123 Fake Street, City, Country</p>
          <p>🕘 09:00 - 18:00</p>
        </div>
        <div></div>
        <address className="not-italic">
          <div className="space-y-2 text-right flex flex-col items-start sm:items-end pt-4 sm:pt-0">
            <h3 className="font-bold text-blue-900">Quick Links</h3>
            <Link href="/contact" className="hover:text-blue-800">
              Contact Us
            </Link>
            <Link href="/shipping-information" className="hover:text-blue-800">
              Shipping
            </Link>
            <Link href="/return-policy" className="hover:text-blue-800">
              Return Policy
            </Link>
          </div>
        </address>
      </div>
    </footer>
  );
}
