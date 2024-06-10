'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Layout from './layout';

const page = () => {
  const {data:session} = useSession()
  return (
    <Layout>
      <div>
        Hello, {session?.user?.name}
      </div>
      <div className='flex h-14 items-center bg-green-400 p-1 text-slate-200 rounded-full'>
        <img src={`${session?.user?.image}`} alt='This is you' className='rounded-full' width={50} height={50} />
      </div>
    </Layout>
  )
}

export default page
