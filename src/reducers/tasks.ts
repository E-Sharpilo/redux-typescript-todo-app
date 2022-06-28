import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTask, changeTitleTask, deleteAllCompleted, deleteTask, getTasks, ToggleAll, toggleStatus } from "../api/api";
import { TasksList } from "../types/tasksList";

const initialState: TasksList = {
  taskList: [],
  loading: false,
  error: null
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
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
        console.log(state.taskList);
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const task = state.taskList.find(item => item.id === action.payload.id)

        if(task) {
          task.completed = !task.completed
        }
      })
      .addCase(changeTitleTask.fulfilled, (state, action) => {
        const task = state.taskList.find(item => item.id === action.payload.id)

        if(task) {
          task.title = action.payload.title
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.taskList = state.taskList.filter(todo => todo.id !== action.payload)
      })
      .addCase(deleteAllCompleted.fulfilled, (state, action) => {
        state.taskList = action.payload
      })
      .addCase(ToggleAll.fulfilled, (state, action) => {
        state.taskList = action.payload
      })
      .addMatcher((action: AnyAction)=> {
        return action.type.endsWith('rejected')
      }, (state, action: PayloadAction<string>) =>{
        state.error = action.payload;
        state.loading = false;
      })
  }
})

export default taskSlice.reducer;
