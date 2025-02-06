import React from 'react'

export const CreatePostPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center mt-10">
      <div className='border rounded-xl border-b-0 min-h-screen p-6 w-full max-w-3xl'>
        <div>
          <input type='text' className='bg-on-surface-1 border-stroke-bold rounded-xl w-full focus:ring-stroke-bold focus:border-stroke-bold' placeholder='Post Title' />
        </div>
      </div>
    </div>
  )
}
