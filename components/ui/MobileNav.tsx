"use client"
import React from 'react'
import {  Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger, SheetClose} from '@/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { sideBarLink } from '@/constants/sidebar'
import { cn } from '@/lib/utils';
const MobileNav = () => {
    const pathname =  usePathname()
  return (
    <section className=' w-fill max-w-[264px] sm:hidden'>
      <Sheet >
        <SheetTrigger><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{"fill": "rgba(255, 255, 255, 1)"}}><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg></SheetTrigger>
        <SheetContent  side={'left'} className=' bg-dark-background border-none text-white'>
        <Link href={'/'} className=' flex items-center gap-1'> <Image src={'/icons/video.png'} className='max-sm:size-10' width={50} height={50} alt='navbar icons'/>
      <p className=' font-extrabold text-[26px]'>Room</p>
      </Link>
      <div className=' flex flex-col h-[calc(100vh-72px)] justify-between overflow-y-auto'>
      <SheetClose >
        <section className=' flex flex-col h-full gap-6 pt-10 text-white'>
        {
            sideBarLink.map(item=>{
             const active =  pathname === item.path || pathname.startsWith(item.path)
              return(
                <SheetClose asChild key={item.path}>
                     <Link href={item.path} key={item.path} style={{transition:" background ease-in 300ms"}} className={cn(' list-none flex gap-2 items-center justify-start py-3 rounded-md transition-all  w-full max-lg:px-5',{' transition-all  bg-gradient-to-r from-blue-500 to-blue-600':active})}><Image src={item.imgUrl} width={25} height={25} alt={item.label} className=' pl-2 max-lg:pl-0 '/> <p className=' text-lg font-semibold   '>{item.label}</p></Link>

                </SheetClose>

               
            )})
        }
        </section>

      </SheetClose>
      </div>
        </SheetContent>
        </Sheet>

        </section>
  )
}

export default MobileNav