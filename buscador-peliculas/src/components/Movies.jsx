function ListOfMovies({movies}) {
    return (
      <ul className="movies">
        {
          movies.map(movie => (
            <li className="movie" key={movie.id}>
              <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="sinopsis"><strong>Summary: </strong>{movie.sinopsis}</p>
              <p>{movie.date}</p>
              </div>
              <img src={movie.poster} alt={movie.title} />
              
            </li>
          ))
        }
      </ul>
    )
  }

function NoMoviesResult() {
    return (
      (
        <p>No se encontraron resultados...</p>
      )
    )
  }

export function Movies ({movies}){
    const hasMovies = movies?.length > 0
    return (
        hasMovies 
        ? <ListOfMovies movies={movies}/>
        : <NoMoviesResult/>  
    )
}