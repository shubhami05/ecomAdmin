'use client'

import React from 'react'
import Layout from '../../layout'

const page = () => {
    return (
        <Layout>
            <div className='new-product-section'>
                <span className='text-xl'>
                    Enter details of new products
                </span>
                <div className='form-section'>
                    <input name='pname' type="text" placeholder='Enter product name'/>
                </div>
            </div>
        </Layout>
    )
    
}

export default page
