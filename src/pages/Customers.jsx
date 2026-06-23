import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { customerService } from "../service/customers";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    role: "member",
    tier: "bronze",
    points: 0,
  });

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (err) {
      console.error("Gagal mengambil customer:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const resetForm = () => {
    setFormData({ full_name: "", role: "member", tier: "bronze", points: 0 });
    setEditingCustomer(null);
  };

  const openEditModal = (cust) => {
    setEditingCustomer(cust);
    setFormData({
      full_name: cust.full_name || "",
      role: cust.role,
      tier: cust.tier,
      points: cust.points,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "points" ? parseInt(value) || 0 : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      await customerService.update(editingCustomer.id, formData);
      setIsModalOpen(false);
      resetForm();
      fetchCustomers();
    } catch (err) {
      alert("Gagal update customer: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus customer ini?")) return;
    try {
      await customerService.delete(id);
      fetchCustomers();
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  };

  return (
    <div className="p-4 animate-fade-in">
      <PageHeader title="Customer List" breadcrumb={["Customers", "Members"]} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada customer.</div>
        ) : (
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
              <tr>
                <th className="p-4">Nama</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Role</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Poin</th>
                <th className="p-4">Tanggal Daftar</th>
                <th className="p-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust) => (
                <tr key={cust.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{cust.full_name || "-"}</td>
                  <td className="p-4 text-xs text-gray-400">{cust.id.slice(0, 12)}...</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cust.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                    }`}>{cust.role}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cust.tier === "platinum" ? "bg-gray-300 text-gray-800" :
                      cust.tier === "gold" ? "bg-yellow-100 text-yellow-700" :
                      cust.tier === "silver" ? "bg-gray-200 text-gray-700" :
                      "bg-orange-100 text-orange-800"
                    }`}>{cust.tier}</span>
                  </td>
                  <td className="p-4 font-bold">{cust.points}</td>
                  <td className="p-4 text-gray-500">{new Date(cust.created_at).toLocaleDateString("id-ID")}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(cust)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cust.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit Customer */}
      {isModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="full_name"
                placeholder="Nama Lengkap"
                value={formData.full_name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
              />
              <div>
                <label className="text-xs font-semibold text-gray-600">Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full border p-2 rounded-md">
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Tier</label>
                <select name="tier" value={formData.tier} onChange={handleInputChange} className="w-full border p-2 rounded-md">
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>
              <input
                type="number"
                name="points"
                placeholder="Poin"
                value={formData.points}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
              />
              <div className="flex space-x-2 mt-4">
                <button type="submit" className="flex-1 bg-hijau text-white py-2 rounded-md font-bold">
                  Simpan Perubahan
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