"use client"

import { sideBarLink } from '@/constants/sidebar'
import React from 'react'
import  Image  from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SideBar = () => {
  const pathname =  usePathname()
  return (
    <section className=' sticky left-0 top-0 h-screen flex w-fit flex-col justify-between bg-[#02040c] p-6 pt-28 max-sm:hidden lg:w-[264px] '>
        <div className='flex flex-col gap-6 items-start  justify-start px-4 w-full '>
        {
            sideBarLink.map(item=>{
             const active =  pathname === item.path || pathname.startsWith(item.path)
              return(

                <Link href={item.path} key={item.path} style={{transition:" background ease-in 300ms"}} className={cn(' list-none flex gap-2 items-center justify-start py-3 rounded-md transition-all  w-full max-lg:px-5',{' transition-all  bg-gradient-to-r from-blue-500 to-blue-600':active})}><Image src={item.imgUrl} width={25} height={25} alt={item.label} className=' pl-2 max-lg:pl-0 '/> <p className=' text-lg font-semibold  max-lg:hidden '>{item.label}</p></Link>
            )})
        }
        </div>
        
        </section>
  )
}

export default SideBar