import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function CategoryRow({ title, products, categoryId }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-10 relative">
      {/* Row title */}
      <div className="flex justify-between items-center mb-3 px-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <Link
          to={`/category/${categoryId}`}
          className="text-green-600 font-medium text-sm hover:underline"
        >
          see all
        </Link>
      </div>

      {/* Arrow buttons */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hidden md:block"
        onClick={() => scroll("left")}
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hidden md:block"
        onClick={() => scroll("right")}
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Scrollable row */}
      <div
        ref={rowRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth px-2"
      >
        {products.map((p) => (
          <div key={p.id} className="flex-none w-[180px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
