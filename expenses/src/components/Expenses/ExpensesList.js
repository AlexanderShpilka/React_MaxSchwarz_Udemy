import ExpenseItem from './ExpenseItem'

import './ExpensesList.css'

const ExpensesList = (props) => {
  const { items } = props

  if (!items.length) {
    return <h2 className='expenses-list__fallback'>No expenses found.</h2>
  }

  return (
    <ul className='expenses-list'>
      {items.map((expense) => (
        <li key={expense.id}>
          <ExpenseItem title={expense.title} amount={expense.amount} date={expense.date} />
        </li>
      ))}
    </ul>
  )
}

export default ExpensesList
