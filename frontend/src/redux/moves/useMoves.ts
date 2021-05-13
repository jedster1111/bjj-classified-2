import { useEffect } from "react";

import { fetchMoves } from "./movesSlice";
import { useAppDispatch, useAppSelector } from "../typedHooks";

export const useMoves = () => {
  const dispatch = useAppDispatch();
  const movesLoadingState = useAppSelector((state) => state.moves.loadingState);
  const fullMovesLoaded = useAppSelector(
    (state) => state.moves.fullMovesLoaded
  );

  useEffect(() => {
    if (!fullMovesLoaded) {
      dispatch(fetchMoves());
    }
  }, [fullMovesLoaded, dispatch]);

  const moves = useAppSelector((state) =>
    state.moves.moveGuids.map((moveGuid) => state.moves.movesByGuid[moveGuid])
  );

  return { moves, movesLoadingState };
};
