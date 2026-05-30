import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const navigate = useNavigate()

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/onboarding')
  }

  return (
    <div className="bg-white text-[#1A1A1A]">
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute -top-[60px] -right-[80px] h-[200px] w-[280px] bg-[#F4A01C] opacity-85"
          style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
        />
        <div
          className="absolute -bottom-[40px] -left-[80px] h-[180px] w-[240px] bg-[#4CAF50] opacity-20"
          style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%' }}
        />

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 3C9 3 4 9 4 16C4 23 9 29 16 29C23 29 28 23 28 16C28 9 23 3 16 3Z"
                fill="#F4A01C"
                opacity=".3"
              />
              <path d="M14 6L12 10L8 11L10 15L9 20L14 18L18 21L19 16L23 13L19 11Z" fill="#4CAF50" />
              <path d="M16 8L15 12L12 13L14 16L13 20L16 19L20 21L20 17L23 14L20 12Z" fill="#F4A01C" />
            </svg>
            <span className="text-lg font-semibold tracking-tight text-gray-900">ReServe</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            <Link className="hover:opacity-70" to="/">
              Home
            </Link>
            <Link className="hover:opacity-70" to="/donations">
              Donations
            </Link>
            <Link className="hover:opacity-70" to="/claims">
              Claims
            </Link>
          </div>
          <Link
            className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
            to="/donations"
          >
            List surplus
          </Link>
        </nav>
      </section>

      <section className="bg-white pb-16 pt-10">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_1.1fr] md:px-10">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4A01C]">Security check</p>
            <h1 className="text-4xl font-black text-gray-900 md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Verify your email to continue.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-gray-500">
              We sent a six digit code to your email. Enter it to complete signup and start rescuing surplus food.
            </p>
            <div className="rounded-2xl bg-[#F5F0E8]/50 p-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Why this matters</p>
              <p className="mt-2 text-xs text-gray-500">
                OTP verification keeps the network safe for restaurants, venues, and NGO partners.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Enter OTP code
                </h2>
                <p className="mt-1 text-xs text-gray-500">Code expires in 10 minutes.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {otp.map((value, index) => (
                  <input
                    key={`otp-${index}`}
                    className="h-12 w-12 rounded border border-gray-200 text-center text-lg focus:border-[#F4A01C] focus:outline-none"
                    maxLength={1}
                    onChange={(event) => handleOtpChange(index, event.target.value)}
                    type="text"
                    value={value}
                  />
                ))}
              </div>
              <button
                className="w-full rounded bg-[#F4A01C] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white"
                type="submit"
              >
                Verify and continue
              </button>
              <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <button className="font-semibold text-[#F4A01C]" type="button">
                  Resend code
                </button>
                <Link className="font-semibold text-gray-600 hover:text-[#1A1A1A]" to="/auth">
                  Change email address
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OtpVerification
