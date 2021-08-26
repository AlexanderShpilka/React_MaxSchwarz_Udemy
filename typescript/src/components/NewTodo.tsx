import { FormEvent, useRef, FC, useContext } from 'react'

import { TodosContext } from '../store/todos-context'

import classes from './NewTodo.module.css'

const NewTodo: FC = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null)

  const todosContext = useContext(TodosContext)

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    const enteredText = todoTextInputRef.current!.value

    if (enteredText.trim().length) {
      todosContext.addTodo(enteredText)
      todoTextInputRef.current!.value = ''
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor='todo'>Todo text</label>
      <input type='text' id='todo' ref={todoTextInputRef} />
      <button type='submit'>Add todo</button>
    </form>
  )
}

export default NewTodo
