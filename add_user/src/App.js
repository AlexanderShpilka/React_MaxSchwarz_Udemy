import { useState } from 'react'

import AddUser from './components/Users/AddUser'
import UsersList from './components/Users/UsersList'

const App = () => {
  const [users, setUsers] = useState([])

  const addUserHandler = (username, age) => {
    const newUser = { username, age, id: Math.random().toString() }
    setUsers((prevUsers) => [newUser, ...prevUsers])
  }

  return (
    <>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={users} />
    </>
  )
}

export default App
