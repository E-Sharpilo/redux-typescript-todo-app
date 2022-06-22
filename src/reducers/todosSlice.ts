import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    }
  }
})

export const { saveTodo } = todoSlice.actions
export const selectTodoList = (state: { todos: { todoList: Todo[]; }; }) => state.todos.todoList
export default todoSlice.reducer;