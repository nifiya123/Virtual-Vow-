import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import LandingPage from "./components/pages/LandingPage"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AdminLogin from "./components/auth/AdminLogin"
import UserHome from "./components/pages/UserHome"
import AdminPanel from "./components/pages/AdminPanel"
import ShoppingCart from "./components/cart/ShoppingCart"
import VirtualTryOn from "./components/virtual-try-on/VirtualTryOn"
import Shop from "./components/Shop"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/virtual-try-on" element={<VirtualTryOn />} />
                <Route path="/dashboard" element={<UserHome />} />
                <Route path="/admin/dashboard" element={<AdminPanel />} />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

