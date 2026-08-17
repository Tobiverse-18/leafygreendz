import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import "./FeaturedBook.css";

function FeaturedBook() {
  const principles = [
    "Solve real problems.",
    "Master one niche.",
    "Validate your ideas.",
    "Build systems.",
    "Price for profit.",
    "The power of social proof.",
    "Turn customers and networks into referral engines.",
  ];

  return (
    <section className="featured-book">
      <div className="featured-book__container">
        <div className="featured-book__header">
          <div>
            <p className="featured-book__eyebrow">
              FIRST FEATURED DIGITAL PRODUCT
            </p>

            <h2 className="featured-book__title">
              7 Laws to
              <span>Successful Startups</span>
            </h2>
          </div>

          <p className="featured-book__edition">
            THE LEAFYGREENDZ ANGLE
          </p>
        </div>

        <div className="featured-book__content">
          <div className="featured-book__intro">
            <p className="featured-book__lead">
              A practical guide for moving from a promising idea to a
              business with structure, customers, profit and growth.
            </p>

            <Link
              to="/books"
              className="featured-book__link"
            >
              Explore the book
              <ArrowRight size={17} strokeWidth={1.8} />
            </Link>
          </div>

          <div className="featured-book__principles">
            <div className="featured-book__principles-header">
              <span>THE SEVEN LAWS</span>
              <span>01—07</span>
            </div>

            <div className="featured-book__list">
              {principles.map((principle, index) => (
                <div
                  className="featured-book__item"
                  key={principle}
                >
                  <span className="featured-book__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <Check
                    className="featured-book__check"
                    size={16}
                    strokeWidth={1.7}
                  />

                  <span className="featured-book__principle">
                    {principle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBook;