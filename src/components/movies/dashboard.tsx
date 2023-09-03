import { FC } from "react";
import { Divider, Input, Select, Space } from "antd";
import MovieList from "./list";
import useMovieFiter from "./hook";
import { debounce } from "../../utils";

const Dashboard: FC = () => {
  const { movies, filterType, handleInput, handleSelect } = useMovieFiter();

  return (
    <>
      <Divider orientation="center">Movies</Divider>
      <Space.Compact block className="p-20">
        <Select
          className="w-25vw"
          defaultValue="get"
          onChange={handleSelect}
          options={[
            { value: "get", label: "Get" },
            { value: "rank", label: "Rank" },
          ]}
        />
        <Input
          key={filterType}
          allowClear
          onChange={debounce(handleInput, 400)}
        />
      </Space.Compact>
      <MovieList movies={movies} />
    </>
  );
};

export default Dashboard;
