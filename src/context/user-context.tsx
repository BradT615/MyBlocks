// src/context/user-context.tsx
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export interface UserProfile {
  id: string;
  email?: string;
  // Server profile properties
  fullName?: string;
  avatarUrl?: string | null;
  // Context profile properties from Supabase
  full_name?: string;
  avatar_url?: string | null;
}

// Update the context props
interface UserContextProps {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  profile: null,
  loading: true,
  refreshUser: async () => {}
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refreshUser = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Fetch user profile from the profiles table
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setProfile(profileData || {
          id: user.id,
          full_name: user.user_metadata?.full_name,
          avatar_url: user.user_metadata?.avatar_url,
          email: user.email
        })
      } else {
        setProfile(null)
      }
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await refreshUser()
      setLoading(false)
    }

    fetchUser()

    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'USER_UPDATED' || event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        await refreshUser()
        router.refresh() // This forces a refresh of all client components
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return (
    <UserContext.Provider value={{ user, profile, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)