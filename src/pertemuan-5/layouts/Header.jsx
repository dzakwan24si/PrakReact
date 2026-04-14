import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div className="flex justify-between items-center p-4">
            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
                <input
                    className="border border-gray-100 p-2 pr-10 bg-gray-50 w-full rounded-md outline-none focus:ring-2 focus:ring-hijau/20"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Icon & Profile Section */}
            <div className="flex items-center space-x-4">
                <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">50</span>
                </div>
                <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer text-xl">
                    <FcAreaChart />
                </div>
                <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span className="text-gray-700">
                        Hello, <b className="text-gray-900">M. Dzakwan Syafiq</b>
                    </span>
                    <img src="https://avatar.iran.liara.run/public/28" className="w-10 h-10 rounded-full" alt="Profile" />
                </div>
            </div>
        </div>
    );
}