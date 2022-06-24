import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/tasks'
import filterReducer from './reducers/filter'

export const store = configureStore({
  reducer: {
    tasks: todoReducer,
    filter: filterReducer
  }
})
 


