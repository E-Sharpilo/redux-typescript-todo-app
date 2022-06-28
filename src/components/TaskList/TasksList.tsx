import TaskItem from '../TaskItem/TodoItem';
import React from "react";
import { Task } from '../../types/task';

type Props = {
  tasksList: Task[]
}

const TodoList: React.FC<Props> = ({ tasksList }) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {
          tasksList.map(({ id, title, completed }) => (
            <TaskItem key={id} id={id} title={title} completed={completed} />
          ))
        }
      </ul>
    </ section>
  )
}

export default React.memo(TodoList)
