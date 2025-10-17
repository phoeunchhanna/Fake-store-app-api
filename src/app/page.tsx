"use client";

import { useEffect, useState } from "react";
import ProductShowcase from "./components/product_show";
import ProductGrid from "./components/products_grid";
import WhyChooseUs from "./components/why_choose_us";
import Banner from "./components/banner";
import { useCart } from "./context/cart_context"; // ✅ import

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

  const { addToCart } = useCart(); // ✅ get from context

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const cats = Array.from(new Set(data.map((p: Product) => p.category))) as string[];
        setCategories(cats);
      });
  }, []);

  // ✅ call context function
  const handleAddCart = (product: Product) => {
    addToCart(product);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <>
      <Banner />
      <div className="container">
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
      <ProductShowcase />
      <WhyChooseUs />
    </>
  );
}
