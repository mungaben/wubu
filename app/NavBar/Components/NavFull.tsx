
"use client"
import { Zustandtorage } from '@/Store/ZuStore/Zustandtorage'
import ThemeSwitcher from '@/components/context/ThemeSwitch'
import { Button } from '@/components/ui/button'
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Menu } from "lucide-react"
import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
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
            className='  bg-[#ffff]  dark:bg-[#121212] w-full  fixed top-0 z-50  '
        >
            <div className=' mt-2  w-screen min-w-full  items-center flex justify-between  '>
                <Logo />
                <div className=' md:flex hidden flex-row space-x-3 text-center justify-center items-center '>
                    <div>About</div>
                    <div>Features</div>
                    <div>Technomics</div>
                </div>
                <div className=' flex-row space-x-3 text-center items-center md:flex  hidden md:mr-5 '>
                    <div>
                        <Link href="/SignUp">
                            create account
                        </Link>
                    </div>
                </div>
                <div className=' mr-5 flex items-center space-x-5   mx-5  '>
                    <div>
                        <ThemeSwitcher />
                    </div>
                    <Button size="sm" onClick={openModal} className=' md:hidden dark:text-[#ffff]    p-3 rounded-md'>
                        <Menu size={20} className=' rounded-md' />
                    </Button>
                </div>
            </div>
        </motion.div >
    )
}

export default NavFull