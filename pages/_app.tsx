import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AdminAuthProvider } from '@/contexts/AdminAuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
