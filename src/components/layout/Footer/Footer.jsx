import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              LEAFYGREENDZ
            </Link>

            <p className="footer__description">
              Practical ideas, knowledge, and perspectives for people building
              meaningful businesses.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h2>Explore</h2>

              <Link to="/books">
                Books
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>

              <Link to="/about">
                About
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>

              <Link to="/contact">
                Contact
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>
            </div>

            <div className="footer__column">
              <h2>Account</h2>

              <Link to="/account">
                My Account
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>

              <Link to="/cart">
                Cart
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </Link>
            </div>

            <div className="footer__column">
              <h2>Stay Connected</h2>

              <a href="mailto:hello@leafygreendz.com">
                Email Us
                <ArrowUpRight size={14} strokeWidth={1.7} />
              </a>

              <div className="footer__socials">
                <a href="#" aria-label="Instagram">
                  Instagram
                </a>

                <a href="#" aria-label="LinkedIn">
                  LinkedIn
                </a>

                <a
                  href="mailto:hello@leafygreendz.com"
                  aria-label="Email"
                >
                  <Mail size={17} strokeWidth={1.7} />
                </a>
              </div>
            </div>
          </div>
        </div>

                <div className="footer__bottom">
          <p>© {currentYear} LEAFYGREENDZ. All rights reserved.</p>

          <p className="footer__credit">
            Designed & Developed by{" "}
            <span>Balora</span>
          </p>

          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;