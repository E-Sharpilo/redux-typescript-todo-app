import { createSlice } from "@reduxjs/toolkit";
import { addTask, getTasks } from "../api/api";
import { TasksList } from "../types/tasksList";

const initialState: TasksList = {
  taskList: [],
  loading: false,
  error: null
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // saveTask: (state, action) => {
    //   state.taskList.push(action.payload)
    // },
    // setCheck: (state, action) => {
    //   state.taskList.forEach(task => {
    //     if (action.payload === task.id) {
    //       task.isCompleted = !task.isCompleted
    //     }
    //   })
    // },
    // deleteTask: (state, action) => {
    //   state.taskList = state.taskList.filter(todo => todo.id !== action.payload)
    // },
    // deleteAllTasks: (state) => {
    //   state.taskList = state.taskList.filter(todo => todo.isCompleted === false)
    // },
    // toggleAll: (state) => {
    //   if (state.taskList.filter(task => !task.isCompleted).length === 0) {
    //     state.taskList.forEach(task => task.isCompleted = false);
    //   } else {
    //     state.taskList.forEach(task => task.isCompleted = true);
    //   }
    // },
    // changeTitleTask: (state, action) => {
    //   state.taskList.forEach(task => {
    //     if (action.payload.id === task.id) {
    //       task.title = action.payload.title
    //     }
    //   })
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.taskList = action.payload
        state.loading = false
      })
      .addCase(addTask.pending, (state) => {
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.taskList.push(action.payload)
      })
  }
})

// export const {
//   saveTask,
//   setCheck,
//   deleteTask,
//   deleteAllTasks,
//   toggleAll,
//   changeTitleTask} = taskSlice.actions
export default taskSlice.reducer;
