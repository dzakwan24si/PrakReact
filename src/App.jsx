import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/tailwind.css";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Sidebar from "./layouts/Sidebar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
                    
                    {/* Halaman Error Custom Latihan */}
                    <Route path="/400" element={<ErrorPage kodeError="400" deskripsiError="Bad Request - Permintaan Tidak Valid" gambarError="https://illustrations.popsy.co/amber/surreal-hourglass.svg" />} />
                    <Route path="/401" element={<ErrorPage kodeError="401" deskripsiError="Unauthorized - Anda Belum Login" gambarError="https://illustrations.popsy.co/amber/security-check.svg" />} />
                    <Route path="/403" element={<ErrorPage kodeError="403" deskripsiError="Forbidden - Akses Ditolak" gambarError="https://illustrations.popsy.co/amber/shredder.svg" />} />
                    
                    {/* Route "*" artinya jika user mengetik URL ngawur (404 Not Found) */}
                    <Route path="*" element={<ErrorPage kodeError="404" deskripsiError="Page Not Found - Halaman Tidak Ditemukan" gambarError="https://illustrations.popsy.co/amber/falling.svg" />} />
                </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
