import ReactDOM from 'react-dom'

import Card from './Card'
import Button from './Button'

import styles from './ErrorModal.module.css'

const ErrorModal = (props) => {
  const { title, message, onConfirm } = props

  const content = (
    <>
      <div className={styles.backdrop} onClick={onConfirm} />
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>
          <p>{message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={onConfirm}>Ok</Button>
        </footer>
      </Card>
    </>
  )

  return ReactDOM.createPortal(content, document.getElementById('modal-root'))
}

export default ErrorModal
