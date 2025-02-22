import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './features/todoSlice'
import themeReducer from './features/themeSlice'
export const store = configureStore({
    reducer: {
        todos: todoReducer,
        theme: themeReducer,
    },
})