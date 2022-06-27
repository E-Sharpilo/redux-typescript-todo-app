import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types/task";
import { TasksList } from "../types/tasksList";

export const getTasks = createAsyncThunk<Task[], undefined, { rejectValue: string }>(
  'tasks/getTasks',
  async (_, { rejectWithValue }) => {
    const res = await fetch('http://localhost:8080/myapi/todos');

    if (!res.ok) {
      return rejectWithValue('Fetch Error')
    }

    return await res.json()
  }
)

export const addTask = createAsyncThunk<Task, string, { rejectValue: string }>(
  'tasks/addTask',
  async (title, { rejectWithValue }) => {
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

    if (!res.ok) {
      return rejectWithValue('Can\'t add task! Server error')
    }

    return await res.json()
  }
)

export const toggleStatus = createAsyncThunk<Task, string, { rejectValue: string, state: { tasks: TasksList } }>(
  'tasks/toggleStatus',
  async (id, { rejectWithValue, getState }) => {
    const task = getState().tasks.taskList.find(item=> item.id === id)
    console.log(task);
    
    if (task) {
      const res = await fetch(`http://localhost:8080/myapi/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed: !task.completed})
      });

      if (!res.ok) {
        return rejectWithValue('Can\'t add task! Server error')
      }

      return await res.json()
    }


    return rejectWithValue('Task not found')
  }
)