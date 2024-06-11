'use client'

import React from 'react'
import Layout from '../layout'
import Link from 'next/link'

const page = () => {
  return (
    <Layout >
      <div className='products-section'>
        <Link className='btn-primary' href={'/products/new'}>Add new product</Link>
      </div>
    </Layout>
  )
}

export default page
