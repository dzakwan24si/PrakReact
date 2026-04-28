import { useState } from "react";
import { FaBell, FaSearch, FaClock } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    // STATE: Untuk mengontrol buka/tutup dropdown pencarian
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex justify-between items-center p-4">
            {/* Search Bar dengan Improvisasi Dropdown */}
            <div className="relative w-full max-w-lg z-50">
                <input
                    className="border border-garis p-2 pr-10 bg-white w-full rounded-md outline-none focus:ring-2 focus:ring-hijau/50 transition-all shadow-sm"
                    type="text"
                    placeholder="Search Here..."
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)} // Delay sedikit agar bisa diklik
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                
                {/* Tampilan Dropdown Melayang (Improvisasi) */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-garis shadow-lg rounded-lg overflow-hidden animate-fade-in">
                        <div className="p-3 text-xs font-bold text-gray-400 uppercase bg-gray-50 tracking-wider">
                            Recent Searches
                        </div>
                        <ul>
                            <li className="flex items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 transition">
                                <FaClock className="mr-3 text-gray-300" /> Ayam Bakar Madu
                            </li>
                            <li className="flex items-center p-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition">
                                <FaClock className="mr-3 text-gray-300" /> Nasi Goreng Spesial
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Icon & Profile Section */}
            <div className="flex items-center space-x-4">
                <div className="relative p-3 bg-blue-100 rounded-2xl text-biru cursor-pointer hover:bg-blue-200 transition">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-biru text-white rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm">50</span>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-xl hover:bg-blue-200 transition">
                    <FcAreaChart />
                </div>
                <div className="p-3 bg-red-100 rounded-2xl text-merah cursor-pointer hover:bg-red-200 transition">
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4 border-l pl-4 border-garis">
                    <span className="text-teks-samping">
                        Hello, <b className="text-teks">M. Dzakwan Syafiq</b>
                    </span>
                    <img
                        src="/img/image.png"
                        className="w-10 h-10 rounded-full object-cover border border-garis shadow-sm"
                        alt="Profile"
                    />
                </div>
            </div>
        </div>
    );
}