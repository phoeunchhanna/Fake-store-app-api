"use client";

import Link from "next/link";
import { ShoppingCart, Info, Star, Eye, Heart } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: { rate: number; count: number };
};

interface ProductGridProps {
  products: Product[];
  handleAddCart: (product: Product) => void;
}

export default function ProductGrid({ products, handleAddCart }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <div className="product-img">
            <img src={p.image} alt={p.title} />
            <span className="badge">Up to 20% off</span>
            <div className="icons">
              <Eye className="icon" />
              <Heart className="icon" />
            </div>
          </div>

          <div className="product-info">
            <h3>{p.title}</h3>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`star ${i < Math.round(p.rating?.rate || 0) ? "filled" : ""}`}
                />
              ))}
              <span className="count">({p.rating?.count ?? 0})</span>
            </div>
            <p className="category">{p.category}</p>
            <p className="price">${p.price}</p>
          </div>

          <div className="actions">
            <button className="add-btn" onClick={() => handleAddCart(p)}>
              <ShoppingCart className="btn-icon" />
              Add
            </button>
            <Link href={`/product/${p.id}`} className="details-btn">
              <Info className="btn-icon" />
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
