import { useState,useEffect } from "react";
import Logo from "./components/Logo";
import Box from "./components/Box";
import MoviesList from "./components/MovieList";
import WatchedMovies from "./components/WatchedMovies";
import MovieDetails from "./components/MovieDetail";
import {useMovies} from './useMovies'
import {useLocalStorage} from "./useLocalStorage";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage("watched");
  const {movies,isLoading,isError} = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(function () {
    localStorage.setItem('watched',JSON.stringify(watched));
  },[watched])

  function handleOnSelectMovie(id){
    setSelectedId(id);
  }
  function handleOnMovieBack(){
    setSelectedId(null)
  }
  function handleOnAddMovie(movie){
    console.log(movie.Runtime)
   const flag =  watched.filter(watchedMovie=> watchedMovie.imdbID === movie.imdbID) ;
    if(!flag.length){
        setWatched(watchedMovies=>[...watchedMovies,movie])

    }
  }
  function handleOnDeleteMovie(id){
    console.log(id)
    setWatched((watched) => watched.filter((movieWatched) => movieWatched.imdbID !== id))
    console.log(watched.filter(movie => movie.id === id) +" was deleted");
  }

  const numMovies = movies?.length;

  return (
    <>
      <Logo query={query} setQuery={setQuery} onCloseMovie={handleOnMovieBack} movies={numMovies} />

      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && isError && <ErrorMessage message={isError}/>}
          {!isLoading && !isError && <MoviesList onSelectMovie={handleOnSelectMovie} movies={movies} />}
        </Box>

        <Box>
          {isLoading && <Loader />}
          {!isLoading && !selectedId && <WatchedMovies onDeleteMovie={handleOnDeleteMovie} watched={watched} average={average}/>}
          {!isLoading && selectedId && <MovieDetails onAddMovie={handleOnAddMovie} onBackButton={handleOnMovieBack} selectedId={selectedId}/>}
        </Box>
      </main>
    </>
  );
}


export function Loader(){
  return <div className="loader">Loading...</div>;
}

function ErrorMessage({message}){
  return <div className="error">{`⛔️${message}`}</div>;
}





