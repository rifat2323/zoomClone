"use client"
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Card from './ui/Card';
import { useRouter } from 'next/navigation';
import { TiShoppingBag } from "react-icons/ti";
import { GoDeviceCameraVideo } from "react-icons/go";
import { LuUserPlus } from "react-icons/lu";
import MeetingModel from './ui/MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { v4 as uuid} from 'uuid';
import { useToast } from "@/components/ui/use-toast"
import { IoCopy } from "react-icons/io5";
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input"


function MeetingList() {
  const { toast } = useToast()
  const router = useRouter()
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting'| 'isJoiningMeeting' | 'isInstantMeeting '| undefined >(undefined)
   const [value,setValue] = useState({dateTime:new Date(), description:'',link:''})
   const [callDetails, setCallDetails] = useState<Call>()
  const {user} = useUser();
  const client = useStreamVideoClient()
  const createMeeting = async ()=>{
    if(!user || !client) return console.log("something went wrong");
    
     try{
        if(!value.dateTime){
          toast({
            title: "please select date and time",
            
          })
          return;
        }

       const id = uuid()
       const call = client.call("default",id)
       if(!call) throw new Error("fail to call")
        const startsAt = value.dateTime.toISOString() ||  new Date(Date.now()).toISOString();
       const description = value.description || "instant meeting"
        await call.getOrCreate({data:{starts_at:startsAt,custom:{description}}})
        setCallDetails(call)
        console.log(call)
        if(!value.description){
          router.push(`/meeting/${call.id}`)
        }
       
        toast({
          title: "meeting created successfully",
         
        })
     }catch(error){
      console.log(error)
      toast({
        title: "can not make a call, something went wrong",
       
      })
     }
  }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className=' grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 '>
       <Card icons={<FaPlus size={24}/>} title='New Meeting' desc='Start new meeting now'  onClick={(e)=>setMeetingState('isInstantMeeting ')}/>
       <Card icons={<TiShoppingBag size={24}/>} title='Schedule Meeting' desc='Schedule new meeting ' onClick={(e)=>setMeetingState('isScheduleMeeting')}  className='bg-[#3467d2]' />
       <Card icons={<GoDeviceCameraVideo size={24}/>} title='Recoding' desc='Viw your recoding ' onClick={(e)=>router.push('/recoding')} className='bg-[#6537e1]'/>


       <Card icons={<LuUserPlus size={24}/>} title='Join meeting' desc='join your new meeting ' onClick={(e)=>setMeetingState('isJoiningMeeting')} className='bg-[#d27045]'/>
       {!callDetails ? (
        <MeetingModel
      
        isOpen ={meetingState  ==='isScheduleMeeting'}
        onClose = {()=>setMeetingState(undefined)}
         title="Cerate new meeting" 
         className = ' text-center'
         handelClick = {createMeeting}
        >
          <div className=' flex flex-col gap-2'>
          <label htmlFor="" className=' text-base font-normal leading-5 text-slate-100'>add a description</label>
          <Textarea className=' border-none bg-stone-950 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>setValue({...value,description:e.target.value})}/>
         </div>
         <div className=' flex flex-col w-full gap-2' >
         <label htmlFor="" className=' text-base font-normal leading-5 text-slate-100'>seLect date and time</label>
         <ReactDatePicker selected={value.dateTime}
         onChange={(date)=>setValue({...value,dateTime:date!})}
         showTimeInput
         timeFormat='HH:mm'
         timeIntervals={15}
         timeCaption='time'
         dateFormat={'MMMM d, yyyy h:mm aa'}
         className=' w-full rounded-md bg-stone-950 p-2 focus:outline-none'
         />
         </div>
          </MeetingModel>
       ):(
        <MeetingModel
      
       isOpen ={meetingState  ==='isScheduleMeeting'}
       onClose = {()=>setMeetingState(undefined)}
        title="Meeting Created" 
        className = ' text-center'
        handelClick = {()=>{
          navigator.clipboard.writeText(meetingLink)
          toast({title:"link copied"})
        }}
        buttonText="copy meeting link"
        buttonIcon={<IoCopy/>}
       />
         

      

       ) }



       <MeetingModel
      
       isOpen ={meetingState  ==='isInstantMeeting '}
       onClose = {()=>setMeetingState(undefined)}
        title="start new meeting now" 
        className = ' text-center'
        handelClick = {createMeeting}
       />

        <MeetingModel

            isOpen ={meetingState  ==='isJoiningMeeting'}
            onClose = {()=>setMeetingState(undefined)}
            title="past the link here"
            className = ' text-center'
            handelClick = {()=>router.push(value.link)}
            buttonText = " join meeting"
        >
            <Input className={' bg-stone-900 outline-none'} onChange={(e)=>setValue({...value,link:e.target.value})}/>
        </MeetingModel>
        </section>
  )
}

export default MeetingList