"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import ProductCard from "../ui/ProductCard"
import Carousel from "../ui/Carousel"
import CategorySection from "../ui/CategorySection"
import TestimonialSlider from "../ui/TestimonialSlider"
import "./Home.css"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featuredRes, newArrivalsRes, bestSellersRes] = await Promise.all([
          axios.get("/api/products/featured"),
          axios.get("/api/products/new-arrivals"),
          axios.get("/api/products/best-sellers"),
        ])

        setFeaturedProducts(featuredRes.data)
        setNewArrivals(newArrivalsRes.data)
        setBestSellers(bestSellersRes.data)
      } catch (error) {
        console.error("Error fetching home data:", error)
        // If API fails, use fallback data
        setFeaturedProducts(fallbackFeaturedProducts)
        setNewArrivals(fallbackNewArrivals)
        setBestSellers(fallbackBestSellers)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  // Hero banner slides
  const heroSlides = [
    {
      id: 1,
      image: "/images/hero-1.jpg",
      title: "Elegant Collection 2023",
      subtitle: "Discover timeless beauty with our new collection",
      buttonText: "Shop Now",
      buttonLink: "/shop?collection=elegant-2023",
    },
    {
      id: 2,
      image: "/images/hero-2.jpg",
      title: "Virtual Try-On Experience",
      subtitle: "See how our jewelry looks on you before you buy",
      buttonText: "Try Now",
      buttonLink: "/virtual-try-on",
    },
    {
      id: 3,
      image: "/images/hero-3.jpg",
      title: "Exclusive Wedding Collection",
      subtitle: "Make your special day even more memorable",
      buttonText: "Explore",
      buttonLink: "/shop?category=wedding",
    },
  ]

  // Categories
  const categories = [
    {
      id: 1,
      name: "Rings",
      image: "/images/category-rings.jpg",
      link: "/shop?category=rings",
    },
    {
      id: 2,
      name: "Necklaces",
      image: "/images/category-necklaces.jpg",
      link: "/shop?category=necklaces",
    },
    {
      id: 3,
      name: "Earrings",
      image: "/images/category-earrings.jpg",
      link: "/shop?category=earrings",
    },
    {
      id: 4,
      name: "Bracelets",
      image: "/images/category-bracelets.jpg",
      link: "/shop?category=bracelets",
    },
    {
      id: 5,
      name: "Wedding",
      image: "/images/category-wedding.jpg",
      link: "/shop?category=wedding",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Loyal Customer",
      image: "/images/testimonial-1.jpg",
      text: "The virtual try-on feature is amazing! I was able to see exactly how the necklace would look on me before purchasing. The quality of the jewelry exceeded my expectations.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Wedding Customer",
      image: "/images/testimonial-2.jpg",
      text: "We ordered our wedding rings from Virtual Vow and couldn't be happier. The customer service was exceptional and the rings are absolutely stunning.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Fashion Blogger",
      image: "/images/testimonial-3.jpg",
      text: "As someone who reviews jewelry often, I can confidently say that Virtual Vow offers some of the best quality pieces I've seen. The attention to detail is remarkable.",
    },
  ]

  // Fallback data in case API fails
  const fallbackFeaturedProducts = [
    {
      _id: "1",
      name: "Diamond Solitaire Ring",
      price: 1999.99,
      image: "/images/products/ring-1.jpg",
      category: "Rings",
      rating: 4.8,
      numReviews: 12,
      featured: true,
    },
    {
      _id: "2",
      name: "Pearl Drop Earrings",
      price: 899.99,
      image: "/images/products/earrings-1.jpg",
      category: "Earrings",
      rating: 4.5,
      numReviews: 8,
      featured: true,
    },
    {
      _id: "3",
      name: "Gold Tennis Bracelet",
      price: 2499.99,
      image: "/images/products/bracelet-1.jpg",
      category: "Bracelets",
      rating: 4.9,
      numReviews: 15,
      featured: true,
    },
    {
      _id: "4",
      name: "Sapphire Pendant Necklace",
      price: 1499.99,
      image: "/images/products/necklace-1.jpg",
      category: "Necklaces",
      rating: 4.7,
      numReviews: 10,
      featured: true,
    },
  ]

  const fallbackNewArrivals = [
    {
      _id: "5",
      name: "Emerald Cut Earrings",
      price: 1299.99,
      image: "/images/products/earrings-2.jpg",
      category: "Earrings",
      rating: 4.6,
      numReviews: 5,
    },
    {
      _id: "6",
      name: "Rose Gold Wedding Band",
      price: 999.99,
      image: "/images/products/ring-2.jpg",
      category: "Rings",
      rating: 4.8,
      numReviews: 7,
    },
    {
      _id: "7",
      name: "Diamond Tennis Necklace",
      price: 3499.99,
      image: "/images/products/necklace-2.jpg",
      category: "Necklaces",
      rating: 4.9,
      numReviews: 3,
    },
    {
      _id: "8",
      name: "Platinum Charm Bracelet",
      price: 1799.99,
      image: "/images/products/bracelet-2.jpg",
      category: "Bracelets",
      rating: 4.7,
      numReviews: 4,
    },
  ]

  const fallbackBestSellers = [
    {
      _id: "9",
      name: "Diamond Eternity Band",
      price: 2999.99,
      image: "/images/products/ring-3.jpg",
      category: "Rings",
      rating: 4.9,
      numReviews: 25,
    },
    {
      _id: "10",
      name: "Pearl Stud Earrings",
      price: 599.99,
      image: "/images/products/earrings-3.jpg",
      category: "Earrings",
      rating: 4.8,
      numReviews: 18,
    },
    {
      _id: "11",
      name: "White Gold Chain",
      price: 1299.99,
      image: "/images/products/necklace-3.jpg",
      category: "Necklaces",
      rating: 4.7,
      numReviews: 22,
    },
    {
      _id: "12",
      name: "Diamond Bangle",
      price: 1999.99,
      image: "/images/products/bracelet-3.jpg",
      category: "Bracelets",
      rating: 4.8,
      numReviews: 20,
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero-section">
        <Carousel slides={heroSlides} autoPlay={true} interval={5000} />
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find the perfect piece for every occasion</p>
        </div>
        <CategorySection categories={categories} />
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/shop?featured=true" className="view-all">
            View All
          </Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            featuredProducts.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </section>

      {/* Virtual Try-On Banner */}
      <section className="try-on-banner">
        <div className="try-on-content">
          <h2>Virtual Jewelry Try-On</h2>
          <p>See how our jewelry looks on you before you buy. Try our virtual fitting room now!</p>
          <Link to="/virtual-try-on" className="try-on-button">
            Try Now
          </Link>
        </div>
        <div className="try-on-image">
          <img src="/images/virtual-try-on.jpg" alt="Virtual Try-On" />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="section-header">
          <h2>New Arrivals</h2>
          <Link to="/shop?sort=newest" className="view-all">
            View All
          </Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            newArrivals.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
        </div>
        <TestimonialSlider testimonials={testimonials} />
      </section>

      {/* Best Sellers */}
      <section className="products-section">
        <div className="section-header">
          <h2>Best Sellers</h2>
          <Link to="/shop?sort=best-selling" className="view-all">
            View All
          </Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            bestSellers.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Be the first to know about new collections, exclusive offers, and jewelry care tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Home

