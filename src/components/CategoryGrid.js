

// src/components/CategoryGrid.js
import React from "react";
import { Link } from "react-router-dom";
import categories from "../data/categories";

function CategoryGrid() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-20 w-20 object-contain mb-2"
            />
            <p className="text-sm text-center">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;

