import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaPlus } from "react-icons/fa";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="p-4">
            <PageHeader 
                title="Dashboard" 
                breadcrumb={["Home Detail", "Home Very Detail"]}
            >
                {/* Tombol ini akan otomatis mengisi props 'children' dan berada di kanan */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
                >
                    <FaPlus className="mr-2" /> Add New Menu
                </button>
            </PageHeader>
            
            {/* Bagian Atas: 4 Kartu Statistik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
                    <div className="bg-hijau rounded-full p-4 text-2xl text-white shadow-sm">
                        <FaShoppingCart />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-teks">75</span>
                        <span className="text-teks-samping font-medium">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
                    <div className="bg-biru rounded-full p-4 text-2xl text-white shadow-sm">
                        <FaTruck />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-teks">175</span>
                        <span className="text-teks-samping font-medium">Total Delivered</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
                    <div className="bg-merah rounded-full p-4 text-2xl text-white shadow-sm">
                        <FaBan />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-teks">40</span>
                        <span className="text-teks-samping font-medium">Total Canceled</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4 bg-white rounded-2xl shadow-sm border border-garis p-5">
                    <div className="bg-kuning rounded-full p-4 text-2xl text-white shadow-sm">
                        <FaDollarSign />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-teks">Rp.128<span className="text-sm">Jt</span></span>
                        <span className="text-teks-samping font-medium">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* Bagian Bawah: Improvisasi Tabel Recent Orders */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-teks mb-4">Recent Orders</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-garis overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-garis text-teks-samping text-sm">
                                    <th className="p-4 font-semibold uppercase tracking-wider">Order ID</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Customer</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Menu Item</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Total</th>
                                    <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-teks text-sm">
                                <tr className="border-b border-garis hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-biru">#ORD-001</td>
                                    <td className="p-4 font-bold">Faqih Hidayah</td>
                                    <td className="p-4 text-teks-samping">Ayam Bakar Madu</td>
                                    <td className="p-4 font-semibold">Rp 45.000</td>
                                    <td className="p-4">
                                        <span className="bg-kuning/20 text-kuning px-3 py-1 rounded-full text-xs font-bold border border-kuning/30">Pending</span>
                                    </td>
                                </tr>
                                <tr className="border-b border-garis hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-biru">#ORD-002</td>
                                    <td className="p-4 font-bold">Salsabilla Dheawan</td>
                                    <td className="p-4 text-teks-samping">Nasi Goreng Spesial</td>
                                    <td className="p-4 font-semibold">Rp 30.000</td>
                                    <td className="p-4">
                                        <span className="bg-hijau/20 text-hijau px-3 py-1 rounded-full text-xs font-bold border border-hijau/30">Delivered</span>
                                    </td>
                                </tr>
                                <tr className="border-b border-garis hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-biru">#ORD-003</td>
                                    <td className="p-4 font-bold">Farel Aditya</td>
                                    <td className="p-4 text-teks-samping">Sate Ayam Madura</td>
                                    <td className="p-4 font-semibold">Rp 50.000</td>
                                    <td className="p-4">
                                        <span className="bg-merah/20 text-merah px-3 py-1 rounded-full text-xs font-bold border border-merah/30">Canceled</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tambah Menu Baru</h2>
                        <p className="text-gray-500 text-sm mb-6">Silakan masukkan detail menu makanan ke dalam sistem.</p>
                        
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Menu</label>
                                <input type="text" className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-hijau/50 bg-gray-50" placeholder="Contoh: Rendang Sapi" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Harga</label>
                                <input type="number" className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-hijau/50 bg-gray-50" placeholder="Contoh: 35000" required />
                            </div>
                            
                            <div className="flex space-x-3 mt-6">
                                <button type="submit" className="flex-1 bg-hijau text-white font-bold py-3 rounded-lg hover:bg-[#009e68] transition shadow-md">
                                    Simpan
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition">
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