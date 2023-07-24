"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"


export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl"> Verify email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "No token"}
            </h2>
            {
                verified &&
                (<div><h2 className="p-2 bg-green-500 text-black">Email verified</h2>
                    <Link href="/login">
                        login
                    </Link>
                </div>)
            }
            {
                error &&
                (<div><h2 className="p-2 bg-red-500 text-black">Error</h2>

                </div>)
            }
        </div>
    )
}
