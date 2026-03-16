import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Import AdminAuthProvider dynamically only for admin pages
import dynamic from 'next/dynamic'

const AdminAuthProvider = dynamic(
  () => import('@/contexts/AdminAuthContext').then(mod => mod.AdminAuthProvider),
  { ssr: false } // Disable SSR for auth provider
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AdminAuthProvider>
  )
}
