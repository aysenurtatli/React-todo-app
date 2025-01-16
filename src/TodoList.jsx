import React from 'react'
import { fetchTodos } from './redux/app/features/todoSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo } from './redux/app/features/todoSlice'
import { toggleTodoAsync } from './redux/app/features/todoSlice'
import { FaCheck } from "react-icons/fa";
import TodoAdd from './components/TodoAdd'
function TodoList() {
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todos)
    const darkMode = useSelector((state) => state.theme.darkMode)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    const handleCheckboxChange = (id) => {
        dispatch(toggleTodoAsync(id))
    }

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className='container m-auto my-14'>
                <TodoAdd />
                <ul className='my-5'>
                    {todos?.map((todo) => {
                        return (
                            <li key={todo.id} className='my-5 dark:bg-zinc-800 bg-zinc-100 p-3 rounded-md text-zinc-600'>
                                <div className='flex justify-between'>
                                    <span className={`${todo.completed ? 'line-through text-gray-500' : ''} flex items-center`}>
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleCheckboxChange(todo.id)}
                                            className=' mx-2 w-5 h-5 appearance-none border border-zinc-300 rounded-md checked:border-teal-500 checked:bg-teal-500 focus:outline-none cursor-pointer'
                                        />
                                        {todo.title}
                                    </span>
                                    <div>
                                        <span className='text-sm text-zinc-400 mx-3'>{todo.datetime}</span>
                                        <button
                                            className='bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 rounded-sm text-gray-700 p-1 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                                            onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TodoList