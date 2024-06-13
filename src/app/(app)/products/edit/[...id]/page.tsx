'use client'

import Layout from '@/app/(app)/layout'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";

const page = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [productData, setProductData] = useState({
    title:'',
    desc:'',
    price:''
  })
  const router = useRouter()
  useEffect(() => {
    fetchData(params.id);
  }, [])

  const fetchData = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/products?id='+id)
      if (response.data.success) {
        console.log(response.data.productsData)
        setProductData(response.data.productsData)
      }
      else {
        router.replace('/products')
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }


  return (
    <Layout>
      {isLoading ? (
        <div className={"item bg-slate-300 w-full h-screen flex items-center justify-center"}>
          <Loader />
        </div>
      ) : (
        <div className='w-full '>
          this is {productData.title}, this is {productData.desc}, this is {productData.price}  
        </div>
      )}

    </Layout>
  )
}

export default page
