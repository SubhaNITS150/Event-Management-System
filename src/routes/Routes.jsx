import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUpPage from "../pages/authentication/SignUp.jsx"
import HomePage from '../pages/homepage/HomePage'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
    </Routes>
  )
}

export default AppRouter
