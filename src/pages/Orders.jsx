import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { orderService } from "../service/orders";
import { productService } from "../service/products";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { profile, refreshProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      console.error("Gagal mengambil orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Gagal mengambil produk:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    if (profile?.role !== "admin") {
      fetchProducts();
    }
  }, []);

  // --- Member: Create Order ---
  const handleOpenCreateOrder = () => {
    setCartItems([{ product_id: "", quantity: 1 }]);
    setIsModalOpen(true);
  };

  const handleCartChange = (index, field, value) => {
    const updated = [...cartItems];
    updated[index][field] = field === "quantity" ? parseInt(value) || 1 : value;
    setCartItems(updated);
  };

  const handleAddCartRow = () => {
    setCartItems([...cartItems, { product_id: "", quantity: 1 }]);
  };

  const handleRemoveCartRow = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated.length ? updated : [{ product_id: "", quantity: 1 }]);
  };

  // Hitung total & diskon untuk preview
  const calculatePreview = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      if (!item.product_id) continue;
      const product = products.find((p) => p.id === item.product_id);
      if (product) totalAmount += product.price * item.quantity;
    }
    const { discountApplied, finalAmount, discountPercent } = orderService.calculateDiscount(
      profile?.tier || "bronze",
      totalAmount
    );
    return { totalAmount, discountApplied, finalAmount, discountPercent };
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const validItems = cartItems.filter((item) => item.product_id);
    if (!validItems.length) {
      alert("Pilih minimal 1 produk.");
      return;
    }
    try {
      await orderService.create(validItems);
      setIsModalOpen(false);
      setCartItems([{ product_id: "", quantity: 1 }]);
      fetchOrders();
      refreshProfile();
    } catch (err) {
      alert("Gagal membuat order: " + err.message);
    }
  };

  // --- Admin: Update Status ---
  const handleUpdateStatus = async (id, status) => {
    try {
      await orderService.updateStatus(id, status);
      fetchOrders();
    } catch (err) {
      alert("Gagal update status: " + err.message);
    }
  };

  const preview = calculatePreview();
  const isAdmin = profile?.role === "admin";

  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Order List" breadcrumb={["Orders", "List"]}>
        {!isAdmin && (
          <button
            onClick={handleOpenCreateOrder}
            className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
          >
            + Create Order
          </button>
        )}
      </PageHeader>

      {/* Tabel Data Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada order.</div>
        ) : (
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
              <tr>
                <th className="p-4">Order ID</th>
                {isAdmin && <th className="p-4">User</th>}
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Diskon</th>
                <th className="p-4">Final</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tanggal</th>
                {isAdmin && <th className="p-4">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-bold text-blue-600">{order.id.slice(0, 8)}...</td>
                  {isAdmin && <td className="p-4 font-semibold">{order.profiles?.full_name || order.user_id?.slice(0, 8)}...</td>}
                  <td className="p-4">
                    {order.order_items?.map((oi) => (
                      <span key={oi.id} className="block text-xs">
                        {oi.products?.name || "Produk"} x{oi.quantity} @ Rp {parseFloat(oi.price_at_time).toLocaleString("id-ID")}
                      </span>
                    ))}
                  </td>
                  <td className="p-4">Rp {parseFloat(order.total_amount).toLocaleString("id-ID")}</td>
                  <td className="p-4 text-red-500">-Rp {parseFloat(order.discount_applied).toLocaleString("id-ID")}</td>
                  <td className="p-4 font-bold">Rp {parseFloat(order.final_amount).toLocaleString("id-ID")}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "completed" ? "bg-green-100 text-green-700" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                  {isAdmin && (
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Create Order (untuk Member) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-2">Buat Pesanan Baru</h2>
            <p className="text-sm text-gray-500 mb-4">
              Tier Anda: <strong className="text-hijau uppercase">{profile?.tier}</strong> (Diskon {preview.discountPercent}%)
            </p>

            <form onSubmit={handleCreateOrder} className="space-y-3">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-end border-b pb-2">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600">Produk</label>
                    <select
                      value={item.product_id}
                      onChange={(e) => handleCartChange(idx, "product_id", e.target.value)}
                      className="w-full border p-2 rounded-md text-sm"
                      required
                    >
                      <option value="">Pilih Produk</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id} disabled={p.stock <= 0}>
                          {p.name} - Rp {parseFloat(p.price).toLocaleString("id-ID")} (stok: {p.stock})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-20">
                    <label className="text-xs font-semibold text-gray-600">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleCartChange(idx, "quantity", e.target.value)}
                      className="w-full border p-2 rounded-md text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCartRow(idx)}
                    className="text-red-500 text-lg p-2"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button type="button" onClick={handleAddCartRow} className="text-blue-500 text-sm font-semibold hover:underline">
                + Tambah Produk
              </button>

              {/* Ringkasan Harga */}
              <div className="bg-gray-50 p-3 rounded-lg mt-2 space-y-1 text-sm">
                <p className="flex justify-between">
                  <span>Total Sebelum Diskon:</span>
                  <span className="font-bold">Rp {preview.totalAmount.toLocaleString("id-ID")}</span>
                </p>
                <p className="flex justify-between text-red-500">
                  <span>Diskon ({preview.discountPercent}%):</span>
                  <span>-Rp {preview.discountApplied.toLocaleString("id-ID")}</span>
                </p>
                <p className="flex justify-between text-lg border-t pt-1">
                  <span className="font-bold">Total Akhir:</span>
                  <span className="font-bold text-hijau">Rp {preview.finalAmount.toLocaleString("id-ID")}</span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <button type="submit" className="flex-1 bg-hijau text-white py-2 rounded-md font-bold">
                  Checkout
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