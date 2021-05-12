import React, { useEffect } from "react";
import { fetchMoves } from "../redux/movesSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";

export const MovesPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoves());
  }, []);

  const moves = useAppSelector((state) =>
    state.moves.moveGuids.map((moveGuid) => state.moves.movesByGuid[moveGuid])
  );
  return (
    <div>
      <p>Moves Page</p>
      <ul>
        {moves.map((move) => (
          <li key={move.id}>{move.name}</li>
        ))}
      </ul>
    </div>
  );
};
