import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  return (
    <main className="cart-page">

      {/* ========================================
          HEADER
          ======================================== */}

      <section className="cart-hero">
        <div className="cart__container">

          <p className="cart-hero__eyebrow">
            YOUR CART
          </p>

          <h1 className="cart-hero__title">
            Your collection.
          </h1>

        </div>
      </section>


      {/* ========================================
          CART CONTENT
          ======================================== */}

      <section className="cart-content">
        <div className="cart__container">

          {cartItems.length === 0 ? (

            /* ====================================
               EMPTY CART
               ==================================== */

            <div className="cart-empty">

              <p className="cart-empty__eyebrow">
                NOTHING HERE YET
              </p>

              <h2>
                Your cart is empty.
              </h2>

              <p>
                Explore the LeafyGreendz collection and
                find something worth reading.
              </p>

              <Link
                to="/books"
                className="cart-empty__button"
              >
                Explore Books

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                />
              </Link>

            </div>

          ) : (

            /* ====================================
               CART WITH ITEMS
               ==================================== */

            <div className="cart-layout">

              {/* ITEMS */}

              <div className="cart-items">

                <div className="cart-items__header">
                  <span>BOOK</span>
                  <span>TOTAL</span>
                </div>

                {cartItems.map((item) => (

                  <article
                    className="cart-item"
                    key={item.id}
                  >

                    <div className="cart-item__main">

                      <div className="cart-item__cover">

                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={`${item.title} book cover`}
                          />
                        ) : (
                          <div className="cart-item__placeholder">
                            LEAFYGREENDZ
                          </div>
                        )}

                      </div>

                      <div className="cart-item__info">

                        <p>
                          {item.category}
                        </p>

                        <h2>
                          {item.title}
                        </h2>

                        <span>
                          {item.author}
                        </span>

                        <div className="cart-item__quantity">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>


                    <div className="cart-item__side">

                      <strong>
                        ₦{(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </strong>

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2
                          size={17}
                          strokeWidth={1.7}
                        />
                      </button>

                    </div>

                  </article>

                ))}

              </div>


              {/* SUMMARY */}

              <aside className="cart-summary">

                <p className="cart-summary__eyebrow">
                  ORDER SUMMARY
                </p>

                <div className="cart-summary__row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₦{cartTotal.toLocaleString()}
                  </strong>

                </div>

                <div className="cart-summary__divider" />

                <div className="cart-summary__total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₦{cartTotal.toLocaleString()}
                  </strong>

                </div>

                <Link
                  to="/checkout"
                  className="cart-summary__button"
                >
                  Proceed to Checkout

                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                  />
                </Link>

                <Link
                  to="/books"
                  className="cart-summary__continue"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.7}
                  />

                  Continue Shopping
                </Link>

              </aside>

            </div>

          )}

        </div>
      </section>

    </main>
  );
}

export default Cart;