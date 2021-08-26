import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

import styles from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      const loadedMeals = []

      for (const key in data) {
        loadedMeals.push({ id: key, ...data[key] })
      }

      setMeals(loadedMeals)
    }

    setIsLoading(true)

    fetchMeals()
      .catch((error) => setHttpError(error.message))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ))

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
