import React, { useState, useEffect, useRef } from "react"; // ✅ Import more hooks
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react"; // ✅ Import Search icon
import { useCart } from "../context/CartContext";
import { allProducts } from "../data/products"; // ✅ Import all products

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState("");
  const [predictions, setPredictions] = useState([]); // ✅ State for search predictions
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // ✅ State for dropdown visibility
  const navigate = useNavigate();
  const searchContainerRef = useRef(null); // ✅ Ref to detect clicks outside the search component

  // ✅ Effect to filter products as the user types
  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredProducts = allProducts
        .filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10); // Limit to 10 predictions
      setPredictions(filteredProducts);
    } else {
      setPredictions([]);
    }
  }, [searchTerm]);

  // ✅ Effect to handle clicks outside the search bar to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
      setIsDropdownVisible(false); // Hide dropdown on search
    }
  };

  const handlePredictionClick = (productName) => {
    navigate(`/search?q=${productName}`);
    setSearchTerm("");
    setIsDropdownVisible(false);
  };


  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Blinkit Clone
        </Link>

        {/* ✅ Main search container with relative positioning */}
        <div ref={searchContainerRef} className="hidden md:block relative w-1/2">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-lg px-3 py-1">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow px-2 py-1 outline-none text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsDropdownVisible(true)} // ✅ Show dropdown on focus
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              <Search size={20} />
            </button>
          </form>

          {/* ✅ Predictive Search Dropdown */}
          {isDropdownVisible && predictions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
              <ul className="text-black">
                {predictions.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                    onClick={() => handlePredictionClick(product.name)}
                  >
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain" />
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;