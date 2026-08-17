import { Mail, ArrowUpRight } from "lucide-react";
import "./Contact.css";

function Contact() {
  return (
    <main className="contact-page">

      {/* ========================================
          HERO
          ======================================== */}

      <section className="contact-hero">
        <div className="contact__container">

          <p className="contact-hero__eyebrow">
            CONTACT
          </p>

          <h1 className="contact-hero__title">
            Let's start
            <br />
            a conversation.
          </h1>

          <p className="contact-hero__intro">
            Have a question, an idea, or simply want to
            connect? We'd love to hear from you.
          </p>

        </div>
      </section>


      {/* ========================================
          CONTACT CONTENT
          ======================================== */}

      <section className="contact-content">
        <div className="contact__container">

          <div className="contact-content__grid">

            {/* CONTACT INFORMATION */}

            <div className="contact-info">

              <p className="contact-info__eyebrow">
                GET IN TOUCH
              </p>

              <h2>
                We'd love to
                hear from you.
              </h2>

              <p className="contact-info__text">
                Whether you have a question about our books,
                want to share an idea, or simply want to
                connect with LeafyGreendz, send us a message.
              </p>


              <div className="contact-info__details">

                <div className="contact-info__item">

                  <span>Email</span>

                  <a href="mailto:hello@leafygreendz.com">
                    hello@leafygreendz.com
                  </a>

                </div>

              </div>

            </div>


            {/* CONTACT FORM */}

            <div className="contact-form-wrapper">

              <form className="contact-form">

                <div className="contact-form__field">

                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />

                </div>


                <div className="contact-form__field">

                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />

                </div>


                <div className="contact-form__field">

                  <label htmlFor="subject">
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    required
                  />

                </div>


                <div className="contact-form__field">

                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message..."
                    required
                  />

                </div>


                <button
                  type="submit"
                  className="contact-form__button"
                >
                  Send Message

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                  />
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================
          CLOSING STATEMENT
          ======================================== */}

      <section className="contact-closing">
        <div className="contact__container">

          <Mail
            size={25}
            strokeWidth={1.5}
          />

          <p>
            Practical knowledge.
            Business thinking.
            Actionable growth.
          </p>

        </div>
      </section>

    </main>
  );
}

export default Contact;