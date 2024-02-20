import React from 'react'

const Model = ({isVisible, children}) => {
    if (!isVisible) return null

  return (
    <div className={`fixed inset-0 bg-black backdrop-blur-sm min-h-screen flex justify-center items-center py-12 z-30 transform transition-opacity  ${isVisible ? "bg-opacity-25" : "opacity-0"} duration-300`}>
        <div className={`relative flex flex-col max-w-[600px] w-full z-50 ${isVisible ? "animate-slideDown" : ""}`}>
           {children}
        </div>
    </div>
  )
}

export default Model