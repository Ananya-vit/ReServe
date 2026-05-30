import React from 'react'
import { Link } from 'react-router-dom'

const ForDonorBlog = () => {
  return (
    <div className="bg-white text-[#1A1A1A]">
      <section className="relative overflow-hidden bg-white">
        <div
          className="absolute -top-[80px] -right-[120px] h-[240px] w-[320px] bg-[#F4A01C] opacity-80"
          style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
        />
        <div
          className="absolute -bottom-[60px] -left-[120px] h-[220px] w-[300px] bg-[#4CAF50] opacity-15"
          style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%' }}
        />

        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10">
          <Link className="flex items-center gap-2" to="/">
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
          </Link>
          <div className="flex items-center gap-3">
            <Link
              className="rounded border border-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.06em] text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
              to="/donations"
            >
              List surplus
            </Link>
            <Link
              className="rounded bg-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
              to="/claims"
            >
              Claim surplus
            </Link>
          </div>
        </nav>

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Link className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4A01C] hover:text-[#1A1A1A]" to="/">
            Back to home
          </Link>
          <h1
            className="mt-4 text-4xl font-black text-gray-900 md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            For donors: make surplus a community asset.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            A quick-start guide for restaurants and venues sharing surplus with verified NGOs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Listing setup</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Pickup handoff</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Impact reports</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="space-y-6">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                1. Post surplus early
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                The earlier you list, the easier it is for NGOs to plan pickups. Include quantities, storage needs, and
                a clear pickup window.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-gray-600">
                <li>Use clear quantities like trays, loaves, or boxes.</li>
                <li>Share food safety notes and allergen details.</li>
                <li>Assign a staff contact for handoff.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2. Prepare for pickup
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Consolidate items, label packaging, and keep cold goods chilled until handoff. A smooth transfer keeps
                partnerships strong and consistent.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-gray-600">
                <div className="rounded-xl bg-[#F5F0E8]/60 px-4 py-3">
                  Stage pickups in a single area to reduce wait time.
                </div>
                <div className="rounded-xl bg-[#F5F0E8]/60 px-4 py-3">
                  Send a quick message when the items are ready.
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                3. Track impact with confidence
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                After each pickup, receive a brief impact update so you can report meals saved and waste diverted.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#F4A01C] p-6 text-white">
              <h3 className="text-xl font-semibold">Donor starter kit</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/90">
                <li>List surplus before service ends.</li>
                <li>Assign a dedicated pickup contact.</li>
                <li>Label containers with item details.</li>
                <li>Capture a handoff photo for records.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Ready to list?</h3>
              <p className="mt-2 text-sm text-gray-500">
                Create a surplus listing in minutes and alert nearby NGO partners.
              </p>
              <Link
                className="mt-4 inline-flex rounded bg-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
                to="/donations"
              >
                List surplus
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ForDonorBlog
