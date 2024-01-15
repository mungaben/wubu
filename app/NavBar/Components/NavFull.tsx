
"use client"
import React, { useState } from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import { Menu } from "lucide-react"
import { Zustandtorage } from '@/Store/ZuStore/Zustandtorage'
import { ModeToggle } from '@/components/context/ToogleButton'
import ThemeSwitcher from '@/components/context/ThemeSwitch'
import { useScroll, useMotionValueEvent, motion } from "framer-motion"
const NavFull = () => {
    const NavModal = Zustandtorage(state => state.toggleNavModal)
    const openModal = () => {
        NavModal()
    }
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latestScrollY) => {
        console.log(latestScrollY);
        // previous
        const pravious = scrollY.getPrevious();
        if (latestScrollY > pravious && latestScrollY > 100) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });
    return (
        <motion.div variants={{
            hidden: { opacity: 0, y: -100, display: "none" },
            visible: { opacity: 1, y: 0 },
        }}
            animate={isHidden ? "hidden" : "visible"}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className=' mt-2  w-screen  items-center flex justify-between  '>
                <Logo />
                <div className=' md:flex hidden flex-row space-x-3 text-center justify-center items-center '>
                    <div>About</div>
                    <div>Features</div>
                    <div>Technomics</div>
                </div>
                <div className=' flex-row space-x-3 text-center items-center md:flex  hidden md:mr-5 '>
                    <div>
                        signup/login
                    </div>
                </div>
                <div className=' mr-5 flex items-center space-x-5   mx-5  '>
                    <div>
                        <ThemeSwitcher />
                    </div>
                    <Button size="sm" onClick={openModal} className=' md:hidden    p-3 rounded-md'>
                        <Menu size={20} className=' rounded-md' />
                    </Button>
                </div>
            </div>
        </motion.div >
    )
}

export default NavFull