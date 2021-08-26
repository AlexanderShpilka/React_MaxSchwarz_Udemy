import styles from './Card.module.css'

const Card = (props) => {
  const { children, className } = props

  return <div className={`${styles.card} ${className}`}>{children}</div>
}

export default Card
