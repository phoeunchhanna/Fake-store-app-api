import Link from 'next/link';


const API_BASE = 'https://fakestoreapi.com';


async function getProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}


export default async function ProductPage({ params }) {
    const { id } = params;
    const product = await getProduct(id);


    return (
        <div>
            <Link href="/">← Back</Link>
            <div className="product-detail" style={{ marginTop: 16 }}>
                <div>
                    <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: 360 }} />
                </div>
                <div>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p><strong>${product.price}</strong></p>
                </div>
            </div>
        </div>
    );
}