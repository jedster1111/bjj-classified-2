import { Move } from "common";

import { wait } from "./asyncUtils";
import { doFetch } from "./doFetch";

const fetchMoves = async () => {
  await wait(1000);

  return doFetch<Move[]>("/api/moves");
};

const fetchMove = async (moveId: string) => {
  await wait(1000);

  return await doFetch<Move>(`/api/moves/${moveId}`);
};

export const movesApi = {
  fetchMoves,
  fetchMove,
};
