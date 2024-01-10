
"use client"
import React, { useState } from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { Menu } from "lucide-react"
import { Zustandtorage } from '@/Store/ZuStore/Zustandtorage'


const NavFull = () => {
    const NavModal = Zustandtorage(state => state.toggleNavModal)


    const openModal = () => {
        NavModal()
    }

    return (
        <nav className=' top-0 '>

            <div className=' mt-2  w-full lg:flex hidden    justify-between fixed   overflow-hidden  '>

                <Logo />

                <div className=' flex flex-row space-x-3 text-center justify-center items-center '>
                    <div>About</div>
                    <div>Features</div>
                    <div>Technomics</div>

                </div>

                <div className=' flex flex-row space-x-3 text-center items-center ' >
                    <div>
                        signup/login
                    </div>

                    <div>
                        theme
                    </div>


                </div>
                <div className=' mr-2 flex items-center'>
                    <Button size="sm" onClick={openModal} className='   p-3 rounded-md'>
                        <Menu size={20} className=' rounded-md' />
                    </Button>
                </div>

            </div>



        </nav>
    )
}

export default NavFull