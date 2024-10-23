import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search, sort}){
    const [movies, setMovies ] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState(null)
    const previousSearch = useRef(search)

    const getMovies = useCallback(
        //con useCallback, mismo que useMEmo mas simple, es para funciones
        // generamos la funcion solo cuando cambie el search
        //al inyectar search por parametro , solo se generaria 1 vez
         async({search})=>{
        if (search === previousSearch.current) return 
        try{
            //antes de llamar a la API reseteamos los valores:
            setLoading(true)
            setError(null)
            previousSearch.current = search //actualizamos a la busqueda ingresada
            //llamamos al servicio que hace el fetch a la API
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        } catch(e){
            setError(e.message)
        } finally {
            setLoading(false)
        }
        },[])

    const sortedMovies = useMemo(()=> {
        return sort 
        ? [...movies].sort((a,b)=> a.title.localeCompare(b.title))
        : movies
    },[sort, movies]) //solo hace el calculo de ordenar cuando cambia el sort o la pelicula
  
    return {movies: sortedMovies, getMovies, loading}
  }