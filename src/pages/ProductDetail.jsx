import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productService } from "../service/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Produk tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Memuat...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!product) return <div className="p-4 text-gray-500">Produk tidak ditemukan.</div>;

  return (
    <div className="p-6">
      <Link to="/products" className="text-blue-500 hover:underline text-sm mb-4 inline-block">
        &larr; Kembali ke Produk
      </Link>
      <div className="bg-white rounded-xl shadow-lg max-w-lg mx-auto p-6">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        <div className="space-y-2">
          <p className="text-gray-800 font-semibold text-lg">
            Harga: Rp {parseFloat(product.price).toLocaleString("id-ID")}
          </p>
          <p className="text-gray-600">
            Stok:{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                product.stock > 10
                  ? "bg-green-100 text-green-700"
                  : product.stock > 0
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? product.stock : "Habis"}
            </span>
          </p>
          <p className="text-gray-500 text-xs">
            Ditambahkan pada: {new Date(product.created_at).toLocaleDateString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}