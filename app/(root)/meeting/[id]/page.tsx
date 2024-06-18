"use client"

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hook/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import '@stream-io/video-react-sdk/dist/css/styles.css';

const Meeting = ({params}:{params:{id:string}}) => {
   const {user ,isLoaded} = useUser()
   const [isComplete, setIsComplete] = useState(false)
   const {call,isCallLoading} = useGetCallById(params.id)
   if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className=' h-screen w-full'>
      <StreamCall  call={call}>
        <StreamTheme >
          {!isComplete ?(
           <MeetingSetup setIsComplete ={setIsComplete}/>
          ):(
            <MeetingRoom setIsComplete ={setIsComplete} id={params.id}/>
          )}
        </StreamTheme>
      </StreamCall>
    
      
      </main>
  )
}

export default Meeting