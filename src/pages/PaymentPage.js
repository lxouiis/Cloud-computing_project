import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentPage() {
  const [paymentOption, setPaymentOption] = useState("upi"); // 'upi' or 'card'
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  // Retrieve state passed from checkout page
  const { shippingInfo, cartItems, grandTotal } = location.state || {};

  // Redirect if state is missing (e.g., direct navigation to /payment)
  if (!shippingInfo || !cartItems) {
    navigate("/checkout");
    return null; // Render nothing while redirecting
  }

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would connect to a real payment gateway
    // For now, we just simulate a successful payment
    alert(`Payment of ₹${grandTotal.toFixed(2)} successful! Your order has been placed.`);
    clearCart();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Payment</h1>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between font-bold text-xl">
            <span>Amount to Pay:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Option Tabs */}
        <div className="flex mb-6 border-b">
          <button onClick={() => setPaymentOption("upi")} className={`flex-1 py-2 font-semibold ${paymentOption === 'upi' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>
            UPI
          </button>
          <button onClick={() => setPaymentOption("card")} className={`flex-1 py-2 font-semibold ${paymentOption === 'card' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}>
            Credit / Debit Card
          </button>
        </div>

        <form onSubmit={handlePayment}>
          {/* UPI Form */}
          {paymentOption === "upi" && (
            <div className="space-y-4">
              <input type="text" placeholder="Enter UPI ID (e.g., yourname@bank)" className="w-full p-3 border rounded-lg" required />
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
                Verify & Pay
              </button>
            </div>
          )}

          {/* Card Form */}
          {paymentOption === "card" && (
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg" required />
              <input type="text" placeholder="Name on Card" className="w-full p-3 border rounded-lg" required />
              <div className="flex gap-4">
                <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg" required />
                <input type="password" placeholder="CVV" className="w-1/2 p-3 border rounded-lg" required />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
                Pay Securely
              </button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}
