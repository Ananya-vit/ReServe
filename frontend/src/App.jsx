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
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<ProtectedRoute><OtpVerification /></ProtectedRoute>} path="/otp" />
        <Route element={<ProtectedRoute><Onboarding /></ProtectedRoute>} path="/onboarding" />
        <Route element={<ProtectedRoute><Profile /></ProtectedRoute>} path="/profile" />
        <Route element={<ProtectedRoute allowedRoles={['DONOR']}><Donation /></ProtectedRoute>} path="/donations" />
        <Route element={<ProtectedRoute allowedRoles={['NGO']}><Claim /></ProtectedRoute>} path="/claims" />
        <Route element={<ForNgoBlog />} path="/blog/for-ngo" />
        <Route element={<ForDonorBlog />} path="/blog/for-donor" />
        <Route element={<HowItWorksBlog />} path="/blog/how-it-works" />
      </Routes>
    </BrowserRouter>
  )
}

export default App