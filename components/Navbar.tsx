import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './ui/MobileNav'
import { SignIn,UserButton,ClerkProvider } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
export const Navbar = async () => {
  const user = await currentUser();

  return (
    <nav className=' flex justify-between fixed z-50 w-full bg-[#02040c] px-6 py-4 lg:px-10'>
      <Link href={'/'} className=' flex items-center gap-1'> <Image src={'/icons/video.png'} className='max-sm:size-10' width={50} height={50} alt='navbar icons'/>
      <p className=' max-sm:hidden font-extrabold text-[26px]'>Room</p>
      </Link>
      <div className=' flex  justify-between gap-5 '>
     <Link href={'/sign-in'}>{user ? <UserButton/> : "Sign-in" } </Link>
       
    
        
      <MobileNav/>

      </div>
      </nav>
  )
}
