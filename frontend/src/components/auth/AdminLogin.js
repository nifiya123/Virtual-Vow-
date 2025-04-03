"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./Auth.css"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { loginAdmin, isAuthenticated, isAdmin, error } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if already authenticated as admin
    if (isAuthenticated && isAdmin) {
      console.log("Already authenticated as admin, redirecting to admin dashboard")
      navigate("/admin/dashboard")
    }
  }, [isAuthenticated, isAdmin, navigate])

  const validateForm = () => {
    const errors = {}
    let isValid = true

    if (!formData.email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      errors.password = "Password is required"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      const { email, password } = formData
      console.log("Attempting admin login with:", email)
      const result = await loginAdmin(email, password)
      console.log("Login result:", result)

      if (result.success) {
        console.log("Admin login successful, redirecting to:", result.redirect || "/admin/dashboard")
        navigate(result.redirect || "/admin/dashboard")
      }

      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container admin-login">
        <h2>Virtual Vows Admin Portal</h2>
        <p>Secure access for jewelry store management</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              className={formErrors.email ? "error" : ""}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              className={formErrors.password ? "error" : ""}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>

          <button type="submit" className="auth-button admin-button" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Admin Login"}
          </button>
        </form>

        <p className="auth-redirect">
          <Link to="/login">Back to User Login</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin

