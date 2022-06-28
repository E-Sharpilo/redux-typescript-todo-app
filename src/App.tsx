import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TaskList/TasksList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from 'react-redux';

import { selectTasksList } from "./selectors/tasks";
import { selectFilter } from "./selectors/filter";
import { changeFilter } from "./reducers/filter";
import { useAppDispatch, useAppSelector } from "./store";
import { addTask, getTasks } from "./api/api";

const App: React.FC = () => {
  const {loading, error} = useAppSelector(state => state.tasks)
  const tasksList = useSelector(selectTasksList)
  const activeFilter = useSelector(selectFilter)
  const dispatch = useAppDispatch()
  const [taskTitle, setTaskTitle] = useState<string>('')


  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])

  const addNewTask = useCallback(() => {
    if (taskTitle.trim().length) {
      dispatch(addTask(taskTitle.trim()))
      setTaskTitle('')
    }
  }, [dispatch, taskTitle])

  const taskCount = useMemo(() => {
    return tasksList.filter(todo => todo.completed === false).length
  }, [tasksList])

  const filterTasks = useCallback(() => {
    switch (activeFilter) {
      case 'completed':
        return tasksList.filter(task => task.completed)

      case 'active':
        return tasksList.filter(task => !task.completed)

      default:
        return tasksList
    }
  }, [activeFilter, tasksList])

  const filterChange = useCallback((id: string) => {
    dispatch(changeFilter(id))
  },[dispatch])

  const completedCount = useMemo(() => {
    return tasksList.filter(todo => todo.completed === true).length
  }, [tasksList])

  return (
    <section className="todoapp">
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <Header addTask={addNewTask} setTodoTitle={setTaskTitle} todoTitle={taskTitle} />
      <TodoList tasksList={filterTasks()} />
      {!!tasksList.length && <Footer completedCount={completedCount} count={taskCount} activeFilter={activeFilter} filterChange={filterChange} />}
    </section>
  )
}

export default App;
