import { FC } from "react";
import { List, Card } from "antd";

const { Meta } = Card;

export interface Movie {
  Title: string;
  Year: number;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: number;
  imdbRating: number;
  imdbVotes: any;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: any;
  Response: string;
  Website?: string;
}

interface IMovieList {
  movies: Movie[];
}

const MovieList: FC<IMovieList> = ({ movies }) => (
  <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    }}
    className="p-20"
    dataSource={movies}
    renderItem={({ Title, Genre, Poster }) => (
      <List.Item key={Title}>
        <Card
          hoverable
          style={{ minWidth: 240 }}
          cover={<img loading="lazy" alt={Title} src={Poster} />}
        >
          <Meta title={Title} description={Genre} />
        </Card>
      </List.Item>
    )}
  />
);

export default MovieList;
