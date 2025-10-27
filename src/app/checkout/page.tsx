"use client";

import { useState } from "react";
import { useCart } from "../context/cart_context";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Phone,

} from "lucide-react";
import type { Product } from "../context/cart_context"; // ✅ Import Product type

// ⚠️ SECURITY WARNING:
// Move this to a Next.js API route in production (e.g. /api/sendTelegram)
const TELEGRAM_TOKEN = "YOUR_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";

/** Sends formatted message to Telegram bot */
async function sendToTelegram(message: string): Promise<void> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const body = JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      console.error("❌ Failed to send Telegram message");
    }
  } catch (error) {
    console.error("❌ Telegram Error:", error);
  }
}
/** Formats order details for Telegram */
function formatOrderMessage(
  cart: Product[],
  userInfo: { name: string; phone: string; address: string },
  subtotal: number,
  paymentMethod: string
): string {
  const productList = cart
    .map(
      (item) =>
        `📦 ${item.title} x${item.quantity ?? 1} - $${(
          item.price * (item.quantity ?? 1)
        ).toFixed(2)}`
    )
    .join("\n");

  return `
🛒 *New Order Received*
*Name:* ${userInfo.name}
*Phone:* ${userInfo.phone}
*Address:* ${userInfo.address}

-------------------------------------
${
  paymentMethod === "credit"
    ? "💳 *Payment:* Credit / Debit Card"
    : paymentMethod === "aba"
    ? "📱 *Payment:* ABA Pay"
    : "💵 *Payment:* Cash on Delivery"
}
-------------------------------------
*Products:*
${productList}

-------------------------------------

💵 *Subtotal:* $${subtotal.toFixed(2)}
`;
}
export default function CheckoutPage() {
  const { cart, clearCart, removeFromCart, addToCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
  /** Proceed to payment view */
  const handleCheckout = () => setShowPayment(true);

  /** Handle order submission */
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = formatOrderMessage(cart, userInfo, subtotal, paymentMethod);
    await sendToTelegram(orderDetails);
    alert(`✅ Payment successful via ${paymentMethod}!\nTotal: $${subtotal.toFixed(2)}`);
    clearCart();
    setShowPayment(false);
  };
  /** Decrease quantity safely */
  const decreaseQuantity = (itemId: number) => {
    const updated = cart.map((item) =>
      item.id === itemId && (item.quantity ?? 1) > 1
        ? { ...item, quantity: (item.quantity ?? 1) - 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload(); // Simplest refresh to reflect new state (you can optimize this)
  };
  // ---------------- CART VIEW ----------------
  if (!showPayment) {
    return (
      <div className="checkout-wrapper">
        <div className="checkout-left">
          <h1>My Cart</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-product">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="cart-image"
                    />
                    <div className="cart-details">
                      <h4>{item.title}</h4>
                      <p>${item.price.toFixed(2)}</p>
                      <p className="color">Category: {item.category}</p>
                    </div>
                  </div>

                  <div className="cart-controls">
                    <div className="quantity-box">
                      <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity ?? 1}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          addToCart({
                            ...item,
                            quantity: (item.quantity ?? 1) + 1,
                          })
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="cart-price">
                      ${(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Estimate Delivery</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <p className="secure-text">🔒 Secure Checkout</p>
          </div>
        )}
      </div>
    );
  }

  // ---------------- PAYMENT VIEW ----------------
  return (
    <div className="payment-form">
      <h2>Choose Payment Method</h2>

      <form onSubmit={handlePaymentSubmit}>
        <div className="payment-methods">
          <label className={paymentMethod === "credit" ? "active" : ""}>
            <input
              type="radio"
              name="method"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
            />
            <CreditCard size={18} /> Credit / Debit Card
          </label>

          <label className={paymentMethod === "aba" ? "active" : ""}>
            <input
              type="radio"
              name="method"
              value="aba"
              checked={paymentMethod === "aba"}
              onChange={() => setPaymentMethod("aba")}
            />
            <Smartphone size={18} /> ABA Pay
          </label>

          <label className={paymentMethod === "cash" ? "active" : ""}>
            <input
              type="radio"
              name="method"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            <Banknote size={18} /> Cash on Delivery
          </label>
        </div>

        {/* ✅ Show proper payment fields per method */}
        {paymentMethod === "credit" && (
          <div className="card-fields">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
            <input type="text" placeholder="Cardholder Name" required />
            <input type="text" placeholder="Card Number" required />
            <div className="row">
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVV" required />
            </div>
          </div>
        )}

        {paymentMethod === "aba" && (
          <div className="aba-info">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full name"
              required
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone number"
              required
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
            <p>
              Scan this QR code with your <strong>ABA Mobile App</strong> to
              complete payment.
            </p>
            <Image src="/QRcode.jpg" alt="ABA QR" width={160} height={160} />
          </div>
        )}

        {paymentMethod === "cash" && (
          <div className="cod-details">
            <label>
              <MapPin size={16} /> Delivery Address
            </label>
            <input
              type="text"
              placeholder="Enter your full address"
              required
              value={userInfo.address}
              onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
            />

            <label>
              <Phone size={16} /> Contact Number
            </label>
            <input
              type="text"
              placeholder="e.g. 081 234 5678"
              required
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </div>
        )}

        <button type="submit" className="checkout-btn">
          Confirm Payment
        </button>
        <button
          type="button"
          className="clear-cart"
          onClick={() => setShowPayment(false)}
        >
          ← Back to Cart
        </button>
      </form>
    </div>
  );
}
