import MeetingList from '@/components/MeetingList'
import React from 'react'

const page = () => {
  const newTime = new Date()
  const time = newTime.toLocaleTimeString('bd',{ hour:"2-digit", minute:"2-digit"})
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date()))
  return (
    <section className=' flex size-full flex-col gap-10 '>
         <div className='h-[300px] bg-hero bg-cover  w-full rounded-[18px]'>
            <div className=' flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
            <h1 className='  backdrop-blur w-fit bg-slate-500 p-1 rounded   font-normal'>Upcoming meeting at 12.00 pm</h1>
             <div className=' flex flex-col gap-1'>
             <h1 className='  w-fit   font-bold text-4xl max-md:text-2xl'>{time}</h1>
             <h1 className='  w-fit font-medium '>{date}</h1>
             </div>
            </div>
         </div>
        <MeetingList/>
    </section>
  )
}

export default page