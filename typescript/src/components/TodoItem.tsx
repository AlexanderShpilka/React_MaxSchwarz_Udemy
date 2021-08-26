import { FC, useContext } from 'react'

import Todo from '../models/todo'

import { TodosContext } from '../store/todos-context'

import classes from './TodoItem.module.css'

const TodoItem: FC<{ todo: Todo }> = (props) => {
  const todosContext = useContext(TodosContext)

  const itemClickHandler = () => {
    todosContext.removeTodo(props.todo.id)
  }

  return (
    <li className={classes.item} onClick={itemClickHandler}>
      {props.todo.text}
    </li>
  )
}

export default TodoItem
