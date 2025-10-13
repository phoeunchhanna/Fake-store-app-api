"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p: Product) => p.category))) as string[];
        setCategories(cats);
      });
  }, []);

  const handleAddCart = (product: Product) => {
    console.log("Added to cart:", product);
    // Later: save to localStorage or global cart context
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      {/* Category Filter */}
      <div className="categoy">
        <label htmlFor="category" className="category-text" >
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>



      <div className="grid">
        {filteredProducts.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.title} />
            <div>
              <h3 style={{ fontSize: 14 }}>{p.title}</h3>
              <p className="font-bold">${p.price}</p>
              <p className="text-xs text-gray-500">{p.category}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-blue-700"
                  onClick={() => handleAddCart(p)}
                >
                  🛒 Add Cart
                </button>

                <Link
                  href={`/product/${p.id}`}
                  className="text-blue-600 px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:underline"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
