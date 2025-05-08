"use client";
// stores/counterStore.ts
// stores/userStore.ts
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface UserState {
  name: string
  age: number
  setName: (newName: string) => void
  setAge: (newAge: number) => void
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        name: 'Guest',
        age: 18,
        setName: (newName) => set({ name: newName }),
        setAge: (newAge) => set({ age: newAge })
      }),
      {
        name: 'user-storage', // 本地存储的 key
        partialize: (state) => ({ name: state.name }) // 选择性持久化字段
      }
    )
  )
)

export default useUserStore

