import React from "react";
import { Link } from "react-router-dom";
import { useMoves } from "../redux/moves/useMoves";

export const MovesPage = () => {
  const { moves, movesLoadingState } = useMoves();
  return (
    <div>
      <p>Moves Page</p>
      {movesLoadingState === "initial" || movesLoadingState === "loading" ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {moves.map((move) => (
            <li key={move.id}>
              <Link to={`/moves/${move.id}`}>{move.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
