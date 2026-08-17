import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./BookGrid.css";

function BookGrid({ books }) {
  const publishedBooks = books.filter(
    (book) => book.published
  );

  return (
    <section className="book-grid">
      <div className="book-grid__container">

        <div className="book-grid__header">
          <div>
            <p className="book-grid__eyebrow">
              THE COLLECTION
            </p>

            <h2 className="book-grid__title">
              Explore the library.
            </h2>
          </div>

          <h1 className="book-grid__description">
            Practical resources created to help you
            learn, apply, build and grow.
          </h1>
        </div>

        <div className="book-grid__items">
          {publishedBooks.map((book) => (
            <article
              className="book-card"
              key={book.id}
            >
              <Link
                to={`/books/${book.id}`}
                className="book-card__cover-link"
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={`${book.title} book cover`}
                    className="book-card__cover"
                  />
                ) : (
                  <div className="book-card__placeholder">
                    <span>LEAFYGREENDZ</span>

                    <strong>
                      {book.title}
                    </strong>

                    <small>
                      {book.subtitle}
                    </small>
                  </div>
                )}
              </Link>

              <div className="book-card__content">

                <p className="book-card__category">
                  {book.category}
                </p>

                <h3 className="book-card__title">
                  {book.title}
                </h3>

                <p className="book-card__subtitle">
                  {book.subtitle}
                </p>

                <Link
                  to={`/books/${book.id}`}
                  className="book-card__link"
                >
                  View book
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                  />
                </Link>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BookGrid;