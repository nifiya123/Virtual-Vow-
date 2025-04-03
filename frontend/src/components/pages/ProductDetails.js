"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { CartContext } from "../../context/CartContext"
import ImageGallery from "../ui/ImageGallery"
import ProductTabs from "../ui/ProductTabs"
import RelatedProducts from "../ui/RelatedProducts"
import Spinner from "../ui/Spinner"
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/products/${id}`)
        setProduct(response.data)

        // Set default variant if available
        if (response.data.variants && response.data.variants.length > 0) {
          setSelectedVariant(response.data.variants[0])
        }

        // Fetch related products
        const relatedRes = await axios.get(`/api/products/related/${id}`)
        setRelatedProducts(relatedRes.data)
      } catch (err) {
        setError("Failed to load product details. Please try again later.")
        console.error("Error fetching product details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0 && value <= (product?.inventory || 10)) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    if (quantity < (product?.inventory || 10)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant)
  }

  const handleAddToCart = () => {
    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      images: selectedVariant ? selectedVariant.images : product.images,
      category: product.category,
      selectedVariant: selectedVariant ? selectedVariant.name : null,
      quantity: quantity,
    }

    console.log("Adding to cart from details:", productToAdd)
    addToCart(productToAdd, quantity)
    // Optional: Show a confirmation message
    alert(`${product.name} added to cart!`)
  }

  if (loading) {
    return <Spinner />
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || "Product not found"}</p>
        <Link to="/shop" className="back-button">
          Back to Shop
        </Link>
      </div>
    )
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price
  const originalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice
  const discount =
    originalPrice && currentPrice < originalPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-gallery">
          <ImageGallery images={selectedVariant?.images || product.images} alt={product.name} />
        </div>

        <div className="product-info">
          <div className="product-breadcrumb">
            <Link to="/">Home</Link> /<Link to="/shop">Shop</Link> /
            <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
          </div>

          <h1 className="product-title">{product.name}</h1>

          <div className="product-price">
            <span className="current-price">${currentPrice.toFixed(2)}</span>
            {discount > 0 && (
              <>
                <span className="original-price">${originalPrice.toFixed(2)}</span>
                <span className="discount-badge">{discount}% OFF</span>
              </>
            )}
          </div>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? "filled" : ""}`}></i>
              ))}
            </div>
            <span className="rating-count">({product.reviewCount} reviews)</span>
          </div>

          <div className="product-description">
            <p>{product.shortDescription}</p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="product-variants">
              <h3>Options</h3>
              <div className="variant-options">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    className={`variant-button ${selectedVariant?._id === variant._id ? "selected" : ""}`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decrementQuantity}>
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.inventory || 10}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button className="quantity-btn" onClick={incrementQuantity}>
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="try-on-btn">
              <Link to={`/virtual-try-on/${product._id}`}>
                <i className="fas fa-camera"></i> Virtual Try-On
              </Link>
            </button>
          </div>

          <div className="product-meta">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Availability:</strong> {product.inventory > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>Categories:</strong> {product.category}
            </p>
            <p>
              <strong>Tags:</strong> {product.tags.join(", ")}
            </p>
          </div>

          <div className="product-share">
            <span>Share:</span>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

export default ProductDetails

