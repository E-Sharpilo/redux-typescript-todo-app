import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TaskList/TasksList";
import { useCallback, useEffect, useMemo, useState } from "react";
import { changeFilter } from "./reducers/filter";
import { useAppDispatch, useAppSelector } from "./store";
import { addTask, getTasks } from "./api/api";

const App: React.FC = () => {
  const {loading, error} = useAppSelector(state => state.tasks)
  const tasksList = useAppSelector(state => state.tasks.taskList)
  const activeFilter = useAppSelector(state => state.filter)
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
