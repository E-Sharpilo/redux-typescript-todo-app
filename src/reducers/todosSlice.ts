import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../interfaces/todos";

const initialState: { todoList: Todo[] } = {
  todoList: [
    {
      id: '1',
      title: 'Todo something',
      isCompleted: true
    },
    {
      id: '2',
      title: 'Create todo app',
      isCompleted: false
    },
    {
      id: '3',
      title: 'Todo something else',
      isCompleted: false
    }
  ]
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    saveTodo: (state, action) => {
      state.todoList.push(action.payload)
    },
    setCheck: (state, action) => {
      state.todoList.forEach(todo => {
        if (action.payload === todo.id) {
          todo.isCompleted = !todo.isCompleted
        }
      })
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload)
    },
    deleteAllTodo: (state) => {
      state.todoList = state.todoList.filter(todo => todo.isCompleted === false)
    },
    toggleAll: (state) => {
      if (state.todoList.filter(todo => !todo.isCompleted).length === 0) {
        state.todoList.forEach(todo => todo.isCompleted = false);
      } else {
        state.todoList.forEach(todo => todo.isCompleted = true);
      }
    }
  }
})

export const { saveTodo, setCheck, deleteTodo, deleteAllTodo, toggleAll } = todoSlice.actions
export default todoSlice.reducer;
