import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types/task";

export const getTasks = createAsyncThunk<Task[], undefined, {rejectValue: string}>(
  'tasks/getTasks',
  async (_, {rejectWithValue}) => {
    const res = await fetch('http://localhost:8080/myapi/todos');

    if(!res.ok) {
      return rejectWithValue('Fetch Error')
    }

    return await res.json()
  }
)

export const addTask = createAsyncThunk<Task, string, {rejectValue: string}>(
  'tasks/addTask',
  async (title, {rejectWithValue}) => {
    const task = {
      title,
      id: Date.now().toString(),
      completed: false
    }

    const res = await fetch('http://localhost:8080/myapi/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if(!res.ok) {
      return rejectWithValue('Can\'t add task! Server error')
    }

    return await res.json()
  }
)