import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

import "./AdminLayout.css";


function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <div
      className={`admin-layout ${
        sidebarOpen
          ? "admin-layout--sidebar-open"
          : ""
      }`}
    >

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />


      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close admin menu"
        />

      )}


      {/* MAIN */}

      <main className="admin-main">

        <Header
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />


        <div className="admin-content">

          <Outlet />

        </div>

      </main>

    </div>
  );
}


export default AdminLayout;