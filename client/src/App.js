import { useEffect, useState } from "react";
import "./App.css";
import MoiveDetails from "./components/MoiveDetails";
import MovieList from "./components/MovieList";

function App() {
    console.log(process.env.REACT_APP_TOKEN);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState([]);

    const movieClicked = (movie) => {
        setSelectedMovie(movie);
    };

    const loadMovie = (movie) => {
        setSelectedMovie(movie);
    };

    useEffect(() => {
        fetch("http://localhost:8000/api/movies/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: process.env.REACT_APP_TOKEN,
            },
        })
            .then((response) => response.json())
            .then((response) => setMovies(response))
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Movie Rater</h1>
            </header>
            <div className="layout">
                <MovieList movies={movies} movieClicked={movieClicked} />
                <MoiveDetails movie={selectedMovie} updateMovie={loadMovie} />
            </div>
        </div>
    );
}

export default App;
