"use client";

import { useEffect, useState } from "react";
import ProductShowcase from "./components/product_show";
import ProductGrid from "./components/products_grid";
import WhyChooseUs from "./components/why_choose_us";
import Banner from "./components/banner";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: { rate: number; count: number };
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
  };

  // Filter by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <>
      {/* banner  */}
      <Banner />

      {/* PRODUCT GRID */}
      <div className="container">
        {/* CATEGORY FILTER */}
        <div className="container category-bar">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <ProductGrid products={filteredProducts} handleAddCart={handleAddCart} />
      </div>

      {/* Product show case */}
      <ProductShowcase />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />
    </>
  );
}
