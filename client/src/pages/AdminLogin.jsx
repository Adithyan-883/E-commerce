import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
  const { adminUser, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (adminUser?.isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-[#22c622]/10 bg-white p-8 shadow-xl sm:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Administration</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1E3A1A]">Admin sign in</h1>
        <p className="mt-4 text-sm leading-7 text-[#475569]">Sign in with an administrator account to view orders and inventory.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-[#475569]">Email address</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm outline-none focus:border-[#22c622]" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#475569]">Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-3 w-full rounded-3xl border border-[#22c622]/20 bg-[#FACC15]/10 px-4 py-4 text-sm outline-none focus:border-[#22c622]" />
          </label>
          {error && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center rounded-full bg-[#22c622] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#FACC15] hover:text-[#1E3A1A] disabled:opacity-70">
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AdminLogin
