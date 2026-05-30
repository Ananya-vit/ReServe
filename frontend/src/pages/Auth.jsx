import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = () => {
  const [mode, setMode] = useState('signup')
  const [forgotSent, setForgotSent] = useState(false)
  const navigate = useNavigate()

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

      <section className="bg-white pb-16 pt-8">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.05fr_1fr] md:px-10">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4A01C]">Access portal</p>
              <h1
                className="mt-3 text-4xl font-black text-gray-900 md:text-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Welcome to the surplus food exchange.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
                Manage listings from restaurants and events, coordinate NGO pickups, and track impact in one place.
              </p>
            </div>

            <div className="hidden gap-4 rounded-2xl bg-[#F5F0E8]/50 p-6 md:grid md:grid-cols-2">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Donors</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">Restaurants and venues post surplus food.</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Claimers</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">NGOs claim food and schedule pickups.</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Verification</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">Secure signup with OTP confirmation.</p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Onboarding</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">Add pickup details and safety notes.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex gap-3 rounded-full bg-[#F5F0E8]/70 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              {[
                { key: 'login', label: 'Login' },
                { key: 'signup', label: 'Sign up' },
                { key: 'forgot', label: 'Forgot' }
              ].map((item) => (
                <button
                  key={item.key}
                  className={`flex-1 rounded-full px-3 py-2 transition ${
                    mode === item.key ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500'
                  }`}
                  onClick={() => {
                    setMode(item.key)
                    setForgotSent(false)
                  }}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {mode === 'login' ? (
              <form className="mt-6 space-y-5">
                <div>
                  <h2
                    className="text-2xl font-black text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Sign in
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">Welcome back. Sign in to manage surplus and claims.</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Email address</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="name@email.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Password</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-2">
                    <input className="h-4 w-4 rounded border-gray-300" type="checkbox" />
                    Keep me signed in
                  </label>
                  <button
                    className="font-semibold text-[#F4A01C]"
                    onClick={() => setMode('forgot')}
                    type="button"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  className="w-full rounded bg-[#1A1A1A] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white"
                  type="button"
                >
                  Continue
                </button>
                <p className="text-center text-xs text-gray-500">
                  New here?{' '}
                  <button className="font-semibold text-[#F4A01C]" onClick={() => setMode('signup')} type="button">
                    Create an account
                  </button>
                </p>
              </form>
            ) : null}

            {mode === 'signup' ? (
              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault()
                  navigate('/otp')
                }}
              >
                <div>
                  <h2
                    className="text-2xl font-black text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Create your account
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">Start sharing or claiming surplus in minutes.</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Email address</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="name@email.com"
                    type="email"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Password</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="Create a password"
                      type="password"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Confirm password</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="Repeat password"
                      type="password"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Role</label>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {[
                      { value: 'donor', title: 'Donor', helper: 'Restaurants, caterers, event hosts' },
                      { value: 'claimer', title: 'Claimer', helper: 'NGOs, shelters, community kitchens' }
                    ].map((role) => (
                      <label
                        key={role.value}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 transition hover:border-[#F4A01C]"
                      >
                        <input className="mt-1 h-4 w-4" name="role" type="radio" value={role.value} />
                        <span>
                          <span className="block font-semibold text-gray-900">{role.title}</span>
                          <span className="block text-xs text-gray-500">{role.helper}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-[#F5F0E8]/60 px-4 py-3 text-xs text-gray-500">
                  Use at least 8 characters, one number, and one symbol.
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input className="h-4 w-4 rounded border-gray-300" type="checkbox" />
                  I agree to the Terms and Privacy Policy.
                </label>
                <button
                  className="w-full rounded bg-[#F4A01C] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white"
                  type="submit"
                >
                  Create account
                </button>
                <p className="text-center text-xs text-gray-500">
                  Already have an account?{' '}
                  <button className="font-semibold text-[#F4A01C]" onClick={() => setMode('login')} type="button">
                    Sign in
                  </button>
                </p>
              </form>
            ) : null}

            {mode === 'forgot' ? (
              <form
                className="mt-6 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault()
                  setForgotSent(true)
                }}
              >
                <div>
                  <h2
                    className="text-2xl font-black text-gray-900"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Reset password
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">We will email you a reset link.</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Email address</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="name@email.com"
                    type="email"
                  />
                </div>
                {forgotSent ? (
                  <div className="rounded-xl bg-[#4CAF50]/10 px-4 py-3 text-xs text-[#2f7a33]">
                    Reset link sent. Check your email.
                  </div>
                ) : null}
                <button
                  className="w-full rounded bg-[#1A1A1A] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white"
                  type="submit"
                >
                  Send reset link
                </button>
                <button
                  className="w-full text-xs font-semibold text-[#F4A01C]"
                  onClick={() => setMode('login')}
                  type="button"
                >
                  Back to login
                </button>
              </form>
            ) : null}
          </div>

          <div className="grid gap-4 rounded-2xl bg-[#F5F0E8]/50 p-6 md:hidden">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Donors</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">Restaurants and venues post surplus food.</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Claimers</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">NGOs claim food and schedule pickups.</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Verification</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">Secure signup with OTP confirmation.</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Onboarding</p>
              <p className="mt-2 text-sm font-semibold text-gray-900">Add pickup details and safety notes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Auth