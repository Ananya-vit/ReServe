import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const donationsSeed = [
  {
    id: 1,
    title: 'Vegetable stew pack',
    category: 'Cooked meals',
    quantity: 12,
    unit: 'boxes',
    freshness: 'Prepared today',
    pickupWindow: '4:00 PM - 7:00 PM',
    location: 'Ikoyi, Lagos',
    postedAt: 'Today, 9:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?w=700&q=80'
  },
  {
    id: 2,
    title: 'Rice and beans',
    category: 'Cooked meals',
    quantity: 24,
    unit: 'plates',
    freshness: 'Prepared today',
    pickupWindow: '12:00 PM - 3:00 PM',
    location: 'Lekki, Lagos',
    postedAt: 'Today, 8:40 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=80'
  },
  {
    id: 3,
    title: 'Fresh fruit basket',
    category: 'Fresh produce',
    quantity: 18,
    unit: 'baskets',
    freshness: 'Picked yesterday',
    pickupWindow: '9:00 AM - 1:00 PM',
    location: 'Yaba, Lagos',
    postedAt: 'Yesterday, 6:20 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80'
  },
  {
    id: 4,
    title: 'Bakery bread loaves',
    category: 'Bakery',
    quantity: 40,
    unit: 'loaves',
    freshness: 'Baked today',
    pickupWindow: '6:00 AM - 10:00 AM',
    location: 'Surulere, Lagos',
    postedAt: 'Today, 5:30 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80'
  },
  {
    id: 5,
    title: 'Yogurt cups',
    category: 'Dairy',
    quantity: 60,
    unit: 'cups',
    freshness: 'Expires in 5 days',
    pickupWindow: '10:00 AM - 2:00 PM',
    location: 'Ikeja, Lagos',
    postedAt: 'Today, 7:15 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=80'
  },
  {
    id: 6,
    title: 'Chicken stew bowls',
    category: 'Cooked meals',
    quantity: 15,
    unit: 'bowls',
    freshness: 'Prepared today',
    pickupWindow: '2:00 PM - 6:00 PM',
    location: 'Ajah, Lagos',
    postedAt: 'Today, 10:20 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700&q=80'
  },
  {
    id: 7,
    title: 'Mixed salad trays',
    category: 'Fresh produce',
    quantity: 10,
    unit: 'trays',
    freshness: 'Prepared today',
    pickupWindow: '11:00 AM - 2:00 PM',
    location: 'Victoria Island, Lagos',
    postedAt: 'Today, 9:45 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=700&q=80'
  },
  {
    id: 8,
    title: 'Pasta family packs',
    category: 'Cooked meals',
    quantity: 14,
    unit: 'packs',
    freshness: 'Prepared today',
    pickupWindow: '1:00 PM - 4:00 PM',
    location: 'Gbagada, Lagos',
    postedAt: 'Today, 8:05 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5cd?w=700&q=80'
  },
  {
    id: 9,
    title: 'Whole grain cereal',
    category: 'Pantry',
    quantity: 36,
    unit: 'boxes',
    freshness: 'Expires in 3 months',
    pickupWindow: '9:00 AM - 5:00 PM',
    location: 'Maryland, Lagos',
    postedAt: 'Yesterday, 3:50 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=700&q=80'
  },
  {
    id: 10,
    title: 'Tomato crates',
    category: 'Fresh produce',
    quantity: 20,
    unit: 'crates',
    freshness: 'Picked today',
    pickupWindow: '7:00 AM - 11:00 AM',
    location: 'Oshodi, Lagos',
    postedAt: 'Today, 6:00 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80'
  },
  {
    id: 11,
    title: 'Fresh fish baskets',
    category: 'Protein',
    quantity: 8,
    unit: 'baskets',
    freshness: 'Caught today',
    pickupWindow: '8:00 AM - 12:00 PM',
    location: 'Badagry, Lagos',
    postedAt: 'Today, 7:50 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1522184216316-2d2a3c5d52b4?w=700&q=80'
  },
  {
    id: 12,
    title: 'Beans and plantain',
    category: 'Cooked meals',
    quantity: 22,
    unit: 'plates',
    freshness: 'Prepared today',
    pickupWindow: '3:00 PM - 6:00 PM',
    location: 'Festac, Lagos',
    postedAt: 'Today, 10:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=700&q=80'
  },
  {
    id: 13,
    title: 'Packaged water cartons',
    category: 'Beverages',
    quantity: 50,
    unit: 'cartons',
    freshness: 'Sealed',
    pickupWindow: '9:00 AM - 6:00 PM',
    location: 'Apapa, Lagos',
    postedAt: 'Yesterday, 1:20 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=700&q=80'
  },
  {
    id: 14,
    title: 'Chicken shawarma wraps',
    category: 'Cooked meals',
    quantity: 18,
    unit: 'wraps',
    freshness: 'Prepared today',
    pickupWindow: '12:00 PM - 3:00 PM',
    location: 'Ikorodu, Lagos',
    postedAt: 'Today, 9:30 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=700&q=80'
  },
  {
    id: 15,
    title: 'Baby cereal packs',
    category: 'Pantry',
    quantity: 28,
    unit: 'packs',
    freshness: 'Expires in 8 months',
    pickupWindow: '10:00 AM - 4:00 PM',
    location: 'Ojodu, Lagos',
    postedAt: 'Yesterday, 4:30 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=700&q=80'
  },
  {
    id: 16,
    title: 'Vegetable sacks',
    category: 'Fresh produce',
    quantity: 12,
    unit: 'sacks',
    freshness: 'Picked today',
    pickupWindow: '6:30 AM - 9:30 AM',
    location: 'Agege, Lagos',
    postedAt: 'Today, 6:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&q=80'
  },
  {
    id: 17,
    title: 'Beans sacks',
    category: 'Pantry',
    quantity: 10,
    unit: 'sacks',
    freshness: 'Sealed',
    pickupWindow: '9:00 AM - 1:00 PM',
    location: 'Mushin, Lagos',
    postedAt: 'Yesterday, 2:15 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80'
  },
  {
    id: 18,
    title: 'Fresh oranges',
    category: 'Fresh produce',
    quantity: 32,
    unit: 'bags',
    freshness: 'Picked today',
    pickupWindow: '8:00 AM - 1:00 PM',
    location: 'Epe, Lagos',
    postedAt: 'Today, 7:35 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=700&q=80'
  }
]

