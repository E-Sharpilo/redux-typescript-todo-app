import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TaskList/TasksList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';

import { selectTasksList } from "./selectors/tasks";
import { selectFilter } from "./selectors/filter";
import { Task } from "./types/task";
import { changeFilter } from "./reducers/filter";
import { useAppDispatch } from "./store";
import { addTask, getTasks } from "./api/api";

const App: React.FC = () => {
  const tasksList = useSelector(selectTasksList)
  const activeFilter = useSelector(selectFilter)
  const dispatch = useAppDispatch()
  const [taskTitle, setTaskTitle] = useState<string>('')


  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  const addNewTask = useCallback(() => {
    if (taskTitle.trim().length) {
      dispatch(addTask(taskTitle))
      setTaskTitle('')
    }
  }, [dispatch, taskTitle])

  const taskCount = useMemo(() => {
    return tasksList.filter(todo => todo.completed === false).length
  }, [tasksList])

  const filterTasks = useCallback((tasksList: Task[], activeFilter: string) => {
    switch (activeFilter) {
      case 'completed':
        return tasksList.filter(task => task.completed)

      case 'active':
        return tasksList.filter(task => !task.completed)

      default:
        return tasksList
    }
  }, [])

  const filterChange = (id: string) => {
    dispatch(changeFilter(id))
  }

  const filteredTasks = useMemo(() => {
    return filterTasks(tasksList, activeFilter)
  }, [activeFilter, filterTasks, tasksList])

  const completedCount = useMemo(() => {
    return tasksList.filter(todo => todo.completed === true).length
  }, [tasksList])

  return (
    <section className="todoapp">
      <Header addTask={addNewTask} setTodoTitle={setTaskTitle} todoTitle={taskTitle} />
      <TodoList tasksList={filteredTasks} />
      {!!tasksList.length && <Footer completedCount={completedCount} count={taskCount} activeFilter={activeFilter} filterChange={filterChange} />}
    </section>
  )
}

export default App;
