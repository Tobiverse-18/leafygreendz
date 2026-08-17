import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Founder.css";

import authorPhoto from "../../../../assets/author-photo.jpg";

function Founder() {
  return (
    <section className="founder">
      <div className="founder__container">
        <div className="founder__header">
          <p className="founder__eyebrow">
            THE PERSON BEHIND THE ANGLE
          </p>

          <span className="founder__number">03</span>
        </div>

        <div className="founder__content">
          <div className="founder__image-wrapper">
            <img
              src={authorPhoto}
              alt="LEAFYGREENDZ author"
              className="founder__image"
            />

            <div className="founder__image-label">
              <span>LEAFYGREENDZ</span>
              <span>AUTHOR / FOUNDER</span>
            </div>
          </div>

          <div className="founder__details">
            <p className="founder__role">
              ENTREPRENEUR &amp; EXTERNAL AUDITOR
            </p>

            <h2 className="founder__title">
              Ideas become
              <span>more powerful</span>
              when they are applied.
            </h2>

            <p className="founder__text">
              LEAFYGREENDZ was created around a simple belief:
              practical knowledge should lead to action.
            </p>

            <p className="founder__text">
              Through practical digital resources and the
              LEAFYGREENDZ Angle, the platform explores business,
              entrepreneurship, personal development and practical
              opportunities with one goal — helping people move
              from knowing to doing.
            </p>

            <Link
              to="/about"
              className="founder__link"
            >
              About the author
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Founder;