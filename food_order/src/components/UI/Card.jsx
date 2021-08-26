import styles from './Card.module.css'

const Card = (PaymentResponse) => {
  return <div className={styles.card}>{PaymentResponse.children}</div>
}

export default Card
