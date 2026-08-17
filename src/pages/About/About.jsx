import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* ========================================
          HERO
          ======================================== */}

      <section className="about-hero">
        <div className="about__container">

          <p className="about-hero__eyebrow">
            ABOUT LEAFYGREENDZ
          </p>

          <h1 className="about-hero__title">
            Turning ideas into action.
            <br />
            Turning knowledge into income.
          </h1>

          <p className="about-hero__intro">
            LeafyGreendz Business Concept is a practical
            business, entrepreneurship and personal-development
            platform created for people who are ready to stop
            merely having ideas and start building, learning,
            earning and growing.
          </p>

        </div>
      </section>


      {/* ========================================
          PHILOSOPHY
          ======================================== */}

      <section className="about-philosophy">
        <div className="about__container">

          <div className="about-section-heading">
            <p>OUR PHILOSOPHY</p>
            <span />
          </div>

          <div className="about-philosophy__content">

            <h2>
              Knowledge should not end
              in your notebook.
            </h2>

            <div>
              <p>
                In a world overflowing with information,
                the real challenge is no longer finding
                knowledge. The challenge is knowing what
                to do with it.
              </p>

              <p>
                That is where LeafyGreendz Business Concept
                comes in.
              </p>

              <strong>
                It should produce action.
              </strong>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================
          WHAT WE DO
          ======================================== */}

      <section className="about-work">
        <div className="about__container">

          <div className="about-section-heading">
            <p>WHAT WE DO</p>
            <span />
          </div>

          <div className="about-work__content">

            <h2>
              Practical knowledge
              for practical growth.
            </h2>

            <p>
              We create practical digital products designed
              to simplify complex ideas, expose profitable
              opportunities, strengthen business thinking and
              give people clear steps they can actually apply.
            </p>

          </div>

          <div className="about-work__principles">

            <div>
              <span>01</span>
              <h3>Think Better</h3>
              <p>
                Develop clearer business thinking and
                understand opportunities with greater depth.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>Start Smarter</h3>
              <p>
                Turn promising ideas into practical plans
                instead of waiting for everything to be perfect.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>Build & Grow</h3>
              <p>
                Apply knowledge, create systems and build
                something that can actually work.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================
          WHO IT'S FOR
          ======================================== */}

      <section className="about-audience">
        <div className="about__container">

          <div className="about-section-heading">
            <p>WHO IT'S FOR</p>
            <span />
          </div>

          <div className="about-audience__content">

            <h2>
              Built for people
              ready to move.
            </h2>

            <div className="about-audience__list">

              <div>
                <span>01</span>
                <p>Aspiring entrepreneurs</p>
              </div>

              <div>
                <span>02</span>
                <p>Existing business owners</p>
              </div>

              <div>
                <span>03</span>
                <p>Professionals expanding their skills</p>
              </div>

              <div>
                <span>04</span>
                <p>Side-hustlers searching for opportunities</p>
              </div>

              <div>
                <span>05</span>
                <p>People improving their business knowledge</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================
          CTA
          ======================================== */}

      <section className="about-cta">
        <div className="about__container">

          <p>START HERE</p>

          <h2>
            An idea is only
            the beginning.
          </h2>

          <Link
            to="/books"
            className="about-cta__button"
          >
            Explore Our Books

            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default About;