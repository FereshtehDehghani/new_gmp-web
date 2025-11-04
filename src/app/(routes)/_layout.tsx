'use client'

import Navigation from '@/components/layout/Navigation'
import { useAuth } from '@/context/useAuth'

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth()

  if (!accessToken) {
    // Show nothing until redirect happens
    return null
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
