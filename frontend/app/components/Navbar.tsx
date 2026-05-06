"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState, memo, useRef } from "react"
import {
  Sun,
  Moon,
  User,
  Bell,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useSelector, useDispatch } from "react-redux"
import { useGetCurrentUserQuery } from "@/features/authApi"
import { setSearchTerm } from "@/store/slices/searchSlice"
import { addNotification } from "@/features/notificationSlice"

function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const dispatch = useDispatch()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [openNotif, setOpenNotif] = useState(false)

  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // ✅ REDUX
  const { user, token } = useSelector((state: any) => state.auth)
  const notifications = useSelector((state: any) => state.notifications || [])

  // ✅ SESSION RESTORE
  useGetCurrentUserQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ CLOSE DROPDOWN
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
        setOpenNotif(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!mounted) return null

  const isAuthPage = ["/login", "/register"].includes(pathname)

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Inventory", href: "/inventory" },
    { name: "Orders", href: "/orders" },
    { name: "Suppliers", href: "/suppliers" },
    { name: "Reports", href: "/reports" },
    { name: "Analytics", href: "/analytics" },
  ]

  const logout = () => {
    localStorage.removeItem("token")
    dispatch(addNotification("User logged out"))
    router.push("/login")
  }

  // 🔍 SEARCH BUTTON CLICK (IMPORTANT FIX)
  const handleSearch = () => {
    dispatch(setSearchTerm(search))
  }

  return (
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b bg-white dark:bg-[#020617] border-gray-200 dark:border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-4 md:gap-8">

        {!isAuthPage && (
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="text-gray-700 dark:text-white" />
            ) : (
              <Menu className="text-gray-700 dark:text-white" />
            )}
          </button>
        )}

        <Link href="/dashboard" className="font-bold text-lg text-gray-900 dark:text-white">
          <span className="text-amber-500">Inventory</span>Pro
        </Link>

        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-700 dark:text-gray-300 hover:text-amber-500"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        )}
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && !isAuthPage && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-[#020617] border-b border-gray-200 dark:border-white/10 md:hidden z-50">
          <div className="flex flex-col p-4 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 dark:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* 🔍 SEARCH */}
        {!isAuthPage && (
          <div className="relative hidden md:block">
            <Search
              size={16}
              onClick={handleSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="
                pl-9 pr-3 py-2 rounded-lg text-sm w-56
                bg-gray-100 dark:bg-zinc-800
                text-gray-900 dark:text-white
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-amber-400
              "
            />
          </div>
        )}

        {/* 🔔 NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="p-2 rounded-lg border border-gray-200 dark:border-white/10"
          >
            <Bell size={18} className="text-gray-700 dark:text-white" />
          </button>

          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5">
              {notifications.length}
            </span>
          )}

          {openNotif && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n: any) => (
                  <div
                    key={n.id}
                    className="px-4 py-2 text-sm border-b text-gray-700 dark:text-gray-300"
                  >
                    {n.message}
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-500">No notifications</div>
              )}
            </div>
          )}
        </div>

        {/* ⚙️ */}
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-lg border border-gray-200 dark:border-white/10"
        >
          <Settings size={18} className="text-gray-700 dark:text-white" />
        </button>

        {/* 🌙 / ☀️ */}
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg border border-gray-200 dark:border-white/10" > {theme === "dark" ? ( <Sun size={18} className="text-yellow-400" /> ) : ( <Moon size={18} className="text-white" /> )} </button>

        {/* 👤 USER */}
        {token && !isAuthPage ? (
          <div ref={dropdownRef} className="relative flex items-center gap-2">

            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <User size={18} className="text-gray-700 dark:text-white" />
              <span className="text-sm hidden sm:block text-gray-900 dark:text-white">
                {user?.name || "User"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-40 rounded-lg bg-white dark:bg-zinc-800 shadow-lg border border-gray-200 dark:border-white/10 z-50">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          !isAuthPage && (
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-lg bg-amber-500 text-black font-medium"
            >
              Login
            </button>
          )
        )}
      </div>
    </header>
  )
}

export default memo(Navbar)