"use client"
import {useGetCalls} from "@/hook/useGetCalls";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CallRecording} from "@stream-io/video-client";
import {Call} from "@stream-io/video-react-sdk";
import MeetingCard from "@/components/MeetingCard";
import { MdOutlinePreview } from "react-icons/md";
import { MdOutlineUpcoming } from "react-icons/md";
import { PiVideoCameraBold } from "react-icons/pi";
import { CiPlay1 } from "react-icons/ci";
import Loader from "@/components/Loader";
import {useToast} from "@/components/ui/use-toast";
const CallList = ({type}:{type:'upcoming' | 'ended' | "recordings"}) => {
    const {upcomingCalls,endedCalls,callRecoding,isLoading} = useGetCalls()
    const router = useRouter()
    const [recoding,setRecoding] = useState<CallRecording>([])
      const {tost} = useToast()
    const getCalls = ()=>{
        if(type == "ended") return endedCalls
        if(type == "recordings") return recoding
        if(type == "upcoming") return upcomingCalls


    }


    const getNoCallsMessage = ()=>{
        if(type == "ended") return 'No previous calls'
        if(type == "recordings") return "no recoding"
        if(type == "upcoming") return "no upcoming calls"


    }
   useEffect(()=>{
   const fetchRecoding =  async ()=>{



       try{
           const callData = await Promise.all(callRecoding.map((meeting)=>meeting.queryRecordings()))
           const recoding = callData.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings)
           setRecoding(recoding)
       }catch (error){
           tost({title:"try again later"})
       }


   }
   if(type==='recordings'){
       fetchRecoding()
   }
   },[type,callRecoding])

    const calls = getCalls()
    const noCallsMessage = getNoCallsMessage()
    if(isLoading) return  <Loader/>
    return (

        <div className={ ' grid grid-cols-1 gap-5 xl:grid-cols-2'}>
            {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording,index:number)=>(
                <MeetingCard key={(meeting as Call).id} icon= {type === 'ended' ? <MdOutlinePreview/>:type === 'recordings' ?<PiVideoCameraBold/> :<MdOutlineUpcoming/>   }
                             date= {meeting?.state?.startsAt?.toLocaleDateString()|| meeting.start_time.toLocaleString()} handleClick={type === 'recordings'? ()=>router.push(`${meeting.url}`):()=>router.push(`/meeting/${meeting.id}`)}
                             link={type ==='recordings'? meeting.url: `${process.env.NEXT_PUBLIC_BASE_URL }/meeting/${meeting.id}`}
                             title={(meeting as Call).state?.custom?.description?.substring(0,30) || "nothing"} buttonIcon1={type === 'recordings'? <CiPlay1/> : undefined}
                             buttonText={type === 'recordings' ? 'play' : 'Starts'}
                             isPreviousMeeting={type === 'ended'} />
            )):(
                <h1>{noCallsMessage}</h1>
            ) }

        </div>
    );
};
export  default  CallList