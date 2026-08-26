import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Lock,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import "./Payment.css";


function Payment() {

  const {
    checkoutData,
    clearCart,
    clearCheckout,
  } = useCart();

  const navigate = useNavigate();


  /* ========================================
     NO CHECKOUT DATA
     ======================================== */

  if (!checkoutData) {

    return (

      <main className="payment payment--empty">

        <div className="payment__empty">

          <p>
            PAYMENT
          </p>

          <h1>
            No order to pay for.
          </h1>

          <span>
            Please complete checkout before
            continuing to payment.
          </span>

          <Link to="/checkout">

            <ArrowLeft
              size={17}
              strokeWidth={1.8}
            />

            Back to Checkout

          </Link>

        </div>

      </main>

    );

  }


  /* ========================================
     DATA
     ======================================== */

  const {
    customer,
    items,
    total,
    currency,
    orderNumber,
  } = checkoutData;


  /* ========================================
     PAYMENT
     ======================================== */

  const handlePayment = async () => {

    if (!orderNumber) {

      alert(
        "Your order number is missing. Please return to checkout and try again."
      );

      return;

    }


    try {

      /* ==================================
         INITIALIZE PAYSTACK
         ================================== */

      const response = await fetch(
        "http://127.0.0.1:8000/api/payments/initialize/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            order_number: orderNumber,
          }),
        }
      );


      /* ==================================
         HANDLE INITIALIZATION ERROR
         ================================== */

      if (!response.ok) {

        let errorData = null;

        try {

          errorData =
            await response.json();

        } catch {

          errorData = null;

        }


        console.error(
          "Payment initialization failed:",
          errorData
        );


        alert(
          errorData?.detail ||
          "Unable to initialize payment. Please try again."
        );

        return;

      }


      /* ==================================
         GET PAYSTACK RESPONSE
         ================================== */

      const payment =
        await response.json();


      console.log(
        "Paystack payment initialized:",
        payment
      );


      /* ==================================
         SAVE PAYMENT REFERENCE
         ================================== */

      localStorage.setItem(
        "leafygreendz-payment-reference",
        payment.reference
      );


      /* ==================================
         SAVE ORDER NUMBER
         ================================== */

      localStorage.setItem(
        "leafygreendz-order-number",
        payment.order_number
      );


      /* ==================================
         REDIRECT TO PAYSTACK
         ================================== */

      window.location.href =
        payment.authorization_url;

    } catch (error) {

      console.error(
        "Payment error:",
        error
      );


      alert(
        "Unable to connect to the payment server. Please try again."
      );

    }

  };


  return (

    <main className="payment">

      <div className="payment__container">


        {/* ====================================
            BACK
            ==================================== */}

        <Link
          to="/checkout"
          className="payment__back"
        >

          <ArrowLeft
            size={16}
            strokeWidth={1.8}
          />

          Back to Checkout

        </Link>


        {/* ====================================
            HEADER
            ==================================== */}

        <div className="payment__header">

          <p>
            PAYMENT
          </p>

          <h1>
            Complete your payment.
          </h1>

          <span>
            Review your order before making
            your payment.
          </span>

        </div>


        {/* ====================================
            PAYMENT LAYOUT
            ==================================== */}

        <div className="payment__layout">


          {/* ==================================
              CUSTOMER
              ================================== */}

          <section className="payment__customer">

            <div className="payment__section-heading">

              <p>
                01
              </p>

              <h2>
                Customer details
              </h2>

            </div>


            <div className="payment__customer-details">

              <div>

                <span>
                  FULL NAME
                </span>

                <strong>
                  {customer?.name}
                </strong>

              </div>


              <div>

                <span>
                  EMAIL
                </span>

                <strong>
                  {customer?.email}
                </strong>

              </div>


              <div>

                <span>
                  PHONE
                </span>

                <strong>
                  {customer?.phone}
                </strong>

              </div>

            </div>


            <div className="payment__secure">

              <Lock
                size={15}
                strokeWidth={1.7}
              />

              <span>
                Your payment information is
                securely handled by Paystack.
              </span>

            </div>

          </section>


          {/* ==================================
              ORDER SUMMARY
              ================================== */}

          <aside className="payment__summary">

            <p className="payment__summary-eyebrow">
              ORDER SUMMARY
            </p>


            {/* ITEMS */}

            <div className="payment__items">

              {items.map((item) => (

                <div
                  className="payment__item"
                  key={item.id}
                >

                  <div className="payment__item-cover">

                    {item.coverImage ? (

                      <img
                        src={item.coverImage}
                        alt={`${item.title} book cover`}
                      />

                    ) : (

                      <div>
                        LEAFYGREENDZ
                      </div>

                    )}

                  </div>


                  <div className="payment__item-info">

                    <h3>
                      {item.title}
                    </h3>

                    <span>
                      Qty: {item.quantity}
                    </span>

                  </div>


                  <strong>
                    ₦{(
                      Number(item.price) *
                      Number(item.quantity || 1)
                    ).toLocaleString()}
                  </strong>

                </div>

              ))}

            </div>


            {/* DIVIDER */}

            <div className="payment__divider" />


            {/* TOTAL */}

            <div className="payment__total">

              <span>
                Total
              </span>

              <strong>
                ₦{Number(total).toLocaleString()}
              </strong>

            </div>


            {/* PAYMENT METHOD */}

            <div className="payment__method">

              <span>
                PAYMENT METHOD
              </span>

              <strong>
                Paystack
              </strong>

            </div>


            {/* ORDER NUMBER */}

            {orderNumber && (

              <div className="payment__method">

                <span>
                  ORDER NUMBER
                </span>

                <strong>
                  {orderNumber}
                </strong>

              </div>

            )}


            {/* BUTTON */}

            <button
              type="button"
              className="payment__button"
              onClick={handlePayment}
            >

              Pay ₦{Number(total).toLocaleString()}

              <ArrowRight
                size={17}
                strokeWidth={1.8}
              />

            </button>


            {/* NOTE */}

            <p className="payment__note">

              Secure payment powered by
              Paystack.

            </p>

          </aside>

        </div>

      </div>

    </main>

  );

}


export default Payment;