import { useState } from "react";
import PageHeader from "../components/PageHeader";

// Data AI Generate (30 Customers)
const customersData = Array.from({ length: 30 }, (_, i) => ({
    id: `CUST-${String(i + 1).padStart(3, '0')}`,
    name: ["Budi Santoso", "Salsabilla Dheawan", "Farel Aditya", "Dewi Lestari", "Faqih Hidayah", "Dzakwan Syafiq"][i % 6],
    email: `user${i + 1}@email.com`,
    phone: `081234567${String(i).padStart(3, '0')}`,
    loyalty: ["Bronze", "Silver", "Gold"][i % 3]
}));

export default function Customers() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4 animate-fade-in">
            <PageHeader title="Customer List" breadcrumb={["Customers", "Members"]}>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5"
                >
                    + Add Customer
                </button>
            </PageHeader>

            {/* Tabel Data Customers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="min-w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 border-b border-gray-100 uppercase font-semibold">
                        <tr>
                            <th className="p-4">Customer ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersData.map((cust, index) => (
                            <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="p-4 font-bold text-blue-600">{cust.id}</td>
                                <td className="p-4 font-semibold text-gray-800">{cust.name}</td>
                                <td className="p-4">{cust.email}</td>
                                <td className="p-4">{cust.phone}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        cust.loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 
                                        cust.loyalty === 'Silver' ? 'bg-gray-200 text-gray-700' : 'bg-orange-100 text-orange-800'
                                    }`}>{cust.loyalty}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form Add Customer */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <input type="text" placeholder="Full Name" className="w-full border p-2 rounded-md" required />
                            <input type="email" placeholder="Email Address" className="w-full border p-2 rounded-md" required />
                            <input type="tel" placeholder="Phone Number" className="w-full border p-2 rounded-md" required />
                            <select className="w-full border p-2 rounded-md">
                                <option>Bronze</option><option>Silver</option><option>Gold</option>
                            </select>
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