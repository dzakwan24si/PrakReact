import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productsData from "../data/products.json";

export default function Products() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [newProduct, setNewProduct] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = products.length + 1;
    const newCode = `PRD-${String(newId).padStart(3, "0")}`;
    const productToAdd = {
      id: newId,
      code: newCode,
      title: newProduct.title,
      brand: newProduct.brand,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      stock: parseInt(newProduct.stock),
    };
    setProducts([...products, productToAdd]);
    setIsModalOpen(false);
    setNewProduct({ title: "", brand: "", category: "", price: "", stock: "" });
  };

  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Daftar Produk" breadcrumb={["Produk", "List"]}>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
        >
          + Tambah Produk
        </button>
      </PageHeader>

      {/* Tabel Data Produk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
            <tr>
              <th className="p-4">Kode Produk</th>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="p-4 font-bold text-blue-600">{product.code}</td>
                <td className="p-4 font-semibold">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="p-4">{product.brand}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="p-4">
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
                </td>
              </tr>
            ))}
          </tbody>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-50 hover:bg-gray-50"
              >
                <td className="p-4 font-bold text-blue-600">{product.code}</td>
                <td className="p-4 font-semibold text-gray-800">
                  {product.title}
                </td>
                <td className="p-4">{product.brand}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">
                  Rp {product.price.toLocaleString("id-ID")}
                </td>
                <td className="p-4">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form Tambah Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Tambah Produk Baru</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                name="title"
                placeholder="Nama Produk"
                value={newProduct.title}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={newProduct.brand}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              >
                <option value="">Pilih Kategori</option>
                <option>Elektronik</option>
                <option>Komputer</option>
                <option>Aksesoris</option>
                <option>Audio</option>
                <option>Rumah Tangga</option>
                <option>Wearable</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Harga (Rp)"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stok"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <div className="flex space-x-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-hijau text-white py-2 rounded-md font-bold"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-bold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
