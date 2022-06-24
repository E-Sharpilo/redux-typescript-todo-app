import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../types/task";

const initialState: { taskList: Task[] } = {
  taskList: [
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

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    saveTask: (state, action) => {
      state.taskList.push(action.payload)
    },
    setCheck: (state, action) => {
      state.taskList.forEach(task => {
        if (action.payload === task.id) {
          task.isCompleted = !task.isCompleted
        }
      })
    },
    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(todo => todo.id !== action.payload)
    },
    deleteAllTasks: (state) => {
      state.taskList = state.taskList.filter(todo => todo.isCompleted === false)
    },
    toggleAll: (state) => {
      if (state.taskList.filter(task => !task.isCompleted).length === 0) {
        state.taskList.forEach(task => task.isCompleted = false);
      } else {
        state.taskList.forEach(task => task.isCompleted = true);
      }
    },
    changeTitleTask: (state, action) => {
      state.taskList.forEach(task => {
        if (action.payload.id === task.id) {
          task.title = action.payload.title
        }
      })
    }
  }
})

export const {
  saveTask,
  setCheck,
  deleteTask,
  deleteAllTasks,
  toggleAll,
  changeTitleTask} = taskSlice.actions
export default taskSlice.reducer;
