'use client'

import Layout from '@/app/(app)/layout'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from "react-js-loader";
import { toast } from 'react-hot-toast'
import { FileState, MultiImageDropzone } from '@/components/MultiFilesUpload'
import { useEdgeStore } from '@/lib/edgestore'


const page = () => {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    price: '',
    images: []

  })
  const [fileUrl, setFilesUrl] = useState<string[]>([])
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

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
      setPageLoading(true);
      const response = await axios.get('/api/products?id=' + id)
      if (response.data.success) {
        console.log(response.data.productsData)
        setProductData(response.data.productsData)
      }
      else {
        toast.error("Something went wrong in fetching product data!")
        router.replace('/products')
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setPageLoading(false)
    }
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const id = params.id;
      fileUrl.map(async (url) => {
        console.log(url)
        const res = await edgestore.publicFiles.confirmUpload({
          url,
        });
      })
      const response = await axios.put('/api/products', { id, productData, fileUrl })
      if (response.data.success) {
        toast.success(response.data.message);
        router.replace('/products');
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error: any) {
      console.log(error);
      toast.error('Something went wrong');
    }
    finally {
      setIsLoading(false);
    }
  }


  return (
    <Layout>
      {
        pageLoading ? (
          <div className={"item bg-slate-300 w-full h-screen flex items-center justify-center"}>
            <Loader />
          </div>
        ) : (
          <div className='w-full '>
            <h1 className='text-2xl my-2'>Edit Product</h1>
            {
              productData ? (
                <form onSubmit={(e) => e.preventDefault()} className='form-section p-5'>
                  <label >Product name</label>
                  <input name='title' type="text" value={productData?.title} onChange={handleChange} placeholder='Enter product name' />
                  <label>Description</label>
                  <textarea name="desc" value={productData.desc} onChange={handleChange} placeholder='Description'></textarea>
                  <label>Price (Rs.)</label>
                  <input name='price' type="number" value={productData.price} onChange={handleChange} placeholder='Enter product name' />

                  <label className='flex gap-1 items-center h-12 mb-4'>
                    Images:
                    {fileStates.length ? (<button type='button' className='btn-outline' onClick={() => setFileStates([])}>Clear all</button>) : (<></>)}
                  </label>
                  <MultiImageDropzone
                    className='mb-4'
                    value={fileStates}
                    dropzoneOptions={{
                      maxFiles: 6,
                      maxSize: 1024 * 1024 * 2
                    }}
                    onChange={(files) => {
                      setFileStates(files);
                    }}
                    onFilesAdded={async (addedFiles) => {
                      setIsLoading(true);
                      setFileStates([...fileStates, ...addedFiles]);
                      await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                          try {
                            console.log(addedFileState)
                            const res = await edgestore.publicFiles.upload({
                              file: addedFileState.file as File,
                              options: {
                                temporary: true,
                              },
                              onProgressChange: async (progress) => {
                                updateFileProgress(addedFileState.key, progress);
                                if (progress === 100) {
                                  // wait 1 second to set it to complete
                                  // so that the user can see the progress bar at 100%
                                  await new Promise((resolve) => setTimeout(resolve, 1000));
                                  updateFileProgress(addedFileState.key, 'COMPLETE');
                                }
                              },
                            });
                            console.log(res);
                            fileUrl.push(res.url)
                          } catch (err) {
                            updateFileProgress(addedFileState.key, 'ERROR');
                          }
                        }),
                      );
                      setIsLoading(false);
                    }}
                  />
                  <button type='submit' onClick={handleSubmit} className={`btn-primary ${isLoading ? ('opacity-50 cursor-wait') : ('cursor-pointer opacity-100')}`} disabled={isLoading}>Save </button>
                  <button type='button' onClick={() => router.replace('/products')} className='btn-outline mx-2'>Cancel</button>
                </form>
              ) : (<></>)
            }
          </div >
        )
      }



    </Layout >
  )
}

export default page
