

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster"




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
 

   
      <body className={`${inter.className} bg-dark-background text-dark-text `}>
      
        {children}
        <Toaster/>
        </body>
    
    </html>
    </ClerkProvider>
  );
}
