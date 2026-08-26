import {
  Bell,
  ExternalLink,
  Menu,
} from "lucide-react";

import { Link } from "react-router-dom";

import "./Header.css";


function Header({ onMenuClick }) {

  return (

    <header className="admin-header">


      {/* ======================================================
          LEFT
      ====================================================== */}

      <div className="admin-header__left">

        <button
          type="button"
          className="admin-header__menu"
          onClick={onMenuClick}
          aria-label="Open admin menu"
        >

          <Menu
            size={21}
            strokeWidth={1.8}
          />

        </button>


        <div>

          <p>
            ADMINISTRATION
          </p>

          <h1>
            LEAFYGREENDZ
          </h1>

        </div>

      </div>


      {/* ======================================================
          RIGHT
      ====================================================== */}

      <div className="admin-header__right">

        {/* NOTIFICATIONS */}

        <button
          type="button"
          className="admin-header__notification"
          aria-label="Notifications"
        >

          <Bell
            size={18}
            strokeWidth={1.8}
          />

          <span />

        </button>


        {/* VIEW WEBSITE */}

        <Link
          to="/"
          className="admin-header__website"
          target="_blank"
          rel="noreferrer"
        >

          <span>
            View Website
          </span>

          <ExternalLink
            size={15}
            strokeWidth={1.8}
          />

        </Link>

      </div>

    </header>

  );

}


export default Header;