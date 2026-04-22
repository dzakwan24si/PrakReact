import { Link } from "react-router-dom";
import errorImage from "../assets/error-plug.png"; 

export default function ErrorPage({ kodeError, deskripsiError }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
        
        {/* Kolom Kiri - Konten Teks */}
        <div className="text-left">
          <div className="mb-16">
            <span className="text-blue-700 font-semibold text-lg tracking-tight">
              Sedap.
            </span>
          </div>

          <h1 className="text-[150px] font-bold text-blue-700 leading-none mb-4">
            {kodeError}
          </h1>

          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h2>

          <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-10">
            {deskripsiError}
          </p>

          <Link 
            to="/" 
            className="inline-block w-64 py-4 bg-blue-700 text-white font-medium text-center rounded-full shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all duration-300"
          >
            Go back Home
          </Link>
        </div>

        {/* Kolom Kanan - Gambar PNG Anda */}
        <div className="flex items-center justify-center relative">
          <img 
            src={errorImage} 
            alt={`Error ${kodeError}`}
            className="relative z-10 w-full max-w-md drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
}