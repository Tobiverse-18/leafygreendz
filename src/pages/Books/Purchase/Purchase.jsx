import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowUpRight,
  Lock,
} from "lucide-react";

import { useEffect, useState } from "react";

import { useCart } from "../../../context/CartContext";

import "./Purchase.css";


function Purchase() {

  const { bookId } = useParams();

  const navigate = useNavigate();

  const {
    saveDirectCheckout,
  } = useCart();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* ========================================
     FETCH BOOK FROM DJANGO
     ======================================== */

  useEffect(() => {

    const fetchBook = async () => {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books/`,
        );


        if (!response.ok) {
          throw new Error("Book not found.");
        }


        const data = await response.json();


        const formattedBook = {

          id: String(data.id),

          title: data.title,

          subtitle: data.subtitle,

          author: data.author,

          category: data.category,

          description: data.description,

          price: Number(data.price),

          coverImage: data.cover_image,

          published: data.is_published,

          ebookFile: data.ebook_file,

        };


        setBook(formattedBook);

      } catch (error) {

        console.error(
          "Failed to load purchase:",
          error
        );

        setError(
          "We couldn't find that book."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchBook();

  }, [bookId]);


  /* ========================================
     LOADING
     ======================================== */

  if (loading) {

    return (

      <main className="purchase">

        <div className="purchase__container">

          <p>
            Loading book...
          </p>

        </div>

      </main>

    );

  }


  /* ========================================
     BOOK NOT FOUND
     ======================================== */

  if (error || !book) {

    return (

      <main className="purchase purchase--not-found">

        <div className="purchase__not-found">

          <p>
            BOOK NOT FOUND
          </p>

          <h1>
            We couldn't find that book.
          </h1>

          <Link to="/books">

            <ArrowLeft
              size={17}
              strokeWidth={1.8}
            />

            Back to Books

          </Link>

        </div>

      </main>

    );

  }


  /* ========================================
     CONTINUE TO CHECKOUT
     ======================================== */

  const handleSubmit = (event) => {

    event.preventDefault();


    const form = event.currentTarget;


    if (!form.checkValidity()) {

      form.reportValidity();

      return;

    }


    const formData =
      new FormData(form);


    const email =
      formData.get("email");


    if (!email) {
      return;
    }


    /* ====================================
       DIRECT PURCHASE
       ==================================== */

    saveDirectCheckout({

      name: "",

      email,

      phone: "",

    }, book);


    /* ====================================
       GO TO CHECKOUT
       ==================================== */

    navigate("/checkout");

  };


  return (

    <main className="purchase">

      <div className="purchase__container">


        {/* ====================================
            BACK LINK
            ==================================== */}

        <Link
          to={`/books/${book.id}`}
          className="purchase__back"
        >

          <ArrowLeft
            size={16}
            strokeWidth={1.8}
          />

          Back to Book

        </Link>


        {/* ====================================
            PAGE HEADER
            ==================================== */}

        <div className="purchase__header">

          <p>
            GET THE BOOK
          </p>

          <h1>
            Complete your order.
          </h1>

          <span>
            Enter your email below to
            continue.
          </span>

        </div>


        {/* ====================================
            PURCHASE AREA
            ==================================== */}

        <div className="purchase__layout">


          {/* ==================================
              BOOK SUMMARY
              ================================== */}

          <div className="purchase__book">


            {/* COVER */}

            <div className="purchase__cover-wrapper">

              {book.coverImage ? (

                <img
                  src={book.coverImage}
                  alt={`${book.title} book cover`}
                  className="purchase__cover"
                />

              ) : (

                <div className="purchase__cover-placeholder">

                  <span>
                    LEAFYGREENDZ
                  </span>

                  <strong>
                    {book.title}
                  </strong>

                  <small>
                    {book.subtitle}
                  </small>

                </div>

              )}

            </div>


            {/* BOOK INFO */}

            <div className="purchase__book-info">

              <p>
                {book.category}
              </p>

              <h2>
                {book.title}
              </h2>

              <span>
                {book.subtitle}
              </span>

            </div>

          </div>


          {/* ==================================
              ORDER FORM
              ================================== */}

          <div className="purchase__form-wrapper">


            {/* PRICE */}

            <div className="purchase__price-row">

              <span>
                Book price
              </span>

              <strong>
                ₦{book.price.toLocaleString()}
              </strong>

            </div>


            <div className="purchase__divider" />


            {/* FORM */}

            <form
              className="purchase__form"
              onSubmit={handleSubmit}
            >


              {/* EMAIL */}

              <div className="purchase__field">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />

                <small>
                  Your book will be delivered
                  to this email.
                </small>

              </div>


              {/* CONTINUE */}

              <button
                type="submit"
                className="purchase__button"
              >

                Continue to Checkout

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                />

              </button>

            </form>


            {/* SECURITY */}

            <div className="purchase__secure">

              <Lock
                size={15}
                strokeWidth={1.7}
              />

              <span>
                Secure checkout
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}


export default Purchase;