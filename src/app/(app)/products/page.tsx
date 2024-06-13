'use client'

import React, { useEffect, useState } from 'react'
import Layout from '../layout'
import Link from 'next/link'
import axios from 'axios'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Loader from "react-js-loader";
import { useRouter } from 'next/navigation'


const page = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    fetchPorducts();
  }, [])

  const fetchPorducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/products');
      if (response.data.success) {
        setProducts(response.data.productsData);
      }
      else {
        alert("No products Available");
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout >
      <div className='products-section'>
        <div className='flex flex-col justify-center items-start gap-5 md:flex-row md:items-center md:justify-between'>
          <h1 className='text-2xl font-bold'>Your Products</h1>
          <Link className='btn-primary' href={'/products/new'}>+ Add new product</Link>
        </div>

        <div className='items-container mt-5'>
          {
            isLoading ? (
              <div className={"item bg-slate-300 w-full h-screen flex items-center justify-center"}>
                <Loader />
              </div>
            ) : (
              products.length > 0 ? (
                <Table className='w-full'>
                  <TableCaption>A list of all your products.</TableCaption>
                  <TableHeader>
                    <TableRow className='bg-slate-900 hover:bg-slate-900 '>
                      <TableHead className='font-bold text-slate-300'>Porduct name</TableHead>
                      <TableHead className='font-bold text-slate-300'>Price</TableHead>
                      <TableHead className='font-bold text-center text-slate-300'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody >

                    {products.map((product: any) => (
                      <TableRow className='border-separate border-slate-400'>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className='flex gap-2 justify-center'>
                          <button className='btn-secondary gap-1 items-center text-xs font-medium inline-flex' onClick={() => { router.push(`products/edit/${product._id}`) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>

                            Edit
                          </button>
                          <button className='btn-secondary gap-1 items-center text-xs font-medium inline-flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (<div>No products found!</div>)
            )
          }

        </div>
      </div>
    </Layout>
  )
}

export default page


{/*  */ }