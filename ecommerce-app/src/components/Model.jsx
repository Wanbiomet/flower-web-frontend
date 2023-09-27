import React from 'react'

const Model = ({isVisible, children}) => {
    if (!isVisible) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm min-h-screen flex flex-col justify-center items-center py-12' >
        <div className='flex flex-col max-w-[600px] w-full'>
           {children}
        </div>
    </div>
  )
}

export default Model