

import "./globals.css";

import Navbar from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "./context/cart_context";
import { AuthProvider } from "./context/auth_context";


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
          <AuthProvider>{children}</AuthProvider>

          {/* FOOTER */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
