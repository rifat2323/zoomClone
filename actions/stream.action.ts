"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from '@stream-io/node-sdk';
const apiKey =process.env.NEXT_PUBLIC_API_KEY;
 const apiSecrete = process.env.STREAM_SECRETE_KEY

 export const tokenProvider = async ():Promise<string> =>{
    const user = await currentUser()
    if(!user ) throw new Error("user not found or login")
    if(!apiKey) throw new Error("no api key provided")
    if(!apiSecrete) throw new Error("no api Secrete key provided")
    
   const streamClient = new StreamClient(apiKey,apiSecrete)
   const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
   const issued = Math.floor(Date.now() / 1000) - 60;
   const token = streamClient.createToken(user.id,exp,issued)
   return token

 }