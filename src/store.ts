import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todosSlice'
import filterReducer from './reducers/filterSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    filter: filterReducer
  }
})
 


