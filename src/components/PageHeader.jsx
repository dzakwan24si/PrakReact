import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function PageHeader(props) {
    // STATE: Untuk memunculkan pop-up modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex items-center justify-between p-4 mb-4 relative z-40">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold text-teks">
                    {props.title}
                </span>
                <div className="flex items-center font-medium space-x-2 mt-1 text-sm text-teks-samping">
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-hijau">Order List</span>
                </div>
            </div>
            <div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#009e68] transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    Add Menu
                </button>
            </div>

            {/* Efek Modal Pop-up (Improvisasi) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative transform transition-all scale-100">
                        {/* Tombol Close */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-merah transition"
                        >
                            <FaTimes size={20} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-teks mb-2">Tambah Menu Baru</h2>
                        <p className="text-teks-samping text-sm mb-6">Silakan masukkan detail menu makanan ke dalam sistem.</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-teks mb-1">Nama Menu</label>
                                <input type="text" className="w-full border border-garis rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-hijau/50 bg-gray-50" placeholder="Contoh: Rendang Sapi" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-teks mb-1">Harga</label>
                                <input type="number" className="w-full border border-garis rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-hijau/50 bg-gray-50" placeholder="Contoh: 35000" />
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="w-full bg-hijau text-white font-bold py-3 rounded-lg hover:bg-[#009e68] transition mt-2 shadow-lg"
                            >
                                Simpan Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}