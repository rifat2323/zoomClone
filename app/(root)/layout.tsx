import { Navbar } from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import StreamVideoProvider from '@/providers/StreamClient'
import React, { ReactNode } from 'react'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>

  
        <Navbar/>
        <div className='flex'>
            <SideBar/>
            <section className='flex flex-col flex-1 min-h-screen px-6 pb-8 pt-28 max-md:pb-14 max-sm:px-14'>
            <div className=' w-full'>
            {children}
            </div>
            </section>
        </div>
        </StreamVideoProvider>
    </main>
  )
}

export default RootLayout