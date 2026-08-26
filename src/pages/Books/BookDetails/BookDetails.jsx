import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../../../context/CartContext";

import "./BookDetails.css";

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* ========================================
     FETCH BOOK
     ======================================== */

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books/${bookId}/`
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
        console.error("Failed to load book:", error);

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
      <main className="book-details">

        <div className="book-details__container">

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
      <main className="book-details book-details--not-found">

        <div className="book-details__not-found">

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
     ADD TO CART
     ======================================== */

  const handleAddToCart = () => {
    addToCart(book);
  };


  /* ========================================
     BUY NOW
     ======================================== */

  const handleBuyNow = () => {
    navigate(`/books/${book.id}/purchase`);
  };


  return (
    <main className="book-details">

      <div className="book-details__container">


        {/* ====================================
            BACK
            ==================================== */}

        <Link
          to="/books"
          className="book-details__back"
        >

          <ArrowLeft
            size={16}
            strokeWidth={1.8}
          />

          Back to Books

        </Link>


        {/* ====================================
            CONTENT
            ==================================== */}

        <div className="book-details__layout">


          {/* ==================================
              COVER
              ================================== */}

          <div className="book-details__cover-wrapper">

            {book.coverImage ? (

              <img
                src={book.coverImage}
                alt={`${book.title} book cover`}
                className="book-details__cover"
              />

            ) : (

              <div className="book-details__cover-placeholder">

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


          {/* ==================================
              INFORMATION
              ================================== */}

          <div className="book-details__content">

            <p className="book-details__category">
              {book.category}
            </p>

            <h1 className="book-details__title">
              {book.title}
            </h1>

            <p className="book-details__subtitle">
              {book.subtitle}
            </p>


            {/* AUTHOR */}

            <p className="book-details__author">
              By {book.author}
            </p>


            {/* DESCRIPTION */}

            <div className="book-details__description">

              <p>
                {book.description}
              </p>

            </div>


            {/* PRICE */}

            <div className="book-details__price">

              <span>
                Price
              </span>

              <strong>
                ₦{book.price.toLocaleString()}
              </strong>

            </div>


            {/* ACTIONS */}

            <div className="book-details__actions">

              <button
                type="button"
                className="book-details__cart-button"
                onClick={handleAddToCart}
              >

                <ShoppingBag
                  size={17}
                  strokeWidth={1.8}
                />

                Add to Cart

              </button>


              <button
                type="button"
                className="book-details__buy-button"
                onClick={handleBuyNow}
              >

                Buy Now

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                />

              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default BookDetails;