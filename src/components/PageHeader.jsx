import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function PageHeader({ title, breadcrumb, children }) {
    // Mengecek apakah breadcrumb berbentuk array (banyak teks) atau string biasa
    const breadcrumbArray = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];

    return (
        <div className="flex items-center justify-between p-4 mb-4 bg-white rounded-xl shadow-sm border border-gray-100 relative z-40">
            <div className="flex flex-col">
                <span className="text-3xl font-semibold text-gray-800">
                    {title}
                </span>
                <div className="flex items-center font-medium space-x-2 mt-1 text-sm text-gray-500">
                    <span>Dashboard</span>
                    {breadcrumbArray.map((item, index) => (
                        <span key={index} className="flex items-center space-x-2">
                            <span>/</span>
                            {/* Memberi warna hijau hanya pada breadcrumb terakhir */}
                            <span className={index === breadcrumbArray.length - 1 ? "text-green-500" : ""}>
                                {item}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
            <div>
                {/* Prop children akan me-render tombol Add / Form yang dikirim dari halaman masing-masing */}
                {children}
            </div>
        </div>
    );
}