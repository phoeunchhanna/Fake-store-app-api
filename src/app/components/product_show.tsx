"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductShowcase() {
  return (
    <section className="product-showcase">
      {/* LEFT TEXT BLOCK */}
      <div className="showcase-text">
        <p className="tagline">Unique pieces</p>
        <h2 className="headline">
          Be <br /> always <br /> on trend
        </h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
          luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <button className="shop-btn"><span>Shop Now</span></button>
      </div>

      {/* RIGHT IMAGE BLOCK */}
      <div className="showcase-images">
        <motion.div
          className="image-main"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/clother.png"
            alt="Rings"
            width={300}
            height={300}
            className="image"
          />
        </motion.div>

        <motion.div
          className="image-overlay"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Image
            src="/women-clotehr.jpg"
            alt="Model with jewelry"
            width={400}
            height={400}
            className="image"
          />
        </motion.div>
      </div>
    </section>
  );
}
