import HeaderCartButton from './HeaderCartButton'

import mealsImage from '../../assets/meals.jpeg'
import styles from './Header.module.css'

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt='Table with meals.' />
      </div>
    </>
  )
}

export default Header
