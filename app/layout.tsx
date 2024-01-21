import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import NavFull from './NavBar/Components/NavFull'
import MobileNav from './NavBar/Modals/MobileNav'
import Provider from '@/components/context/Provider'
import { Toaster } from 'react-hot-toast'
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
      <body className={`${poppins}"min-h-screen mx-auto justify-center items-center  no-scrollbar dark:text-foreground  text-foreground leading-relaxed   flex flex-col dark:bg-[#1D1E30] bg-[#FFFFFF] `}>
        <Provider>
          <div className=' dark:bg-[#0c0c0c] bg-[#FFFFFF] w-full h-full   '>
            <div className='w-full flex justify-center items-center'>
              <NavFull />
            </div>
            <main className="  ">
            <Toaster position="bottom-right" />
              {children}
            </main>
            <MobileNav />
          </div>
        </Provider>
      </body>
    </html>
  )
}
