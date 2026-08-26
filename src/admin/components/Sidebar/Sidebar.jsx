import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  MessageSquare,
  LogOut,
  X,
  ExternalLink,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import { adminLogout } from "../../services/adminApi";

import "./Sidebar.css";


function Sidebar({ isOpen, onClose }) {

  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] =
    useState(false);


  const navigation = [

    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      label: "Books",
      path: "/admin/books",
      icon: BookOpen,
    },

    {
      label: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },

    {
      label: "Messages",
      path: "/admin/messages",
      icon: MessageSquare,
    },

  ];


  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {

    console.log(
      "🔥 SIDEBAR LOGOUT CLICKED"
    );


    if (loggingOut) {
      return;
    }


    try {

      setLoggingOut(true);


      console.log(
        "Calling Django logout..."
      );


      await adminLogout();


      console.log(
        "Django logout successful."
      );


      // Clear any frontend data
      localStorage.clear();
      sessionStorage.clear();


      // Close mobile sidebar
      if (onClose) {
        onClose();
      }


      // Redirect to login
      navigate(
        "/admin",
        {
          replace: true,
        }
      );


    } catch (error) {

      console.error(
        "SIDEBAR LOGOUT ERROR:",
        error
      );


      // Even if the backend logout request
      // fails, clear the frontend session
      // and return to login.

      localStorage.clear();
      sessionStorage.clear();


      if (onClose) {
        onClose();
      }


      navigate(
        "/admin",
        {
          replace: true,
        }
      );


    } finally {

      setLoggingOut(false);

    }

  };


  return (

    <aside
      className={`admin-sidebar ${
        isOpen
          ? "admin-sidebar--open"
          : ""
      }`}
    >


      {/* ======================================================
          BRAND
      ====================================================== */}

      <div className="admin-sidebar__brand">

        <div className="admin-sidebar__logo">
          LG
        </div>


        <div>

          <strong>
            LEAFYGREENDZ
          </strong>

          <span>
            ADMIN
          </span>

        </div>


        {/* MOBILE CLOSE BUTTON */}

        <button
          type="button"
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Close admin menu"
        >

          <X
            size={20}
            strokeWidth={1.8}
          />

        </button>

      </div>


      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav className="admin-sidebar__nav">

        <p className="admin-sidebar__label">
          MANAGEMENT
        </p>


        {navigation.map((item) => {

          const Icon = item.icon;


          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-sidebar__link ${
                  isActive
                    ? "admin-sidebar__link--active"
                    : ""
                }`
              }
              onClick={onClose}
            >

              <Icon
                size={18}
                strokeWidth={1.8}
              />

              <span>
                {item.label}
              </span>

            </NavLink>

          );

        })}

      </nav>


      {/* ======================================================
          BOTTOM
      ====================================================== */}

      <div className="admin-sidebar__bottom">


        {/* VIEW WEBSITE */}

        <NavLink
          to="/"
          className="admin-sidebar__website"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >

          <ExternalLink
            size={18}
            strokeWidth={1.8}
          />

          <span>
            View Website
          </span>

        </NavLink>


        {/* LOGOUT */}

        <button
          type="button"
          className="admin-sidebar__logout"
          onClick={handleLogout}
          disabled={loggingOut}
        >

          <LogOut
            size={18}
            strokeWidth={1.8}
          />

          <span>

            {loggingOut
              ? "Logging out..."
              : "Logout"}

          </span>

        </button>


      </div>

    </aside>

  );

}


export default Sidebar;