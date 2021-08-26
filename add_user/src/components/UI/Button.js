import styles from './Button.module.css'

const Button = (props) => {
  const { type = 'button', onClick, children } = props

  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
