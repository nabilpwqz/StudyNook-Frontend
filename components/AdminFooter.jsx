import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock 
} from 'react-icons/fi';
import './footer.css';

const AdminFooter = () => {
  
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="library-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-about-text">
              StudyNook digitizes library room management, enabling real-time discovery and booking while preventing scheduling conflicts through automated logic. It streamlines access, improves resource utilization, and delivers a seamless experience for both students and room providers.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/admin" className="footer-link" onClick={handleLinkClick}>Dashboard</Link></li>
              <li><Link to="/admin/viewbook" className="footer-link" onClick={handleLinkClick}>View Books</Link></li>
              <li><Link to="/admin/addbook" className="footer-link" onClick={handleLinkClick}>Add Books</Link></li>
              <li><Link to="/admin/issued" className="footer-link" onClick={handleLinkClick}>Books Borrowed</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact-info">
              <li className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>122 College Avenue, Academic City, AC 21453</span>
              </li>
              <li className="contact-item">
                <FiMail className="contact-icon" />
                <span>library@college.edu</span>
              </li>
              <li className="contact-item">
                <FiPhone className="contact-icon" />
                <span>(923) 486-7790</span>
              </li>
              <li className="contact-item">
                <FiClock className="contact-icon" />
                <div>
                  <p>Mon-Fri: 8:30 AM - 10:30 PM</p>
                  <p>Sat-Sun: 10:00 AM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} StudyNook. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link to="/privacy" className="legal-link" onClick={handleLinkClick}>Privacy Policy</Link>
            <Link to="/terms" className="legal-link" onClick={handleLinkClick}>Terms of Use</Link>
            <Link to="/accessibility" className="legal-link" onClick={handleLinkClick}>Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;