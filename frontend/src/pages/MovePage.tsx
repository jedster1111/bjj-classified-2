import React from "react";
import { useParams } from "react-router-dom";
import { useMove } from "../redux/moves/useMove";

export const MovePage = () => {
  const { id } = useParams<{ id: string }>();

  const { move, movesLoadingState } = useMove(id);

  if (movesLoadingState === "initial" || movesLoadingState === "loading")
    return <div>Loading...</div>;

  if (!move) return <div>Move not found</div>;

  return (
    <div>
      <p>Move Page</p>
      <div>Move: {move.name}</div>
    </div>
  );
};
