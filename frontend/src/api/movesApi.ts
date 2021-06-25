import axios from "axios";
import { Move } from "common";

import { wait } from "./asyncUtils";

const fetchMoves = async () => {
  await wait(1000);

  const result = await axios.get<Move[]>("/api/moves");
  return result.data;
};

const fetchMove = async (moveId: string) => {
  await wait(1000);

  const result = await axios.get<Move>(`/api/move/${moveId}`);
  return result.data;
};

export const movesApi = {
  fetchMoves,
  fetchMove,
};
