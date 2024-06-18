"use client"

import React, { useEffect, useState } from 'react'

import { Call, VideoPreview, StreamCall, useCall, DeviceSettings, DeviceSelectorVideo, DeviceSelectorAudioInput } from '@stream-io/video-react-sdk'
import { Button } from './ui/button'
const MeetingSetup = ({setIsComplete}:{setIsComplete:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)
 
  const call = useCall()
  if(!call) {
    throw new Error("useCall must be use in ")
  }
   useEffect(()=>{
    const enableCameraAndMicrophone = async () => {
        try {
          if (isMicCamToggleOn) {
            await call?.camera?.disable();
            await call?.microphone.disable();
          } else {
            if (call?.camera) {
              await call?.camera.enable();
            }
            await call?.microphone.enable();
          }
       
        } catch (error) {
          console.error('Failed to enable camera and/or microphone', error);
          
        }
      };
    
      enableCameraAndMicrophone();
     
   },[isMicCamToggleOn,call?.camera,call?.microphone])
  return (
    <div className=' flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className=' text-3xl font-medium'>Set-up</h1>
      
        <VideoPreview  />
        <div className=' flex  h-16 items-center justify-center gap-3 '>
          <label className=' flex items-center justify-center gap-2 font-medium'>
            <input type="checkbox" name="" id="" checked={isMicCamToggleOn} onChange={(e)=>setIsMicCamToggleOn(e.target.checked)} />
            Join with mic and camera off
          </label>
        </div>
          <DeviceSettings/>
          <Button className=' rounded-sm bg-orange-600 px-4 py-2.5' onClick={()=>
            {
              
              call.join()
              setIsComplete(true)
            }
            }>
            Join meeting
          </Button>
        
        </div>
  )
}

export default MeetingSetup