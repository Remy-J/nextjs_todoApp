'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UPDATE_TODO } from '../queries/todoQueries'
import { client } from '@/lib/apolloClient'

interface Props {
  id: number
  redirect?: boolean
  additionalClass?: string
}

const DeleteButton = ({ id, redirect, additionalClass }: Props) => {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_TODO,
        variables: { id },
      })
      console.log('DELETED')
      if (redirect) router.push('/')
    } catch (error) {
      console.log({ error })
      router.push('/')
    }
  }
  return (
    <div>
      <button onClick={handleClick} className={`btn ${additionalClass}`}>
        delete
      </button>
    </div>
  )
}

export default DeleteButton
