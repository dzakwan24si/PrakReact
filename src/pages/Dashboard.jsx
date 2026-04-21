import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div className="p-4">
            <PageHeader title = "Dashboard"/>
            
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
        </div>
    );
}