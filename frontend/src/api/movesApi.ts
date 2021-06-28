import { Move, Video } from "common";

import { wait } from "./asyncUtils";
import { doFetch } from "./doFetch";

const fetchMoves = async () => {
  await wait(150);

  return doFetch<Move[]>("/api/moves");
};

const fetchMove = async (moveId: string) => {
  await wait(150);

  return await doFetch<Move>(`/api/moves/${moveId}`);
};

const fetchMoveVideos = async (moveId: string) => {
  await wait(150);

  return await doFetch<Video[]>(`/api/moves/${moveId}/videos`);
};

export const movesApi = {
  fetchMoves,
  fetchMove,
  fetchMoveVideos,
};
