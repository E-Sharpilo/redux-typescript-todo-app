import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todosSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
})
 


