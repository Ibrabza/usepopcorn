import { useState, useEffect } from "react";

const KEY = '6a2dd11';

export function useMovies(query){
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState( false);
    const [isError, setIsError] = useState("");

    useEffect(function () {
        const controller = new AbortController();

        async function getMovies(){
            try {
                setIsLoading(true);
                setIsError(null);
                //`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&=test`
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal : controller.signal});

                if (!res.ok) throw new Error("Movies not found not okay");

                const data = await res.json();
                if(data.Response === "False") throw new Error("Movies not found false");

                if(query.length < 3) throw new Error("Movies not found length")

                console.log(data);
                setMovies(data.Search);
                setIsError("")



            } catch (err) {
                if(err.name !== "Abort request"){
                    setIsError(err.message);
                }
            }
            finally {
                setIsLoading(false);
            }
        }
        if(!query) {
            setIsError("");
            setIsLoading(false)
            setMovies([])
            return;
        }
        getMovies()
        return function(){
            controller.abort();
        }
    },[query])

    return {movies,isLoading,isError};
}