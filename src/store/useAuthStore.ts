import { create } from 'zustand'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { supabase } from '../lib/supabase'
import type { AuthUser } from '../types'

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Authentication failed. Please try again.'
}

type AuthStore = {
  user: AuthUser | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  init: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  init: () => {
    onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              displayName: firebaseUser.displayName ?? '',
            },
            loading: false,
          })
        } else {
          set({ user: null, loading: false })
        }
      },
      (error: unknown) => set({ error: getErrorMessage(error), loading: false }),
    )
  },

  signIn: async (email, password) => {
    try {
      set({ error: null, loading: true })
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: unknown) {
      set({ error: getErrorMessage(error), loading: false })
    }
  },

  register: async (email, password, displayName) => {
    try {
      set({ error: null, loading: true })
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await supabase.from('users').insert({
        firebase_uid: result.user.uid,
        email,
        display_name: displayName,
      })
    } catch (error: unknown) {
      set({ error: getErrorMessage(error), loading: false })
    }
  },

  logout: async () => {
    try {
      await signOut(auth)
      set({ user: null, loading: false, error: null })
    } catch (error: unknown) {
      set({ error: getErrorMessage(error), loading: false })
    }
  },
}))
