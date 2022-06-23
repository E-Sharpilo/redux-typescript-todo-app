import { createSlice } from "@reduxjs/toolkit";

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
    },
    toggleAll: (state, action) => {
      if (state.todoList.filter(todo => !todo.isCompleted).length === 0) {
        state.todoList.forEach(todo => todo.isCompleted = false);
      } else {
        state.todoList.forEach(todo => todo.isCompleted = true);
      }
    }
  }
})

export const { saveTodo, setCheck, deleteTodo, deleteAllTodo, toggleAll } = todoSlice.actions
export const selectTodoList = (state: { todos: { todoList: Todo[]; }; }) => state.todos.todoList
export default todoSlice.reducer;