import React from 'react'
import LinkRedirect from './LinkRedirect'
const Welcome = () => {
    return (
        <div className=' gap-2 my-0.5 items-center   w-full justify-center place-items-center  flex flex-col'>
            <h2 className=' text-center subpixel-antialiased font-bold md:text-8xl text-xl  dark:text-foreground text-white'>
                Welcome to
            </h2>
            <h1 className={` text-center subpixel-antialiased md:text-8xl text-xl font-bold text-yellow-400`}>
                Benkiko DAO
            </h1>
            <LinkRedirect link={'/Deposit'} name={'Deposit'} />
        </div>
    )
}
export default Welcome