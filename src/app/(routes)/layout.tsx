
import Navigation from '@/components/layout/Navigation'

export default function RoutesLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}
