'use client'

import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex justify-center items-center w-[100wv] h-[100vh]'>
      <h2>Something went wrong!</h2>
    </div>
  )
}
