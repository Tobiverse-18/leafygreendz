import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./BooksCTA.css";

function BooksCTA() {
  return (
    <section className="books-cta">
      <div className="books-cta__container">
        <p className="books-cta__eyebrow">
          KEEP LEARNING
        </p>

        <h2 className="books-cta__title">
          Your next idea could
          <span> change everything.</span>
        </h2>

        <p className="books-cta__description">
          Knowledge becomes valuable when you put it into
          practice. Explore the LeafyGreendz library and
          find something worth applying.
        </p>

        <Link
          to="/"
          className="books-cta__button"
        >
          Back to Home
          <ArrowRight
            size={17}
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </section>
  );
}

export default BooksCTA;