import { useRef} from "react";
import {useKey} from "../useKey";

function Logo({query,setQuery,movies,onCloseMovie}) {

    const inputSearch = useRef();

    useKey('escape', onCloseMovie);
    useKey('enter', handleFocusOnSearch)

    function handleFocusOnSearch(e){
        if(e.target !== inputSearch.current){
            inputSearch.current.focus();
        }
    }

    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <input
                ref={inputSearch}
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
                Found <strong>{movies}</strong> results
            </p>
        </nav>
    )
}

export default Logo;