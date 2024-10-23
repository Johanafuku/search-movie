
import './App.css'
import { useEffect, useState, useRef, useCallback} from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import { Footer } from './components/Footer'

function useSearch (){
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const firstInput = useRef(true)

  useEffect(()=>{
    if (firstInput.current){
      firstInput.current = search === "" //true 
      return
    }
    if (search=== ''){
      setError("No se puede buscar una pelicula sin un parámetro")
      return // para que no siga ejecutando
    }
    if (search.length < 3){
      setError("La busqueda debe tener al menos 3 caracteres")
      return 
    }

    setError(null)
  },[search])

  return {search, setSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, loading, getMovies}= useMovies({search, sort})

  const debouncedGetMovies = useCallback(
    debounce(search => {
    getMovies({search})
    },300)
    ,[getMovies]
  )

  const handleSubmit = (event)=>{
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = ()=>{
    setSort(!sort)
  }

  const handleChange = (event)=>{
    const newSearch = event.target.value
    setSearch(newSearch)
    //cuando detecte cambio en el input, hará la busqueda
    debouncedGetMovies(newSearch)
  }


  return (
    
    <div className='pagina'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} type="text" placeholder='Avengers, Matrix, star wars...'/>
          <input type="checkbox" onChange={handleSort} checked={sort}/> 
          <button type='submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies}/>
        }
      </main>
      <footer>
      <Footer/>
      </footer>
    </div>
    
  )
}

export default App
