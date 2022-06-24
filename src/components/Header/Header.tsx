import React, { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleAll } from "../../reducers/tasks"
import { selectTodoList } from '../../selectors/tasks'

type Props = {
  setTodoTitle: (value: string) => void
  addTask: () => void
  todoTitle: string
}

const Header: React.FC<Props> = ({ addTask: addTodo, setTodoTitle, todoTitle }) => {
  const tasksList = useSelector(selectTodoList)
  const dispatch = useDispatch()

  const toggleAllTasks = useCallback(() => {
    dispatch(toggleAll())
  }, [dispatch])

  const submitHandle = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (todoTitle.trim()) {
        addTodo()
      }
      setTodoTitle('')
    }, [addTodo, setTodoTitle, todoTitle])

  const inputHandle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value)
  }, [setTodoTitle])

  const isChecked = useMemo(() => {
    return tasksList.filter(todo => !todo.isCompleted).length === 0
  }, [tasksList])

  return (
    <header className="header">
      <h1>Todo App</h1>
      {!!tasksList.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={isChecked}
            onChange={toggleAllTasks}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <form
        onSubmit={submitHandle}
      >
        <input
          type="text"
          className="new-todo"
          value={todoTitle}
          placeholder="What needs to be done?"
          onChange={inputHandle}
        />
      </form>
    </header>
  );
}

export default React.memo(Header)