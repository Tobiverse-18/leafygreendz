import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./FeaturedBook.css";

function FeaturedBook({ book }) {
  if (!book) {
    return null;
  }

  return (
    <section className="featured-book">
      <div className="featured-book__container">

        {/* SECTION TITLE */}
        <div className="featured-book__section-heading">
          <p>FEATURED BOOK</p>
          <span />
        </div>

        {/* BOOK */}
        <div className="featured-book__layout">

          {/* LEFT — COVER */}
          <div className="featured-book__cover-wrapper">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={`${book.title} book cover`}
                className="featured-book__cover"
              />
            ) : (
              <div className="featured-book__cover-placeholder">
                <span>LEAFYGREENDZ</span>

                <strong>{book.title}</strong>

                <small>{book.subtitle}</small>
              </div>
            )}
          </div>

          {/* RIGHT — INFORMATION */}
          <div className="featured-book__info">

            <p className="featured-book__category">
              {book.category}
            </p>

            <h2 className="featured-book__title">
              {book.title}
            </h2>

            <p className="featured-book__subtitle">
              {book.subtitle}
            </p>

            <p className="featured-book__description">
              {book.description}
            </p>

            <div className="featured-book__meta">
              <span>{book.author}</span>
              <span>{book.category}</span>
            </div>

            <Link
              to={`/books/${book.id}`}
              className="featured-book__button"
            >
              View Book
              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
              />
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedBook;