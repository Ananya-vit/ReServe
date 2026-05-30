import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const isLoggedIn = false
  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-white">
        <div
          className="absolute -top-[60px] -right-[80px] h-[260px] w-[340px] bg-[#F4A01C] opacity-85"
          style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
        />
        <div
          className="absolute -bottom-[80px] -left-[120px] h-[240px] w-[320px] bg-[#F4A01C] opacity-70"
          style={{ borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%' }}
        />
        <div
          className="absolute left-[-60px] top-[180px] h-[90px] w-[120px] bg-[#4CAF50] opacity-85"
          style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%' }}
        />
        <div
          className="absolute bottom-[160px] right-[100px] h-[70px] w-[90px] bg-[#4CAF50] opacity-85"
          style={{ borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%' }}
        />

        <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-10">
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
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="group relative">
                <button
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white"
                  type="button"
                >
                  <span className="text-xs font-semibold text-gray-600">RS</span>
                </button>
                <div className="invisible absolute right-0 mt-2 w-36 rounded-xl border border-gray-100 bg-white p-2 text-xs text-gray-600 shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100">
                  <Link className="block rounded-lg px-3 py-2 hover:bg-gray-50" to="/onboarding">
                    Profile
                  </Link>
                  <Link className="block rounded-lg px-3 py-2 hover:bg-gray-50" to="/auth">
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link
                  className="rounded border border-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.06em] text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
                  to="/donations"
                >
                  <span className="md:hidden">List</span>
                  <span className="hidden md:inline">List surplus</span>
                </Link>
                <Link
                  className="rounded bg-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
                  to="/claims"
                >
                  <span className="md:hidden">Claim</span>
                  <span className="hidden md:inline">Claim surplus</span>
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pb-20 pt-4 md:flex-row md:px-10">
          <div className="flex-1 max-w-lg">
            <h1
              className="mb-6 text-4xl font-black leading-tight text-gray-900 md:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A world where
              <br />
              surplus food
              <br />
              meets a{' '}
              <span className="relative inline-block italic">
                table,
                <span className="absolute left-0 top-full mt-1 block h-[5px] w-full rounded bg-[#F4A01C]" />
              </span>
              not the bin.
            </h1>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
              ReServe connects restaurants, wedding venues, and event caterers with verified NGOs for fast, safe pickup.
            </p>
            <div className="flex items-center gap-4">
              <Link
                className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
                to="/donations"
              >
                List surplus
              </Link>
              <Link className="flex items-center gap-1 text-sm text-gray-600 hover:opacity-70" to="/donations">
                Browse donations
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[420px] flex-1 items-center justify-center">
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <clipPath id="africa" clipPathUnits="objectBoundingBox">
                  <path d="M0.42,0.02 L0.48,0.02 L0.56,0.05 L0.65,0.06 L0.72,0.10 L0.78,0.14 L0.82,0.20 L0.84,0.26 L0.82,0.32 L0.78,0.36 L0.80,0.42 L0.84,0.48 L0.86,0.55 L0.84,0.62 L0.80,0.68 L0.75,0.74 L0.70,0.80 L0.64,0.86 L0.58,0.92 L0.52,0.97 L0.48,0.99 L0.44,0.97 L0.38,0.92 L0.32,0.86 L0.26,0.80 L0.20,0.74 L0.16,0.67 L0.14,0.60 L0.16,0.52 L0.18,0.45 L0.16,0.38 L0.14,0.31 L0.16,0.25 L0.20,0.19 L0.25,0.14 L0.30,0.09 L0.36,0.05 Z" />
                </clipPath>
              </defs>
            </svg>

            <div className="relative h-[380px] w-[320px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M134,8 L154,8 L180,18 L208,20 L230,34 L250,46 L262,66 L269,86 L263,104 L250,117 L256,135 L269,153 L275,177 L269,200 L256,220 L240,238 L224,258 L205,278 L186,296 L166,314 L154,322 L141,314 L122,296 L102,276 L82,256 L64,238 L51,216 L45,193 L51,166 L58,144 L51,122 L45,100 L51,80 L64,60 L80,44 L96,30 L114,18 Z"
                  fill="#E8E0D0"
                  opacity="0.6"
                />
                <path d="M160,60 L160,200" stroke="#ccc" strokeWidth="0.5" opacity="0.5" />
                <path d="M100,130 L230,130" stroke="#ccc" strokeWidth="0.5" opacity="0.5" />
              </svg>

              <img
                alt="Prepared meals"
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80"
                style={{ clipPath: 'polygon(42% 2%, 50% 1%, 57% 4%, 66% 5%, 74% 9%, 80% 14%, 85% 20%, 87% 28%, 84% 34%, 79% 38%, 82% 45%, 87% 53%, 88% 62%, 85% 70%, 80% 77%, 74% 83%, 67% 89%, 60% 95%, 53% 99%, 49% 100%, 44% 98%, 38% 93%, 32% 87%, 25% 80%, 20% 73%, 15% 65%, 13% 57%, 15% 49%, 18% 42%, 15% 34%, 13% 27%, 16% 20%, 20% 14%, 26% 8%, 33% 4%)' }}
              />

              <div className="absolute left-[-30px] top-[55%] h-[22px] w-[80px] -rotate-[8deg] rounded-[40%] bg-[#4CAF50] opacity-90" />
              <div className="absolute left-[-20px] top-[58%] mt-[14px] h-[14px] w-[60px] -rotate-[6deg] rounded-[40%] bg-[#F4A01C] opacity-90" />
              <div className="absolute bottom-[20%] right-[-20px] h-[18px] w-[70px] rotate-[5deg] rounded-[40%] bg-[#4CAF50] opacity-90" />
            </div>

            <div className="absolute bottom-[60px] right-[-10px]">
              <div className="rounded-xl bg-white px-5 py-4 text-center shadow-lg">
                <span
                  className="text-4xl font-black text-yellow-500"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  288
                </span>
                <p className="mt-1 text-xs leading-tight text-gray-500">
                  meals saved
                  <br />
                  this week
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-12 md:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-start">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200">
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-gray-800">Quick pickup</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                Post surplus in minutes and notify nearby NGO partners instantly.
              </p>
            </div>

            <div className="flex flex-col items-start border-b-2 border-orange-400 pb-1">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-300">
                <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-orange-400">Verified NGOs</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                Claimers are vetted so food gets to trusted hands.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200">
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10a7 7 0 0114 0v1a7 7 0 01-14 0v-1z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h14m-7 0v11" />
                </svg>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-gray-800">Food safety</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                Add allergens, storage notes, and pickup windows.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-200">
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h4 className="mb-1 text-sm font-semibold text-gray-800">Impact tracking</h4>
              <p className="text-xs leading-relaxed text-gray-400">
                Measure meals saved and waste diverted each month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAVE WE DONE */}
      <section className="overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="relative h-[480px] min-w-[320px] flex-1">
              <img
                alt="Prepared meals"
                className="absolute left-0 top-0 h-[280px] w-[230px] rounded-xl object-cover shadow-lg"
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&q=80"
              />
              <img
                alt="Meal trays"
                className="absolute left-[245px] top-0 h-[145px] w-[145px] rounded-xl object-cover shadow-lg"
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&q=80"
              />
              <img
                alt="Community meals"
                className="absolute left-[245px] top-[160px] h-[145px] w-[145px] rounded-xl object-cover shadow-lg"
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&q=80"
              />
              <img
                alt="Food distribution"
                className="absolute left-[50px] top-[300px] h-[165px] w-[170px] rounded-xl object-cover shadow-lg"
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80"
              />
              <div className="absolute left-[-10px] top-[35%] h-[90px] w-[18px] rounded-lg bg-[#4CAF50] opacity-90" />
            </div>

            <div className="flex-1 max-w-md">
              <h2
                className="mb-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What happens
                <br />
                after you
                <br />
                <span className="relative inline-block italic">
                  list surplus?
                  <span className="absolute left-0 top-full mt-1 block h-[5px] w-full rounded bg-[#F4A01C]" />
                </span>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-500">
                Nearby NGOs receive instant alerts with pickup windows, quantity, and food safety details. They reserve
                items and coordinate a pickup that works for both teams.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-gray-500">
                Restaurants and event hosts keep surplus out of landfills while serving communities that need it most.
              </p>
              <p className="mb-8 text-sm leading-relaxed text-gray-500">
                Every pickup generates an impact report, so you can track meals saved and sustainability goals.
              </p>
              <div className="flex gap-4">
                <Link className="flex items-center gap-1 text-sm text-gray-700 hover:opacity-70" to="/blog/how-it-works">
                  Learn how it works
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
                  to="/donations"
                >
                  List surplus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="bg-white py-20" id="stories">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 flex items-end justify-between">
            <h2
              className="max-w-sm text-4xl font-black leading-tight text-gray-900 md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Recent rescues from
              <br />
              <span className="relative inline-block italic">
                restaurants and events
                <span className="absolute left-0 top-full mt-1 block h-[5px] w-full rounded bg-[#F4A01C]" />
              </span>
            </h2>
            <div className="hidden gap-2 md:flex">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="transition-transform duration-200 hover:-translate-y-1">
              <div className="relative mb-4 h-[240px] overflow-hidden rounded-xl">
                <img
                  alt="Bella's Bistro"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
                />
                <div className="absolute bottom-3 left-3 h-[14px] w-[70px] rounded-md bg-[#4CAF50] opacity-90" />
                <div className="absolute bottom-3 left-3 h-[10px] w-[50px] translate-y-[12px] rounded-md bg-[#F4A01C] opacity-90" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900">Bella&apos;s Bistro</h3>
              <p className="mb-1 text-xs text-gray-400">22 meal trays</p>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">
                End-of-day meals claimed by a local shelter within 30 minutes of posting.
              </p>
              <Link className="flex items-center gap-1 text-xs text-orange-400 hover:opacity-70" to="/donations">
                View listing
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-8 transition-transform duration-200 hover:-translate-y-1">
              <div className="relative mb-4 h-[240px] overflow-hidden rounded-xl">
                <img
                  alt="Grand Hall Wedding"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
                />
                <div className="absolute bottom-3 left-3 h-[14px] w-[70px] rounded-md bg-[#4CAF50] opacity-90" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900">Grand Hall Wedding</h3>
              <p className="mb-1 text-xs text-gray-400">120 servings</p>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">
                Buffet surplus redirected to three community kitchens the same night.
              </p>
              <Link className="flex items-center gap-1 text-xs text-orange-400 hover:opacity-70" to="/donations">
                View listing
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="transition-transform duration-200 hover:-translate-y-1">
              <div className="relative mb-4 h-[240px] overflow-hidden rounded-xl">
                <img
                  alt="Campus Catering"
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                />
                <div className="absolute bottom-3 left-3 h-[12px] w-[60px] rounded-md bg-[#F4A01C] opacity-90" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900">Campus Catering</h3>
              <p className="mb-1 text-xs text-gray-400">40 meal boxes</p>
              <p className="mb-3 text-xs leading-relaxed text-gray-500">
                Event leftovers distributed to nearby NGO partners before closing.
              </p>
              <Link className="flex items-center gap-1 text-xs text-orange-400 hover:opacity-70" to="/donations">
                View listing
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE WE HELP */}
      <section className="overflow-hidden bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="flex-1">
              <h2
                className="mb-10 text-4xl font-black leading-tight text-gray-900 md:text-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                We connect surplus
                <br />
                food with
                <span className="relative inline-block italic">
                  nearby NGOs.
                  <span className="absolute left-0 top-full mt-1 block h-[5px] w-full rounded bg-[#F4A01C]" />
                </span>
              </h2>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-3xl font-black text-yellow-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                      48,000
                    </span>
                    <span className="mb-1 text-lg font-bold text-yellow-500">+</span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    Meals rescued
                    <br />
                    in the last 12 months
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-3xl font-black text-yellow-500" style={{ fontFamily: "'Playfair Display', serif" }}>
                      1,200
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    Donor partners
                    <br />
                    across restaurants and venues
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                      320
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    NGO kitchens
                    <br />
                    ready to claim surplus
                  </p>
                </div>
                <div>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-3xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                      18
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    Cities covered
                    <br />
                    for fast redistribution
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[340px] flex-1 justify-center">
              <div className="relative h-[340px] w-[340px]">
                <svg viewBox="0 0 340 360" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                  <path
                    d="M143,12 L163,12 L190,22 L218,24 L240,40 L260,55 L272,78 L278,102 L272,122 L258,136 L264,155 L278,175 L284,200 L278,224 L264,245 L248,264 L230,282 L210,300 L188,318 L168,332 L154,320 L132,302 L110,282 L88,260 L68,240 L54,216 L48,192 L54,165 L62,144 L54,122 L48,100 L54,80 L68,62 L84,46 L102,32 L122,20 Z"
                    fill="#F4A01C"
                    opacity="0.85"
                  />
                  <circle cx="160" cy="120" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="200" cy="150" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="140" cy="180" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="180" cy="220" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="120" cy="140" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="220" cy="200" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <circle cx="165" cy="260" r="6" fill="white" stroke="#F4A01C" strokeWidth="3" />
                  <rect
                    x="60"
                    y="200"
                    width="80"
                    height="14"
                    rx="7"
                    fill="#4CAF50"
                    opacity=".8"
                    transform="rotate(-8 60 200)"
                  />
                  <rect
                    x="55"
                    y="218"
                    width="60"
                    height="10"
                    rx="5"
                    fill="#F4A01C"
                    opacity=".8"
                    transform="rotate(-8 55 218)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 rounded-2xl bg-black opacity-60" />
            <div className="absolute right-[20%] top-[40%] h-[20px] w-[120px] -rotate-[4deg] rounded-lg bg-[#4CAF50] opacity-85" />
            <div className="absolute right-[22%] top-[40%] mt-[18px] h-[14px] w-[90px] -rotate-[3deg] rounded-lg bg-[#F4A01C] opacity-85" />

            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center text-white">
              <h2 className="mb-2 text-3xl font-black md:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                Join the rescue network.
              </h2>
              <p className="mb-8 text-xl font-light">Restaurants, caterers, and NGOs are welcome.</p>
              <div className="flex gap-4">
                <Link
                  className="rounded bg-[#F4A01C] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#d4880f]"
                  to="/donations"
                >
                  Create listing
                </Link>
                <Link
                  className="rounded border-2 border-white px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-white hover:text-[#1A1A1A]"
                  to="/claims"
                >
                  Partner as NGO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white pb-8 pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-6 text-sm text-gray-500 md:flex-row">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91-8010200666</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>reserve@xsam.in</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a className="text-gray-400 hover:text-gray-700" href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a className="text-gray-400 hover:text-gray-700" href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59l-.047-.02z" />
                </svg>
              </a>
              <a className="text-gray-400 hover:text-gray-700" href="#">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 6L12 10L8 11L10 15L9 20L14 18L18 21L19 16L23 13L19 11Z" fill="#4CAF50" />
                <path d="M16 8L15 12L12 13L14 16L13 20L16 19L20 21L20 17L23 14L20 12Z" fill="#F4A01C" />
              </svg>
              <span className="font-semibold text-gray-800">ReServe</span>
            </div>

            <nav className="flex gap-6 text-xs text-gray-500 md:gap-8">
              <Link className="hover:underline" to="/about">
                About
              </Link>
              <Link className="hover:underline" to="/blog/how-it-works">
                How it works
              </Link>
              <Link className="hover:underline" to="/blog/for-donor">
                For donors
              </Link>
              <Link className="hover:underline" to="/blog/for-ngo">
                For NGOs
              </Link>
              <Link className="hover:underline" to="/contact">
                Contact
              </Link>
            </nav>

            <Link
              className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
              to="/donations"
            >
              List surplus
            </Link>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 text-xs text-gray-400 md:flex-row">
            <p>ReServe keeps event and restaurant food out of landfills by matching it with community partners.</p>
            <div className="flex gap-4">
              <Link className="hover:underline" to="/about">
                Privacy Policy
              </Link>
              <Link className="hover:underline" to="/blog/how-it-works">
                Discover
              </Link>
            </div>
            <p>© 2024 ReServe. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage