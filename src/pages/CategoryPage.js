// src/pages/CategoryPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { productsMap } from "../data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard"; // ✅ Import ProductCard

export default function CategoryPage() {
  const { id } = useParams(); // category id from URL
  const products = productsMap[id] || []; // fallback empty array

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 capitalize">{id}</h1>

        {products.length === 0 ? (
          <p>No products available in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} /> // ✅ Using ProductCard
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
