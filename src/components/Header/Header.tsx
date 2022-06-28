import React, { useCallback, useMemo } from "react"
import { ToggleAll } from "../../api/api"
import { useAppDispatch, useAppSelector } from "../../store"

type Props = {
  setTodoTitle: (value: string) => void
  addTask: () => void
  todoTitle: string
}

const Header: React.FC<Props> = ({ addTask: addTodo, setTodoTitle, todoTitle }) => {
  const tasksList = useAppSelector(state => state.tasks.taskList)
  const dispatch = useAppDispatch()

  const toggleAllTasks = useCallback(() => {
    dispatch(ToggleAll())
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
    return tasksList.filter(task => !task.completed).length === 0
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
