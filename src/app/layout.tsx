// app/layout.js
// @ts-ignore - allow side-effect CSS import without declarations
import './globals.css';


export const metadata = {
  title: 'Fake Store Demo',
  description: 'Demo app using Fake Store API',
};


import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header" style={{ background: '#222', color: '#fff', padding: '1rem 0', marginBottom: '2rem' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', letterSpacing: '1px' }}>🛒 Fake Store</h1>
            <nav>
              <a href="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '1.5rem', fontWeight: 500 }}>Home</a>
              <a href="#products" style={{ color: '#fff', textDecoration: 'none', marginRight: '1.5rem', fontWeight: 500 }}>Products</a>
              <a href="#about" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>About</a>
            </nav>
          </div>
        </header>
        
        <main className="container">{children}</main>
        <footer className="site-footer" style={{ background: '#222', color: '#fff', padding: '1rem 0', marginTop: '2rem', textAlign: 'center' }}>
          <div className="container">
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Fake Store. Powered by <a href="https://fakestoreapi.com/" style={{ color: '#fff', textDecoration: 'underline' }}>Fake Store API</a>.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}