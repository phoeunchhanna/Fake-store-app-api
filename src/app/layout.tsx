
import "./globals.css";

import { ReactNode } from "react";
import Image from "next/image";
import Navbar from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart_context";


export const metadata = {
  title: "Fake Store Demo",
  description: "Demo app using Fake Store API",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>


        <CartProvider>
          {/*header */}
          <Navbar />
        </CartProvider>

        {/* MAIN */}
        <main className="site-main">
          <div className="container">{children}</div>
        </main>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
