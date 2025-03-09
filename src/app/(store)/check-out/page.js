//# Shopping Cart (Server)
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mockItems = [
  {
    id: 1,
    name: "Item One",
    price: 19.99,
    image: "/placeholder.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Item Two",
    price: 29.99,
    image: "/placeholder.jpg",
    quantity: 2,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(mockItems);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed inset-0 flex md:justify-end bg-black bg-opacity-50">
      <div className="w-full md:w-96 bg-white h-full p-4 flex flex-col">
        <button className="self-end mb-4">
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 overflow-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 border-b h-72 relative w-50"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="w-32 h-32 object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-between mt-2">
                  <span>Qty: {item.quantity}</span>
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <Button className="w-full mt-4">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
