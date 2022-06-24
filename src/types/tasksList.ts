import { Task } from "./task"

export type TasksList = {
  taskList: Task[],
  loading: boolean,
  error: string | null
}