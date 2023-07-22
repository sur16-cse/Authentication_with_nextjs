"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/myprofile')
        console.log(`res.data ${res.data.data}`)
        setData(res.data.data._id)
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className='padding rounded bg-green-500 p-3'>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button className='bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded' onClick={logout}>
                Logout
            </button>

            <button className='bg-green-900 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>
                Get User Details
            </button>
        </div>
    )
}
