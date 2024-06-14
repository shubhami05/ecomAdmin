'use client'

import Layout from '@/app/(app)/layout'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";
import { toast } from 'react-hot-toast'

const page = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    price: ''
  })
  const router = useRouter()
  useEffect(() => {
    fetchData(params.id);
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

  }
  const fetchData = async (id: any) => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/products?id=' + id)
      if (response.data.success) {
        // console.log(response.data.productsData)
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const id = params.id;
      const response = await axios.put('/api/products', { id, productData })
      if (response.data.success) {
        toast.success(response.data.message);
        router.replace('/products');
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch (error:any) {
      console.log(error);
      toast.error('Something went wrong');
      
    }
    finally {
      setIsLoading(false);
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
          <h1 className='text-2xl my-2'>Edit Product</h1>
          {productData ? (
            <form onSubmit={handleSubmit} className='form-section p-5'>
              <label >Product name</label>
              <input name='title' type="text" value={productData.title} onChange={handleChange} placeholder='Enter product name' />
              <label>Description</label>
              <textarea name="desc" value={productData.desc} onChange={handleChange} placeholder='Description'></textarea>
              <label>Price (Rs.)</label>
              <input name='price' type="number" value={productData.price} onChange={handleChange} placeholder='Enter product name' />
              <button type='submit' className='btn-primary'>Save </button>
            </form>
          ) : (<></>)}


        </div>
      )}

    </Layout>
  )
}

export default page
