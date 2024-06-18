import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './button'
  
interface propTypes {
    isOpen?:boolean,
    onClose?:()=>void,
    title?:string,
    className?:string,
    handelClick?:()=>void,
    children?:React.ReactNode,
    buttonText?: string,
    buttonIcon?:ReactNode,
    image?:string
}
const MeetingModel = ({isOpen,onClose,title,className,handelClick,children,buttonText,buttonIcon,image}:propTypes) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
    
    <DialogContent className=' flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-background px-6 py-9 text-white'>
      <div className=' flex flex-col gap-6'>
        {
            image && (
                <div className=' flex justify-center '>
                    <Image src={image} alt='images' width={72} height={72}/>
                </div>
            )
        }
       <h1 className={cn(`text-3xl font-bold leading-10`,className)}>{title}</h1>
       {children}
        <Button onClick={handelClick} className=' bg-blue-500 focus-visible:ring-0 focus:ring-0 focus:bg-blue-800 focus-visible:bg-blue-500 flex gap-1'>
            {buttonText || "Schedule Meeting"}
            {
                buttonIcon && (
                    buttonIcon
                )
            }
        </Button>
      </div>
    </DialogContent>
  </Dialog>
  
  )
}

export default MeetingModel