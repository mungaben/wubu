

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
  

const MobileNav = () => {
  const IsOpen = Zustandtorage(state => state.navModalOpen)
  const toggleNavModal = Zustandtorage(state => state.toggleNavModal)
  return (
    <div  className="grid grid-cols-2">
   
      <Sheet open={IsOpen} onOpenChange={toggleNavModal}  >
        
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you &apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
  
  </div>
  )
}

export default MobileNav