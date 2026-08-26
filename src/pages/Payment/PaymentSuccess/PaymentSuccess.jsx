import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowRight,
  Check,
  Download,
  LoaderCircle,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useCart,
} from "../../../context/CartContext";

import "./PaymentSuccess.css";


function PaymentSuccess() {

  const [searchParams] =
    useSearchParams();

  const {
    clearCart,
    clearCheckout,
  } = useCart();


  /* ========================================
     PAYMENT REFERENCE
     ======================================== */

  const reference =
    searchParams.get("reference");


  /* ========================================
     STATE
     ======================================== */

  const [status, setStatus] =
    useState("verifying");

  const [message, setMessage] =
    useState("");

  const [downloadToken, setDownloadToken] =
    useState("");


  /* ========================================
     PREVENT DUPLICATE VERIFICATION
     ======================================== */

  const verificationStarted =
    useRef(false);


  /* ========================================
     VERIFY PAYMENT
     ======================================== */

  useEffect(() => {

    if (!reference) {

      setStatus("failed");

      setMessage(
        "No payment reference was provided."
      );

      return;

    }


    if (verificationStarted.current) {

      return;

    }


    verificationStarted.current = true;


    const verifyPayment = async () => {

      try {

        console.log(
          "Verifying payment:",
          reference
        );


        /* ==============================
           VERIFY WITH DJANGO
           ============================== */

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/verify/?reference=${encodeURIComponent(
            reference
          )}`,
          {
            method: "GET",

            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );


        let data = null;


        try {

          data = await response.json();

        } catch {

          data = null;

        }


        console.log(
          "Payment verification response:",
          data
        );


        /* ==============================
           HANDLE ERROR
           ============================== */

        if (!response.ok) {

          setStatus("failed");

          setMessage(
            data?.detail ||
            data?.message ||
            "Payment could not be verified."
          );

          return;

        }


        /* ==============================
           PAYMENT SUCCESSFUL
           ============================== */

        if (
          data?.status === "paid"
        ) {

          setDownloadToken(
            data.download_token || ""
          );

          setStatus("success");


          /* ============================
             CLEAR CART
             ============================ */

          clearCart();

          clearCheckout();


          /* ============================
             REMOVE TEMPORARY DATA
             ============================ */

          localStorage.removeItem(
            "leafygreendz-payment-reference"
          );

          localStorage.removeItem(
            "leafygreendz-order-number"
          );


          return;

        }


        /* ==============================
           PAYMENT NOT SUCCESSFUL
           ============================== */

        setStatus("failed");

        setMessage(
          data?.detail ||
          data?.message ||
          "Payment could not be verified."
        );

      } catch (error) {

        console.error(
          "Payment verification error:",
          error
        );


        setStatus("failed");

        setMessage(
          "Unable to verify your payment. Please try again."
        );

      }

    };


    verifyPayment();

  }, [
    reference,
    clearCart,
    clearCheckout,
  ]);


  /* ========================================
     VERIFYING
     ======================================== */

  if (status === "verifying") {

    return (

      <main className="payment-success">

        <div className="payment-success__container">

          <div className="payment-success__icon">

            <LoaderCircle
              size={30}
              strokeWidth={1.8}
              className="payment-success__loader"
            />

          </div>


          <p className="payment-success__eyebrow">
            VERIFYING PAYMENT
          </p>


          <h1>
            Confirming your payment.
          </h1>


          <p className="payment-success__description">

            Please wait while we securely
            confirm your payment with
            Paystack.

          </p>


          {reference && (

            <div className="payment-success__reference">

              <span>
                PAYMENT REFERENCE
              </span>

              <strong>
                {reference}
              </strong>

            </div>

          )}

        </div>

      </main>

    );

  }


  /* ========================================
     FAILED
     ======================================== */

  if (status === "failed") {

    return (

      <main className="payment-success">

        <div className="payment-success__container">

          <div className="payment-success__icon">

            <X
              size={30}
              strokeWidth={1.8}
            />

          </div>


          <p className="payment-success__eyebrow">

            PAYMENT NOT CONFIRMED

          </p>


          <h1>

            We couldn't confirm your payment.

          </h1>


          <p className="payment-success__description">

            {message ||
              "Your payment could not be verified at this time."}

          </p>


          {reference && (

            <div className="payment-success__reference">

              <span>
                PAYMENT REFERENCE
              </span>

              <strong>
                {reference}
              </strong>

            </div>

          )}


          <div className="payment-success__actions">

            <Link
              to="/payment"
              className="payment-success__button"
            >

              Try Payment Again

              <ArrowRight
                size={17}
                strokeWidth={1.8}
              />

            </Link>


            <Link
              to="/books"
              className="payment-success__secondary-button"
            >

              Back to Books

            </Link>

          </div>

        </div>

      </main>

    );

  }


  /* ========================================
     DOWNLOAD
     ======================================== */

  const downloadUrl =
    downloadToken
      ? `${import.meta.env.VITE_API_URL}/api/orders/download/${downloadToken}/`
      : null;


  /* ========================================
     SUCCESS
     ======================================== */

  return (

    <main className="payment-success">

      <div className="payment-success__container">

        <div className="payment-success__icon">

          <Check
            size={30}
            strokeWidth={1.8}
          />

        </div>


        <p className="payment-success__eyebrow">

          PAYMENT SUCCESSFUL

        </p>


        <h1>

          Your order is complete.

        </h1>


        <p className="payment-success__description">

          Thank you for your purchase.
          Your payment has been successfully
          verified.

        </p>


        {reference && (

          <div className="payment-success__reference">

            <span>
              PAYMENT REFERENCE
            </span>

            <strong>
              {reference}
            </strong>

          </div>

        )}


        {/* ==================================
            DOWNLOAD
            ================================== */}

        {downloadUrl && (

          <div className="payment-success__notice">

            <span>
              YOUR EBOOK IS READY
            </span>

            <p>

              Your payment has been confirmed.
              You can now download your ebook.

            </p>


            <a
              href={downloadUrl}
              className="payment-success__button"
              download
            >

              Download Ebook

              <Download
                size={17}
                strokeWidth={1.8}
              />

            </a>

          </div>

        )}


        {!downloadUrl && (

          <div className="payment-success__notice">

            <span>
              DIGITAL DELIVERY
            </span>

            <p>

              Your payment was successful,
              but the download link could not
              be generated. Please contact
              support.

            </p>

          </div>

        )}


        <Link
          to="/books"
          className="payment-success__secondary-button"
        >

          Continue Exploring

          <ArrowRight
            size={17}
            strokeWidth={1.8}
          />

        </Link>


        <p className="payment-success__footnote">

          Keep your payment reference
          for your records.

        </p>

      </div>

    </main>

  );

}


export default PaymentSuccess;