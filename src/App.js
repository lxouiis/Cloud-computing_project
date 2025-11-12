import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage"; // ✅ Import the new page
import CheckoutPage from "./pages/CheckoutPage"; // ✅ Import the new page
import PaymentPage from "./pages/PaymentPage"; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} /> {/* ✅ Add the search route */}
          <Route path="/checkout" element={<CheckoutPage />} /> {/* ✅ Add the checkout route */}
          <Route path="/payment" element={<PaymentPage />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;