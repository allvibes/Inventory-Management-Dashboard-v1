"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "../components/ui/Container"
import { useRegisterMutation } from "../features/authApi"
import { User, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [register, { isLoading }] = useRegisterMutation()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      }).unwrap()

      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.data?.message || "Registration failed")
    }
  }

  // Consistent padding to ensure text clears the absolute icons
  const iconInputStyle = { paddingLeft: "3rem" }

  return (
    <Container>
      <div className="max-w-md mx-auto mt-16 p-8 card fade-in">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Create Account
          </h1>
          <p className="text-[var(--text-muted)]">
            Start managing your inventory today
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ml-1">
              Full Name
            </label>
            <div className="relative flex items-center group">
              <User 
                size={18} 
                className="absolute left-4 text-[var(--text-muted)] z-10 pointer-events-none group-focus-within:text-[var(--primary)] transition-colors" 
              />
              <input
                name="name"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={handleChange}
                className="input w-full"
                style={iconInputStyle}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ml-1">
              Email Address
            </label>
            <div className="relative flex items-center group">
              <Mail 
                size={18} 
                className="absolute left-4 text-[var(--text-muted)] z-10 pointer-events-none group-focus-within:text-[var(--primary)] transition-colors" 
              />
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={form.email}
                onChange={handleChange}
                className="input w-full"
                style={iconInputStyle}
              />
            </div>
          </div>

          {/* PASSWORD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                Password
              </label>
              <div className="relative flex items-center group">
                <Lock 
                  size={18} 
                  className="absolute left-4 text-[var(--text-muted)] z-10 pointer-events-none group-focus-within:text-[var(--primary)] transition-colors" 
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] ml-1">
                Confirm
              </label>
              <div className="relative flex items-center group">
                <Lock 
                  size={18} 
                  className="absolute left-4 text-[var(--text-muted)] z-10 pointer-events-none group-focus-within:text-[var(--primary)] transition-colors" 
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="input w-full"
                  style={iconInputStyle}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] font-semibold hover:underline underline-offset-4"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </Container>
  )
}