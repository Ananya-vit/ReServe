import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Auth from './pages/Auth'
import Contact from './pages/Contact'
import ForDonorBlog from './pages/blog/ForDonorBlog'
import ForNgoBlog from './pages/blog/ForNgoBlog'
import HowItWorksBlog from './pages/blog/HowItWorksBlog'
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
        <Route element={<About />} path="/about" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<OtpVerification />} path="/otp" />
        <Route element={<Onboarding />} path="/onboarding" />
        <Route element={<Donation />} path="/donations" />
        <Route element={<Claim />} path="/claims" />
        <Route element={<ForNgoBlog />} path="/blog/for-ngo" />
        <Route element={<ForDonorBlog />} path="/blog/for-donor" />
        <Route element={<HowItWorksBlog />} path="/blog/how-it-works" />
      </Routes>
    </BrowserRouter>
  )
}

export default App