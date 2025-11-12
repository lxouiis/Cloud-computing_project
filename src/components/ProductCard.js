import React from "react";
import { useCart } from "../context/CartContext"; // ✅ Import useCart hook

export default function ProductCard({ product }) {
  const { cartItems, addToCart, updateQuantity } = useCart(); // ✅ Use the context

  // Find this specific product in the cart to get its quantity
  const cartItem = cartItems.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div className="border rounded-xl shadow-sm p-3 bg-white flex flex-col">
      
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-contain mb-2"
      />
      <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
      <p className="text-xs text-gray-500 mt-1">{product.size}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-bold">₹{product.price}</span>

        {qty === 0 ? (
          <button
            onClick={() => addToCart(product)} // ✅ Use addToCart from context
            className="bg-green-600 text-white text-sm px-3 py-1 rounded-md hover:bg-green-700"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-green-50 border border-green-600 rounded-md px-2 py-1">
            <button
              onClick={() => updateQuantity(product.id, -1)} // ✅ Use updateQuantity
              className="text-green-600 font-bold text-lg px-1"
            >
              –
            </button>
            <span className="text-sm font-semibold">{qty}</span>
            <button
              onClick={() => updateQuantity(product.id, 1)} // ✅ Use updateQuantity
              className="text-green-600 font-bold text-lg px-1"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}