'use client'
import React, { useState } from 'react'
import Layout from '../../layout'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/MultiFilesUpload';
import { useEdgeStore } from '@/lib/edgestore';

const page = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [fileUrl, setFilesUrl] = useState<string[]>([])
    const router = useRouter();

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!fileUrl.length) {
            toast.error("Images are necessary to upload!");
            return
        }
        try {
            setIsLoading(true)
            const data = { title, desc, price, fileUrl }
            console.log(fileUrl)
            fileUrl.map(async (url) => {
                console.log(url)
                const res = await edgestore.publicFiles.confirmUpload({
                    url,
                });
            })
            const response = await axios.post('/api/products', data);
            if (response.data.success) {
                toast.success(response.data.message)
                router.push('/products')
            }

        } catch (error) {
            console.log("Error in new product adding", error)
            toast.error('Something went wrong')
        }
        finally {
            setIsLoading(false)
        }
    }


    // const handleFileChange = (e: any) => {
    //     e.preventDefault();
    //     const files = e.target?.files;
    //     if (files?.length > 0) {
    //         try {
    //             const data = new FormData();
    //             for (const file in files) {
    //                 data.append('file', file)
    //             }
    //             const response = axios.post('/api/upload', data, {
    //                 headers: { 'Content-Type': 'multipart/form-data' }
    //             });
    //             console.log(response);
    //         } catch (error) {

    //         }
    //     }
    // }

    return (
        <Layout>
            <div className='new-product-section container '>
                <h1 className='text-2xl font-bold mb-5'>
                    Enter details of new products
                </h1>

                <form onSubmit={(e) => e.preventDefault()} className='form-section p-5'>
                    <label >Product name</label>
                    <input name='name' type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter product name' required />
                    <span id='namemsg'></span>
                    <label>Description</label>
                    <textarea name="desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder='Description' required></textarea>
                    <label>Price (Rs.)</label>
                    <input name='price' type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder='Enter product name' required />
                    {/* <div className='flex items-center gap-2 '>
                        <label >Images: </label>
                        <label className='btn-outline cursor-pointer flex gap-1 justify-center items-center h-25 w-25'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>

                            <div>
                                Upload
                            </div>
                            <input title='images' type="file" className='hidden' onChange={handleFileChange} />
                        </label>
                    </div>
                    <div className='image-container text-slate-800 mb-5'>
                        {
                            images.length > 0 ? (
                                <>

                                </>
                            ) : (
                                <h1 className='text-slate-600'>*No images Uploaded</h1>
                            )
                        }
                    </div> */}
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
                                }
                                ),
                            );
                            setIsLoading(false);
                        }}
                    />
                    <button type='submit' onClick={handleSubmit} className={`btn-primary ${isLoading ? ('opacity-50 cursor-wait') : ('cursor-pointer opacity-100')}`} disabled={isLoading}>Save</button>
                    <button type='button' onClick={() => router.replace('/products')} className='btn-outline mx-2'>Cancel</button>

                </form>
            </div>
        </Layout>
    )

}

export default page
