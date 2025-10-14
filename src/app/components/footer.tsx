import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-jewel">
      <div className="footer-container">
        {/* LEFT SECTION — LOGO */}
        <div className="footer-logo-area">
          <h2 className="footer-logo">API Fake</h2>
          <p className="footer-subtext">Fake API STORE</p>
        </div>

        {/* MIDDLE — LINKS */}
        <div className="footer-links">
          <div className="footer-col">
            <h3>About us</h3>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h3>Shop</h3>
            <Link href="#">Rings</Link>
            <Link href="#">Bracelets</Link>
            <Link href="#">Earrings</Link>
            <Link href="#">Necklaces</Link>
          </div>

          <div className="footer-col">
            <h3>Address</h3>
            <p>123 Fifth Avenue, New York, NY 10160</p>
            <p>contact@info.com</p>
            <p>929-242-6868</p>
          </div>
        </div>
      </div>
      <div className="site-footer">
          <div className="container">
            <p>
              &copy; {new Date().getFullYear()} Fake API Store. Powered by{" "}
              <a href="chhanna-pheoun" target="_blank" rel="noreferrer">
                Fake API Store
              </a>.
            </p>
          </div>
        </div>
    </footer>
  );
}
