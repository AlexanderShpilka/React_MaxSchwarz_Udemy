import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import AuthContext from '../../store/auth-context'

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  const authContext = useContext(AuthContext)

  const history = useHistory()

  const logoutHandler = () => {
    authContext.logout()
    history.push('/auth')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authContext.isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {authContext.isLoggedIn && (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
