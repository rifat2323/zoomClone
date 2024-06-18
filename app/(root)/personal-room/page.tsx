"use client"
import React from 'react'
import {useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {useGetCallById} from "@/hook/useGetCallById";
import {useStreamVideoClient} from "@stream-io/video-react-sdk";
import {useRouter} from "next/navigation";



const Table = ({title,description}:{title:string, description:string})=>(
    <div className={'flex flex-col w-fit items-start gap-2 '}>
        <h1 className={ 'text-base font-medium lg:text-xl xl:text-2xl'}>{title}</h1>
        <h1 className={'truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'}>{description}</h1>
    </div>
)

const Room = () => {
    const {user} = useUser()
    const meetingId = user?.id
    const Link = `${process.env.NEXT_PUBLIC_BASE_URL }/meeting/${meetingId}?personal=true`
  const {toast} = useToast()
    const {call} = useGetCallById(meetingId!)
    const client = useStreamVideoClient()
    const router = useRouter()
    const StartRoom = async ()=>{
        if(!client || !user ) return
        const newCall = client.call("default",meetingId!)
        if(!call){
            await newCall.getOrCreate({data:{starts_at:new Date().toISOString()}})
        }

        router.push(`/meeting/${meetingId}?personal=true`)
    }
  return (
    <section className=' flex size-full flex-col gap-10 w-full '>
    <h1 className=' text-3xl font-bold'>Personal Room</h1>
         <div className={' flex flex-col w-full gap-8 xl:max-w-[900px]'}>
     <Table title={'topic'} description={`${user?.fullName}'s meeting room`}/>
             <Table title={'Meeting id'} description={`${meetingId} `}/>
             <Table title={'Meeting Link'} description={`${Link} `}/>
         </div>
        <div className={ 'flex gap-5'}>

    <Button className={' bg-blue-600'} onClick={StartRoom}>
     start Meeting
    </Button>
            <Button className={' bg-orange-700'} onClick={()=>{
                navigator.clipboard.writeText(Link)
                toast({title:"copied to clipboard"})
            }}>
             copy Link
            </Button>
        </div>

    </section>
  )
}

export default Room