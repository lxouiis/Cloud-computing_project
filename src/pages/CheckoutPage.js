import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // State to manage form inputs
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    pinCode: "",
    mobile: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' or 'online'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.pinCode || !shippingInfo.mobile) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === "cod") {
      // For COD, simulate order placement directly
      console.log("Order placed with the following details:", {
        shippingInfo,
        paymentMethod,
        cartItems,
        grandTotal,
      });
      alert("Order placed successfully! Thank you for shopping with us. 🎉");
      clearCart();
      navigate("/");
    } else {
      // For online payment, navigate to the payment page with state
      navigate("/payment", {
        state: { shippingInfo, cartItems, grandTotal },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Shipping & Payment */}
          <div>
            {/* Shipping Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} value={shippingInfo.name} className="w-full p-3 border rounded-lg" required />
                <input type="text" name="address" placeholder="Address (House No, Street)" onChange={handleInputChange} value={shippingInfo.address} className="w-full p-3 border rounded-lg" required />
                <div className="flex gap-4">
                  <input type="text" name="city" placeholder="City" onChange={handleInputChange} value={shippingInfo.city} className="w-1/2 p-3 border rounded-lg" required />
                  <input type="text" name="pinCode" placeholder="PIN Code" onChange={handleInputChange} value={shippingInfo.pinCode} className="w-1/2 p-3 border rounded-lg" required />
                </div>
                <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleInputChange} value={shippingInfo.mobile} className="w-full p-3 border rounded-lg" required />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-green-500 ring-2 ring-green-200' : ''}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mr-3" />
                  Cash on Delivery (COD)
                </label>
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === 'online' ? 'border-green-500 ring-2 ring-green-200' : ''}`}>
                  <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="mr-3" />
                  UPI / Credit Card
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
