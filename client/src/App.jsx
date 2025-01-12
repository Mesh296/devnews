import { useState } from 'react'
import { PrimaryButton } from './components/PrimaryButton'
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/:username"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
              }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
