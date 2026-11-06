"use client";
import React, { useEffect, useState } from "react";
import { PiPassword } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import greenGradient from "../image/greenGradient.jpg";
import Image from "next/image";
import Cookies from "js-cookie";
import { AlertDestructive } from "@/components/ui/ErrorAlert";

export default function Home() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo-only credentials. Replace with real server-side authentication for production.
    if (formData.email.trim().toLowerCase() === 'demo@bigowl.dev' && formData.password === 'BigOwl@123') {
      Cookies.set('loggedin', 'true', { expires: 1, sameSite: 'Lax' });
      window.location.href = '/dashboard';
      return;
    }
    setIsError(true);
    setErrorMessage('Invalid demo credentials. Please use the demo login details provided below.');
  };

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gray-200 dark:bg-zinc-950 ">
        <div className="bg-white dark:bg-zinc-900 w-[45rem] h-[22rem] flex rounded-md shadow-lg overflow-hidden">
          <div className="w-1/2 bg-yellow-200">
            <Image className="w-full h-full bg-cover" src={greenGradient} alt="" />
          </div>
          <div className="flex flex-col items-center w-1/2 p-3 ">
            <h1 className="mt-5 text-[1.2rem] font-semibold dark:text-gray-50 mb-10">Login</h1>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="relative ">
                  <MdEmail className="absolute text-[#a89d9b] -translate-y-1/2 top-1/2 left-3" />
                  <input name="email" value={formData.email} onChange={handleFormChange} type="email" autoComplete="off" placeholder="Enter email" required className="flex justify-center p-1 pl-10 mb-5 rounded-full outline-none dark:placeholder-gray-50 text-gray-50 dark:bg-zinc-700 text-[0.9rem] focus-within:bg-zinc-600 " />
                </div>
                <div className="relative ">
                  <PiPassword className="absolute text-[#a89d9b] -translate-y-1/2 top-1/2 left-3" />
                  <input name="password" value={formData.password} onChange={handleFormChange} type="password" autoComplete="off" placeholder="Enter Password" required className="p-1 pl-10 rounded-full outline-none dark:placeholder-gray-50 text-gray-50 dark:bg-zinc-700 focus-within:bg-zinc-600  text-[0.9rem]" />
                </div>
                <button type="submit" className="bg-[#0afa9b] outline-none   w-32 rounded-full p-1 mx-12 font-semibold mt-8">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <AlertDestructive className={`${isError ? "block" : "hidden"} absolute bottom-0 w-[25rem] left-0`}>
          {errorMessage}
        </AlertDestructive>
      </div>
    </>
  );
}
