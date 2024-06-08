'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  const { data: session } = useSession()
  return (
    <div className='flex bg-slate-200 rounded-lg text-slate-900 font-bold min-h-screen p-5 w-screen justify-between'>
      <div>
        Hello, {session?.user?.name}
      </div>
      <div className='flex gap-2 h-12 items-center bg-slate-800 ps-3  py-3 text-slate-200 rounded-full'>
        <span >
          {session?.user?.name}
        </span>
        <img src={`${session?.user?.image}`} alt='This is you' className='rounded-full' width={50} height={50} />
      </div>

    </div>
  )
}

export default page
