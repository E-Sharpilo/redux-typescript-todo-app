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
    const task = getState().tasks.taskList.find(item => item.id === id)

    if (task) {
      const res = await fetch(`http://localhost:8080/myapi/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !task.completed })
      });

      if (!res.ok) {
        return rejectWithValue('Can\'t update task! Server error')
      }

      return await res.json()
    }


    return rejectWithValue('Task not found')
  }
)

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    const res = await fetch(`http://localhost:8080/myapi/todos/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      return rejectWithValue('Can\'t add task! Server error')
    }

    return id
  }
)

export const changeTitleTask = createAsyncThunk<Task, { id: string, title: string }, { rejectValue: string, state: { tasks: TasksList } }>(
  'tasks/changeTitleTask',
  async ({ id, title }, { rejectWithValue, getState }) => {
    const task = getState().tasks.taskList.find(item => item.id === id)

    if (task) {
      const res = await fetch(`http://localhost:8080/myapi/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      if (!res.ok) {
        return rejectWithValue('Can\'t update task! Server error')
      }

      return await res.json()
    }


    return rejectWithValue('Task not found')
  }
)

export const deleteAllCompleted = createAsyncThunk<Task[], undefined, { rejectValue: string, state: { tasks: TasksList } }>(
  'tasks/deleteAllCompleted',
  async (_, { rejectWithValue, getState }) => {
    const tasksDone = getState().tasks.taskList.filter(item => item.completed)

    if (tasksDone.length) {
      Promise.all(tasksDone.map(async task => {
        const res = await fetch(`http://localhost:8080/myapi/todos/${task.id}`, {
          method: 'DELETE'
        });

        if (!res.ok) {
          return rejectWithValue('Can\'t add task! Server error')
        }
      }))
    }
    return getState().tasks.taskList.filter(item => !item.completed)
  }
)

export const ToggleAll = createAsyncThunk<Task[], undefined, { rejectValue: string, state: { tasks: TasksList } }>(
  'tasks/ToggleAll',
  async (_, { rejectWithValue, getState }) => {

    let actualTodos = getState().tasks.taskList

    if (actualTodos.filter(todo => !todo.completed).length === 0) {
      await Promise.all(actualTodos.map(async task => {
        const res = await fetch(`http://localhost:8080/myapi/todos/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: false })
        });

        if (!res.ok) {
          return rejectWithValue('Can\'t update task! Server error')
        }

        return res.json()

      })).then(
        (res) => {
          actualTodos = res
        }
      )
    } else {
      await Promise.all(actualTodos.map(async task => {
        const res = await fetch(`http://localhost:8080/myapi/todos/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed: true })
        });

        if (!res.ok) {
          return rejectWithValue('Can\'t update task! Server error')
        }

        return res.json()

      })).then((res) => {
        actualTodos = res
      })
    }
    return actualTodos
  }
)
