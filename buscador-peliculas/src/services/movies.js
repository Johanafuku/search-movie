const API_KEY = "d6bf84fb6c2ed803c19479b77369eb7d"

export const searchMovies = async({search})=>{

    if (search=== "") return null

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`)
        const json = await response.json()

        const movies = json.results
        //con esto evitamos que este muy ligado al contrato de la API
        return movies?.map(movie=>({
          id: movie.id,
          title: movie.original_title,
          sinopsis: movie.overview,
          date: movie.release_date,
          poster: `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        }))
    } catch(e){
        throw new Error('Error searching movie');
        
    }
   
}