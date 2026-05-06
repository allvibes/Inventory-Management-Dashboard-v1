import { createSlice } from "@reduxjs/toolkit"

type Notification = {
  id: number
  message: string
}

const loadFromStorage = (): Notification[] => {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem("notifications")
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (state: Notification[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("notifications", JSON.stringify(state))
}

const notificationSlice = createSlice({
  name: "notifications",
  initialState: loadFromStorage() as Notification[],

  reducers: {
    addNotification: (state, action) => {
      state.unshift({
        id: Date.now(),
        message: action.payload,
      })

      // keep only last 10 notifications (prevents clutter)
      if (state.length > 10) state.pop()

      saveToStorage(state)
    },

    clearNotifications: (state) => {
      state.length = 0
      saveToStorage(state)
    },
  },
})

export const { addNotification, clearNotifications } =
  notificationSlice.actions

export default notificationSlice.reducer