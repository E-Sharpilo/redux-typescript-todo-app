import React from "react";

type Props = {
  handleInputChange: (value: Todo['title']) => void
  addTodo: () => void
  todoTitle: string
}

export const Header: React.FC<Props> = ({ addTodo, handleInputChange, todoTitle }) => {
  return (
    <header className="header">
      <h1>Todo App</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if(todoTitle.trim()) {
            addTodo()
          }
          handleInputChange('')
        }}
      >
        <input
          type="text"
          className="new-todo"
          value={todoTitle}
          placeholder="What needs to be done?"
          onChange={(event) => {
            handleInputChange(event.target.value)
          }}
        />
      </form>
    </header>
  );
}