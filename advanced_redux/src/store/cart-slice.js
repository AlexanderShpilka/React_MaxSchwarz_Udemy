import { createSlice } from '@reduxjs/toolkit'

import { uiActions } from './ui-slice'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemToCart(state, action) {
      const newItem = action.payload
      const exisitingItem = state.items.find((item) => item.id === newItem.id)
      if (!exisitingItem) {
        state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price })
      } else {
        exisitingItem.quantity = exisitingItem.quantity + 1
        exisitingItem.totalPrice = exisitingItem.totalPrice + exisitingItem.price
      }
      state.totalQuantity = state.totalQuantity + 1
      state.changed = true
    },
    removeItemFromCart(state, action) {
      const id = action.payload
      const exisitingItem = state.items.find((item) => item.id === id)
      if (exisitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        exisitingItem.quantity = exisitingItem.quantity - 1
        exisitingItem.totalPrice = exisitingItem.totalPrice - exisitingItem.price
      }
      state.totalQuantity = state.totalQuantity - 1
      state.changed = true
    }
  }
})

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data'
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to send cart data.')
      }
    }

    try {
      await sendRequest()

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully.'
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Error while sending cart data.'
        })
      )
    }
  }
}

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Could not fetch cart data.')
      }

      return data
    }

    try {
      const cartData = await fetchData()
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Error while fetching cart data.'
        })
      )
    }
  }
}

export const cartActions = cartSlice.actions

export default cartSlice
