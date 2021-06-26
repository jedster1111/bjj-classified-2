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
  if (error) {
    if (error.type === "requestError" && error.status === 404) {
      return <div>Unable to find move.</div>;
    } else {
      return <div>Something went wrong while fetching move.</div>;
    }
  }
  if (!move) return <div>Move not found</div>;

  return (
    <div>
      <p>Move Page</p>
      <div>Move: {move.name}</div>
    </div>
  );
};
