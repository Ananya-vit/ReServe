import { Link } from 'react-router-dom'

const ForNgoBlog = () => {
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
          <Link className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4CAF50] hover:text-[#1A1A1A]" to="/">
            Back to home
          </Link>
          <h1
            className="mt-4 text-4xl font-black text-gray-900 md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            For NGOs: claims that arrive on time.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            A practical guide to claiming surplus responsibly, coordinating fast pickups, and building trust with donor
            partners.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Pickup planning</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Food safety</span>
            <span className="rounded-full bg-[#F5F0E8] px-3 py-1">Volunteer ops</span>
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
                1. Verify pickups before you claim
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Confirm your team size, transport capacity, and arrival window before sending a claim. Donors rely on
                accurate ETA updates to keep food safe and ready.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-gray-600">
                <li>Send a primary contact with phone access during pickup.</li>
                <li>Bring insulated containers for hot or chilled items.</li>
                <li>Share any dietary restrictions or allergen needs early.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                2. Build a consistent pickup routine
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Consistency earns trust. When donors see regular, reliable pickups, they share more surplus and
                prioritize your requests.
              </p>
              <div className="mt-4 grid gap-3 text-sm text-gray-600">
                <div className="rounded-xl bg-[#F5F0E8]/60 px-4 py-3">
                  Schedule a standing pickup team for weekdays and a backup for weekends.
                </div>
                <div className="rounded-xl bg-[#F5F0E8]/60 px-4 py-3">
                  Set a 15-minute check-in policy when the driver is en route.
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                3. Close the loop with impact notes
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                After pickup, send a short thank-you and let donors know how many families you served. This feedback
                builds long-term partnerships.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#1A1A1A] p-6 text-white">
              <h3 className="text-xl font-semibold">Quick checklist</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>Confirm pickup window and driver details.</li>
                <li>Bring storage bins and cooling packs.</li>
                <li>Photograph items on arrival for records.</li>
                <li>Send a thank-you update within 24 hours.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Ready to claim?</h3>
              <p className="mt-2 text-sm text-gray-500">
                Visit the claims page to see real-time listings from donors near you.
              </p>
              <Link
                className="mt-4 inline-flex rounded bg-[#4CAF50] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
                to="/claims"
              >
                Go to claims
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ForNgoBlog
