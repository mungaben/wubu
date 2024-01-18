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
      <body className={`${poppins}"min-h-screen mx-auto justify-center items-center  no-scrollbar dark:text-foreground bg-white text-foreground leading-relaxed   flex flex-col dark:bg-[#0f0f0f] 
           `}>
        <Provider>
          <div className='   '>
            <div className='w-full flex justify-center items-center'>
              <NavFull />
            </div>
            <main className=" ">
              {children}
            </main>
            <MobileNav />
          </div>
        </Provider>
      </body>
    </html>
  )
}
