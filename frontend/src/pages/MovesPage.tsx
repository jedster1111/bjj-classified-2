import React from "react";
import { Link } from "react-router-dom";
import { movesApi } from "../api/movesApi";
import { useFetch } from "../hooks/useFetch";

export const MovesPage = () => {
  const { data: moves = [], isLoading } = useFetch(movesApi.fetchMoves);
  return (
    <div>
      <p>Moves Page</p>
      {isLoading ? (
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
