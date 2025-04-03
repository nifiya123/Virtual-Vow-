"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "./ProductCard"
import FilterSection from "./FilterSection"
import Pagination from "./Pagination"
import SortDropdown from "./SortDropdown"
import "./Shop.css"

// Sample products data to use if API fails or returns empty
const sampleProducts = [
  {
    _id: "1",
    name: "Diamond Solitaire Ring",
    category: "Rings",
    price: 1299.99,
    originalPrice: 1499.99,
    shortDescription: "Elegant diamond solitaire ring in 18k white gold setting.",
    inventory: 10,
    featured: true,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["White Gold", "Diamond"],
    gemstones: ["Diamond"],
    collections: ["Wedding"],
  },
  {
    _id: "2",
    name: "Pearl Necklace",
    category: "Necklaces",
    price: 899.99,
    originalPrice: null,
    shortDescription: "Stunning freshwater pearl necklace with sterling silver clasp.",
    inventory: 15,
    featured: true,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["Sterling Silver", "Pearl"],
    gemstones: ["Pearl"],
    collections: ["Classic"],
  },
  {
    _id: "3",
    name: "Sapphire Earrings",
    category: "Earrings",
    price: 749.99,
    originalPrice: 899.99,
    shortDescription: "Beautiful sapphire drop earrings in 14k yellow gold.",
    inventory: 8,
    featured: false,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["Yellow Gold", "Sapphire"],
    gemstones: ["Sapphire"],
    collections: ["Gemstone"],
  },
  {
    _id: "4",
    name: "Gold Chain Bracelet",
    category: "Bracelets",
    price: 599.99,
    originalPrice: null,
    shortDescription: "Elegant 18k gold chain bracelet with lobster clasp.",
    inventory: 12,
    featured: false,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["Yellow Gold"],
    gemstones: [],
    collections: ["Classic"],
  },
  {
    _id: "5",
    name: "Ruby Pendant",
    category: "Pendants",
    price: 849.99,
    originalPrice: 999.99,
    shortDescription: "Stunning ruby pendant in 14k white gold setting with diamond accents.",
    inventory: 6,
    featured: true,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["White Gold", "Ruby", "Diamond"],
    gemstones: ["Ruby", "Diamond"],
    collections: ["Gemstone"],
  },
  {
    _id: "6",
    name: "Emerald Tennis Bracelet",
    category: "Bracelets",
    price: 1899.99,
    originalPrice: 2199.99,
    shortDescription: "Luxurious emerald tennis bracelet in 18k white gold setting.",
    inventory: 4,
    featured: true,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["White Gold", "Emerald"],
    gemstones: ["Emerald"],
    collections: ["Luxury"],
  },
  {
    _id: "7",
    name: "Diamond Stud Earrings",
    category: "Earrings",
    price: 999.99,
    originalPrice: null,
    shortDescription: "Classic diamond stud earrings in 14k white gold setting.",
    inventory: 20,
    featured: false,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["White Gold", "Diamond"],
    gemstones: ["Diamond"],
    collections: ["Classic"],
  },
  {
    _id: "8",
    name: "Amethyst Cocktail Ring",
    category: "Rings",
    price: 699.99,
    originalPrice: 799.99,
    shortDescription: "Statement amethyst cocktail ring in 14k yellow gold setting.",
    inventory: 9,
    featured: false,
    images: ["/placeholder.svg?height=300&width=300"],
    materials: ["Yellow Gold", "Amethyst"],
    gemstones: ["Amethyst"],
    collections: ["Gemstone"],
  },
]

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    priceRange: {
      min: searchParams.get("minPrice") || "",
      max: searchParams.get("maxPrice") || "",
    },
    materials: searchParams.getAll("material") || [],
    gemstones: searchParams.getAll("gemstone") || [],
    collections: searchParams.getAll("collection") || [],
  })
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "newest")
  const [viewMode, setViewMode] = useState("grid")
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Build query parameters
        const params = new URLSearchParams()
        params.append("page", currentPage)
        params.append("limit", productsPerPage)
        params.append("sort", sortOption)

        if (filters.category) params.append("category", filters.category)
        if (filters.priceRange.min) params.append("minPrice", filters.priceRange.min)
        if (filters.priceRange.max) params.append("maxPrice", filters.priceRange.max)
        filters.materials.forEach((material) => params.append("material", material))
        filters.gemstones.forEach((gemstone) => params.append("gemstone", gemstone))
        filters.collections.forEach((collection) => params.append("collection", collection))

        // Search term
        const searchTerm = searchParams.get("search")
        if (searchTerm) params.append("search", searchTerm)

        try {
          // Try to fetch from API
          const response = await axios.get(`/api/products?${params.toString()}`)

          if (response.data && response.data.products && response.data.products.length > 0) {
            setProducts(response.data.products)
            setTotalProducts(response.data.totalProducts)
          } else {
            console.log("API returned empty products, using sample data")
            // Use sample data if API returns empty
            setProducts(sampleProducts)
            setTotalProducts(sampleProducts.length)
          }
        } catch (apiError) {
          console.error("Error fetching from API:", apiError)
          console.log("Using sample products data instead")
          // Use sample data if API fails
          setProducts(sampleProducts)
          setTotalProducts(sampleProducts.length)
        }
      } catch (error) {
        console.error("Error in fetchProducts:", error)
        setError("Failed to load products. Please try again later.")
        // Use sample data as fallback
        setProducts(sampleProducts)
        setTotalProducts(sampleProducts.length)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, productsPerPage, sortOption, filters, searchParams])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)

    // Update URL search params
    const params = new URLSearchParams()

    if (newFilters.category) params.set("category", newFilters.category)
    if (newFilters.priceRange.min) params.set("minPrice", newFilters.priceRange.min)
    if (newFilters.priceRange.max) params.set("maxPrice", newFilters.priceRange.max)

    // Clear existing array params
    params.delete("material")
    params.delete("gemstone")
    params.delete("collection")

    // Add new array params
    newFilters.materials.forEach((material) => params.append("material", material))
    newFilters.gemstones.forEach((gemstone) => params.append("gemstone", gemstone))
    newFilters.collections.forEach((collection) => params.append("collection", collection))

    // Preserve sort and search
    if (sortOption) params.set("sort", sortOption)
    const searchTerm = searchParams.get("search")
    if (searchTerm) params.set("search", searchTerm)

    setSearchParams(params)
  }

  const handleSortChange = (option) => {
    setSortOption(option)

    // Update URL search params
    const params = new URLSearchParams(searchParams)
    params.set("sort", option)
    setSearchParams(params)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop Our Collection</h1>
        <p>Discover our exquisite jewelry pieces crafted with precision and passion</p>
      </div>

      <div className="shop-container">
        <FilterSection filters={filters} onFilterChange={handleFilterChange} />

        <div className="shop-content">
          <div className="shop-toolbar">
            <div className="product-count">
              {loading ? "Loading..." : `Showing ${products.length} of ${totalProducts} products`}
            </div>

            <div className="shop-actions">
              <SortDropdown value={sortOption} onChange={handleSortChange} />

              <div className="view-toggle">
                <button
                  className={`view-button ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  className={`view-button ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className={`products-container ${viewMode}`}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop

