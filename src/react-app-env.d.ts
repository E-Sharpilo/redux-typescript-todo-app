/// <reference types="react-scripts" />
interface Todo {
  id: string,
  title: string,
  isCompleted: boolean,
};

interface Action {
  id: Todo['id']
  title: Todo['title']
  isCompleted: Todo['isCompleted']
  type: string
}