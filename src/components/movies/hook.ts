import { ChangeEvent, useRef, useState } from "react";
import { Movie } from "./list";
import { capitalizeFirstLetter } from "../../utils";
// import master from "./data.json";
import master from "./dataset";

type filterType = "get" | "rank";

const useMovieFiter = () => {
  const [movies, setMovies] = useState<Movie[]>(master);
  const ref = useRef<filterType>("get");

  const filterByGet = (search: string) => {
    //get:rated=r,year=2018
    //get:rated=r,year=2019
    //get:rated=r,genre=action
    const sch: Array<[keyof Movie, string]> = [];
    const formattedSearch = search.split(",").reduce((acc, sch, index) => {
      if (!index) {
        sch = sch.split(":")[1];
      }

      const pair = sch.split("=");

      if (pair[0] && pair[1]) {
        acc.push([
          capitalizeFirstLetter(pair[0]) as keyof Movie,
          pair[1].toLowerCase(),
        ]);
      }
      return acc;
    }, sch);

    const filteredData = formattedSearch.length
      ? master.filter((movie) =>
          formattedSearch.every(([key, value]) =>
            ["Year", "Metascore", "imdbRating"].includes(key)
              ? movie[key] === Number(value)
              : typeof movie[key] === "string" &&
                // @ts-ignore
                movie[key]?.toLowerCase().includes(value)
          )
        )
      : master;

    setMovies(filteredData);
  };

  const filterByRank = (search: string) => {
    //rank:title=Knives Out&rank=2&title=Parasite&rank=1
    //rank:title=Knives Out&rank=2
    const formattedSearch: Record<string, number> = {};
    const splitted = search.split("&");
    let hasFilter = false;

    for (let i = 0; i < splitted.length; i++) {
      const key = splitted[i].split("=")[1];

      if (!splitted[++i]) continue;
      const value = splitted[i].split("=")[1];
      const rank = Number(value);

      if (key && value && rank > 0 && rank <= master.length) {
        hasFilter = true;
        formattedSearch[key.trim().toLowerCase()] = rank - 1;
      }
    }

    if (!hasFilter) {
      return setMovies(master);
    }
    const ranked: Movie[] = [];
    const unranked: Movie[] = [];

    for (let i = 0; i < master.length; i++) {
      const movie = master[i];

      if (Number.isInteger(formattedSearch[movie.Title.toLowerCase()])) {
        ranked[formattedSearch[movie.Title.toLowerCase()]] = movie;
      } else {
        unranked.push(movie);
      }
    }

    if (!ranked.length) {
      return setMovies(master);
    }

    for (let i = 0; i < ranked.length && unranked.length; i++) {
      if (!ranked[i]) {
        // @ts-ignore as already handled in for loop condition
        ranked[i] = unranked.shift();
      }
    }

    setMovies(ranked.concat(unranked));
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (!value || !value.startsWith(`${ref.current}:`)) {
      return setMovies(master);
    }

    (ref.current === "get" ? filterByGet : filterByRank)(value);
  };

  const handleSelect = (type: filterType) => {
    ref.current = type;
    setMovies(master);
  };

  return {
    movies,
    filterType: ref.current,
    handleInput,
    handleSelect,
  };
};

export default useMovieFiter;
