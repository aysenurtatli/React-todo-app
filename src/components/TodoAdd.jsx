import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addTodo } from '../redux/app/features/todoSlice'

function TodoAdd() {
    const [todoTitle, setTodoTitle] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const handleSubmit = (e) => {
        e.preventDefault();
        const datetime = new Date().toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        const todosData = todos.todos;
        const numberId = todosData.length ? (Number(todosData[todosData.length - 1].id) + 1) : 1;
        console.log(numberId)
        const id = String(numberId)
        const newTodo = { title: todoTitle, datetime, completed: false, id };

        if (todoTitle) {
            dispatch(addTodo(newTodo))
            setTodoTitle('')
        } else {
            alert('enter a todo')
        }
    }

    return (
        <form className='w-full' onSubmit={handleSubmit}>
            <div className='flex items-center border-b border-teal-500 py-2'>
                <input
                    type="text"
                    placeholder='Enter a todo'
                    value={todoTitle}
                    id='todoTitle'
                    onChange={(e) => setTodoTitle(e.target.value)}
                    className='appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none'
                />
                <button
                    type='submit'
                    className='flex-shrink-0 bg-teal-500 hover:bg-teal-600 text-sm border-teal-500 border-4 hover:border-teal-600 text-white py-1 px-2 rounded'
                >Add</button>
            </div>
        </form>
    )
}

export default TodoAdd