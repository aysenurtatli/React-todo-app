import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    return axios.get('http://localhost:3000/todos')
        .then(response => response.data)
        .catch(err => {
            throw err;
        })
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo, thunkAPI) => {
    return axios.post('http://localhost:3000/todos', newTodo)
        .then(response => response.data)
        .catch(err => thunkAPI.rejectWithValue(err.response?.data || err.message))
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
    return axios.delete(`http://localhost:3000/todos/${id}`)
        .then(() => id)
        .catch(err => thunkAPI.rejectWithValue(err.response?.data || err.message))
})

export const toggleTodoAsync = (id) => (dispatch, getState) => {
    const todos = getState().todos.todos
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
        console.error('Todo not found');
        return;
    }
    const updatedTodo = { ...todo, completed: !todo.completed };

    axios.patch(`http://localhost:3000/todos/${id}`, updatedTodo)
        .then(() => {
            dispatch(toggleTodo(id))
        })
        .catch((err) => {
            console.log(err.message);
        })
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: 'idle',
    },
    reducers: {
        toggleTodo: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })
    }
})
export const { toggleTodo } = todoSlice.actions
export default todoSlice.reducer

