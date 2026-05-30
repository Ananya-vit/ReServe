import React, { useMemo, useState } from 'react'

const claimDonationsSeed = [
  {
    id: 101,
    donor: 'Tola Kitchen',
    item: 'Rice and beans trays',
    quantity: '30 trays',
    location: 'Lekki, Lagos',
    pickupWindow: '12:00 PM - 3:00 PM',
    postedAt: 'Today, 7:45 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=80'
  },
  {
    id: 102,
    donor: 'Oasis Bakery',
    item: 'Fresh bread loaves',
    quantity: '45 loaves',
    location: 'Surulere, Lagos',
    pickupWindow: '6:00 AM - 10:00 AM',
    postedAt: 'Today, 6:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80'
  },
  {
    id: 103,
    donor: 'Green Harvest',
    item: 'Vegetable sacks',
    quantity: '14 sacks',
    location: 'Agege, Lagos',
    pickupWindow: '7:00 AM - 11:00 AM',
    postedAt: 'Today, 6:30 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=700&q=80'
  },
  {
    id: 104,
    donor: 'Fresh Catch',
    item: 'Fish baskets',
    quantity: '8 baskets',
    location: 'Badagry, Lagos',
    pickupWindow: '8:00 AM - 12:00 PM',
    postedAt: 'Today, 7:15 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1522184216316-2d2a3c5d52b4?w=700&q=80'
  },
  {
    id: 105,
    donor: 'Sunrise Farms',
    item: 'Fresh oranges',
    quantity: '26 bags',
    location: 'Epe, Lagos',
    pickupWindow: '8:00 AM - 1:00 PM',
    postedAt: 'Today, 7:40 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=700&q=80'
  },
  {
    id: 106,
    donor: 'Community Cooks',
    item: 'Chicken stew bowls',
    quantity: '18 bowls',
    location: 'Ajah, Lagos',
    pickupWindow: '2:00 PM - 6:00 PM',
    postedAt: 'Today, 9:20 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700&q=80'
  },
  {
    id: 107,
    donor: 'Hopeful Hands',
    item: 'Mixed salad trays',
    quantity: '12 trays',
    location: 'Victoria Island, Lagos',
    pickupWindow: '11:00 AM - 2:00 PM',
    postedAt: 'Today, 8:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=700&q=80'
  },
  {
    id: 108,
    donor: 'Milk Station',
    item: 'Yogurt cups',
    quantity: '60 cups',
    location: 'Ikeja, Lagos',
    pickupWindow: '10:00 AM - 2:00 PM',
    postedAt: 'Today, 7:35 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=80'
  },
  {
    id: 109,
    donor: 'Pantry Plus',
    item: 'Whole grain cereal',
    quantity: '40 boxes',
    location: 'Maryland, Lagos',
    pickupWindow: '9:00 AM - 5:00 PM',
    postedAt: 'Yesterday, 3:50 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=700&q=80'
  },
  {
    id: 110,
    donor: 'Plantain Hub',
    item: 'Beans and plantain',
    quantity: '20 plates',
    location: 'Festac, Lagos',
    pickupWindow: '3:00 PM - 6:00 PM',
    postedAt: 'Today, 10:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=700&q=80'
  },
  {
    id: 111,
    donor: 'Market Circle',
    item: 'Tomato crates',
    quantity: '18 crates',
    location: 'Oshodi, Lagos',
    pickupWindow: '7:00 AM - 11:00 AM',
    postedAt: 'Today, 6:00 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80'
  },
  {
    id: 112,
    donor: 'Water Aid',
    item: 'Packaged water cartons',
    quantity: '48 cartons',
    location: 'Apapa, Lagos',
    pickupWindow: '9:00 AM - 6:00 PM',
    postedAt: 'Yesterday, 1:20 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=700&q=80'
  },
  {
    id: 113,
    donor: 'Kitchen Bloom',
    item: 'Pasta family packs',
    quantity: '16 packs',
    location: 'Gbagada, Lagos',
    pickupWindow: '1:00 PM - 4:00 PM',
    postedAt: 'Today, 8:05 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f5cd?w=700&q=80'
  },
  {
    id: 114,
    donor: 'Bright Start',
    item: 'Baby cereal packs',
    quantity: '28 packs',
    location: 'Ojodu, Lagos',
    pickupWindow: '10:00 AM - 4:00 PM',
    postedAt: 'Yesterday, 4:30 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=700&q=80'
  },
  {
    id: 115,
    donor: 'Harvest Basket',
    item: 'Fresh fruit baskets',
    quantity: '20 baskets',
    location: 'Yaba, Lagos',
    pickupWindow: '9:00 AM - 1:00 PM',
    postedAt: 'Yesterday, 6:20 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80'
  },
  {
    id: 116,
    donor: 'Protein Hub',
    item: 'Chicken shawarma wraps',
    quantity: '20 wraps',
    location: 'Ikorodu, Lagos',
    pickupWindow: '12:00 PM - 3:00 PM',
    postedAt: 'Today, 9:30 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=700&q=80'
  },
  {
    id: 117,
    donor: 'Nutrition Plus',
    item: 'Beans sacks',
    quantity: '10 sacks',
    location: 'Mushin, Lagos',
    pickupWindow: '9:00 AM - 1:00 PM',
    postedAt: 'Yesterday, 2:15 PM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80'
  },
  {
    id: 118,
    donor: 'Care Kitchen',
    item: 'Vegetable stew pack',
    quantity: '14 boxes',
    location: 'Ikoyi, Lagos',
    pickupWindow: '4:00 PM - 7:00 PM',
    postedAt: 'Today, 9:10 AM',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?w=700&q=80'
  }
]

