import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const Card = ({title,desc,icons,className,onClick}:{title?:string,desc?:string,icons?:ReactNode,className?:string,onClick?:React.MouseEventHandler}) => {
  return (
    <div onClick={onClick} className={cn(` bg-dark-accent px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-lg cursor-pointer`,className)}>
    <div className={cn(`flex justify-center items-center size-12 rounded-md backdrop-blur bg-slate-300/[0.4]`)}>
      {icons}
    </div>
    <div className=' flex flex-col gap-2'>
      <h1 className=' font-bold text-3xl line-clamp-1'>{title}</h1>
    <p className=' font-normal ' >{desc} </p>

    </div>
 
</div>
  )
}

export default Card