import { TodoItem } from '../TodoItem/TodoItem';
import React from "react";

type Props = {
  tasksList: Todo[]
}

export const TodoList: React.FC<Props> = ({ tasksList }) => (
  <ul className="todo-list">
    {
      tasksList.map(({ id, title, isCompleted }) => (
        <TodoItem key={id} id={id} title={title} isCompleted={isCompleted} />
      ))
    }
  </ul>
)
