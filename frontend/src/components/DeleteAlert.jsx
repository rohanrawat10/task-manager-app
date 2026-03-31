import React from 'react'

function DeleteAlert({content,onDelete}) {
  return (
    <div>
        <p>{content}</p>
        <div  className='flex justify-end mt-6'>
              <button type='button' className='flex text-xs font-medium text-rose-500
              whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg cursor-pointer hover:bg-rose-600
               hover:text-white transition-colors  active:-translate-y-1 transition-All duration-1000 px-2 linear'
              onClick={onDelete} >Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlert