import { useReducer } from 'react'

import CartContext from './cart-context'

const ADD = 'ADD'
const REMOVE = 'REMOVE'
const CLEAR = 'CLEAR'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === ADD) {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedCartItems

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedCartItems = [...state.items]
      updatedCartItems[existingCartItemIndex] = updatedCartItem
    } else {
      updatedCartItems = state.items.concat(action.item)
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === REMOVE) {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id)
    const existingCartItem = state.items[existingCartItemIndex]

    const updatedTotalAmount = state.totalAmount - existingCartItem.price

    let updatedCartItems

    if (existingCartItem.amount === 1) {
      updatedCartItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedCartItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }

      updatedCartItems = [...state.items]
      updatedCartItems[existingCartItemIndex] = updatedCartItem
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === CLEAR) {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ADD, item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: REMOVE, id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: CLEAR })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider
