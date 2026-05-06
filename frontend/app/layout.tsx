import "./globals.css"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import Providers from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Removed "bg-backgroundLight" etc. 
         The 'body' styles in your CSS already handle the background and text color 
      */}
      <body className="h-screen overflow-hidden">
        <Providers>
          <div className="flex flex-col h-full">

            {/* NAVBAR: Added .sidebar class to match the border/bg logic */}
            <header className="sticky top-0 z-50 sidebar border-b">
              <Navbar />
            </header>

            <div className="flex flex-1 overflow-hidden">
              {/* SIDEBAR: Using your .sidebar class from CSS */}
              <aside className="hidden md:flex w-64 sidebar">
                <Sidebar />
              </aside>

              {/* MAIN CONTENT */}
              <main className="flex-1 overflow-y-auto p-6 fade-in">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>

          </div>
        </Providers>
      </body>
    </html>
  )
}