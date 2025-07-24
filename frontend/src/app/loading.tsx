'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="flex items-center justify-center h-screen bg-white transition-opacity duration-500 ease-in-out opacity-100">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
    </div>
  )
}