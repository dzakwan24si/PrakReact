import { useState } from "react";
import PageHeader from "../components/PageHeader";

// Data AI Generate (30 Orders)
const ordersData = Array.from({ length: 30 }, (_, i) => ({
    id: `ORD-${String(i + 1).padStart(3, '0')}`,
    customerName: ["Budi Santoso", "Salsabilla Dheawan", "Farel Aditya", "Dewi Lestari", "Faqih Hidayah", "Dzakwan Syafiq"][i % 6],
    status: ["Pending", "Completed", "Cancelled"][i % 3],
    totalPrice: (Math.floor(Math.random() * 10) + 1) * 15000,
    orderDate: `2024-05-${String((i % 30) + 1).padStart(2, '0')}`
}));

export default function Orders() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 animate-fade-in">
            {/* Memanggil Komponen PageHeader dengan Props */}
            <PageHeader title="Order List" breadcrumb={["Orders", "List"]}>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
                >
                    + Add Order
                </button>
            </PageHeader>

            {/* Tabel Data Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total Price</th>
                            <th className="p-4">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="p-4 font-bold text-blue-600">{order.id}</td>
                                <td className="p-4">{order.customerName}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                    }`}>{order.status}</span>
                                </td>
                                <td className="p-4">Rp {order.totalPrice.toLocaleString("id-ID")}</td>
                                <td className="p-4">{order.orderDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form Add Order */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Add New Order</h2>
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <input type="text" placeholder="Customer Name" className="w-full border p-2 rounded-md" required />
                            <select className="w-full border p-2 rounded-md">
                                <option>Pending</option><option>Completed</option><option>Cancelled</option>
                            </select>
                            <input type="number" placeholder="Total Price" className="w-full border p-2 rounded-md" required />
                            <input type="date" className="w-full border p-2 rounded-md" required />
                            <div className="flex space-x-2 mt-4">
                                <button type="submit" className="flex-1 bg-hijau text-white py-2 rounded-md font-bold">Save</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md font-bold">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}