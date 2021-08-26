import Card from '../UI/Card'

import styles from './UsersList.module.css'

const UsersList = (props) => {
  const { users } = props

  return (
    <Card className={styles.users}>
      <ul>
        {users.map((user) => {
          const { username, age, id } = user

          return (
            <li key={id}>
              {username} ({age} years old)
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default UsersList
