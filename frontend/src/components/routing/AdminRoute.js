"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Spinner from "../layout/Spinner"

const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext)

  if (loading) {
    return <Spinner />
  }

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />
}

export default AdminRoute

