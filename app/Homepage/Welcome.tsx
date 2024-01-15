import React from 'react'
import LinkRedirect from './LinkRedirect'
const Welcome = () => {
    return (
        <div className=' gap-5 my-2 items-center   w-full justify-center place-items-center  flex flex-col'>
            <h2 className=' text-center subpixel-antialiased font-semibold md:text-4xl text-lg  dark:text-foreground text-white'>
                Welcome to
            </h2>
            <h1 className={` text-center subpixel-antialiased md:text-8xl text-xl font-bold text-yellow-400`}>
                Benkiko DAO
            </h1>
            <LinkRedirect link={'/Deposit'} name={'Deposit'}   />
        </div>
    )
}
export default Welcome