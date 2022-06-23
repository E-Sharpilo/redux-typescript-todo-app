import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { TodoList } from "./components/TodoList/TodoList";
import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { saveTodo } from "./reducers/todosSlice";
import { selectTodoList } from "./selectors/selectTodoList";

const App: React.FC = () => {
  const tasksList = useSelector(selectTodoList)
  const dispatch = useDispatch()

  const [activeFilter, setActiveFilter] = useState('all')
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

  return (
    <section className="todoapp">
      <Header addTodo={addTodo} setTodoTitle={setTodoTitle} todoTitle={todoTitle} />
      <TodoList tasksList={tasksList} />
      {!!tasksList.length && <Footer count={taskCount} activeFilter={activeFilter} />}
    </section>
  )
}

export default App;
