import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TaskList/TodoList";
import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { saveTodo } from "./reducers/tasks";
import { selectTodoList } from "./selectors/tasks";
import { selectFilter } from "./selectors/filter";
import { Task } from "./types/task";
import { changeFilter } from "./reducers/filter";

const App: React.FC = () => {
  const tasksList = useSelector(selectTodoList)
  const activeFilter = useSelector(selectFilter)

  const dispatch = useDispatch()

  const [todoTitle, setTodoTitle] = useState<string>('')

  const addTodo = useCallback(() => {
    dispatch(saveTodo({
      id: Date.now().toString(),
      title: todoTitle,
      isCompleted: false
    }))
  }, [dispatch, todoTitle])

  const taskCount = useMemo(() => {
    return tasksList.filter(todo => todo.isCompleted === false).length
  }, [tasksList])

  const filterTasks = useCallback((tasksList: Task[], activeFilter: string) => {
    switch (activeFilter) {
      case 'completed':
        return tasksList.filter(task => task.isCompleted)

      case 'active':
        return tasksList.filter(task => !task.isCompleted)

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
    return tasksList.filter(todo => todo.isCompleted === true).length
  }, [tasksList])

  return (
    <section className="todoapp">
      <Header addTask={addTodo} setTodoTitle={setTodoTitle} todoTitle={todoTitle} />
      <TodoList tasksList={filteredTasks} />
      {!!tasksList.length && <Footer completedCount={completedCount} count={taskCount} activeFilter={activeFilter} filterChange={filterChange} />}
    </section>
  )
}

export default App;
