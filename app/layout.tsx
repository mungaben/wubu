import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import NavFull from './NavBar/Components/NavFull'
import MobileNav from './NavBar/Modals/MobileNav'
import Provider from '@/components/context/Provider'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: '600'
})

export const metadata: Metadata = {
  title: 'Benkiko DAO',
  description: 'Benkiko DAO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins}"min-h-screen mx-auto justify-center items-center overflow-hidden  flex flex-col bg-gray-100 
          dark:bg-gray-900 `}>
        <Provider>
          <div className='   '>
            <NavFull />
            <main className="flex flex-col justify-center items-center flex-1 max-w-6xl w-full  ">
              {children}
            </main>
            <MobileNav />
          </div>
        </Provider>
      </body>
    </html>
  )
}