const Donation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 6

  const totalPages = Math.ceil(donationsSeed.length / pageSize)
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return donationsSeed.slice(start, start + pageSize)
  }, [page])

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
            <Link className="hover:opacity-70" to="/about">
              About
            </Link>
            <Link className="hover:opacity-70" to="/blog/how-it-works">
              How it works
            </Link>
            <Link className="hover:opacity-70" to="/blog/for-donor">
              For donors
            </Link>
            <Link className="hover:opacity-70" to="/blog/for-ngo">
              For NGOs
            </Link>
            <Link className="hover:opacity-70" to="/contact">
              Contact
            </Link>
          </div>
          <Link
            className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
            to="/onboarding"
          >
            User Name
          </Link>
        </nav>
      </section>

      <section className="bg-white pb-8 pt-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <h1
              className="text-4xl font-black text-gray-900 md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your surplus listings
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
              Track surplus from restaurants, weddings, and events. Update pickup windows so NGO partners can claim
              quickly.
            </p>
          </div>
          <button
            className="w-full rounded bg-[#F4A01C] px-5 py-3 text-xs uppercase tracking-[0.12em] text-white transition hover:bg-[#d4880f] md:w-auto"
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            Add new
          </button>
        </div>
      </section>

      <section className="bg-[#F5F0E8]/40 py-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pageItems.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-[180px]">
                  <img alt={item.title} className="h-full w-full object-cover" src={item.image} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                    {item.status}
                  </span>
                </div>
                <div className="space-y-3 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.quantity}
                      </p>
                      <p className="text-xs text-gray-400">{item.unit}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-xs text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>Freshness</span>
                      <span className="font-medium text-gray-700">{item.freshness}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pickup window</span>
                      <span className="font-medium text-gray-700">{item.pickupWindow}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location</span>
                      <span className="font-medium text-gray-700">{item.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                    <span>Posted</span>
                    <span>{item.postedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, donationsSeed.length)} of{' '}
              {donationsSeed.length} donations
            </p>
            <div className="flex items-center gap-2">
              <button
                className="rounded border border-gray-300 px-3 py-2 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                type="button"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, index) => {
                const value = index + 1
                const isActive = value === page
                return (
                  <button
                    key={value}
                    className={`rounded px-3 py-2 text-xs transition ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-white'
                    }`}
                    onClick={() => setPage(value)}
                    type="button"
                  >
                    {value}
                  </button>
                )
              })}
              <button
                className="rounded border border-gray-300 px-3 py-2 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Create new listing
                </h2>
                <p className="mt-1 text-xs text-gray-500">Share surplus details so NGOs can schedule fast pickup.</p>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Food name</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Eg. Rice and beans"
                  type="text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Category</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Cooked meals, Pantry, Dairy"
                  type="text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Quantity</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="25 packs"
                  type="text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Pickup window</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="10:00 AM - 1:00 PM"
                  type="text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Location</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Ikoyi, Lagos"
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Notes</label>
                <textarea
                  className="mt-2 h-24 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Allergy notes, storage instructions, or pickup details"
                />
              </div>
              <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
                <button
                  className="rounded border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-600"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.12em] text-white"
                  type="button"
                >
                  Create listing
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Donation