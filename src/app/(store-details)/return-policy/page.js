// # Fake Return Policy Page (Server)

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-10 px-4">
      <div className="max-w-[700px] text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Return Policy</h1>
        <p className="mt-3 text-gray-600">
          You can return any unwanted items to GoodsHub within 35 days of
          receiving your order for a refund or replacement.
        </p>
      </div>

      <div className="max-w-[700px] w-full mt-6 text-gray-700">
        <p className="font-medium">Items cannot be returned if:</p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>The item has been used, damaged, or altered.</li>
          <li>The original packaging and tags are missing.</li>
          <li>The item is a final sale or clearance product.</li>
          <li>
            The item was marked as non-returnable at the time of purchase.
          </li>
        </ul>
      </div>
    </div>
  );
}
