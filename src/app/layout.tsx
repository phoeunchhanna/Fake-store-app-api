

import "./globals.css";

import Navbar from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart_context";


export const metadata = {
  title: "Fake Store Demo",
  description: "Demo app using Fake Store API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Wrap EVERYTHING inside CartProvider */}
        <CartProvider>
          {/* HEADER */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="site-main">
            <div className="container">{children}</div>
          </main>

          {/* FOOTER */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
