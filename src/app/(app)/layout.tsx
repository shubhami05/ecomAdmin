'use client'
import Navbar from '@/components/Navbar';
// import { Toaster } from '@/components/ui/toaster';
import { useSession } from 'next-auth/react'
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";

const inter = Inter({ subsets: ["latin"] });
export default function Layout({ children }: any) {
  const [isLoading, setLoading] = useState(true)
  const { data: session } = useSession()
  useEffect(() => {
    setLoading(false)
  }, [])
  if (isLoading) {
    return (

      <div className={"item bg-slate-300 w-full h-screen flex items-center justify-center"}>
        <Loader />
      </div>

    )
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-800">
          <Navbar />
          <div className=' bg-slate-200 rounded-xl text-slate-900 font-bold min-h-screen p-5 w-screen'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

