import React from 'react'

const Footer = () => {

  /** Get the current year */
  const year = new Date().getFullYear()

  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4">
        <div className='w-full flex flex-row items-center gap-2 justify-center text-gray-500'>
          <span className="text-sm">&copy;</span>
          <span className="text-sm">{year}</span>
          <a href="https://noeyislearning.dev" className="underline text-violet-500">Noeyislearning.</a> All Rights Reserved.
        </div>
    </footer>
  )
}

export default Footer