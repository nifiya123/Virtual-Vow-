"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { uploadFiles, createFilePreviews, revokeFilePreviews } from "../../utils/fileUpload"
import "./Admin.css"
import "./AdminTheme.css"

const AddProduct = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
  })

  // Separate state for file uploads
  const [productImages, setProductImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      revokeFilePreviews(previewImages)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    // Validate files
    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith("image/")
      if (!isValid) {
        setError("Please upload only image files (jpg, png, etc.)")
      }
      return isValid
    })

    if (validFiles.length > 0) {
      setError("")

      // Clean up old preview URLs
      revokeFilePreviews(previewImages)

      // Set new files and previews
      setProductImages(validFiles)
      const newPreviews = createFilePreviews(validFiles)
      setPreviewImages(newPreviews)
    }
  }

  const removeImage = (index) => {
    // Revoke the URL for the removed image
    URL.revokeObjectURL(previewImages[index])

    // Update state
    setProductImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (productImages.length === 0) {
      setError("Please upload at least one product image")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Upload images
      setUploading(true)
      const imageUrls = await uploadFiles(productImages)
      setUploading(false)

      // Create product data
      const productData = {
        ...formData,
        images: imageUrls,
      }

      // Simulate API call to save product
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Product added:", productData)
      alert("Product added successfully!")

      // Clean up preview URLs
      revokeFilePreviews(previewImages)

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        featured: false,
      })
      setProductImages([])
      setPreviewImages([])

      // Navigate back to products list
      navigate("/admin/products")
    } catch (error) {
      console.error("Error adding product:", error)
      setError("Failed to add product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.add("drag-over")
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("drag-over")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.classList.remove("drag-over")

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)

      // Validate files
      const validFiles = files.filter((file) => file.type.startsWith("image/"))

      if (validFiles.length > 0) {
        setError("")

        // Clean up old preview URLs
        revokeFilePreviews(previewImages)

        // Set new files and previews
        setProductImages(validFiles)
        const newPreviews = createFilePreviews(validFiles)
        setPreviewImages(newPreviews)
      } else {
        setError("Please upload only image files (jpg, png, etc.)")
      }
    }
  }

  return (
    <div className="admin-container">
      <div className="product-form golden-card">
        <div className="golden-form-header">
          <h2>Add New Jewelry Product</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label className="golden-label" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="golden-input"
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label className="golden-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="golden-input"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="golden-label" htmlFor="price">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="golden-input"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="golden-label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="golden-select"
              >
                <option value="">Select Category</option>
                <option value="rings">Rings</option>
                <option value="necklaces">Necklaces</option>
                <option value="earrings">Earrings</option>
                <option value="bracelets">Bracelets</option>
                <option value="watches">Watches</option>
              </select>
            </div>

            <div className="form-group">
              <label className="golden-label" htmlFor="stock">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="golden-input"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} />
            <label htmlFor="featured" className="checkbox-label golden-label">
              Feature this product on homepage
            </label>
          </div>

          {/* File Upload Component */}
          <div className="form-group">
            <label className="golden-label">Product Images</label>

            <div className="file-upload-container">
              <div
                className="file-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="product-images"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*"
                  className="file-input"
                />
                <label htmlFor="product-images" className="file-upload-label">
                  <div className="upload-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                  <span>Choose Images</span>
                  <span className="file-hint">or drag and drop here</span>
                </label>
              </div>

              {previewImages.length > 0 && (
                <div className="image-preview-container">
                  {previewImages.map((src, index) => (
                    <div key={index} className="image-preview">
                      <img src={src || "/placeholder.svg"} alt={`Preview ${index + 1}`} />
                      <button type="button" className="remove-image-btn" onClick={() => removeImage(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="golden-button" disabled={loading || uploading}>
              {loading || uploading ? (
                <>
                  <span className="spinner"></span>
                  {uploading ? "Uploading Images..." : "Adding Product..."}
                </>
              ) : (
                "Add Product"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="cancel-button"
              disabled={loading || uploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct

