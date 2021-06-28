import React from "react";
import { useParams } from "react-router-dom";
import { movesApi } from "../../api/movesApi";
import { useFetch } from "../../hooks/useFetch";
import { VideosList } from "./VideosList";

export const MovePage = () => {
  const { id: moveId } = useParams<{ id: string }>();

  const {
    data: move,
    error: moveError,
    isLoading: isMoveLoading,
  } = useFetch(() => movesApi.fetchMove(moveId), [moveId]);

  if (isMoveLoading) return <div>Loading...</div>;
  if (moveError) {
    if (moveError.type === "requestError" && moveError.status === 404) {
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
      <VideosList moveId={moveId} />
    </div>
  );
};
