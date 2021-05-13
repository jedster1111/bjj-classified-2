import { Move } from "common";
import { wait } from "./asyncUtils";

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

const fetchMoves = async () => {
  await wait(1000);
  return mockMoves;
};

const fetchMove = async (moveId: string) => {
  await wait(1000);
  return mockMoves.find((move) => move.id === moveId);
};

export const movesApi = {
  fetchMoves,
  fetchMove,
};
