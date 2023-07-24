"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.patch("/api/users/resetpassword", user.password);
      console.log("password", response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error("User Already exists\n " + error.message);
      console.log("SignUp failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.password.length > 0 &&
      user.confirmPassword.length > 0 &&
      user.password === user.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-2xl">
        {loading ? "Processing" : "Reset Password"}
      </h1>
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <label htmlFor="confirm password">confirm password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="confirm password"
        id="confirm password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder="confirm password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onReset}
      >
        {buttonDisabled ? "Reset Your Password" : "Password Reset"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
