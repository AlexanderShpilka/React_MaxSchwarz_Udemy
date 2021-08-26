import { createContext, FC, useState } from 'react'

import Todo from '../models/todo'

interface TodosContextValue {
  items: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
}

export const TodosContext = createContext<TodosContextValue>({
  items: [],
  addTodo: (text: string) => {},
  removeTodo: (id: string) => {}
})

const TodosContextProvider: FC = (props) => {
  const [todos, setTodos] = useState<Array<Todo>>([])

  const addTodoHandler = (todoText: string): void => {
    setTodos((prevTodos) => {
      return prevTodos.concat({ id: new Date().getTime().toString(), text: todoText })
    })
  }

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => {
        return todo.id !== todoId
      })
    })
  }

  const todosContextProviderValue: TodosContextValue = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
  }

  return (
    <TodosContext.Provider value={todosContextProviderValue}>
      {props.children}
    </TodosContext.Provider>
  )
}

export default TodosContextProvider
