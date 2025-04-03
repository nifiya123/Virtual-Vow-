"use client"

import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Spinner from "../layout/Spinner"

const UserRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return <Spinner />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default UserRoute

