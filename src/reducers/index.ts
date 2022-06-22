import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from './todosSlice'


export const rootReducer = combineReducers({ todosReducer })
