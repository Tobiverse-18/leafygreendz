import { useEffect, useState } from "react";

import {
  BookOpen,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { getAdminDashboard } from "../services/adminApi";

import "./AdminDashboard.css";


function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    async function loadDashboard() {

      try {

        const data = await getAdminDashboard();

        setDashboard(data);

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load dashboard data."
        );

      } finally {

        setLoading(false);

      }

    }


    loadDashboard();

  }, []);


  if (loading) {

    return (
      <div className="admin-dashboard">

        <div className="admin-dashboard__loading">

          Loading dashboard...

        </div>

      </div>
    );

  }


  if (error) {

    return (
      <div className="admin-dashboard">

        <div className="admin-dashboard__error">

          {error}

        </div>

      </div>
    );

  }


  const stats = dashboard?.stats || {};


  return (
    <div className="admin-dashboard">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <section className="admin-dashboard__intro">

        <div>

          <p className="admin-dashboard__eyebrow">
            OVERVIEW
          </p>

          <h2>
            Dashboard
          </h2>

          <p className="admin-dashboard__description">
            Here's what's happening with
            LEAFYGREENDZ today.
          </p>

        </div>


        <div className="admin-dashboard__date">

          <span>
            TODAY
          </span>

          <strong>
            {new Date().toLocaleDateString(
              "en-NG",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              }
            )}
          </strong>

        </div>

      </section>


      {/* ========================================
          STAT CARDS
      ======================================== */}

      <section className="admin-dashboard__stats">


        {/* REVENUE */}

        <div className="dashboard-stat">

          <div className="dashboard-stat__top">

            <span>
              REVENUE
            </span>

            <TrendingUp
              size={17}
              strokeWidth={1.7}
            />

          </div>

          <strong>
            ₦{Number(
              stats.revenue || 0
            ).toLocaleString(
              "en-NG",
              {
                minimumFractionDigits: 2,
              }
            )}
          </strong>

          <small>
            From paid orders
          </small>

        </div>


        {/* PAID ORDERS */}

        <div className="dashboard-stat">

          <div className="dashboard-stat__top">

            <span>
              PAID ORDERS
            </span>

            <ShoppingBag
              size={17}
              strokeWidth={1.7}
            />

          </div>

          <strong>
            {stats.paid_orders || 0}
          </strong>

          <small>
            Successfully completed
          </small>

        </div>


        {/* BOOKS */}

        <div className="dashboard-stat">

          <div className="dashboard-stat__top">

            <span>
              BOOKS
            </span>

            <BookOpen
              size={17}
              strokeWidth={1.7}
            />

          </div>

          <strong>
            {stats.published_books || 0}
          </strong>

          <small>
            Published books
          </small>

        </div>


        {/* MESSAGES */}

        <div className="dashboard-stat">

          <div className="dashboard-stat__top">

            <span>
              MESSAGES
            </span>

            <MessageSquare
              size={17}
              strokeWidth={1.7}
            />

          </div>

          <strong>
            {stats.new_messages || 0}
          </strong>

          <small>
            New messages
          </small>

        </div>


      </section>


      {/* ========================================
          MAIN GRID
      ======================================== */}

      <section className="admin-dashboard__grid">


        {/* RECENT ORDERS */}

        <div className="dashboard-panel">

          <div className="dashboard-panel__header">

            <div>

              <p>
                SALES
              </p>

              <h3>
                Recent Orders
              </h3>

            </div>


            <Link to="/admin/orders">

              View all

              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
              />

            </Link>

          </div>


          <div className="dashboard-panel__empty">

            <ShoppingBag
              size={30}
              strokeWidth={1.4}
            />

            <strong>
              No orders yet
            </strong>

            <span>
              Orders will appear here after customers
              complete their purchases.
            </span>

          </div>

        </div>


        {/* RECENT MESSAGES */}

        <div className="dashboard-panel">

          <div className="dashboard-panel__header">

            <div>

              <p>
                COMMUNICATION
              </p>

              <h3>
                Recent Messages
              </h3>

            </div>


            <Link to="/admin/messages">

              View all

              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
              />

            </Link>

          </div>


          <div className="dashboard-panel__empty">

            <MessageSquare
              size={30}
              strokeWidth={1.4}
            />

            <strong>
              No messages yet
            </strong>

            <span>
              Contact messages from your website
              will appear here.
            </span>

          </div>

        </div>


      </section>

    </div>
  );
}


export default AdminDashboard;