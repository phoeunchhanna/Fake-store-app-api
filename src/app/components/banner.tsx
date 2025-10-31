"use client";

import Image from "next/image";
import React from "react";

export default function Banner() {
    return (
        <section className="hero-banner">
            <div className="banner-container">
                {/* LEFT TEXT SECTION */}
                <div className="banner-text">
                    <p className="small-text">New collection</p>
                    <h1 className="banner-title">The new ring sensation</h1>
                    <p className="banner-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                        luctus nec ullamcorper mattis, pulvinar dapibus leo.
                    </p>
                    <button className="shop-btn"><span>SHOP NOW</span></button>
                </div>

                {/* RIGHT IMAGE SECTION */}
                <div className="banner-image animated">
                    <Image
                        src="/clother.png"
                        alt="Ring collection showcase"
                        width={700}
                        height={500}
                        priority
                    />
                </div>
            </div>
            {/* BRANDING LOGOS */}
            <div className="brand-strip">
                <div className="brand-card">
                    <Image src="/men.png" alt="Men's Collection" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/women.png" alt="Women's Collection" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/jewelry.png" alt="Jewelry Collection" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/electronic.png" alt="Electronics" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/shose.png" alt="Shoes" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/shose.png" alt="Accessories" width={50} height={50} />
                </div>
                <div className="brand-card">
                    <Image src="/shose.png" alt="Categories" width={50} height={50} />
                </div>
            </div>
        </section>
    );
}
