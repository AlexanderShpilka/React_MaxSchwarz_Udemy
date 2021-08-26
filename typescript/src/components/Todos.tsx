import { FC, useContext } from 'react'

import TodoItem from './TodoItem'

import { TodosContext } from '../store/todos-context'

import classes from './Todos.module.css'

const Todos: FC = () => {
  const todosContext = useContext(TodosContext)

  return (
    <ul className={classes.todos}>
      {todosContext.items.map((item) => {
        return <TodoItem key={item.id} todo={item} />
      })}
    </ul>
  )
}

export default Todos
