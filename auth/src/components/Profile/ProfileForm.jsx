import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../store/auth-context'

import classes from './ProfileForm.module.css'

const API_KEY = 'AIzaSyCMRJV6oG99Dsa8i7BEPwqSOU0uqEcPoFg'

const ProfileForm = () => {
  const newPasswordInputRef = useRef()

  const authContext = useContext(AuthContext)

  const history = useHistory()

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authContext.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} min='8' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
