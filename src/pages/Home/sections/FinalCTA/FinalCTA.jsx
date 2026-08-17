import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./FinalCTA.css";

function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta__container">
        <div className="final-cta__top">
          <span className="final-cta__eyebrow">
            START HERE
          </span>

          <span className="final-cta__number">
            05
          </span>
        </div>

        <div className="final-cta__content">
          <p className="final-cta__intro">
            An idea is only
          </p>

          <h2 className="final-cta__title">
            the beginning.
          </h2>

          <p className="final-cta__text">
            Whether you're building a business, exploring an
            opportunity or simply looking to think and grow
            differently, start with knowledge you can actually
            use.
          </p>

          <div className="final-cta__actions">
            <Link
              to="/books"
              className="final-cta__primary"
            >
              Explore the books
              <ArrowUpRight size={17} strokeWidth={1.7} />
            </Link>

            <Link
              to="/about"
              className="final-cta__secondary"
            >
              Learn about LEAFYGREENDZ
            </Link>
          </div>
        </div>

       
      </div>
    </section>
  );
}

export default FinalCTA;