import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { authService } from '../services/authService'

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const Signup = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (data) => {
    try {
      setApiError('')
      await authService.register({ name: data.name, email: data.email, password: data.password })
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      setApiError(err.message || 'Signup failed')
    }
  }

  const handleGoogleSignup = () => {
    toast.success('Successfully signed up with Google!')
    navigate('/')
  }

  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-[2rem] border border-[#22c622]/10 bg-white p-10 shadow-2xl shadow-[#22c622]/10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[#22c622]">Create account</p>
          <h1 className="mt-4 text-3xl font-semibold text-[#1E3A1A]">Join The Royal Bakery</h1>
        </div>

        <button type="button" onClick={handleGoogleSignup} className="mb-6 flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-[#1E3A1A] transition duration-300 hover:bg-slate-50 hover:shadow-sm">
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <div className="mb-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <span className="text-xs font-medium uppercase tracking-wider text-[#475569]">Or continue with email</span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#475569]">Full name</label>
            <input id="name" {...register('name')} className={`w-full rounded-3xl border bg-[#FACC15]/10 px-5 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.name ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} placeholder="Your name" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#475569]">Email address</label>
            <input id="email" type="email" {...register('email')} className={`w-full rounded-3xl border bg-[#FACC15]/10 px-5 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.email ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} placeholder="name@example.com" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#475569]">Password</label>
              <input id="password" type="password" {...register('password')} className={`w-full rounded-3xl border bg-[#FACC15]/10 px-5 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.password ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} placeholder="Password" />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#475569]">Confirm password</label>
              <input id="confirmPassword" type="password" {...register('confirmPassword')} className={`w-full rounded-3xl border bg-[#FACC15]/10 px-5 py-4 text-sm text-[#1E3A1A] outline-none transition duration-300 ${errors.confirmPassword ? 'border-red-500' : 'border-[#22c622]/20 focus:border-[#22c622]'}`} placeholder="Confirm password" />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {apiError && <p className="text-sm text-red-500">{apiError}</p>}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#22c622] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:bg-[#FACC15] hover:text-[#1E3A1A] disabled:opacity-70">
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#475569]">
          Already have an account? <Link to="/login" className="font-semibold text-[#22c622] transition duration-300 hover:text-[#FACC15]">Sign in</Link>
        </p>
      </div>
    </section>
  )
}

export default Signup
