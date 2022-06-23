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
    },
    setCheck: (state, action) => {
      state.todoList.map(todo => {
        if (action.payload === todo.id) {
          todo.isCompleted = !todo.isCompleted
        }
      })
    },
    deleteTodo: (state, action) => {
      state.todoList.splice(state.todoList.findIndex(todo => todo.id === action.payload), 1)
    },
    deleteAllTodo: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.isCompleted === false)
    }
  }
})

export const { saveTodo, setCheck, deleteTodo, deleteAllTodo } = todoSlice.actions
export const selectTodoList = (state: { todos: { todoList: Todo[]; }; }) => state.todos.todoList
export default todoSlice.reducer;