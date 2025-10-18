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
  Clock,
} from "lucide-react";

// Function to send the order to Telegram bot
const sendToTelegram = async (message: string) => {
  const token = '7641186781:AAF91RpqmCMsSt-bSUqeYxEi4XnOGVG9WCA';
  const chatId = '5652292237'; // Replace with your chat ID or group ID
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const body = JSON.stringify({
    chat_id: chatId,
    text: message,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (response.ok) {
    console.log('Message sent successfully');
  } else {
    console.error('Failed to send message');
  }
};

export default function CheckoutPage() {
  
  const { cart, clearCart, removeFromCart, addToCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [userInfo, setUserInfo] = useState<{ name: string; phone: string; address: string }>({
    name: "",
    phone: "",
    address: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const sendToTelegram = async (message: string) => {
    const token = '7641186781:AAF91RpqmCMsSt-bSUqeYxEi4XnOGVG9WCA';
    const chatId = '5652292237'; // Replace with your chat ID or group ID
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const body = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown', // To support bold, italics, etc.
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (response.ok) {
      console.log('Message sent successfully');
    } else {
      console.error('Failed to send message');
    }
  };

  // Format the order details for sending
 const formatOrderMessage = (cart, userInfo, subtotal, paymentMethod) => {
  const productList = cart.map((item) => {
    const icon = "📦"; // This icon represents products, you can change it based on category or type
    return `${icon} ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
  }).join('\n');

  const orderDetails = `
  🛒 *New Order:*
  *Name:* ${userInfo.name}
  *Phone:* ${userInfo.phone}
  *Address:* ${userInfo.address}
  
  -------------------------------------
  
  ${paymentMethod === "credit" ? "💳 *Payment Method:* Credit / Debit Card" : 
  paymentMethod === "aba" ? "📱 *Payment Method:* ABA Pay" : "💵 *Payment Method:* Cash on Delivery"}

  -------------------------------------
  
  *Products:*
  ${productList}
  
  -------------------------------------
  
  💵 *Subtotal:* $${subtotal.toFixed(2)}
  `;

  return orderDetails;
};


  // Example usage when submitting the order
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails = formatOrderMessage(cart, userInfo, subtotal, paymentMethod);

    // Send the formatted message to Telegram bot
    sendToTelegram(orderDetails);

    alert(`✅ Payment successful via ${paymentMethod}!\nTotal: $${subtotal.toFixed(2)}`);
    clearCart();
    setShowPayment(false);
  };


  const decreaseQuantity = (itemId: number) => {
    const item = cart.find((p) => p.id === itemId);
    if (item && item.quantity && item.quantity > 1) {
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
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
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity(item.id)}
                      >
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

  // ---------------- PAYMENT FORM ----------------
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

        {paymentMethod === "cash" && (
          <div className="cod-details">
            <h3>Cash on Delivery (COD)</h3>
            <p className="cod-desc">
              Please fill in your delivery information carefully. Our courier will
              contact you once your order is out for delivery.
            </p>

            {/* Address Form */}
            <div className="cod-form">
              <div className="form-group">
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
              </div>

              <div className="form-group">
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

              <div className="form-group">
                <label>Additional Note (Optional)</label>
                <textarea placeholder="Example: Please call before delivery or leave at reception." />
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <div className="info-item">
                <Clock size={16} />
                <p>
                  <strong>Estimated Delivery:</strong> 2-4 business days
                </p>
              </div>
              <div className="info-item">
                <Image src="/fee.png" alt="delivery" width={30} height={20} />
                <p>Free nationwide shipping for orders above $50</p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="cod-summary">
              <div className="money-icon">💵</div>
              <div>
                <p>
                  You will pay <strong>${subtotal.toFixed(2)}</strong> to our courier
                  upon delivery.
                </p>
                <small>
                  *Please prepare the exact amount or small change for a smooth
                  handover.
                </small>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "credit" && (
          <div className="card-fields">
            <input
              type="text"
              placeholder="Full name"
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
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Full name"
                required
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone number"
                required
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </div>

            <p>
              Scan this QR code with your <strong>ABA Mobile App</strong> to
              complete the payment.
            </p>
            <Image src="/QRcode.jpg" alt="ABA QR" width={160} height={160} />
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
