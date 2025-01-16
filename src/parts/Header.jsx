import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from '../redux/app/features/themeSlice'
function Header() {

    const dispatch = useDispatch();
    const darkMode = useSelector((state => state.theme.darkMode))

    const handleThemeChange = () => {
        dispatch(toggleDarkMode());
    }

    return (
        <nav className='container m-auto py-5 flex items-center justify-between'>
            <h2 className='font-bold text-3xl text-teal-500'>Aysenur's Todo App</h2>
            <label className='flex cursor-pointer select-none items-center' htmlFor='darkModeToggle'>
                <div className='relative'>
                    <input
                        type='checkbox'
                        id='darkModeToggle'
                        checked={darkMode}
                        onChange={handleThemeChange}
                        className='sr-only'
                    />
                    <div
                        className={`box block h-8 w-14 rounded-full ${darkMode ? 'bg-blue-700' : 'bg-yellow-400'
                            }`}
                    ></div>
                    <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${darkMode ? 'translate-x-full' : ''
                            }`}
                    ></div>
                </div>
            </label>
        </nav>
    )
}

export default Header