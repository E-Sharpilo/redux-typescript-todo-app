import { filter } from "./filter"
import { Task } from "./task"

export type State = {
  filter: filter;
  tasks: {
    taskList: Task[]
  };
}