import Link from 'next/link'
import React from 'react'

const signin = () => {
  return (
    <div className='w-screen h-screen bg-gray-100 flex items-center justify-center'>
      <div className='p-6 rounded-lg shadown-md bg-white space-y-8 shadow-md w-[450px]'>
        <div className='flex flex-col text-black space-y-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold'>Sign in to your account</h1>
            <p className='text-gray-600'>
              Already have an account?
              <Link href="/signup" className='text-indigo-600 hover:text-indigo-500 ml-1'> Sign up</Link>
            </p>
            
          </div>
          <div className='space-y-4'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-gray-800 '>Email address</p>
              <input type="email" className='w-full h-9 rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-indigo-500 shadow-sm placeholder-gray-400 focus:border-indigo-500 sm:text-sm' placeholder='you@example.com'/>
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-gray-800 '>Password</p>
              <input type="password" className='w-full h-9 rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-indigo-500 shadow-sm placeholder-gray-400 focus:border-indigo-500 sm:text-sm' placeholder='••••••••'/>
            </div>
            <div className='w-full space-y-2 bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-center text-white px-4 py-2 rounded-md'>
              Sign in
            </div>
          </div>        
        </div>
      </div>
    </div>
  )
}

export default signin