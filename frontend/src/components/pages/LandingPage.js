import { Link } from "react-router-dom"
import "./Pages.css"

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Virtual Vows</h1>
        <p>Exquisite Jewelry for Life's Special Moments</p>
        <div className="hero-buttons">
          <Link to="/shop" className="btn btn-primary">
            Shop Collection
          </Link>
          <Link to="/virtual-try-on" className="btn btn-secondary">
            Virtual Try-On
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="features-section">
        <h2 className="section-title">Our Collection</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-ring"></i>
            <h3>Engagement Rings</h3>
            <p>Perfect symbols of your commitment and love</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-gem"></i>
            <h3>Diamond Jewelry</h3>
            <p>Stunning pieces that capture light and attention</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-magic"></i>
            <h3>Virtual Try-On</h3>
            <p>Experience our jewelry virtually before you buy</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-gift"></i>
            <h3>Custom Designs</h3>
            <p>Create personalized jewelry for special occasions</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="featured-products">
        <h2 className="section-title">Featured Jewelry</h2>
        <div className="product-grid">
          <div className="product-card">
            <div className="product-image">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Diamond Ring"
              />
            </div>
            <div className="product-info">
              <div className="product-category">Rings</div>
              <h3 className="product-name">Elegant Diamond Solitaire</h3>
              <div className="product-price">$1,299.99</div>
              <div className="product-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wishlist-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Gold Necklace"
              />
            </div>
            <div className="product-info">
              <div className="product-category">Necklaces</div>
              <h3 className="product-name">Gold Pendant Necklace</h3>
              <div className="product-price">$899.99</div>
              <div className="product-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wishlist-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Diamond Earrings"
              />
            </div>
            <div className="product-info">
              <div className="product-category">Earrings</div>
              <h3 className="product-name">Diamond Stud Earrings</h3>
              <div className="product-price">$749.99</div>
              <div className="product-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wishlist-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-image">
              <img
                src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Pearl Bracelet"
              />
            </div>
            <div className="product-info">
              <div className="product-category">Bracelets</div>
              <h3 className="product-name">Pearl Tennis Bracelet</h3>
              <div className="product-price">$599.99</div>
              <div className="product-actions">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wishlist-btn">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link to="/shop" className="btn btn-outline">
            View All Collection
          </Link>
        </div>
      </div>

      {/* Virtual Try-On Section */}
      <div className="try-on-section">
        <div className="try-on-content">
          <h2 className="section-title">Virtual Jewelry Try-On</h2>
          <p>
            Experience our jewelry before you buy. Our virtual try-on technology lets you see how our pieces look on you
            using your camera or uploaded photos.
          </p>
          <div className="try-on-image">
            <img
              src="https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Virtual Try-On"
            />
          </div>
          <Link to="/virtual-try-on" className="btn btn-primary">
            Try Jewelry Now
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2 className="section-title">Customer Stories</h2>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "The virtual try-on feature helped me find the perfect engagement ring for my fiancée. The quality of the
              jewelry exceeded my expectations!"
            </div>
            <div className="testimonial-author">
              <div className="author-image">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Michael"
                />
              </div>
              <div className="author-info">
                <h4>Michael T.</h4>
                <p>Satisfied Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

