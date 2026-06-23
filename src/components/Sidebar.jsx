import { FaPlus } from "react-icons/fa";
import { MdOutlineFeaturedPlayList, MdSpaceDashboard } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { RiCustomerServiceFill, RiLogoutCircleLine } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { LuComponent } from "react-icons/lu";
import { CiStickyNote } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { authService } from "../service/auth";

export default function Sidebar() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2 ${
      isActive
        ? "text-hijau bg-green-200 font-extrabold"
        : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col">
        <span className="font-poppins-extrabold text-[48px] font-bold text-gray-900">
          Sedap<b className="text-hijau">.</b>
        </span>
        <span className="font-semibold text-gray-400">Modern Admin Dashboard</span>
      </div>

      {/* User Info */}
      {user && profile && (
        <div className="mt-4 bg-green-50 rounded-xl p-4 border border-green-100">
          <p className="text-sm font-bold text-gray-800 truncate">{profile.full_name || user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-hijau text-white px-2 py-0.5 rounded-full font-bold uppercase">
              {profile.role}
            </span>
            {/* Tier & Poin hanya untuk member, bukan admin */}
            {profile.role !== "admin" && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase">
                {profile.tier}
              </span>
            )}
          </div>
          {/* Poin hanya untuk member */}
          {profile.role !== "admin" && (
            <p className="text-xs text-gray-500 mt-1">{profile.points} Poin</p>
          )}
        </div>
      )}

      {/* List Menu */}
      <div className="mt-6">
        <ul className="space-y-3">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdSpaceDashboard className="mr-4 text-xl" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <IoIosList className="mr-4 text-xl" /> Orders
            </NavLink>
          </li>
          {profile?.role === "admin" && (
            <li>
              <NavLink to="/customers" className={menuClass}>
                <RiCustomerServiceFill className="mr-4 text-xl" /> Customers
              </NavLink>
            </li>
          )}
          {profile?.role === "admin" && (
            <li>
              <NavLink to="/products" className={menuClass}>
                <AiOutlineProduct className="mr-4 text-xl" /> Produk
              </NavLink>
            </li>
          )}
          {profile?.role === "admin" && (
            <li>
              <NavLink to="/components" className={menuClass}>
                <LuComponent className="mr-4 text-xl" /> Components
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/fitur-xyz" className={menuClass}>
              <MdOutlineFeaturedPlayList className="mr-4 text-xl" /> Fitur XYZ
            </NavLink>
          </li>
          <li>
            <NavLink to="/notes" className={menuClass}>
              <CiStickyNote className="mr-4 text-xl" /> Notes
            </NavLink>
          </li>

          {/* Auth Menu */}
          {!user && (
            <>
              <div className="my-4 border-t border-gray-200"></div>
              <li>
                <NavLink to="/login" className={menuClass}>
                  <RiCustomerServiceFill className="mr-4 text-xl" /> Login
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <div className="my-4 border-t border-gray-200"></div>
              <li>
                <button onClick={handleLogout} className="flex w-full cursor-pointer items-center rounded-xl p-4 space-x-2 text-red-500 hover:bg-red-50 hover:font-extrabold">
                  <RiLogoutCircleLine className="mr-4 text-xl" /> Logout
                </button>
              </li>
            </>
          )}

          <div className="my-4 border-t border-gray-200"></div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
            Test Error Pages
          </span>
          <li>
            <NavLink to="/400" className={menuClass}>
              <span className="font-bold text-red-500">⚠</span> Error 400
            </NavLink>
          </li>
          <li>
            <NavLink to="/401" className={menuClass}>
              <span className="font-bold text-red-500">⚠</span> Error 401
            </NavLink>
          </li>
          <li>
            <NavLink to="/403" className={menuClass}>
              <span className="font-bold text-red-500">⚠</span> Error 403
            </NavLink>
          </li>
          <li>
            <NavLink to="*" className={menuClass}>
              <span className="font-bold text-red-500">⚠</span> Error 404
            </NavLink>
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
          <img className="w-20 rounded-full ml-2" src="/img/image.png" alt="footer avatar" />
        </div>
        <span className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
        <p className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
      </div>
    </div>
  );
}