const myClaimsSeed = [
  {
    id: 'CL-1001',
    ngo: 'Bright Future NGO',
    item: 'Rice and beans trays',
    quantity: '15 trays',
    pickupDate: 'Jun 2, 2026',
    status: 'Scheduled'
  },
  {
    id: 'CL-1002',
    ngo: 'Hope Kitchen',
    item: 'Fresh bread loaves',
    quantity: '20 loaves',
    pickupDate: 'Jun 1, 2026',
    status: 'Confirmed'
  },
  {
    id: 'CL-1003',
    ngo: 'Child Care Network',
    item: 'Vegetable sacks',
    quantity: '6 sacks',
    pickupDate: 'Jun 3, 2026',
    status: 'Pending'
  },
  {
    id: 'CL-1004',
    ngo: 'Meals on Wheels',
    item: 'Chicken stew bowls',
    quantity: '10 bowls',
    pickupDate: 'Jun 1, 2026',
    status: 'Confirmed'
  },
  {
    id: 'CL-1005',
    ngo: 'Kids First',
    item: 'Yogurt cups',
    quantity: '24 cups',
    pickupDate: 'Jun 4, 2026',
    status: 'Pending'
  },
  {
    id: 'CL-1006',
    ngo: 'Care Circle',
    item: 'Pasta family packs',
    quantity: '8 packs',
    pickupDate: 'Jun 2, 2026',
    status: 'Scheduled'
  },
  {
    id: 'CL-1007',
    ngo: 'Safe Haven',
    item: 'Tomato crates',
    quantity: '10 crates',
    pickupDate: 'Jun 5, 2026',
    status: 'Pending'
  },
  {
    id: 'CL-1008',
    ngo: 'Feed Lagos',
    item: 'Fresh fruit baskets',
    quantity: '8 baskets',
    pickupDate: 'Jun 3, 2026',
    status: 'Confirmed'
  },
  {
    id: 'CL-1009',
    ngo: 'Community Relief',
    item: 'Beans sacks',
    quantity: '4 sacks',
    pickupDate: 'Jun 6, 2026',
    status: 'Pending'
  },
  {
    id: 'CL-1010',
    ngo: 'Hope Kitchen',
    item: 'Packaged water cartons',
    quantity: '12 cartons',
    pickupDate: 'Jun 2, 2026',
    status: 'Scheduled'
  },
  {
    id: 'CL-1011',
    ngo: 'Bright Future NGO',
    item: 'Baby cereal packs',
    quantity: '10 packs',
    pickupDate: 'Jun 4, 2026',
    status: 'Confirmed'
  },
  {
    id: 'CL-1012',
    ngo: 'Food For All',
    item: 'Fresh oranges',
    quantity: '12 bags',
    pickupDate: 'Jun 5, 2026',
    status: 'Pending'
  }
]

