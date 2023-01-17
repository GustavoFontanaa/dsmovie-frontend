import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { BASE_URL } from "utils/requests";
import { MoviePage } from "types/movie";
import { FaSearch } from "react-icons/fa";
import './styles.css';

function Listing() {
  const [pageNumber, setPageNumber] = useState(0);

  const [page, setPage] = useState<MoviePage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 1000,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies?size=20&page=${pageNumber}`)
      .then((response) => {
        const data = response.data as MoviePage;
        setPage(data);
      });
  }, [pageNumber]);

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const [search, setSearch] = useState("");

  const searchLowerCase = search.toLowerCase();
  const searchMovies = page.content.filter((movie) =>
    movie.title.toLowerCase().includes(searchLowerCase)
  );

  return (
    <>
      <section className="caixa-search">
        <input
          className="caixa-texto"
          type="search"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Pesquisar..."
        />
        <p className="botao-search">
          <FaSearch/>
        </p>
      </section>

      <Pagination page={page} onChange={handlePageChange} />

      <div className="container">
        <div className="row">
          {searchMovies.map((movie) => (
            <div key={movie.id} className="col-sm-6 col-lg-4 col-xl-3 mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Listing;
