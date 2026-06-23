import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { productService } from "../service/products";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { profile } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Gagal mengambil produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", stock: "" });
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
      } else {
        await productService.create(payload);
      }

      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      await productService.delete(id);
      fetchProducts();
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  const isAdmin = profile?.role === "admin";

  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Daftar Produk" breadcrumb={["Produk", "List"]}>
        {isAdmin && (
          <button
            onClick={openAddModal}
            className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition"
          >
            + Tambah Produk
          </button>
        )}
      </PageHeader>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada produk.</div>
        ) : (
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
              <tr>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Deskripsi</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Stok</th>
                {isAdmin && <th className="p-4">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-semibold">
                    <Link to={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800">
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500">{product.description || "-"}</td>
                  <td className="p-4">Rp {parseFloat(product.price).toLocaleString("id-ID")}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.stock > 10 ? "bg-green-100 text-green-700" :
                      product.stock > 0 ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {product.stock > 0 ? product.stock : "Habis"}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form Tambah/Edit Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nama Produk"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Deskripsi (opsional)"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                rows="2"
              />
              <input
                type="number"
                name="price"
                placeholder="Harga (Rp)"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stok"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
              <div className="flex space-x-2 mt-4">
                <button type="submit" className="flex-1 bg-hijau text-white py-2 rounded-md font-bold">
                  {editingProduct ? "Simpan Perubahan" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetForm(); }}
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