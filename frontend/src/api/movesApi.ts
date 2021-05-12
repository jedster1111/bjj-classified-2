import { Move } from "common";

const mockMoves: Move[] = [
  {
    id: "1",
    name: "Triangle Choke",
  },
  {
    id: "2",
    name: "Armbar",
  },
];

const fetchMoves = () => mockMoves;

export const movesApi = {
  fetchMoves,
};