const Claim = () => {
  const [page, setPage] = useState(1)
  const [isClaimsOpen, setIsClaimsOpen] = useState(false)
  const [claimsPage, setClaimsPage] = useState(1)
  const pageSize = 6
  const claimsPageSize = 5

  const totalPages = Math.ceil(claimDonationsSeed.length / pageSize)
  const totalClaimsPages = Math.ceil(myClaimsSeed.length / claimsPageSize)

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return claimDonationsSeed.slice(start, start + pageSize)
  }, [page])

  const claimsPageItems = useMemo(() => {
    const start = (claimsPage - 1) * claimsPageSize
    return myClaimsSeed.slice(start, start + claimsPageSize)
  }, [claimsPage])

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
            <a className="hover:opacity-70" href="#">
              About us
            </a>
            <a className="hover:opacity-70" href="#">
              Discover
            </a>
            <a className="hover:opacity-70" href="#">
              Whom we help
            </a>
            <a className="hover:opacity-70" href="#">
              Contact
            </a>
          </div>
          <a
            className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
            href="#"
          >
            User Name
          </a>
        </nav>
      </section>

      <section className="bg-white pb-8 pt-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <h1
              className="text-4xl font-black text-gray-900 md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Surplus listings to claim
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
              Explore surplus from restaurants and events and coordinate pickups. Claims update in real time as NGOs
              reserve items.
            </p>
          </div>
          <button
            className="w-full rounded border border-[#1A1A1A] px-5 py-3 text-xs uppercase tracking-[0.12em] text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white md:w-auto"
            onClick={() => setIsClaimsOpen(true)}
            type="button"
          >
            My claims
          </button>
        </div>
      </section>

      <section className="bg-[#F5F0E8]/40 py-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pageItems.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-[180px]">
                  <img alt={item.item} className="h-full w-full object-cover" src={item.image} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                    {item.status}
                  </span>
                </div>
                <div className="space-y-3 px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.item}</h3>
                      <p className="text-xs text-gray-400">Donor: {item.donor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {item.quantity}
                      </p>
                      <p className="text-xs text-gray-400">Available</p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-xs text-gray-500">
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
              Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, claimDonationsSeed.length)} of{' '}
              {claimDonationsSeed.length} donations
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

      {isClaimsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  My claims
                </h2>
                <p className="mt-1 text-xs text-gray-500">All claims your NGO or community kitchen has submitted.</p>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-700" onClick={() => setIsClaimsOpen(false)}>
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {claimsPageItems.map((claim) => (
                <div key={claim.id} className="rounded-xl border border-gray-100 px-4 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">{claim.id}</p>
                      <h3 className="text-base font-semibold text-gray-900">{claim.item}</h3>
                      <p className="text-xs text-gray-400">NGO: {claim.ngo}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-800">{claim.quantity}</span> reserved
                      </p>
                      <p className="text-xs text-gray-400">Pickup: {claim.pickupDate}</p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                        claim.status === 'Confirmed'
                          ? 'bg-[#4CAF50]/15 text-[#2f7a33]'
                          : claim.status === 'Scheduled'
                          ? 'bg-[#F4A01C]/15 text-[#b26f0b]'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Showing {(claimsPage - 1) * claimsPageSize + 1} -{' '}
                {Math.min(claimsPage * claimsPageSize, myClaimsSeed.length)} of {myClaimsSeed.length} claims
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="rounded border border-gray-300 px-3 py-2 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={claimsPage === 1}
                  onClick={() => setClaimsPage((prev) => Math.max(1, prev - 1))}
                  type="button"
                >
                  Prev
                </button>
                {Array.from({ length: totalClaimsPages }).map((_, index) => {
                  const value = index + 1
                  const isActive = value === claimsPage
                  return (
                    <button
                      key={value}
                      className={`rounded px-3 py-2 text-xs transition ${
                        isActive
                          ? 'bg-[#1A1A1A] text-white'
                          : 'border border-gray-300 text-gray-600 hover:bg-white'
                      }`}
                      onClick={() => setClaimsPage(value)}
                      type="button"
                    >
                      {value}
                    </button>
                  )
                })}
                <button
                  className="rounded border border-gray-300 px-3 py-2 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={claimsPage === totalClaimsPages}
                  onClick={() => setClaimsPage((prev) => Math.min(totalClaimsPages, prev + 1))}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Claim