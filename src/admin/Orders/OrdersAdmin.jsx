import { useEffect, useState } from "react";

import {
  ShoppingBag,
  CheckCircle2,
  Clock3,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { getAdminOrders } from "../services/adminApi";

import "./OrdersAdmin.css";


function OrdersAdmin() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ============================================================
  // LOAD ORDERS
  // ============================================================

  async function loadOrders() {

    try {

      setLoading(true);

      setError("");

      const data = await getAdminOrders();

      setOrders(data);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        "Unable to load orders."
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadOrders();

  }, []);


  // ============================================================
  // FORMAT DATE
  // ============================================================

  function formatDate(date) {

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  }


  // ============================================================
  // FORMAT MONEY
  // ============================================================

  function formatMoney(amount) {

    return `₦${Number(
      amount || 0
    ).toLocaleString(
      "en-NG",
      {
        minimumFractionDigits: 2,
      }
    )}`;

  }


  // ============================================================
  // STATUS CLASS
  // ============================================================

  function getStatusClass(status) {

    return `order-status order-status--${status}`;

  }


  // ============================================================
  // STATUS ICON
  // ============================================================

  function StatusIcon({ status }) {

    if (status === "paid") {

      return (
        <CheckCircle2
          size={14}
        />
      );

    }

    if (status === "pending") {

      return (
        <Clock3
          size={14}
        />
      );

    }

    if (
      status === "failed" ||
      status === "cancelled"
    ) {

      return (
        <XCircle
          size={14}
        />
      );

    }

    return null;

  }


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="orders-admin">

        <div className="orders-admin__loading">

          <RefreshCw
            size={20}
            className="orders-admin__spinner"
          />

          Loading orders...

        </div>

      </div>
    );

  }


  // ============================================================
  // ERROR
  // ============================================================

  if (error) {

    return (
      <div className="orders-admin">

        <div className="orders-admin__error">

          <XCircle
            size={20}
          />

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={loadOrders}
          >
            Try again
          </button>

        </div>

      </div>
    );

  }


  return (
    <div className="orders-admin">


      {/* ========================================================
          HEADER
      ======================================================== */}

      <section className="orders-admin__header">

        <div>

          <p className="orders-admin__eyebrow">
            SALES
          </p>

          <h2>
            Orders
          </h2>

          <p className="orders-admin__description">
            View and manage customer orders.
          </p>

        </div>


        <button
          type="button"
          className="orders-admin__refresh"
          onClick={loadOrders}
        >

          <RefreshCw
            size={15}
          />

          Refresh

        </button>

      </section>


      {/* ========================================================
          SUMMARY
      ======================================================== */}

      <section className="orders-admin__summary">

        <div className="orders-summary-card">

          <div className="orders-summary-card__icon">

            <ShoppingBag
              size={18}
            />

          </div>

          <div>

            <span>
              TOTAL ORDERS
            </span>

            <strong>
              {orders.length}
            </strong>

          </div>

        </div>


        <div className="orders-summary-card">

          <div className="orders-summary-card__icon">

            <CheckCircle2
              size={18}
            />

          </div>

          <div>

            <span>
              PAID ORDERS
            </span>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "paid"
                ).length
              }
            </strong>

          </div>

        </div>


        <div className="orders-summary-card">

          <div className="orders-summary-card__icon">

            <Clock3
              size={18}
            />

          </div>

          <div>

            <span>
              PENDING
            </span>

            <strong>
              {
                orders.filter(
                  (order) =>
                    order.status === "pending"
                ).length
              }
            </strong>

          </div>

        </div>

      </section>


      {/* ========================================================
          ORDERS TABLE
      ======================================================== */}

      <section className="orders-admin__table-panel">

        <div className="orders-admin__table-header">

          <div>

            <p>
              ALL SALES
            </p>

            <h3>
              Customer Orders
            </h3>

          </div>

          <span>
            {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </span>

        </div>


        {orders.length === 0 ? (

          <div className="orders-admin__empty">

            <ShoppingBag
              size={32}
              strokeWidth={1.4}
            />

            <strong>
              No orders yet
            </strong>

            <span>
              Customer orders will appear here
              after they make a purchase.
            </span>

          </div>

        ) : (

          <div className="orders-admin__table-wrapper">

            <table className="orders-admin__table">

              <thead>

                <tr>

                  <th>
                    ORDER
                  </th>

                  <th>
                    CUSTOMER
                  </th>

                  <th>
                    BOOK
                  </th>

                  <th>
                    AMOUNT
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    DATE
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders.map(
                  (order) => (

                    <tr
                      key={order.id}
                    >

                      <td>

                        <strong className="order-number">
                          {order.order_number}
                        </strong>

                        <span className="order-reference">
                          {order.payment_reference || "No reference"}
                        </span>

                      </td>


                      <td>

                        <strong className="customer-name">
                          {order.customer_name}
                        </strong>

                        <span className="customer-email">
                          {order.customer_email}
                        </span>

                        <span className="customer-phone">
                          {order.customer_phone}
                        </span>

                      </td>


                      <td>

                        {order.items?.length ? (

                          <div className="order-books">

                            {order.items.map(
                              (item) => (

                                <div
                                  className="order-book"
                                  key={item.id}
                                >

                                  <strong>
                                    {item.title}
                                  </strong>

                                  <span>
                                    {item.quantity} ×{" "}
                                    {formatMoney(item.price)}
                                  </span>

                                </div>

                              )
                            )}

                          </div>

                        ) : (

                          <span>
                            No book
                          </span>

                        )}

                      </td>


                      <td>

                        <strong className="order-total">
                          {formatMoney(order.total)}
                        </strong>

                        <span className="order-currency">
                          {order.currency}
                        </span>

                      </td>


                      <td>

                        <span
                          className={getStatusClass(
                            order.status
                          )}
                        >

                          <StatusIcon
                            status={order.status}
                          />

                          {order.status_display ||
                            order.status}

                        </span>

                      </td>


                      <td>

                        <span className="order-date">
                          {formatDate(
                            order.created_at
                          )}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>
  );

}


export default OrdersAdmin;