import React from "react";
import { useParams } from "react-router-dom";
import { movesApi } from "../api/movesApi";
import { useFetch } from "../hooks/useFetch";

export const MovePage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: move,
    error,
    isLoading,
  } = useFetch(() => movesApi.fetchMove(id), [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error while loading move!</div>;
  if (!move) return <div>Move not found</div>;

  return (
    <div>
      <p>Move Page</p>
      <div>Move: {move.name}</div>
    </div>
  );
};
