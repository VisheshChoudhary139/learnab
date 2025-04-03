import React from "react";
import "./Footer.css";

const Footer = ({ onNavigate }) => {
  return (
      <div className="footer-page">
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <button onClick={() => onNavigate("home")} className="footer-logo-title">
                <img src="./logo_.png" alt="Logo" className="footer-logo" />
                <span className="footer-title">Learnab</span>
              </button>
              <div className="footer-socials">
                <a href="#" className="social-circle">
                  <img src="./instagram.png" alt="Instagram" className="social-icon" />
                </a>
                <a href="#" className="social-circle">
                  <img src="./facebook.png" alt="Facebook" className="social-icon" />
                </a>
                <a href="#" className="social-circle">
                  <img src="./twitter.png" alt="Twitter" className="social-icon" />
                </a>
                <a href="#" className="social-circle">
                  <img src="./telegram.png" alt="Telegram" className="social-icon" />
                </a>
              </div>
            </div>

            {/* Center Section for About Us & Contact Us */}
            <div className="footer-center">
              <button onClick={() => onNavigate("about")} className="footer-link">About Us</button>
              <button onClick={() => onNavigate("about")} className="footer-link">Contact Us</button>
            </div>

            {/* New Right Section for Newsletter */}
            <div className="footer-right">
              <p className="footer-news-text">Get regular updates :</p>
              <div className="newsletter">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button type="submit" className="newsletter-submit">Submit</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">@learnable. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
  );
};

export default Footer;
