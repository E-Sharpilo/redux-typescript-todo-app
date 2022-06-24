import TodoItem from '../TodoItem/TodoItem';
import React from "react";
import { Todo } from '../../interfaces/todos';

type Props = {
  tasksList: Todo[]
}

const TodoList: React.FC<Props> = ({ tasksList }) => {
  return (
    <section className="main">
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

export default React.memo(TodoList)
