"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Admin.css"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    // Simulate fetching products
    const fetchProducts = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockProducts = [
          {
            id: 1,
            name: "Diamond Engagement Ring",
            price: 1999.99,
            category: "rings",
            stock: 15,
            featured: true,
          },
          {
            id: 2,
            name: "Gold Necklace",
            price: 799.99,
            category: "necklaces",
            stock: 8,
            featured: true,
          },
          {
            id: 3,
            name: "Pearl Earrings",
            price: 249.99,
            category: "earrings",
            stock: 20,
            featured: false,
          },
        ]

        setProducts(mockProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
        setSelectedProducts([])
        alert("Products deleted successfully!")
      } catch (error) {
        console.error("Error deleting products:", error)
        alert("Error deleting products. Please try again.")
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  return (
    <div className="admin-container">
      <div className="product-list">
        <div className="product-list-header">
          <h2>Jewelry Products</h2>
          <Link to="/admin/products/new" className="add-product-button">
            Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products found. Add your first product to get started.</p>
            <Link to="/admin/products/new" className="add-product-button">
              Add Product
            </Link>
          </div>
        ) : (
          <>
            <div className="product-actions">
              {selectedProducts.length > 0 && (
                <button onClick={handleDeleteSelected} className="delete-button">
                  Delete Selected ({selectedProducts.length})
                </button>
              )}
            </div>

            <div className="product-table-container">
              <table className="product-table golden-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.category}</td>
                      <td>
                        <span className={product.stock < 5 ? "low-stock" : ""}>{product.stock}</span>
                      </td>
                      <td>{product.featured ? "Yes" : "No"}</td>
                      <td>
                        <button className="edit-button">Edit</button>
                        <button className="view-button">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProductList

