import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./assets/tailwind.css";
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-gray-100 min-h-screen flex">
      <div className="flex flex-row flex-1">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-4">
                  <Dashboard />
              </main>
          </div>
      </div>
    </div>
  </StrictMode>
);