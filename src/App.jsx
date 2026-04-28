import React, { Suspense, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/tailwind.css";
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Header = React.lazy(() => import("./components/Header"))
const Customers = React.lazy(() => import("./pages/Customers"))
const Orders = React.lazy(() => import("./pages/Orders"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
const Sidebar = React.lazy(() => import("./components/Sidebar"))
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<MainLayout/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/400" element={<ErrorPage kodeError="400" deskripsiError="Bad Request - Permintaan Tidak Valid"  />} />
            <Route path="/401" element={<ErrorPage kodeError="401" deskripsiError="Unauthorized - Anda Belum Login"  />} />
            <Route path="/403" element={<ErrorPage kodeError="403" deskripsiError="Forbidden - Akses Ditolak"/>} />
            <Route path="*" element={<ErrorPage kodeError="404" deskripsiError="Page Not Found - Halaman Tidak Ditemukan"/>} />
            </Route>
            <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
            </Route>
          </Routes>
          </Suspense>
  );
}
export default App;
