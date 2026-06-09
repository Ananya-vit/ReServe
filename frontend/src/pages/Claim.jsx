import { useMemo, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { donationAPI, claimAPI } from '../api/api'
import LoadingButton from '../components/LoadingButton'

const Claim = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/auth')
  }
  const [page, setPage] = useState(1)
  const [isClaimsOpen, setIsClaimsOpen] = useState(false)
  const [claimsPage, setClaimsPage] = useState(1)
  const [isClaimFormOpen, setIsClaimFormOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [claimSent, setClaimSent] = useState(false)
  const [donations, setDonations] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [myClaims, setMyClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [claimForm, setClaimForm] = useState({
    pickupDate: '',
    quantity: '',
  })
  const [claimSubmitting, setClaimSubmitting] = useState(false)
  const [cancellingClaimId, setCancellingClaimId] = useState(null)
  const pageSize = 6
  const claimsPageSize = 5

  useEffect(() => {
    document.title = 'Claim Surplus — ReServe'
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const donResponse = await donationAPI.getAll(page, pageSize)
        setDonations(donResponse.donations || [])
        setTotalCount(donResponse.totalCount || 0)

        const claimsResponse = await claimAPI.getMyClaims()
        setMyClaims(claimsResponse.claims || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  const handleOpenClaimForm = (donation) => {
    setSelectedDonation(donation)
    setClaimForm({
      pickupDate: '',
      quantity: '',
    })
    setClaimSent(false)
    setIsClaimFormOpen(true)
  }

  const handleCloseClaimForm = () => {
    setIsClaimFormOpen(false)
    setSelectedDonation(null)
    setClaimSent(false)
  }

  const handleClaimChange = (event) => {
    const { name, value } = event.target
    setClaimForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleClaimSubmit = async (event) => {
    event.preventDefault()
    try {
      setClaimSubmitting(true)
      setError('')
      const qty = Number(claimForm.quantity)
      if (!qty || qty <= 0) {
        setError('Please enter a valid quantity.')
        setClaimSubmitting(false)
        return
      }
      if (qty > (selectedDonation?.quantity || 0)) {
        setError(`Only ${selectedDonation?.quantity} items available.`)
        setClaimSubmitting(false)
        return
      }
      await claimAPI.create({
        donationId: selectedDonation.id,
        quantity: qty,
        scheduledPickup: claimForm.pickupDate,
      })
      setClaimSent(true)
      const response = await claimAPI.getMyClaims()
      setMyClaims(response.claims || [])
      const donResponse = await donationAPI.getAll(page, pageSize)
      setDonations(donResponse.donations || [])
      setTotalCount(donResponse.totalCount || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setClaimSubmitting(false)
    }
  }

  const handleCancelClaim = async (claimId) => {
    try {
      setCancellingClaimId(claimId)
      await claimAPI.cancel(claimId, 'Cancelled by NGO')
      const response = await claimAPI.getMyClaims()
      setMyClaims(response.claims || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCancellingClaimId(null)
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const totalClaimsPages = Math.max(1, Math.ceil(myClaims.length / claimsPageSize))

  const claimsPageItems = useMemo(() => {
    const start = (claimsPage - 1) * claimsPageSize
    return myClaims.slice(start, start + claimsPageSize)
  }, [claimsPage, myClaims])

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
            <Link className="hover:opacity-70" to="/">
              Home
            </Link>
            <Link className="hover:opacity-70 font-semibold text-gray-900" to="/claims">
              Claims
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="group relative">
              <button
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white"
                type="button"
              >
                <span className="text-xs font-semibold text-gray-600">RS</span>
              </button>
              <div className="invisible absolute z-50 right-0 top-full w-36 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-gray-100 bg-white p-2 text-xs text-gray-600 shadow-lg">
                  <Link className="block rounded-lg px-3 py-2 hover:bg-gray-50" to={localStorage.getItem('isOnboarded') === 'true' ? '/profile' : '/onboarding'}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left rounded-lg px-3 py-2 hover:bg-gray-50">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
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
          {loading ? (
            <div className="text-center text-gray-500">Loading donations...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-gray-700">No donations available</p>
              <p className="mt-2 text-sm text-gray-400">Check back soon for new surplus listings.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {donations.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="relative h-[180px] bg-gray-200">
                      {item.images?.[0]?.imageUrl ? (
                        <img alt={item.foodName} className="h-full w-full object-cover" src={item.images[0].imageUrl} />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">No image</div>
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700">
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-3 px-5 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.foodName}</h3>
                          <p className="text-xs text-gray-400">{item.donor?.name || 'Anonymous'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.quantity}
                          </p>
                          <p className="text-xs text-gray-400">items left</p>
                        </div>
                      </div>
                      <div className="grid gap-2 text-xs text-gray-500">
                        <div className="flex items-center justify-between">
                          <span>Pickup deadline</span>
                          <span className="font-medium text-gray-700">{new Date(item.pickupDeadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Location</span>
                          <span className="font-medium text-gray-700">{item.pickupLocation?.city || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                        <span>Posted</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        className="w-full rounded border border-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#1A1A1A] transition hover:bg-[#1A1A1A] hover:text-white"
                        onClick={() => handleOpenClaimForm(item)}
                        type="button"
                      >
                        Claim food
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  {totalCount > 0
                    ? `Showing ${(page - 1) * pageSize + 1} - ${Math.min(page * pageSize, totalCount)} of ${totalCount} donations`
                    : 'No donations found'}
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
            </>
          )}
        </div>
      </section>

      {isClaimsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
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
               {claimsPageItems.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-400">No claims yet.</p>
              ) : claimsPageItems.map((claim) => (
                <div key={claim.id} className="rounded-xl border border-gray-100 px-4 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-400">Claim #{claim.id}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            claim.status === 'PICKED_UP'
                              ? 'bg-blue-100 text-blue-800'
                              : claim.status === 'ACCEPTED'
                              ? 'bg-[#F4A01C]/15 text-[#b26f0b]'
                              : claim.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : claim.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : claim.status === 'COMPLETED'
                              ? 'bg-[#4CAF50]/15 text-[#2f7a33]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mt-1">{claim.donation?.foodName}</h3>
                      <p className="text-xs text-gray-400">From: {claim.donation?.donor?.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-400">Pickup: {claim.scheduledPickup ? new Date(claim.scheduledPickup).toLocaleDateString() : 'TBD'}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-800">{claim.quantity || 0}</span> / {claim.donation?.quantity || 0} qty
                      </p>
                    </div>
                    {(claim.status === 'PENDING' || claim.status === 'ACCEPTED') && (
                      <LoadingButton
                        className="rounded border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        loading={cancellingClaimId === claim.id}
                        onClick={() => handleCancelClaim(claim.id)}
                        type="button"
                      >
                        Cancel
                      </LoadingButton>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {myClaims.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  Showing {(claimsPage - 1) * claimsPageSize + 1} -{' '}
                  {Math.min(claimsPage * claimsPageSize, myClaims.length)} of {myClaims.length} claims
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
            )}
          </div>
        </div>
      ) : null}

      {isClaimFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Claim request
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedDonation ? `${selectedDonation.foodName} from ${selectedDonation.donor?.name || 'Anonymous'}` : 'Requesting a claim'}
                </p>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-700" onClick={handleCloseClaimForm}>
                Close
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleClaimSubmit}>
              <div className="rounded-xl bg-[#F5F0E8]/50 px-4 py-3 text-sm text-gray-700">
                Available: <span className="font-bold text-[#1A1A1A]">{selectedDonation?.quantity || 0}</span> items
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-gray-600">When can you pick up?</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    name="pickupDate"
                    onChange={handleClaimChange}
                    type="datetime-local"
                    value={claimForm.pickupDate}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Quantity needed</label>
                  <input
                    className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                    name="quantity"
                    onChange={handleClaimChange}
                    placeholder="e.g. 20"
                    type="number"
                    min="1"
                    max={selectedDonation?.quantity || 1}
                    value={claimForm.quantity}
                    required
                  />
                </div>
              </div>

              {claimSent ? (
                <div className="rounded-xl bg-[#4CAF50]/10 px-4 py-3 text-xs text-[#2f7a33]">
                  Claim request sent to the donor. We will notify you when they respond.
                </div>
              ) : null}

              {error && <div className="rounded bg-red-100 p-2 text-xs text-red-700">{error}</div>}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <LoadingButton
                    className="rounded bg-[#1A1A1A] px-5 py-3 text-xs uppercase tracking-[0.2em] text-white disabled:opacity-50"
                    type="submit"
                    loading={claimSubmitting}
                  >
                    Send claim
                  </LoadingButton>
                <button
                  className="text-xs font-semibold text-[#F4A01C]"
                  onClick={handleCloseClaimForm}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Claim