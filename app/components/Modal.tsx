'use client'
import React, { useState } from 'react'
import { client } from '@/lib/apolloClient'
import { UPDATE_TODO, CREATE_TODO } from '@/app/queries/todoQueries'

interface Props {
  todo?: {
    id: number
    userId: number
    title: string
    completed: boolean
    description: string
    imageURL: string
  }
  label?: string
}

const Modal = ({ todo, label }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState(todo?.title || '')
  const [description, setDescription] = useState(todo?.description || '')
  const [imageURL, setImageURL] = useState(todo?.imageURL || '')
  const [completed, setCompleted] = useState(todo?.completed || false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)
  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => setImageURL(e.target.value)
  const handleCompletedChange = () => setCompleted(!completed)
  const handleShowModal = () => setShowModal(!showModal)

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const { data } = await client.mutate({
        mutation: !todo ? CREATE_TODO : UPDATE_TODO,
        variables: { id: todo?.id, title, description, imageURL, completed, userId: todo?.userId || 1 },
      })
      console.log('tout est ok', { data })
    } catch (error) {
      console.log({ error })
    }
    handleShowModal()
  }
  return (
    <div>
      <button className='btn' onClick={handleShowModal}>
        {label ? label : 'edit'}
      </button>
      <dialog open={showModal} id='my_modal_5' className='modal modal-bottom sm:modal-middle bg-slate-900'>
        <div className='modal-box'>
          <div className='modal-action'>
            <form method='dialog' className='m-auto text-black'>
              <div className='form-control w-full max-w-xs mb-2'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs'
                  value={title}
                  onChange={handleTitleChange}
                />
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-24'
                  placeholder='Type here'
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
                <label className='label'>
                  <span className='label-text'>Image Url</span>
                </label>
                <input
                  type='text'
                  placeholder='Type here'
                  className='input input-bordered w-full max-w-xs'
                  value={imageURL}
                  onChange={handleImageURLChange}
                />
                <label>
                  <span className='label-text'>Completed</span>
                </label>
                <input type='checkbox' className='checkbox' checked={completed} onChange={handleCompletedChange} />
              </div>
              <div className='flex justify-between'>
                <button className='btn' onClick={handleSubmit} type='submit'>
                  Submit
                </button>
                <button className='btn' onClick={handleShowModal}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Modal
