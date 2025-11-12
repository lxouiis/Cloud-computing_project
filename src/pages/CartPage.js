import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // --- Calculation Logic ---
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Same delivery fee logic as the checkout page for consistency
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;


  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 min-h-[70vh]">
        <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>
        {cartItems.length === 0 ? (
          <div>
            <p className="text-gray-600">Your cart feels a little empty.</p>
            <Link to="/" className="text-green-600 font-semibold mt-4 inline-block hover:underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left side: Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md" />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="font-bold text-lg text-gray-700"> – </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="font-bold text-lg text-gray-700"> + </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline text-sm">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Cart Summary */}
            <div className="md:col-span-1">
              <div className="p-6 bg-gray-50 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>₹{deliveryFee.toFixed(2)}</p>
                  </div>
                  <hr className="my-2"/>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Grand Total</p>
                    <p>₹{grandTotal.toFixed(2)}</p>
                  </div>
                </div>

                {/* ✅ This is the main change */}
                <Link to="/checkout">
                  <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>

              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
