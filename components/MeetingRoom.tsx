"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from "@/lib/utils"
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout,CallStatsButton, useCallStateHooks, CallingState } from "@stream-io/video-react-sdk"
 
import { ReactNode, useState } from "react"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
import { LayoutList } from 'lucide-react'
import { Button } from './ui/button'
import { IoMdPeople } from "react-icons/io";
import EndCallButton from './EndCallButton'
import Loader from './Loader'

type callLayout = 'grid' | 'speaker-left' | 'speaker-right'
const MeetingRoom = ({setIsComplete,id}:{setIsComplete:React.Dispatch<React.SetStateAction<boolean>>,id:string})=>{
   const [layout,setLayout] = useState<callLayout>('speaker-left')
   const [showPeoples, setShowPeoples] = useState<boolean>(false)
   const router = useRouter()
   const searchParams = useSearchParams()
   const isPersonalRoom = !!searchParams.get("personal")
   const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()
    if(callingState !== CallingState.JOINED) return <Loader/>
   const CallLayout = ():ReactNode=>{
       if(layout === "grid"){
          return <PaginatedGridLayout/>
       }else if(layout === "speaker-right"){
         return <SpeakerLayout participantsBarPosition={"left"} />
       }
       else{
         return <SpeakerLayout participantsBarPosition={"right"} />
       }
   }
 return(
    <section className = ' relative h-screen w-full overflow-hidden pt-4 text-white'>
   <div className=" relative flex size-full items-center justify-center">
      <div className=" flex size-full max-w-[1000px] items-center">
      <CallLayout/>
      </div>

      <div className = {cn("h-[calc(100vh-86px)] hidden ml-2",{
         "block":showPeoples
      })} >
      <CallParticipantsList onClose={()=>setShowPeoples(false)} />
       </div>
    </div>
   <div className = 'flex items-center fixed bottom-0 justify-center gap-5 mx-md:gap-2 flex-wrap'>
   <CallControls onLeave={()=>{
      router.push('/home')
     
       
      }}/> 

<DropdownMenu>
   <div className=' flex items-center'>
   <DropdownMenuTrigger><LayoutList size={25} className = ' fill-white rounded-smcursor-pointer '/> </DropdownMenuTrigger>
    </div>

  <DropdownMenuContent className=' border-dark-background bg-dark-background text-white'>
     {["grid","speaker-left","speaker-right"].map((item,index)=>(
      <div key={index}>
      <DropdownMenuItem className='cursor-pointer' onClick={()=>setLayout(item as callLayout)}>
         {item}
      </DropdownMenuItem>
      <DropdownMenuSeparator  className=" border-slate-950 border"/>
      </div>
     ))}
  
   
  </DropdownMenuContent>
</DropdownMenu>

 <CallStatsButton/>
 <Button onClick={()=>setShowPeoples((prev)=>!prev)}>
  <div >
 <IoMdPeople size={20}/>
  </div>
 </Button>
 {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
 )
}

export default MeetingRoom