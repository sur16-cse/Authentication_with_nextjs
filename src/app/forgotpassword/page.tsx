"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function ForgotPage() {
  const router = useRouter()
  const [data, setData] = React.useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onForgotPassword = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/forgotPassword",{email:data})
      console.log(response.data)
      toast.success("Email sent")
      // router.push("/resetpassword");
    } catch (error: any) {
      toast.error("User does not exist\n "+error.message)
      console.log("veification failed", error.message)   
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data.length >0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [data])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-2xl">{loading ? "Processing" : "Reset Password"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="email"
      />
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onForgotPassword}>{buttonDisabled ? "insert email to reset password" : "Submit Email"}</button>
    </div>
  )
}
