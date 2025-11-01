import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import RelatedProduct from "../../components/related_product"; // ✅ Capitalized import
const API_BASE = "https://fakestoreapi.com";
/** Define Product type from the Fake Store API */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}
/** Props type for Next.js dynamic route */
interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

/** Fetch product safely */
async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });
    if (!res.ok) {
      console.error("❌ Failed to fetch product:", res.statusText);
      return null;
    }
    const data: Product = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
}

/** === PRODUCT PAGE COMPONENT === */
export default async function ProductPage({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="container" style={{ padding: "70px 20px" }}>
        <h2>Product not found</h2>
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const sku = "WH1000XM4";
  const oldPrice = (product.price * 1.15).toFixed(2);
  const rating = product.rating?.rate ?? 4.5;
  const reviews = product.rating?.count ?? 120;
  const colors = ["Black", "Silver", "Blue"];

  return (
    <>
      {/* === PRODUCT DETAIL SECTION === */}
      <div className="product-page">
        <Link href="/" className="back-link">
          ← Back
        </Link>

        <div className="product-detail">
          <div className="product-image">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              priority
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-sku">SKU: {sku}</p>

            <div className="product-price">
              <span className="current-price">${product.price.toFixed(2)}</span>
              <span className="old-price">${oldPrice}</span>
            </div>

            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(rating) ? "#FFD700" : "none"}
                  stroke="#FFD700"
                />
              ))}
              <span className="rating-text">
                {rating.toFixed(1)} ({reviews} reviews)
              </span>
            </div>

            <p className="product-desc">{product.description}</p>

            <div className="color-section">
              <p>Color:</p>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${color === "Black" ? "active" : ""}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button className="add-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* === RELATED PRODUCTS SECTION === */}
      <section style={{ marginTop: "80px" }}>
        <RelatedProduct category={product.category ?? ""} />
      </section>
    </>
  );
}
