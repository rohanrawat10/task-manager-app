import React, { useState } from 'react'
import { MdAddComment, MdDelete } from 'react-icons/md'

function TodoChecklistInput({ todoList, setTodoList }) {

  const [task, setTask] = useState("")

  const handleAddOption = () => {
    if (task.trim() !== "") {
      setTodoList(prev => [...prev, task.trim()])
      setTask("")
    }
  }

  const handleDeleteOption = (index) => {
    setTodoList(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>

      {todoList.map((item, index) => (
        <div
          key={index}
          className='flex items-center justify-between bg-gray-50 border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'
        >
          <p className='text-sm text-black'>
            <span className='text-sm text-gray-400 font-semibold mr-2'>
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            type='button'
            className='cursor-pointer'
            onClick={() => handleDeleteOption(index)}
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      ))}

      <div className='flex items-center gap-5 mt-4'>

        <input
          type="text"
          placeholder='Add a new task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddOption()
          }}
          className='w-full text-[13px] text-black outline-none bg-white border border-gray-300 px-3 py-3 rounded-xl'
        />

        <button
          type="button"
          onClick={handleAddOption}
          className='flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-medium'
        >
          <MdAddComment className='text-base' />
          Add
        </button>

      </div>

    </div>
  )
}

export default TodoChecklistInput