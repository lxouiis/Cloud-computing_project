import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { allProducts } from "../data/products"; // ✅ Import all products

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // Get the 'q' parameter from the URL

  // Filter products based on the query (case-insensitive)
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">
          {filteredProducts.length > 0
            ? `Search results for "${query}"`
            : `No results found for "${query}"`}
        </h1>

        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}