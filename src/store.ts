import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/tasks'
import filterReducer from './reducers/filter'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filter: filterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




