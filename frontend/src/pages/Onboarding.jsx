import React, { useMemo, useState } from 'react'

const steps = [
  {
    id: 'profile',
    title: 'Organization profile',
    description: 'Tell us about your restaurant, venue, or NGO team.'
  },
  {
    id: 'contact',
    title: 'Pickup contact details',
    description: 'Add phone and location so pickups are fast and safe.'
  },
  {
    id: 'verification',
    title: 'Verification documents',
    description: 'Upload your registration or food safety documents.'
  },
  {
    id: 'finish',
    title: 'All set',
    description: 'You are ready to share or claim surplus food.'
  }
]

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0)
  const currentStep = steps[stepIndex]
  const progress = useMemo(() => ((stepIndex + 1) / steps.length) * 100, [stepIndex])

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
            <a className="hover:opacity-70" href="/">
              Home
            </a>
            <a className="hover:opacity-70" href="/donations">
              Donations
            </a>
            <a className="hover:opacity-70" href="/claims">
              Claims
            </a>
          </div>
          <a
            className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white transition hover:bg-[#333]"
            href="/donations"
          >
            List surplus
          </a>
        </nav>
      </section>

      <section className="bg-white pb-16 pt-8">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F4A01C]">Onboarding</p>
              <h1
                className="mt-3 text-4xl font-black text-gray-900 md:text-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let&apos;s complete your profile in minutes.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
                We use these details to verify partners and make pickup coordination easier. You can update everything
                later.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F5F0E8]/50 p-6">
              <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
                <span>Step {stepIndex + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white">
                <div className="h-2 rounded-full bg-[#F4A01C] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        index <= stepIndex ? 'bg-[#1A1A1A] text-white' : 'bg-white text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={index === stepIndex ? 'font-semibold text-gray-900' : ''}>{step.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {currentStep.title}
              </h2>
              <p className="text-xs text-gray-500">{currentStep.description}</p>
            </div>

            {currentStep.id === 'profile' ? (
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Organization name</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Sunrise Catering, Bella Bistro, or Hope Kitchen"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Primary contact</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Operations or kitchen lead"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Avatar</label>
                  <input
                    className="mt-2 w-full rounded border border-dashed border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    type="file"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Organization summary</label>
                  <textarea
                    className="mt-2 h-24 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Share your mission or the types of surplus you handle"
                  />
                </div>
              </form>
            ) : null}

            {currentStep.id === 'contact' ? (
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Phone number</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="+234 801 000 0000"
                    type="tel"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Primary pickup location</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Ikoyi, Lagos"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Pickup instructions</label>
                  <textarea
                    className="mt-2 h-24 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Gate access, loading bay, or security notes"
                  />
                </div>
              </form>
            ) : null}

            {currentStep.id === 'verification' ? (
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Verification PDF</label>
                  <input
                    className="mt-2 w-full rounded border border-dashed border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    type="file"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Food safety permit (optional)</label>
                  <input
                    className="mt-2 w-full rounded border border-dashed border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    type="file"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Additional notes</label>
                  <textarea
                    className="mt-2 h-24 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    placeholder="Share anything we should know about handling or storage"
                  />
                </div>
              </form>
            ) : null}

            {currentStep.id === 'finish' ? (
              <div className="mt-6 rounded-2xl bg-[#F5F0E8]/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900">You are all set!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your profile details are saved. You can now browse surplus or share new listings.
                </p>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                className="rounded border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-600"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                type="button"
              >
                Back
              </button>
              <div className="flex gap-3">
                {stepIndex < steps.length - 1 ? (
                  <button
                    className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.12em] text-white"
                    onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                    type="button"
                  >
                    Next step
                  </button>
                ) : (
                  <a
                    className="rounded bg-[#F4A01C] px-5 py-2 text-xs uppercase tracking-[0.12em] text-white"
                    href="/donations"
                  >
                    Go to dashboard
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Onboarding