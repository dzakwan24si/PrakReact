import { FaPlus } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { RiCustomerServiceFill } from "react-icons/ri";

export default function Sidebar() {
    return (
        <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div className="flex flex-col">
                <span className="font-poppins-extrabold text-[48px] font-bold text-gray-900">
                    Sedap<b className="text-hijau">.</b>
                </span>
                <span className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div className="mt-10">
                <ul className="space-y-3">
                    <li>
                        <div className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <MdSpaceDashboard className="mr-4 text-xl" /> Dashboard
                        </div>
                    </li>
                    <li>
                        <div className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <IoIosList className="mr-4 text-xl" /> Orders
                        </div>
                    </li>
                    <li>
                        <div className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
                            <RiCustomerServiceFill className="mr-4 text-xl" /> Customers
                        </div>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div className="mt-auto">
                <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center justify-between">
                    <div className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2 cursor-pointer">
                            <span className="text-gray-600 flex items-center font-bold">
                                <FaPlus className="mr-2" /> Add Menus
                            </span>
                        </div>
                    </div>
                    <img className="w-20 rounded-full ml-2" src="https://avatar.iran.liara.run/public/28" alt="footer avatar" />
                </div>
                <span className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
                <p className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}