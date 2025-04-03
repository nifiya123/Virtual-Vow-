"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getFeaturedProducts } from "../api/productService"
import "./ProductCard.css"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const data = await getFeaturedProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError("Failed to load featured products. Please try again later.")
        console.error("Error fetching featured products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  // Fallback data in case API fails
  const fallbackProducts = [
    {
      _id: "fallback1",
      name: "Diamond Ring",
      price: 1299.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "rings",
    },
    {
      _id: "fallback2",
      name: "Gold Necklace",
      price: 899.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "necklaces",
    },
    {
      _id: "fallback3",
      name: "Pearl Earrings",
      price: 499.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "earrings",
    },
    {
      _id: "fallback4",
      name: "Silver Bracelet",
      price: 349.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "bracelets",
    },
  ]

  // Use fallback data if there's an error or no products
  const displayProducts = (error || products.length === 0) && !loading ? fallbackProducts : products

  return (
    <section className="featured-products-section">
      <div className="section-header">
        <h2>Featured Jewelry</h2>
        <Link to="/shop" className="view-all-link">
          View All
        </Link>
      </div>

      {loading ? (
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading featured products...</p>
        </div>
      ) : (
        <>
          {error && <div className="error-message">{error}</div>}

          <div className="products-grid">
            {displayProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-image-container">
                  <img
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <Link to={`/products/${product._id}`} className="view-details-btn">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    {product.virtualTryOn && (
                      <Link to={`/virtual-try-on/${product._id}`} className="try-on-btn">
                        Try On
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default FeaturedProducts

