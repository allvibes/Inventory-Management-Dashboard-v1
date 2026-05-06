"use client"

import { Provider } from "react-redux"
import { store } from "@/store/store"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/slices/authSlice"

function InitUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)))
    }
  }, [dispatch])

  return null
}

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <InitUser />
        {children}
      </ThemeProvider>
    </Provider>
  )
}