import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    document.title = 'Contact — ReServe'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    // Simulate sending (backend contact endpoint not yet implemented)
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

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
            {sent ? (
              <div className="mt-6 rounded-xl bg-[#4CAF50]/10 px-4 py-3 text-xs text-[#2f7a33]">
                Message sent! We will get back to you shortly.
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Full name</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Your name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Email address</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="name@email.com"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Message</label>
                  <textarea
                    className="mt-2 min-h-[140px] w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Tell us how we can help."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>
                <button
                  className="w-full rounded bg-[#1A1A1A] px-4 py-3 text-xs uppercase tracking-[0.2em] text-white disabled:opacity-50"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
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
