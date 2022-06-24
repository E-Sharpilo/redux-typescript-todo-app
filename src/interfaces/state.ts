import { Todo } from "./todos"

export interface State {
  filter: string
  todos: {
    todoList: Todo[]
  }
}