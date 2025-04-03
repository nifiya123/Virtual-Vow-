"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem("token")) {
        try {
          // In a real app, you would verify the token with your backend
          const userData = JSON.parse(localStorage.getItem("userData"))
          console.log("Found user data in localStorage:", userData)
          setUser(userData)
          setIsAuthenticated(true)
          setIsAdmin(userData.role === "admin")
          console.log("User authenticated, isAdmin:", userData.role === "admin")
        } catch (err) {
          console.error("Error parsing user data:", err)
          localStorage.removeItem("token")
          localStorage.removeItem("userData")
          setError("Authentication failed. Please login again.")
        }
      }
      setLoading(false)
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    setError(null)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      if (userData.email === "existing@example.com") {
        setError("User already exists")
        return { success: false }
      }

      // Simulate API response
      const response = {
        data: {
          token: "sample-token-12345",
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name: userData.name,
            email: userData.email,
            role: "user",
          },
        },
      }

      // Set token in localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userData", JSON.stringify(response.data.user))

      // Update state
      setUser(response.data.user)
      setIsAuthenticated(true)
      setIsAdmin(false)

      return { success: true, redirect: "/dashboard" }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      return { success: false }
    }
  }

  // Login user
  const login = async (email, password) => {
    setError(null)
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate authentication

      // Simulate failed login
      if (email !== "user@example.com" || password !== "password") {
        setError("Invalid credentials")
        return { success: false }
      }

      // Simulate successful login
      const response = {
        data: {
          token: "sample-token-12345",
          user: {
            id: "123456",
            name: "John Doe",
            email: "user@example.com",
            role: "user",
          },
        },
      }

      // Set token in localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userData", JSON.stringify(response.data.user))

      // Update state
      setUser(response.data.user)
      setIsAuthenticated(true)
      setIsAdmin(false)

      return { success: true, redirect: "/dashboard" }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
      return { success: false }
    }
  }

  // Login admin
  const loginAdmin = async (email, password) => {
    setError(null)
    try {
      console.log("Attempting admin login for:", email)

      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate authentication

      // Simulate failed login
      if (email !== "admin@example.com" || password !== "adminpass") {
        console.log("Invalid admin credentials")
        setError("Invalid admin credentials")
        return { success: false }
      }

      // Simulate successful login
      const response = {
        data: {
          token: "admin-token-67890",
          user: {
            id: "admin123",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
          },
        },
      }

      console.log("Admin login successful, setting user data:", response.data.user)

      // Set token in localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("userData", JSON.stringify(response.data.user))

      // Update state
      setUser(response.data.user)
      setIsAuthenticated(true)
      setIsAdmin(true)

      return { success: true, redirect: "/admin/dashboard" }
    } catch (err) {
      console.error("Admin login error:", err)
      setError(err.response?.data?.message || "Admin login failed. Please try again.")
      return { success: false }
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        error,
        register,
        login,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

