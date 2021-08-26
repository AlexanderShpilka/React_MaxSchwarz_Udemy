import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import AddMovie from './components/AddMovie'

import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // const response = await fetch('https://swapi.dev/api/films')
      const response = await fetch(
        'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
      )

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      setMovies(loadedMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-2ebff-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      {
        method: 'post',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const data = await response.json()

    console.log(data)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  )
}

export default App
