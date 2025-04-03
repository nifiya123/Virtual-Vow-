/**
 * Service for handling product-related API calls
 */
const API_URL = process.env.REACT_APP_API_URL || ""

/**
 * Fetch all products
 * @param {Object} filters - Optional filters for products
 * @returns {Promise<Array>} - Array of products
 */
export const getProducts = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value)
      }
    })

    const queryString = queryParams.toString()
    const url = `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

/**
 * Fetch featured products
 * @returns {Promise<Array>} - Array of featured products
 */
export const getFeaturedProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products/featured`)

    if (!response.ok) {
      throw new Error("Failed to fetch featured products")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching featured products:", error)
    throw error
  }
}

/**
 * Get a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Product object
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}

/**
 * Create a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} - Created product
 */
export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create product")
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

/**
 * Update an existing product
 * @param {string} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} - Updated product
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to update product")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to delete product")
    }

    return await response.json()
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}

