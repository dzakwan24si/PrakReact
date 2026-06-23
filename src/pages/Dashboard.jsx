import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import { productService } from "../service/products";
import { orderService } from "../service/orders";

export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalCanceled: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([{ product_id: "", quantity: 1 }]);

  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await orderService.getAll();
        setRecentOrders(orders.slice(0, 5));

        let delivered = 0, canceled = 0, revenue = 0;
        orders.forEach((o) => {
          if (o.status === "completed") delivered++;
          else if (o.status === "cancelled") canceled++;
          revenue += parseFloat(o.final_amount);
        });
        setStats({
          totalOrders: orders.length,
          totalDelivered: delivered,
          totalCanceled: canceled,
          totalRevenue: revenue,
        });

        if (!isAdmin) {
          const prods = await productService.getAll();
          setProducts(prods);
        }
      } catch (err) {
        console.error("Gagal fetch dashboard:", err);
      }
    };
    fetchData();
  }, []);

  // --- Member: Create Order ---
  const handleCartChange = (index, field, value) => {
    const updated = [...cartItems];
    updated[index][field] = field === "quantity" ? parseInt(value) || 1 : value;
    setCartItems(updated);
  };

  const handleAddCartRow = () => setCartItems([...cartItems, { product_id: "", quantity: 1 }]);
  const handleRemoveCartRow = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated.length ? updated : [{ product_id: "", quantity: 1 }]);
  };

  const calculatePreview = () => {
    let totalAmount = 0;
    for (const item of cartItems) {
      if (!item.product_id) continue;
      const product = products.find((p) => p.id === item.product_id);
      if (product) totalAmount += product.price * item.quantity;
    }
    const { discountApplied, finalAmount, discountPercent } = orderService.calculateDiscount(
      profile?.tier || "bronze", totalAmount
    );
    return { totalAmount, discountApplied, finalAmount, discountPercent };
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const validItems = cartItems.filter((item) => item.product_id);
    if (!validItems.length) { alert("Pilih minimal 1 produk."); return; }
    try {
      const result = await orderService.create(validItems);
      setIsModalOpen(false);
      setCartItems([{ product_id: "", quantity: 1 }]);
      refreshProfile();
      // Refresh dashboard data
      const orders = await orderService.getAll();
      setRecentOrders(orders.slice(0, 5));
      let delivered = 0, canceled = 0, revenue = 0;
      orders.forEach((o) => {
        if (o.status === "completed") delivered++;
        else if (o.status === "cancelled") canceled++;
        revenue += parseFloat(o.final_amount);
      });
      setStats({ totalOrders: orders.length, totalDelivered: delivered, totalCanceled: canceled, totalRevenue: revenue });
      alert(`Pesanan berhasil dibuat! Poin +${result.points_earned}`);
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };

  const preview = calculatePreview();

  return (
    <div className="p-4">
      <PageHeader
        title={isAdmin ? "Dashboard Admin" : "Dashboard Member"}
        breadcrumb={[isAdmin ? "Admin" : "Member", isAdmin ? "Overview" : profile?.tier || "Bronze"]}
      >
        {!isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
          >
            <FaPlus className="mr-2" /> Add New Order
          </button>
        )}
      </PageHeader>

      {/* Member Info Card */}
      {!isAdmin && profile && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{profile.full_name || user?.email}</h2>
              <p className="text-green-100">Welcome to Sedap Restaurant Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Tier</p>
              <p className="text-2xl font-bold uppercase">{profile.tier}</p>
              <p className="text-sm opacity-80">{profile.points} Poin</p>
            </div>
          </div>
        </div>
      )}

      {/* Bagian Atas: 4 Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
          <div className="bg-hijau rounded-full p-4 text-2xl text-white shadow-sm">
            <FaShoppingCart />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-teks">{stats.totalOrders}</span>
            <span className="text-teks-samping font-medium">Total Orders</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
          <div className="bg-biru rounded-full p-4 text-2xl text-white shadow-sm">
            <FaTruck />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-teks">{stats.totalDelivered}</span>
            <span className="text-teks-samping font-medium">Total Delivered</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
          <div className="bg-merah rounded-full p-4 text-2xl text-white shadow-sm">
            <FaBan />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-teks">{stats.totalCanceled}</span>
            <span className="text-teks-samping font-medium">Total Canceled</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
          <div className="bg-kuning rounded-full p-4 text-2xl text-white shadow-sm">
            <FaDollarSign />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-teks">Rp {(stats.totalRevenue / 1000000).toFixed(1)}<span className="text-sm">Jt</span></span>
            <span className="text-teks-samping font-medium">Total Revenue</span>
          </div>
        </div>
      </div>

      {/* Bagian Bawah: Recent Orders */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-teks mb-4">Recent Orders</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-garis overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-garis text-teks-samping text-sm">
                  <th className="p-4 font-semibold uppercase tracking-wider">Order ID</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Items</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Total</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Diskon</th>
                  <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="text-teks text-sm">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-gray-500">Belum ada pesanan.</td></tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-garis hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-biru">{order.id.slice(0, 8)}...</td>
                      <td className="p-4 text-teks-samping">
                        {order.order_items?.length || 0} items
                      </td>
                      <td className="p-4 font-semibold">Rp {parseFloat(order.total_amount).toLocaleString("id-ID")}</td>
                      <td className="p-4 text-red-500">-Rp {parseFloat(order.discount_applied).toLocaleString("id-ID")}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === "completed" ? "bg-green-100 text-green-700" :
                          order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>{order.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Create Order (Member) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
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
                      type="number" min="1" value={item.quantity}
                      onChange={(e) => handleCartChange(idx, "quantity", e.target.value)}
                      className="w-full border p-2 rounded-md text-sm" required
                    />
                  </div>
                  <button type="button" onClick={() => handleRemoveCartRow(idx)} className="text-red-500 text-lg p-2">✕</button>
                </div>
              ))}
              <button type="button" onClick={handleAddCartRow} className="text-blue-500 text-sm font-semibold hover:underline">
                + Tambah Produk
              </button>

              <div className="bg-gray-50 p-3 rounded-lg mt-2 space-y-1 text-sm">
                <p className="flex justify-between"><span>Total Sebelum Diskon:</span><span className="font-bold">Rp {preview.totalAmount.toLocaleString("id-ID")}</span></p>
                <p className="flex justify-between text-red-500"><span>Diskon ({preview.discountPercent}%):</span><span>-Rp {preview.discountApplied.toLocaleString("id-ID")}</span></p>
                <p className="flex justify-between text-lg border-t pt-1"><span className="font-bold">Total Akhir:</span><span className="font-bold text-hijau">Rp {preview.finalAmount.toLocaleString("id-ID")}</span></p>
              </div>

              <div className="flex space-x-2 mt-4">
                <button type="submit" className="flex-1 bg-hijau text-white py-2 rounded-md font-bold">Checkout</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-bold">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}