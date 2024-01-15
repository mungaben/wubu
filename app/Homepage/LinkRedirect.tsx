import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type TLinkRedirectProps = {
  link: string
  name: string

}

const LinkRedirect: React.FC<TLinkRedirectProps> = ({ link, name }) => {
  return (
    <div>
      <Link href={link}>
        <Button className=' ring-offset-4 shadow-none '>

          <h3 className=' text-4xl lining-nums  hover:text-green-700    text-yellow-400/60   bg-[url("/Images/TechopsUnderline.svg")] bg-no-repeat bg-bottom m-2 ease-in-out transition-all delay-700 duration-700 '>
            {name}
          </h3>
        </Button>


      </Link>
    </div>
  )
}

export default LinkRedirect