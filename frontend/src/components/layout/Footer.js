import { Link } from "react-router-dom"
import "./Layout.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Virtual Vows</h3>
            <p>
              Exquisite jewelry for life's special moments. Our pieces are crafted with the finest materials and
              attention to detail.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Shop</h3>
            <div className="footer-links">
              <Link to="/shop/rings" className="footer-link">
                Rings
              </Link>
              <Link to="/shop/necklaces" className="footer-link">
                Necklaces
              </Link>
              <Link to="/shop/earrings" className="footer-link">
                Earrings
              </Link>
              <Link to="/shop/bracelets" className="footer-link">
                Bracelets
              </Link>
              <Link to="/shop/wedding" className="footer-link">
                Wedding Collection
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Customer Service</h3>
            <div className="footer-links">
              <Link to="/contact" className="footer-link">
                Contact Us
              </Link>
              <Link to="/shipping" className="footer-link">
                Shipping & Returns
              </Link>
              <Link to="/warranty" className="footer-link">
                Warranty
              </Link>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
              <Link to="/size-guide" className="footer-link">
                Size Guide
              </Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Account</h3>
            <div className="footer-links">
              <Link to="/login" className="footer-link">
                Sign In
              </Link>
              <Link to="/register" className="footer-link">
                Register
              </Link>
              <Link to="/orders" className="footer-link">
                Order History
              </Link>
              <Link to="/wishlist" className="footer-link">
                Wishlist
              </Link>
              <Link to="/virtual-try-on" className="footer-link">
                Virtual Try-On
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Virtual Vows. All rights reserved.</p>
          <p>
            <Link to="/privacy-policy">Privacy Policy</Link> |<Link to="/terms-of-service"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

