'use client'
import React, { useState } from 'react'
import Layout from '../../layout'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"


const page = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();
    const {toast} = useToast()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const data = { title, desc, price }
            console.log(data)
            const response = await axios.post('/api/products', data)
            if (response.data.success) {
                
                router.push('/products')
            }


        } catch (error) {
            console.log("Error in new product adding", error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Layout>
            <div className='new-product-section container '>
                <h1 className='text-2xl font-bold mb-5'>
                    Enter details of new products
                </h1>
                
                <form onSubmit={handleSubmit} className='form-section p-5'>
                    <label >Product name</label>
                    <input name='pname' type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter product name' />
                    <label>Description</label>
                    <textarea name="description" value={desc} onChange={e => setDesc(e.target.value)} placeholder='Description'></textarea>
                    <label>Price (Rs.)</label>
                    <input name='price' type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder='Enter product name' />
                    <button type='submit' className='btn-primary'>Save</button>
                </form>
            </div>
        </Layout>
    )

}

export default page
