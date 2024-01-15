import React from 'react'
import page404 from '../../assets/images/page404.gif'

function Page404() {
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <p className='font-bold text-[7em]'>404</p>
        <p className='font-bold text-green-700 text-lg'>Page Introuvable</p>
        <img className='md:w-[400px]' src={page404} />
    </div>
  )
}

export default Page404