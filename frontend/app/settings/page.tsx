"use client"

import { useState } from "react"
import { User, Lock, Bell, Moon, Sun, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)

  // Toggle helper to apply the .dark class to the document
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">
            Settings
          </h1>
          <p className="text-[var(--text-muted)] mt-2">
            Manage your account preferences and system behavior.
          </p>
        </header>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-8 pb-20">

          {/* PROFILE SECTION */}
          <section className="card fade-in">
            <div className="flex items-center gap-3 mb-6">
              <User size={20} className="text-[var(--primary)]" />
              <h2 className="text-lg font-semibold text-[var(--text)]">Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                  Full Name
                </label>
                <input
                  placeholder="John Doe"
                  className="input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                  Email Address
                </label>
                <input
                  placeholder="john@example.com"
                  className="input"
                />
              </div>

              <button className="btn btn-primary w-full mt-4 py-3">
                Update Profile
              </button>
            </div>
          </section>

          {/* SECURITY SECTION */}
          <section className="card fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} className="text-[var(--primary)]" />
              <h2 className="text-lg font-semibold text-[var(--text)]">Security</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                  Current Password
                </label>
                <input type="password" placeholder="••••••••" className="input" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] ml-1">
                  New Password
                </label>
                <input type="password" placeholder="••••••••" className="input" />
              </div>
              <button className="w-full mt-4 py-3 border border-[var(--border)] rounded-[10px] text-[var(--text)] hover:bg-[var(--bg-soft)] transition font-medium">
                Change Password
              </button>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="card fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-[var(--primary)]" />
              <h2 className="text-lg font-semibold text-[var(--text)]">Notifications</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setEmailNotif(!emailNotif)}>
                <div>
                  <p className="font-medium text-[var(--text)]">Email Updates</p>
                  <p className="text-xs text-[var(--text-muted)]">Activity logs and reports</p>
                </div>
                <div className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${emailNotif ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${emailNotif ? "translate-x-5" : ""}`} />
                </div>
              </div>

              <div className="flex items-center justify-between group cursor-pointer" onClick={() => setPushNotif(!pushNotif)}>
                <div>
                  <p className="font-medium text-[var(--text)]">Push Notifications</p>
                  <p className="text-xs text-[var(--text-muted)]">Desktop alerts</p>
                </div>
                <div className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${pushNotif ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${pushNotif ? "translate-x-5" : ""}`} />
                </div>
              </div>
            </div>
          </section>

          {/* APPEARANCE */}
          <section className="card fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              {darkMode ? <Moon size={20} className="text-[var(--primary)]" /> : <Sun size={20} className="text-[var(--primary)]" />}
              <h2 className="text-lg font-semibold text-[var(--text)]">Appearance</h2>
            </div>

            <p className="text-sm text-[var(--text-muted)] mb-6">
              Toggle between light and dark themes to change the interface look.
            </p>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text)] hover:brightness-95 transition"
            >
               <span className="font-medium">{darkMode ? 'Dark' : 'Light'} Mode</span>
               <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center bg-[var(--primary)]`}>
                 <div className="w-1.5 h-1.5 bg-[#111] rounded-full" />
               </div>
            </button>
          </section>

        </div>
      </div>
    </div>
  )
}