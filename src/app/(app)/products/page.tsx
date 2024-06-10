'use client'

import React from 'react'
import Layout from '../layout'
import Link from 'next/link'

const page = () => {
  return (
    <Layout >
      <div className='products-section'>
        <Link className='h-12 p-3 rounded-lg text-slate-50  bg-slate-800 hover:bg-slate-700 transition-colors' href={'/products/new'}>Add new products</Link>
      </div>
    </Layout>
  )
}

export default page
