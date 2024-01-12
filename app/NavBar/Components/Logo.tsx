
import React from 'react'
import Image from 'next/image'
const Logo = () => {
  return (
    <div className=' ml-5' >
        <Image
        src={'/Images/Benkikologo.jpg'}
        alt="Benkiko Logo"
        width={50}
        height={50}
        priority
        className=' rounded-full border-2 border-white '
        />

       
    </div>
  )
}

export default Logo