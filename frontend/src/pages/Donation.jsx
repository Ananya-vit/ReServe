import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { donationAPI, locationAPI, claimAPI } from '../api/api'
import LoadingButton from '../components/LoadingButton'

const Donation = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/auth')
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingDonation, setEditingDonation] = useState(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [deletingDonationId, setDeletingDonationId] = useState(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [page, setPage] = useState(1)
  const [donations, setDonations] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pickupLocations, setPickupLocations] = useState([])
  const [claimsModalDonation, setClaimsModalDonation] = useState(null)
  const [claimActionLoading, setClaimActionLoading] = useState(null)
  const [formData, setFormData] = useState({
    foodName: '',
    foodType: 'VEG',
    quantity: '',
    description: '',
    specialInstructions: '',
    pickupDeadline: '',
    pickupLocationId: '',
    images: [],
  })
  const [editFormData, setEditFormData] = useState({
    foodName: '',
    foodType: 'VEG',
    quantity: '',
    description: '',
    specialInstructions: '',
    pickupDeadline: '',
  })
  const [newLocationData, setNewLocationData] = useState({
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const pageSize = 6

  useEffect(() => {
    document.title = 'My Donations — ReServe'
  }, [])

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)
        const response = await donationAPI.getMyDonations(page, pageSize)
        setDonations(response.donations || [])
        setTotalCount(response.totalCount || 0)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchLocations = async () => {
      try {
        const response = await locationAPI.getPickupLocations()
        setPickupLocations(response.locations || [])
      } catch (err) {
        console.error('Error fetching locations:', err)
      }
    }

    fetchDonations()
    fetchLocations()
  }, [page])

  const handleCreateDonation = async (e) => {
    e.preventDefault()
    try {
      setCreating(true)
      let finalLocationId = formData.pickupLocationId;

      if (finalLocationId === 'NEW') {
        const locationRes = await locationAPI.addPickup(newLocationData);
        finalLocationId = locationRes.location.id;
      }

      const data = new FormData()
      data.append('foodName', formData.foodName)
      data.append('foodType', formData.foodType)
      data.append('quantity', formData.quantity)
      data.append('description', formData.description)
      data.append('specialInstructions', formData.specialInstructions)
      data.append('pickupDeadline', formData.pickupDeadline)
      data.append('pickupLocationId', finalLocationId)
      
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          data.append('images', file)
        })
      }

      await donationAPI.create(data)
      setFormData({
        foodName: '',
        foodType: 'VEG',
        quantity: '',
        description: '',
        specialInstructions: '',
        pickupDeadline: '',
        pickupLocationId: '',
        images: [],
      })
      setNewLocationData({
        address: '',
        city: '',
        state: '',
        pincode: '',
      })
      setIsModalOpen(false)
      const response = await donationAPI.getMyDonations(1, pageSize)
      setDonations(response.donations || [])
      setTotalCount(response.totalCount || 0)
      setPage(1)
      
      const locResponse = await locationAPI.getPickupLocations()
      setPickupLocations(locResponse.locations || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleClaimAction = async (claimId, status) => {
    try {
      setClaimActionLoading(claimId)
      await claimAPI.updateStatus(claimId, status)
      const response = await donationAPI.getMyDonations(page, pageSize)
      setDonations(response.donations || [])
      setTotalCount(response.totalCount || 0)
      if (claimsModalDonation) {
        const updated = response.donations.find(d => d.id === claimsModalDonation.id)
        if (updated) setClaimsModalDonation(updated)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setClaimActionLoading(null)
    }
  }

  const handleOpenEdit = (donation) => {
    setEditingDonation(donation)
    setEditFormData({
      foodName: donation.foodName,
      foodType: donation.foodType,
      quantity: String(donation.quantity),
      description: donation.description || '',
      specialInstructions: donation.specialInstructions || '',
      pickupDeadline: donation.pickupDeadline ? new Date(donation.pickupDeadline).toISOString().slice(0, 16) : '',
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateDonation = async (e) => {
    e.preventDefault()
    if (!editingDonation) return
    try {
      setSaving(true)
      setError('')
      await donationAPI.update(editingDonation.id, editFormData)
      setIsEditModalOpen(false)
      setEditingDonation(null)
      const response = await donationAPI.getMyDonations(page, pageSize)
      setDonations(response.donations || [])
      setTotalCount(response.totalCount || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleOpenDelete = (donationId) => {
    setDeletingDonationId(donationId)
    setIsDeleteConfirmOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingDonationId) return
    try {
      setDeleting(true)
      setError('')
      await donationAPI.delete(deletingDonationId)
      setIsDeleteConfirmOpen(false)
      setDeletingDonationId(null)
      const response = await donationAPI.getMyDonations(page, pageSize)
      setDonations(response.donations || [])
      setTotalCount(response.totalCount || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  const pendingClaimsCount = (donation) => {
    return donation.claims?.filter(c => c.status === 'PENDING').length || 0
  }

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
            <Link className="hover:opacity-70 font-semibold text-gray-900" to="/donations">
              Donations
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
              Your surplus listings
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
              Track surplus from restaurants, weddings, and events. Review and manage claims from NGO partners.
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
          {loading ? (
            <div className="text-center text-gray-500">Loading donations...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-gray-700">No donations yet</p>
              <p className="mt-2 text-sm text-gray-400">Click "Add new" to create your first surplus listing.</p>
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
                        {item.status || 'AVAILABLE'}
                      </span>
                      <div className="absolute right-4 top-4 flex gap-2">
                        <button
                          className="rounded-full bg-white/90 p-1.5 text-gray-700 shadow-sm hover:bg-white"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit listing"
                          type="button"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="rounded-full bg-white/90 p-1.5 text-red-600 shadow-sm hover:bg-white"
                          onClick={() => handleOpenDelete(item.id)}
                          title="Delete listing"
                          type="button"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3 px-5 py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.foodName}</h3>
                          <p className="text-xs text-gray-400">{item.foodType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {item.quantity}
                          </p>
                          <p className="text-xs text-gray-400">Items</p>
                        </div>
                      </div>
                      <div className="grid gap-2 text-xs text-gray-500">
                        <div className="flex items-center justify-between">
                          <span>Location</span>
                          <span className="font-medium text-gray-700">{item.pickupLocation?.city || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Deadline</span>
                          <span className="font-medium text-gray-700">{new Date(item.pickupDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400">
                        <span>Posted</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500">Claims:</span>
                          <span className={`font-semibold ${pendingClaimsCount(item) > 0 ? 'text-[#F4A01C]' : 'text-gray-700'}`}>
                            {item.claims?.length || 0} total
                            {pendingClaimsCount(item) > 0 ? ` (${pendingClaimsCount(item)} pending)` : ''}
                          </span>
                        </div>
                        {(item.claims?.length || 0) > 0 && (
                          <button
                            className="text-xs font-semibold text-[#F4A01C] hover:text-[#d4880f]"
                            onClick={() => setClaimsModalDonation(item)}
                            type="button"
                          >
                            View claims
                          </button>
                        )}
                      </div>
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

      {claimsModalDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Claims for {claimsModalDonation.foodName}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Review and manage pickup requests from NGO partners.
                </p>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-700" onClick={() => setClaimsModalDonation(null)}>
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {claimsModalDonation.claims?.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-400">No claims for this donation yet.</p>
              ) : claimsModalDonation.claims.map((claim) => (
                <div key={claim.id} className="rounded-xl border border-gray-100 px-4 py-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-gray-400">Claim #{claim.id}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            claim.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : claim.status === 'ACCEPTED'
                              ? 'bg-green-100 text-green-800'
                              : claim.status === 'REJECTED'
                              ? 'bg-red-100 text-red-800'
                              : claim.status === 'PICKED_UP'
                              ? 'bg-blue-100 text-blue-800'
                              : claim.status === 'COMPLETED'
                              ? 'bg-[#4CAF50]/15 text-[#2f7a33]'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mt-1">{claim.claimer?.name || 'Anonymous NGO'}</h3>
                      <p className="text-xs text-gray-500">{claim.claimer?.phone || claim.claimer?.email || ''}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Qty: <span className="font-medium text-gray-700">{claim.quantity || 0}</span> &middot; Pickup: {claim.scheduledPickup ? new Date(claim.scheduledPickup).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {claim.status === 'PENDING' && (
                        <>
                          <LoadingButton
                            className="rounded bg-[#4CAF50] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3d9140] disabled:opacity-50"
                            loading={claimActionLoading === claim.id}
                            onClick={() => handleClaimAction(claim.id, 'ACCEPTED')}
                            type="button"
                          >
                            Accept
                          </LoadingButton>
                          <LoadingButton
                            className="rounded border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            loading={claimActionLoading === claim.id}
                            onClick={() => handleClaimAction(claim.id, 'REJECTED')}
                            type="button"
                          >
                            Reject
                          </LoadingButton>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Edit listing
                </h2>
                <p className="mt-1 text-xs text-gray-500">Update your surplus listing details.</p>
              </div>
              <button className="text-sm text-gray-400 hover:text-gray-700" onClick={() => { setIsEditModalOpen(false); setEditingDonation(null); }}>
                Close
              </button>
            </div>

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleUpdateDonation}>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Food name</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Eg. Rice and beans"
                  type="text"
                  value={editFormData.foodName}
                  onChange={(e) => setEditFormData({ ...editFormData, foodName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Food type</label>
                <select
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  value={editFormData.foodType}
                  onChange={(e) => setEditFormData({ ...editFormData, foodType: e.target.value })}
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non-vegetarian</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Quantity</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="25"
                  type="number"
                  value={editFormData.quantity}
                  onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Pickup deadline</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  type="datetime-local"
                  value={editFormData.pickupDeadline}
                  onChange={(e) => setEditFormData({ ...editFormData, pickupDeadline: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Description</label>
                <textarea
                  className="mt-2 h-20 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Food details"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Special instructions</label>
                <textarea
                  className="mt-2 h-20 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Allergy notes, storage instructions, or pickup details"
                  value={editFormData.specialInstructions}
                  onChange={(e) => setEditFormData({ ...editFormData, specialInstructions: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
                <button
                  className="rounded border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-600"
                  onClick={() => { setIsEditModalOpen(false); setEditingDonation(null); }}
                  type="button"
                >
                  Cancel
                </button>
                <LoadingButton className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.12em] text-white" type="submit" loading={saving}>
                  Save changes
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Delete listing?
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              This will permanently remove this donation and all associated claims. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-600"
                onClick={() => { setIsDeleteConfirmOpen(false); setDeletingDonationId(null); }}
                type="button"
              >
                Cancel
              </button>
              <LoadingButton
                className="rounded bg-red-600 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white hover:bg-red-700"
                onClick={handleConfirmDelete}
                type="button"
                loading={deleting}
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-10">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
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

            <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleCreateDonation}>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Food name</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Eg. Rice and beans"
                  type="text"
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Food type</label>
                <select
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  value={formData.foodType}
                  onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                >
                  <option value="VEG">Vegetarian</option>
                  <option value="NON_VEG">Non-vegetarian</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Quantity</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="25"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Pickup location</label>
                <select
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  value={formData.pickupLocationId}
                  onChange={(e) => setFormData({ ...formData, pickupLocationId: e.target.value })}
                  required
                >
                  <option value="">Select a location</option>
                  {pickupLocations.map((loc) => (
                    <option key={loc.id} value={loc.id}>{loc.address}</option>
                  ))}
                  <option value="NEW">+ Add new location</option>
                </select>
              </div>
              {formData.pickupLocationId === 'NEW' && (
                <div className="md:col-span-2 grid gap-4 md:grid-cols-2 rounded-xl bg-gray-50 p-4 border border-gray-100">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-600">Address</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="123 Street Name"
                      type="text"
                      value={newLocationData.address}
                      onChange={(e) => setNewLocationData({ ...newLocationData, address: e.target.value })}
                      required={formData.pickupLocationId === 'NEW'}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">City</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="City"
                      type="text"
                      value={newLocationData.city}
                      onChange={(e) => setNewLocationData({ ...newLocationData, city: e.target.value })}
                      required={formData.pickupLocationId === 'NEW'}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">State</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="State"
                      type="text"
                      value={newLocationData.state}
                      onChange={(e) => setNewLocationData({ ...newLocationData, state: e.target.value })}
                      required={formData.pickupLocationId === 'NEW'}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600">Pincode</label>
                    <input
                      className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                      placeholder="Pincode"
                      type="text"
                      value={newLocationData.pincode}
                      onChange={(e) => setNewLocationData({ ...newLocationData, pincode: e.target.value })}
                      required={formData.pickupLocationId === 'NEW'}
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-gray-600">Pickup deadline</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  type="datetime-local"
                  value={formData.pickupDeadline}
                  onChange={(e) => setFormData({ ...formData, pickupDeadline: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Description</label>
                <textarea
                  className="mt-2 h-20 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Food details"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Special instructions</label>
                <textarea
                  className="mt-2 h-20 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  placeholder="Allergy notes, storage instructions, or pickup details"
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-600">Images (optional)</label>
                <input
                  className="mt-2 w-full rounded border border-gray-200 px-4 py-3 text-sm focus:border-[#F4A01C] focus:outline-none"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, images: Array.from(e.target.files) })}
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
                <LoadingButton
                  className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.12em] text-white"
                  type="submit"
                  loading={creating}
                >
                  Create listing
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Donation