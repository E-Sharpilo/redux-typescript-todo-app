import { TodoItem } from '../TodoItem/TodoItem';
import React from "react";
import { useDispatch } from 'react-redux';
import { toggleAll } from '../../reducers/todosSlice';

type Props = {
  tasksList: Todo[]
}

export const TodoList: React.FC<Props> = ({ tasksList }) => {
  const dispatch = useDispatch()
  const toggleAllTasks = () => {
    dispatch(toggleAll({}))
  }

  return (
    <section className="main">
      {!!tasksList.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={tasksList.filter(todo => !todo.isCompleted).length === 0}
            onChange={toggleAllTasks}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <ul className="todo-list">
        {
          tasksList.map(({ id, title, isCompleted }) => (
            <TodoItem key={id} id={id} title={title} isCompleted={isCompleted} />
          ))
        }
      </ul>
    </ section>
  )
}
