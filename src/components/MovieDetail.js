import {useState, useEffect} from "react";
import StarRating from './StarRating'
import {Loader} from "../App";
const KEY = '6a2dd11';


function MovieDetails({onBackButton, selectedId, onAddMovie}) {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMovie,setSelectedMovie] = useState({});
    const [rating, setRating] = useState();

    const title = selectedMovie.Title;


    // const {
    //     Title:title,
    //     Poster:poster,
    //     rating:userRating,
    //     Author:author,
    //     Director:director,
    //     Released:released,
    //     imdbRaiting:imdbRating,
    //     Genre:genre,
    //     Runtime:runtime,
    //     } = selectedMovie

    selectedMovie.userRating = rating;

    function handleOnSetRating(rat){
        setRating(Number(rat));
    }
    useEffect(function(){
        if(!selectedMovie.Title) return ;
        document.title = `Movie | ${title}`;

        return function (){
            document.title = "UsePopcorn";
            console.log("Movie " + selectedMovie.Title + " has been closed")
        }
    },[title])

    useEffect(function () {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

                if (!res.ok) throw new Error("Movies not found not okay");

                const data = await res.json();
                if(data.Response === "False") throw new Error("Movies not found false");

                console.log(data);
                setSelectedMovie(data);
                // setSelectedMovie(data.Search);
                setIsLoading(false)
            } catch (err){
                console.log(err.message);
                setIsLoading(true)
            }
            finally {
                // setIsLoading(false);
            }

        }
        fetchMovies();
    },[selectedId])


    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onBackButton}> &larr; </button>
                        <img src={selectedMovie.Poster} alt={selectedMovie.Title}/>
                        <div className="details-overview">
                            <h2>{selectedMovie.Title}</h2>
                            <p>{selectedMovie.Released} &bull; {selectedMovie.Runtime}</p>
                            <p>{selectedMovie.Genre}</p>
                            <p><span>⭐️</span>{selectedMovie.imdbRating} IMDb Rating</p>
                        </div>
                    </header>


                    <section>
                    <div className="rating">
                        <StarRating onSetRating={handleOnSetRating} maxRating={10} size={24}/>
                        {rating>0 && <button className="btn-add" onClick={()=> {
                            onAddMovie(selectedMovie);
                            onBackButton()}}>+ Add to list</button>}
                    </div>
                        <p><em>{selectedMovie.Plot}</em></p>
                        <p>Starring {selectedMovie.Actors}</p>
                        <p>Directed by {selectedMovie.Director}</p>
                    </section>
                </>
            }
        </div>
    )
}

export default MovieDetails;