import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Lock,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

import "./Checkout.css";


function Checkout() {

  const {
    cartItems,
    cartTotal,
    saveCheckout,
    saveDirectCheckout,
    checkoutData,
  } = useCart();

  const navigate = useNavigate();


  /* ========================================
     DETERMINE CHECKOUT TYPE
     ======================================== */

  const isDirectPurchase =
    checkoutData?.type === "direct" ||
    checkoutData?.type === "single-book";


  /* ========================================
     DETERMINE CHECKOUT ITEMS
     ======================================== */

  const checkoutItems =
    isDirectPurchase &&
    checkoutData?.items?.length
      ? checkoutData.items
      : cartItems;


  /* ========================================
     DETERMINE TOTAL
     ======================================== */

  const checkoutTotal =
    isDirectPurchase &&
    checkoutData?.total !== undefined
      ? Number(checkoutData.total)
      : cartTotal;


  /* ========================================
     BACK LINK
     ======================================== */

  const backLink =
    isDirectPurchase &&
    checkoutItems.length > 0
      ? `/books/${checkoutItems[0].id}`
      : "/cart";


  const backText =
    isDirectPurchase
      ? "Back to Book"
      : "Back to Cart";


  /* ========================================
     EMPTY CHECKOUT
     ======================================== */

  if (checkoutItems.length === 0) {

    return (

      <main className="checkout checkout--empty">

        <div className="checkout__empty">

          <p>
            YOUR CART IS EMPTY
          </p>

          <h1>
            Nothing to checkout yet.
          </h1>

          <Link to="/books">

            <ArrowLeft
              size={17}
              strokeWidth={1.8}
            />

            Explore Books

          </Link>

        </div>

      </main>

    );

  }


  /* ========================================
     SUBMIT CHECKOUT
     ======================================== */

  const handleSubmit = async (event) => {

    event.preventDefault();


    const form = event.currentTarget;


    if (!form.checkValidity()) {

      form.reportValidity();

      return;

    }


    const formData =
      new FormData(form);


    const customer = {

      name: formData.get("name"),

      email: formData.get("email"),

      phone: formData.get("phone"),

    };


    /* ====================================
       PREPARE DJANGO ORDER
       ==================================== */

    const orderPayload = {

      customer_name:
        customer.name,

      customer_email:
        customer.email,

      customer_phone:
        customer.phone,

      items: checkoutItems.map((item) => ({

        book: Number(item.id),

        quantity:
          Number(item.quantity) || 1,

      })),

    };


    try {

      /* ==================================
         SEND ORDER TO DJANGO
         ================================== */

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(
            orderPayload
          ),
        }
      );


      /* ==================================
         HANDLE DJANGO ERROR
         ================================== */

      if (!response.ok) {

        let errorData;

        try {

          errorData =
            await response.json();

        } catch {

          errorData = null;

        }


        console.error(
          "Order creation failed:",
          errorData
        );


        alert(
          "We couldn't create your order. Please try again."
        );

        return;

      }


      /* ==================================
         GET DJANGO ORDER
         ================================== */

      const djangoOrder =
        await response.json();


      console.log(
        "Order created:",
        djangoOrder
      );


      /* ==================================
         SAVE REAL DJANGO ORDER
         ================================== */

      if (isDirectPurchase) {

        const book =
          checkoutItems[0];


        saveDirectCheckout(
          customer,
          book,
          djangoOrder
        );

      } else {

        saveCheckout(
          customer,
          djangoOrder
        );

      }


      /* ==================================
         GO TO PAYMENT
         ================================== */

      navigate("/payment");

    } catch (error) {

      console.error(
        "Checkout error:",
        error
      );


      alert(
        "Unable to connect to the server. Please make sure the Django server is running."
      );

    }

  };


  return (

    <main className="checkout">

      <div className="checkout__container">


        {/* ====================================
            BACK LINK
            ==================================== */}

        <Link
          to={backLink}
          className="checkout__back"
        >

          <ArrowLeft
            size={16}
            strokeWidth={1.8}
          />

          {backText}

        </Link>


        {/* ====================================
            HEADER
            ==================================== */}

        <div className="checkout__header">

          <p>
            CHECKOUT
          </p>

          <h1>
            Complete your order.
          </h1>

          <span>
            Review your order and enter your
            details to continue.
          </span>

        </div>


        {/* ====================================
            CHECKOUT FORM
            ==================================== */}

        <form
          className="checkout__layout"
          onSubmit={handleSubmit}
        >


          {/* ==================================
              CUSTOMER DETAILS
              ================================== */}

          <section className="checkout__form-section">

            <div className="checkout__section-heading">

              <p>
                01
              </p>

              <h2>
                Your details
              </h2>

            </div>


            <div className="checkout__form">


              {/* NAME */}

              <div className="checkout__field">

                <label htmlFor="name">
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  autoComplete="name"
                  defaultValue={
                    checkoutData?.customer?.name ||
                    ""
                  }
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="checkout__field">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  defaultValue={
                    checkoutData?.customer?.email ||
                    ""
                  }
                  required
                />

                <small>
                  Your digital book will be
                  delivered to this email.
                </small>

              </div>


              {/* PHONE */}

              <div className="checkout__field">

                <label htmlFor="phone">
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  autoComplete="tel"
                  defaultValue={
                    checkoutData?.customer?.phone ||
                    ""
                  }
                  required
                />

              </div>

            </div>


            {/* SECURITY */}

            <div className="checkout__secure">

              <Lock
                size={15}
                strokeWidth={1.7}
              />

              <span>
                Your information is securely
                handled.
              </span>

            </div>

          </section>


          {/* ==================================
              ORDER SUMMARY
              ================================== */}

          <aside className="checkout__summary">

            <p className="checkout__summary-eyebrow">
              ORDER SUMMARY
            </p>


            {/* ITEMS */}

            <div className="checkout__items">

              {checkoutItems.map((item) => (

                <div
                  className="checkout__item"
                  key={item.id}
                >


                  {/* COVER */}

                  <div className="checkout__item-cover">

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


                  {/* BOOK INFO */}

                  <div className="checkout__item-info">

                    <h3>
                      {item.title}
                    </h3>

                    <span>
                      Qty: {item.quantity || 1}
                    </span>

                  </div>


                  {/* ITEM TOTAL */}

                  <strong>
                    ₦{(
                      Number(item.price) *
                      (Number(item.quantity) || 1)
                    ).toLocaleString()}
                  </strong>

                </div>

              ))}

            </div>


            {/* DIVIDER */}

            <div className="checkout__divider" />


            {/* SUBTOTAL */}

            <div className="checkout__row">

              <span>
                Subtotal
              </span>

              <strong>
                ₦{checkoutTotal.toLocaleString()}
              </strong>

            </div>


            {/* DELIVERY */}

            <div className="checkout__row">

              <span>
                Delivery
              </span>

              <span>
                Digital
              </span>

            </div>


            {/* TOTAL */}

            <div className="checkout__divider" />


            <div className="checkout__total">

              <span>
                Total
              </span>

              <strong>
                ₦{checkoutTotal.toLocaleString()}
              </strong>

            </div>


            {/* PAYMENT BUTTON */}

            <button
              type="submit"
              className="checkout__button"
            >

              Continue to Payment

              <ArrowRight
                size={17}
                strokeWidth={1.8}
              />

            </button>


            {/* PAYMENT NOTE */}

            <p className="checkout__payment-note">

              Secure payment powered by
              your selected payment provider.

            </p>

          </aside>

        </form>

      </div>

    </main>

  );

}


export default Checkout;