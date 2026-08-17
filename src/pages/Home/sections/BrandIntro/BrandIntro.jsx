import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./BrandIntro.css";

function BrandIntro() {
  return (
    <section className="brand-intro">
      <div className="brand-intro__container">
        <div className="brand-intro__top">
          <p className="brand-intro__eyebrow">
            WHY LEAFYGREENDZ
          </p>

          <span className="brand-intro__number">
            02
          </span>
        </div>

        <div className="brand-intro__content">
          <h2 className="brand-intro__title">
            You don't need
            <span>more noise.</span>
          </h2>

          <div className="brand-intro__right">
            <p className="brand-intro__lead">
              You need clarity.
            </p>

            <p className="brand-intro__text">
              In a world overflowing with information, the real
              challenge is knowing what to do with it. LEAFYGREENDZ
              exists to turn practical knowledge into ideas you can
              understand, apply and build on.
            </p>

            <p className="brand-intro__text">
              From business and entrepreneurship to personal
              development, productivity, marketing and practical
              opportunities, we create resources designed to help
              you take the next step.
            </p>

            <Link
              to="/about"
              className="brand-intro__link"
            >
              More about LEAFYGREENDZ
              <ArrowUpRight size={16} strokeWidth={1.7} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default BrandIntro;