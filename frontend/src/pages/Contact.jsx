import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="bg-white text-[#1A1A1A]">
      <section className="relative overflow-hidden bg-white py-16">
        <div
          className="absolute -top-[80px] -right-[120px] h-[240px] w-[320px] bg-[#F4A01C] opacity-80"
          style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
        />
        <div
          className="absolute -bottom-[60px] -left-[120px] h-[220px] w-[300px] bg-[#4CAF50] opacity-15"
          style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%' }}
        />

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Link className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A1A1A]" to="/">
            Back to home
          </Link>
          <h1
            className="mt-4 text-4xl font-black text-gray-900 md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact ReServe
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            Have a question about listings, pickups, or verification? Send a note and our team will respond quickly.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2
              className="text-2xl font-black text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send us a message
            </h2>
            <form className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">Full name</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Your name"
                  type="text"
                />
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
                <label className="text-xs font-semibold text-gray-600">Message</label>
                <textarea
                  className="mt-2 min-h-[140px] w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Tell us how we can help."
                />
              </div>
              <button
                className="w-full rounded bg-[#1A1A1A] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white"
                type="button"
              >
                Send message
              </button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#F5F0E8]/70 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Reach us directly</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Phone: +91-8010200666</p>
                <p>Email: reserve@xsam.in</p>
                <p>Hours: Mon - Sat, 8:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Need to get started?</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore listings or create a new surplus post.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  className="inline-flex rounded bg-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
                  to="/donations"
                >
                  List surplus
                </Link>
                <Link
                  className="inline-flex rounded border border-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#1A1A1A]"
                  to="/claims"
                >
                  Claim food
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Contact
