import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import books from "../../../data/books";
import "./BookDetails.css";

function BookDetails() {
  const { bookId } = useParams();

  const book = books.find(
    (item) => item.id === bookId
  );

  if (!book) {
    return (
      <main className="book-details book-details--not-found">
        <div className="book-details__not-found">
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
    <main className="book-details">

      {/* ========================================
          BACK LINK
          ======================================== */}

      <div className="book-details__container">

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


        {/* ========================================
            MAIN BOOK INFORMATION
            ======================================== */}

        <div className="book-details__main">

          {/* COVER */}

          <div className="book-details__cover-wrapper">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={`${book.title} book cover`}
                className="book-details__cover"
              />
            ) : (
              <div className="book-details__cover-placeholder">
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


          {/* INFORMATION */}

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

            <p className="book-details__description">
              {book.description}
            </p>

            <div className="book-details__meta">

              <div>
                <span>AUTHOR</span>
                <strong>{book.author}</strong>
              </div>

              <div>
                <span>PRICE</span>
                <strong>
                  ₦{Number(book.price).toLocaleString()}
                </strong>
              </div>

            </div>

            <Link
              to={`/books/${book.id}/purchase`}
              className="book-details__button"
            >
              Get the Book

              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
              />
            </Link>

          </div>

        </div>


        {/* ========================================
            DESCRIPTION SECTION
            ======================================== */}

        <section className="book-details__about">

          <div className="book-details__section-heading">
            <p>ABOUT THE BOOK</p>

            <span />
          </div>

          <div className="book-details__about-content">

            <h2>
              Knowledge becomes valuable
              when you put it into action.
            </h2>

            <p>
              {book.description}
            </p>

          </div>

        </section>


        {/* ========================================
            BOTTOM CTA
            ======================================== */}

        <section className="book-details__cta">

          <p>
            READY TO START?
          </p>

          <h2>
            Turn knowledge into action.
          </h2>

          <Link
            to={`/books/${book.id}/purchase`}
            className="book-details__button"
          >
            Get the Book

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </Link>

        </section>

      </div>

    </main>
  );
}

export default BookDetails;