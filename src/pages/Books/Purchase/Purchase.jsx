import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import books from "../../../data/books";
import "./Purchase.css";

function Purchase() {
  const { bookId } = useParams();

  const book = books.find(
    (item) => item.id === bookId
  );

  if (!book) {
    return (
      <main className="purchase purchase--not-found">
        <div className="purchase__not-found">
          <p>BOOK NOT FOUND</p>

          <h1>
            We couldn't find that book.
          </h1>

          <Link to="/books">
            <ArrowLeft size={17} />
            Back to Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="purchase">

      <div className="purchase__container">

        {/* BACK LINK */}

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


        {/* PAGE HEADER */}

        <div className="purchase__header">
          <p>GET THE BOOK</p>

          <h1>
            Complete your order.
          </h1>

          <span>
            Enter your details below to continue.
          </span>
        </div>


        {/* PURCHASE AREA */}

        <div className="purchase__layout">

          {/* BOOK SUMMARY */}

          <div className="purchase__book">

            <div className="purchase__cover-wrapper">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={`${book.title} book cover`}
                  className="purchase__cover"
                />
              ) : (
                <div className="purchase__cover-placeholder">
                  <span>LEAFYGREENDZ</span>

                  <strong>
                    {book.title}
                  </strong>

                  <small>
                    {book.subtitle}
                  </small>
                </div>
              )}
            </div>

            <div className="purchase__book-info">

              <p>{book.category}</p>

              <h2>
                {book.title}
              </h2>

              <span>
                {book.subtitle}
              </span>

            </div>

          </div>


          {/* ORDER FORM */}

          <div className="purchase__form-wrapper">

            <div className="purchase__price-row">
              <span>Book price</span>

              <strong>
                ₦{Number(book.price).toLocaleString()}
              </strong>
            </div>

            <div className="purchase__divider" />

            <form className="purchase__form">

              <div className="purchase__field">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />

                <small>
                  Your book will be delivered to this email.
                </small>

              </div>


              <button
                type="submit"
                className="purchase__button"
              >
                Continue to Payment

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                />
              </button>

            </form>

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