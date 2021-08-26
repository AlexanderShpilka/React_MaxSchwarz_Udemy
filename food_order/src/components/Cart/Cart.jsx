import { useContext, useState } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import Checkout from './Checkout'

import CartContext from '../../store/cart-context'

import styles from './Cart.module.css'

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)

    await fetch(
      'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
      {
        method: 'post',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      }
    )

    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={() => cartItemAddHandler(item)}
      onRemove={() => cartItemRemoveHandler(item.id)}
    />
  ))

  const cartModalContent = (
    <>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />}
      {!isCheckout && (
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onDismiss={props.onHideCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
