import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

import bookShowcase from "../../../../assets/book-showcase.jpeg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">
            LEAFYGREENDZ BUSINESS CONCEPT
          </p>

          <h1 className="hero__title">
            Turning Ideas
            <span>Into Action.</span>
          </h1>

          <h2 className="hero__statement">
            Turning Knowledge Into Income.
          </h2>

          <p className="hero__description">
            Practical knowledge, business thinking and actionable growth
            for people ready to stop merely having ideas and start
            building, learning, earning and growing.
          </p>

          <div className="hero__actions">
            <Link to="/books" className="hero__primary-button">
              Explore the Book
              <ArrowRight size={17} strokeWidth={1.8} />
            </Link>

            <Link to="/about" className="hero__secondary-button">
              Discover LEAFYGREENDZ
            </Link>
          </div>

          <div className="hero__principle">
            <span className="hero__principle-line" />
            <span>
              Learn. Apply. Build. Grow.
            </span>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-label">
            <span>01</span>
            <span>FEATURED DIGITAL PRODUCT</span>
          </div>

          <div className="hero__image-wrapper">
            <img
              src={bookShowcase}
              alt="7 Laws to Successful Startups — The LeafyGreendz Angle"
              className="hero__image"
            />
          </div>

          <div className="hero__visual-caption">
            <span>7 LAWS TO SUCCESSFUL STARTUPS</span>
            <span>THE LEAFYGREENDZ ANGLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;