

"use client"


import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Zustandtorage } from '@/Store/ZuStore/Zustandtorage'
import { Menu } from 'lucide-react'
import Logo from '../Components/Logo'


const MobileNav = () => {
  const IsOpen = Zustandtorage(state => state.navModalOpen)
  const toggleNavModal = Zustandtorage(state => state.toggleNavModal)
  const NavModal = Zustandtorage(state => state.toggleNavModal)


  const openModal = () => {
    NavModal()
  }
  return (
    <div className="   ">


      <Sheet open={IsOpen} onOpenChange={toggleNavModal}   >

        <SheetContent side="left" className=' min-h-screen  bg-blend-saturation  bg-background   '>

          <nav className=' '>
            <div className=' mt-2  gap-3 items-start flex flex-col   '>
              <div className=' flex flex-col  text-start justify-start gap-3 items-start '>
                <div>About</div>
                <div>Features</div>
                <div>Technomics</div>
              </div>
              <div className=' items-start flex -ml-3   ' >
                <div>
                  <Button>
                    Signup/Login
                  </Button>
                </div>
              </div>
            </div>
          </nav>

        </SheetContent>
      </Sheet>

    </div>
  )
}

export default MobileNav