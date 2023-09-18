import React from 'react'
import { client } from '../lib/apolloClient'
import { GET_TODOS } from './queries/todoQueries'
import GoToButton from './components/GoToButton'
import DeleteButton from './components/DeleteButton'
import Loading from './loading'
import Error from './error'
import Modal from './components/Modal'

interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
  description: string
  imageURL: string
}

const Home = async () => {
  const { loading, error, data } = await client.query({ query: GET_TODOS })
  if (loading) return <Loading />
  if (error) return <Error error={error} />
  return (
    <div className='w-full h-[100vh] flex flex-col '>
      <h1 className='ml-auto mr-auto mt-10'>Todo list</h1>
      <div className='ml-auto mr-auto mt-10'>
        <Modal label='create todo' />
      </div>
      <div className='overflow-y-auto mt-10 max-h-[80vh] border border-slate-400 rounded p-10 m-auto'>
        <table className='table'>
          <thead className='p-5'>
            <tr>
              <th className='text-slate-400'>Completed</th>
              <th className='text-slate-400'>Title</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((todo: Todo) => (
              <tr key={todo.id}>
                <th>
                  <label>
                    <input type='checkbox' readOnly className='checkbox pointer-events-none border-slate-400' checked={todo.completed} />
                  </label>
                </th>
                <td>{todo.title}</td>
                <th>
                  <GoToButton label='details' path={`/${todo.id}`} additionalClass='btn-ghost btn-xs' />
                </th>
                <th>
                  <DeleteButton id={todo.id} additionalClass='btn-ghost btn-xs' />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
