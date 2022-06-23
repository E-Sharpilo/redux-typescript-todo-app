import React, { useCallback } from "react"

type Props = {
  setTodoTitle: (value: string) => void
  addTodo: () => void
  todoTitle: string
}

const Header: React.FC<Props> = ({ addTodo, setTodoTitle, todoTitle }) => {

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

  return (
    <header className="header">
      <h1>Todo App</h1>
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