"use client"

import { Menu, Sun, Moon, LogOut, Bell } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, memo } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

function Topbar({ setOpen }: { setOpen: (v: boolean) => void }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [openNotif, setOpenNotif] = useState(false)

  const router = useRouter()

  // ✅ REDUX NOTIFICATIONS
  const notifications = useSelector((state: any) => state.notifications || [])

  useEffect(() => {
    setMounted(true)
    setToken(localStorage.getItem("token"))
  }, [])

  if (!mounted) {
    return <header className="h-16 px-6 border-b border-[var(--border)] bg-[var(--bg-elevated)]" />
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/login")
  }

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-[var(--bg-elevated)] border-b border-[var(--border)] sticky top-0 z-40 transition-colors duration-200">
      
      {/* LEFT AREA */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-soft)] text-[var(--text-muted)] transition"
        >
          <Menu size={20} />
        </button>

        <h1 className="font-bold text-lg tracking-tight text-[var(--text)]">
          Dashboard
        </h1>
      </div>

      {/* RIGHT AREA */}
      <div className="flex items-center gap-3">

        {/* 🔔 NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="p-2.5 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
          >
            <Bell size={19} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-[var(--bg-elevated)] rounded-full" />
            )}
          </button>

          {/* DROPDOWN */}
          {openNotif && (
            <div className="card absolute right-0 mt-3 w-80 shadow-xl z-50 max-h-[400px] overflow-hidden flex flex-col p-0">
              <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-soft)]">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Notifications</span>
              </div>
              
              <div className="overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n: any) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 text-sm border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-soft)] text-[var(--text)] transition-colors cursor-pointer"
                    >
                      {n.message}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-[var(--text-muted)]">
                    No new alerts
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-soft)] transition-all"
        >
          {theme === "dark" ? (
            <Sun size={19} className="text-[var(--primary)]" />
          ) : (
            <Moon size={19} className="text-[var(--text-muted)]" />
          )}
        </button>

        <div className="h-6 w-[1px] bg-[var(--border)] mx-1" />

        {/* AUTH ACTION */}
        {token ? (
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white font-medium transition-all text-sm"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="btn btn-primary px-5 py-2 text-sm"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}

export default memo(Topbar)