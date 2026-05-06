"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "../components/ui/Container"
import { useLoginMutation } from "../features/authApi"
import { Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addNotification } from "../features/notificationSlice"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await login({
        email: form.email,
        password: form.password,
      }).unwrap()

      if (res?.token) localStorage.setItem("token", res.token)
      dispatch(addNotification("User logged in"))
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.data?.message || "Invalid email or password")
    }
  }

  // Consistent style to clear the icon
  const iconInputStyle = { paddingLeft: "3rem" }

  return (
    <Container>
      <div className="max-w-md mx-auto mt-20 p-8 card fade-in">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--text-muted)]">
            Enter your credentials to access your account
          </p>
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ml-1">
              Email Address
            </label>
            <div className="relative group flex items-center">
              <Mail
                size={18}
                className="absolute left-4 z-10 pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
              />
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                value={form.email}
                onChange={handleChange}
                className="input w-full"
                style={iconInputStyle}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[var(--primary)] hover:opacity-80 font-medium"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group flex items-center">
              <Lock
                size={18}
                className="absolute left-4 z-10 pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors"
              />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={form.password}
                onChange={handleChange}
                className="input w-full"
                style={iconInputStyle}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[var(--primary)] font-semibold hover:underline underline-offset-4"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </Container>
  )
}