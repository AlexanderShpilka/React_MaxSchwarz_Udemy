import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onDismiss} />
}

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

const Modal = (props) => {
  const modalContent = (
    <>
      <Backdrop onDismiss={props.onDismiss} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  )

  return createPortal(modalContent, document.getElementById('overlays'))
}

export default Modal
