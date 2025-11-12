// src/pages/Home.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import CategoryRow from "../components/CategoryRow"; // ✅ Import CategoryRow

// Import products
import {
  dairyProducts,
  fruitsProducts,
  //drinksProducts,
  snacksProducts,
  cleaningProducts,
  /*breakfastProducts,
  sweetProducts,
  biscuitsProducts,
  teaProducts,
  attaProducts,
  masalaProducts,
  saucesProducts,
  organicProducts,
  babyProducts,
  pharmaProducts,
  cleaningProducts,
  homeProducts,*/
  personalProducts,
  //productsMap,
} from "../data/products";

function Home() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        {/* Hero Section */}
        <div className="bg-green-600 text-white p-10 rounded-lg mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to BlinkIt Clone</h1>
          <p className="mt-2">Fresh groceries and essentials delivered to you!</p>
        </div>

        {/* Category Grid */}
        <CategoryGrid />

        {/* 🔹 Slider Rows */}
        <div className="p-6">
          <CategoryRow title="Fruits & Vegetables" products={fruitsProducts} categoryId="fruits" />
          <CategoryRow title="Snacks & Munchies" products={snacksProducts} categoryId="snacks" />
          <CategoryRow title="Personal Care" products={personalProducts} categoryId="personal" />
          <CategoryRow title="Cleaning Essentials" products={cleaningProducts} categoryId="cleaning" />
          <CategoryRow title="Daily, Bread & Eggs" products={dairyProducts} categoryId="dairy" />
        </div>

        
      </div>
      <Footer />
    </>
  );
}

export default Home;
