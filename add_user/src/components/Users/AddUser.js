import { useState, useRef } from 'react'

import Card from '../UI/Card'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import Wrapper from '../Helpers/Wrapper'

import styles from './AddUser.module.css'

const AddUser = (props) => {
  const { onAddUser } = props

  const [error, setError] = useState(null)

  const usernameInputRef = useRef(null)
  const ageInputRef = useRef(null)

  const addUserHandler = (event) => {
    event.preventDefault()

    const username = usernameInputRef.current.value
    const age = ageInputRef.current.value

    if (!username.trim().length || !age.trim().length) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid username and age (non-empty values).'
      })
      return
    }

    if (Number(age) < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).'
      })
      return
    }

    onAddUser(username, age)

    usernameInputRef.current.value = ''
    ageInputRef.current.value = ''

    usernameInputRef.current.focus()
  }

  const resetErrorHandler = () => setError(null)

  return (
    <Wrapper>
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' ref={usernameInputRef} />

          <label htmlFor='age'>Age (years)</label>
          <input type='number' id='age' ref={ageInputRef} />

          <Button type='submit'>Add User</Button>
        </form>
      </Card>

      {error && <ErrorModal title={error.title} message={error.message} onConfirm={resetErrorHandler} />}
    </Wrapper>
  )
}

export default AddUser
