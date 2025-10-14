"use client";

import { motion } from "framer-motion";
import { Truck, Wallet, Percent, MapPin } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Percent size={42} strokeWidth={1.5} />,
    title: "Big Discounts",
    text: "Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.",
  },
  {
    id: 2,
    icon: <Truck size={42} strokeWidth={1.5} />,
    title: "Free Shipping",
    text: "Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.",
  },
  {
    id: 3,
    icon: <Wallet size={42} strokeWidth={1.5} />,
    title: "Secure Payments",
    text: "Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.",
  },
  {
    id: 4,
    icon: <MapPin size={42} strokeWidth={1.5} />,
    title: "Order Tracking",
    text: "Integer euismod blandit nunc sit amet sollicitudin. Fusce quis orci viverra, cursus justo.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="why-header">
        <p className="subtext">best in business</p>
        <h2 className="title">Why Choose Us</h2>
        <p className="description">
          Cras malesuada dolor sit amet est egestas ullamcorper. Nullam in tortor
          mi. Maecenas vulputate libero.
        </p>
        <div className="divider"></div>
      </div>

      <div className="why-grid">
        {features.map((f) => (
          <motion.div
            key={f.id}
            className="why-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
