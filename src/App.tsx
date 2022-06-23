import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { saveTodo } from "./reducers/todosSlice";
import { selectTodoList } from "./selectors/selectTodoList";
import { selectFilter } from "./selectors/selectFilter";
import { Todo } from "./interfaces/todos";

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

  const filterTasks = (tasksList: Todo[], activeFilter: string) => {
    switch (activeFilter) {
      case 'completed':
        return tasksList.filter(task => task.isCompleted)

      case 'active':
        return tasksList.filter(task => !task.isCompleted)

      default:
        return tasksList
    }
  }

  const filteredTasks = filterTasks(tasksList, activeFilter)

  return (
    <section className="todoapp">
      <Header addTodo={addTodo} setTodoTitle={setTodoTitle} todoTitle={todoTitle} />
      <TodoList tasksList={filteredTasks} />
      {!!tasksList.length && <Footer count={taskCount} activeFilter={activeFilter} />}
    </section>
  )
}

export default App;
