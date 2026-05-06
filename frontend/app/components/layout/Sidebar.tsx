"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  LineChart,
  ScanLine,
} from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: LineChart },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleQuickScan = () => {
    router.push("/inventory")
  }

  return (
    <aside className="sidebar w-64 flex flex-col px-4 py-6 transition-colors duration-200">
      
      {/* BRAND / LOGO AREA 
      <div className="px-3 mb-8">
        <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
          Inventory<span className="text-[var(--primary)]">Pro</span>
        </h2>
      </div>*/}

      {/* CTA SECTION */}
      <button
        onClick={handleQuickScan}
        className="btn btn-primary w-full flex items-center justify-center gap-2 mb-8 py-3 shadow-sm active:scale-[0.98]"
      >
        <ScanLine size={18} />
        <span className="font-semibold">Quick Scan</span>
      </button>

      {/* NAV SECTION */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map((item) => {
          // Exact match or sub-route match
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive ? "nav-active" : ""}`}
            >
              <item.icon
                size={19}
                className={`transition-colors ${isActive ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}
              />
              <span className="text-[14.5px]">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto pt-6 border-t border-[var(--border)] px-3">
        <p className="text-[11px] uppercase tracking-widest font-bold text-[var(--text-muted)] opacity-60">
          System v4.0.1
        </p>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">
          © {new Date().getFullYear()} Inventory Dashboard
        </p>
      </div>
    </aside>
  )
}