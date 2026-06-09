import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAPI } from '../api/api'

const getDashboardPath = () => {
  const tok = localStorage.getItem('accessToken')
  if (!tok) return '/donations'
  try {
    const role = JSON.parse(atob(tok.split('.')[1])).role
    return role === 'NGO' ? '/claims' : '/donations'
  } catch {
    return '/donations'
  }
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'My Profile — ReServe'
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]))
          const response = await userAPI.getById(payload.userId)
          setUser(response.user)
        }
      } catch {
        // Profile fetch failed, show static UI
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/auth')
  }

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen">
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
        <div className="flex items-center gap-3">
          <Link
            className="rounded bg-[#1A1A1A] px-5 py-2 text-xs uppercase tracking-[0.06em] text-white"
            to={getDashboardPath()}
          >
            Dashboard
          </Link>
          <button onClick={handleLogout} className="rounded border border-gray-200 px-5 py-2 text-xs uppercase tracking-[0.06em] text-gray-600 transition hover:bg-gray-50">
            Logout
          </button>
        </div>
      </nav>
      
      <section className="mx-auto max-w-4xl px-6 py-12 md:px-10">
        <h1 className="text-4xl font-black text-gray-900 md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          My Profile
        </h1>
        <p className="mt-4 text-sm text-gray-500">
          Your profile information is securely stored here.
        </p>
        
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading profile...</div>
          ) : (
            <div className="mt-10 rounded-2xl border border-[#F4A01C]/30 bg-[#F5F0E8]/50 p-8 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-[#F4A01C]/50 shadow-sm text-lg font-bold text-[#F4A01C]">
                  RS
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{user?.name || 'Your Organization'}</p>
                  <p className="mt-1 text-sm text-gray-500">{user?.email || 'Onboarding successfully completed'}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Role</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{user?.role || 'Partner'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status</p>
                  <p className="mt-1 text-sm font-medium text-green-600 flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    {user?.isVerified ? 'Verified Partner' : 'Pending Verification'}
                  </p>
                </div>
                {user?.phone && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{user.phone}</p>
                  </div>
                )}
                {user?.trustScore > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Trust Score</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{user.trustScore.toFixed(1)}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#F4A01C]">{user?.mealsDonated || 0}</p>
                  <p className="text-xs text-gray-500">Meals Donated</p>
                </div>
                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#F4A01C]">{user?.mealsReceived || 0}</p>
                  <p className="text-xs text-gray-500">Meals Received</p>
                </div>
                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#F4A01C]">{user?.successfulPickups || 0}</p>
                  <p className="text-xs text-gray-500">Pickups</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F4A01C]/20">
                <Link to={getDashboardPath()} className="text-sm font-semibold text-[#F4A01C] hover:text-[#d4880f] flex items-center gap-1">
                  Go to Dashboard
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          )}
      </section>
    </div>
  )
}

export default Profile
