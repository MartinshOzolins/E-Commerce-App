// # Fake Shipping Information Page (Server)

export default function ShippingInformationPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-10 px-4">
      <div className="max-w-[700px] text-center ">
        <h1 className="text-4xl font-semibold text-gray-800">
          Shipping Information
        </h1>
        <p className="mt-3 text-gray-600">
          We deliver worldwide and collaborate with trusted shipping companies
          to ensure fast and secure deliveries to your doorstep.
        </p>
      </div>

      <div className="max-w-[700px] w-full mt-6 text-gray-700">
        <p className="font-medium">Delivery Details:</p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>
            Standard shipping takes 5-10 business days, depending on location.
          </li>
          <li>Express delivery options are available at an additional cost.</li>
          <li>
            Orders are processed within 24 hours, excluding weekends and
            holidays.
          </li>
          <li>
            Tracking information is provided via email once your order is
            shipped.
          </li>
          <li>Shipping costs vary based on location and order size.</li>
          <li>
            Free shipping is available for orders over $100 in select regions.
          </li>
          <li>We do not ship to PO boxes or military addresses.</li>
        </ul>
      </div>
    </div>
  );
}
