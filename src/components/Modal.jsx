// src/components/Modal.jsx
import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, title, description, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
            {/* Efek Glassmorphism: bg-white/80 dan backdrop-blur-xl */}
            <div className="bg-white/80 backdrop-blur-xl w-full max-w-md p-6 rounded-2xl shadow-2xl relative border border-white/20 transform transition-all scale-100">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-merah transition"
                >
                    <FaTimes size={20} />
                </button>
                
                <h2 className="text-2xl font-bold text-teks mb-1">{title}</h2>
                <p className="text-teks-samping text-sm mb-6">{description}</p>
                
                {/* Isi Form yang dinamis sesuai halaman */}
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}