import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/tasks'
import filterReducer from './reducers/filter'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filter: filterReducer
  }
})


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
 


