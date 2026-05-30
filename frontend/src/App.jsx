import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Claim from './pages/Claim'
import Donation from './pages/Donation'
import HomePage from './pages/HomePage'
import Onboarding from './pages/Onboarding'
import OtpVerification from './pages/OtpVerification'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<OtpVerification />} path="/otp" />
        <Route element={<Onboarding />} path="/onboarding" />
        <Route element={<Donation />} path="/donations" />
        <Route element={<Claim />} path="/claims" />
      </Routes>
    </BrowserRouter>
  )
}

export default App