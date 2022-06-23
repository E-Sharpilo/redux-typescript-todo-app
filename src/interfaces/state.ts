import { Todo } from "./todos"

export interface State {
  todos: {
    todoList: Todo[]
  }
}