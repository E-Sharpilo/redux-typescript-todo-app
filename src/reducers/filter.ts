import { createSlice } from "@reduxjs/toolkit";

let initialState = 'all'

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action) => state = action.payload
  }
})


export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer;