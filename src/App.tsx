import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { TodoList } from "./components/TodoList/TodoList";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { saveTodo, selectTodoList } from "./reducers/todosSlice";

const App: React.FC = () => {
  const tasksList = useSelector(selectTodoList)
  const dispatch = useDispatch()

  const [activeFilter, setActiveFilter] = useState('all')
  const [todoTitle, setTodoTitle] = useState<string>('')
  const isTasksExist = tasksList && tasksList.length > 0

  const handleInputChange = (value: Todo['title']) => {
    setTodoTitle(value)
  }

  const addTodo = () => {
    dispatch(saveTodo({
      id: Date.now().toString(),
      title: todoTitle,
      isCompleted: false
    }))
  }

  const taskCount = () => {
    return tasksList.filter(todo => todo.isCompleted === false).length
  }

  return (
    <section className="todoapp">
      <Header addTodo={addTodo} handleInputChange={handleInputChange} todoTitle={todoTitle} />
      <TodoList tasksList={tasksList} />
      {!!tasksList.length && <Footer count={taskCount()} activeFilter={activeFilter} />}
    </section>
  )
}

export default App;
