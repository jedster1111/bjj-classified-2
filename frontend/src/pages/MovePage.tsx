import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/typedHooks";

export const MovePage = () => {
  const { id } = useParams<{ id: string }>();

  const move = useAppSelector((state) => state.moves.movesByGuid[id]);

  if (!move) return <div>Move not found</div>;

  return (
    <div>
      <p>Move Page</p>
      <div>Move: {move.name}</div>
    </div>
  );
};
