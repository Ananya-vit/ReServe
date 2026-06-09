import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  useEffect(() => {
    document.title = 'About — ReServe'
  }, [])

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
          <Link className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1A1A1A] hover:text-[#F4A01C]" to="/">
            Back to home
          </Link>
          <h1
            className="mt-4 text-4xl font-black text-gray-900 md:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About ReServe
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
            We help restaurants, caterers, and event venues keep good food out of landfills by matching surplus with
            trusted NGOs. Every listing turns into real meals for communities that need them.
          </p>
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
                Why we exist
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Surplus food is created every day during service peaks, events, and catering orders. Our platform makes
                it easy to share that surplus with verified NGOs in minutes, not hours.
              </p>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What we believe
              </h2>
              <ul className="mt-4 grid gap-3 text-sm text-gray-600">
                <li>Speed and safety are non-negotiable for food rescue.</li>
                <li>Donors and NGOs deserve clear, reliable coordination.</li>
                <li>Impact should be easy to track and share.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How we measure impact
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                We track meals rescued, pickup turnaround time, and donor participation across cities. These insights
                help partners share their sustainability progress.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-[#1A1A1A] p-6 text-white">
              <h3 className="text-xl font-semibold">At a glance</h3>
              <div className="mt-4 grid gap-4 text-sm text-white/80">
                <div>
                  <p className="text-2xl font-black text-white">48K+</p>
                  <p>Meals rescued in the last year</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">1.2K</p>
                  <p>Active donor partners</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">320</p>
                  <p>Verified NGO kitchens</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Explore the network</h3>
              <p className="mt-2 text-sm text-gray-500">
                Learn how donors and NGOs collaborate to move surplus quickly.
              </p>
              <Link
                className="mt-4 inline-flex rounded bg-[#F4A01C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white"
                to="/blog/how-it-works"
              >
                How it works
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default About
