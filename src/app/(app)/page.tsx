'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Layout from './layout';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const page = () => {
  const { data: session } = useSession()
  return (
    <Layout >
      <div className='flex justify-between'>
        <div>
          Hello, {session?.user?.name}
        </div>
        <div className=''>
          <Avatar>
            <AvatarImage src={`${session?.user?.image}`} />
            <AvatarFallback>??</AvatarFallback>
          </Avatar>

        </div>
      </div>

    </Layout>
  )
}

export default page
