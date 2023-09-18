import React from 'react'
import { client } from '@/lib/apolloClient'
import { GET_TODO_BY_ID } from '@/app/queries/todoQueries'
import Modal from '@/app/components/Modal'
import Loading from '@/app/loading'
import Error from '@/app/error'
import DeleteButton from '@/app/components/DeleteButton'

interface Props {
  params: { id: number }
}

const TodoDetails = async ({ params: { id } }: Props) => {
  const { loading, error, data } = await client.query({ query: GET_TODO_BY_ID, variables: { id: +id } })
  if (loading) return <Loading />
  if (error) return <Error error={error} />
  const { todo } = data
  return (
    <div className='p-5 h-[100vh] w-full flex flex-col'>
      <div className='m-auto w-[50%]'>
        <div className='flex justify-between'>
          <h1>Title : {todo.title}</h1>
          <label className='mb-2 flex'>
            <h2 className='mr-1 font-bold'>Completed : </h2>
            <input data-testid='completed' type='checkbox' readOnly className='checkbox pointer-events-none border-slate-400 ' checked={todo.completed} />
          </label>
        </div>

        <div className='w-[50%] max-w-[300px] m-auto'>
          <figure>
            <img src={todo.imageURL} alt={todo.title} />
          </figure>
        </div>
        <div className='flex flex-col mt-10'>
          <div className='flex flex-col overflow-y-auto max-h-[300px]'>
            <p className='font-bold'> Description :</p>
            <p className='mt-2'>{todo.description}</p>
          </div>
          <div className=' mt-8 flex gap-1 justify-end'>
            <Modal todo={todo} />
            <DeleteButton id={todo.id} redirect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoDetails
