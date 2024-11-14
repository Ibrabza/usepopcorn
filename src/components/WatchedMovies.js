function WatchedMovies({average,watched, onDeleteMovie}) {
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched?.map((movie) => Number(movie.userRating)));
  const avgRuntime = average(watched?.map((movie) => Number(movie.Runtime.split(' ').at(0))));
  return (
      <>
        <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched?.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>

        <ul className="list">
          {watched?.map((movie) => (
              <li  key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.Runtime.split(' ').at(0)} min</span>
                  </p>
                </div>
                <button onClick={()=> onDeleteMovie(movie.imdbID)} className="btn-delete">X</button>
              </li>
          ))}
        </ul>
      </>
  )
}

export default WatchedMovies;