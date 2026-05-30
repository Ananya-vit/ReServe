import React from 'react'
import { Link } from 'react-router-dom'

const HowItWorksBlog = () => {
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
            How it works: from surplus to shared meals.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            A simple walkthrough of how ReServe moves surplus food from kitchens to community tables, fast and safely.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Listings</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Verification</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Pickup flow</span>
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
                1. Donors post surplus with details
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Restaurants, caterers, and venues list surplus in minutes. Each listing includes quantity, storage notes,
                and a pickup window so NGOs can plan immediately.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2. NGOs claim and coordinate pickups
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Verified NGOs reserve items, share pickup details, and arrive within the scheduled window. Claims are
                tracked so donors know exactly who is coming.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                3. Impact reports close the loop
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                After pickup, donors get a quick summary of meals saved and communities served. Everyone sees the impact
                in real time.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#1A1A1A] p-6 text-white">
              <h3 className="text-xl font-semibold">In 3 quick steps</h3>
              <ol className="mt-4 space-y-2 text-sm text-white/80">
                <li>Post surplus with quantity and pickup window.</li>
                <li>Confirm NGO claim and handoff details.</li>
                <li>Receive an impact note after pickup.</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Ready to start?</h3>
              <p className="mt-2 text-sm text-gray-500">
                Choose your path: list surplus as a donor or claim as an NGO.
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

export default HowItWorksBlog
