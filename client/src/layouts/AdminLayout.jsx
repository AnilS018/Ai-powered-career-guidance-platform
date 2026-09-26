import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import AdminSidebar from '../components/common/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-900/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
