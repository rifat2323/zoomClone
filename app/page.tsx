"use client"
import { redirect, usePathname } from 'next/navigation'
import React from 'react'

const Page = () => {
    const pathname = usePathname()
   if(pathname === '/'){
    redirect('/home')
   }
  return (
    <div>page</div>
  )
}

export default Page