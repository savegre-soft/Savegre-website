import './globals.css'
import Navbar from './components/Navbar'


export const metadata = {
  title: 'Mi Sitio',
  description: 'Sitio hecho con Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>

      </body>
    </html>
  )
}