import { useEffect, useState } from "react";

import { fetchMoves } from "./movesSlice";
import { useAppDispatch, useAppSelector } from "../typedHooks";

export const useMoves = () => {
  const dispatch = useAppDispatch();
  const movesLoadingState = useAppSelector((state) => state.moves.loadingState);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(fetchMoves());
      setHasLoaded(true);
    }
  }, [hasLoaded, dispatch]);

  const moves = useAppSelector((state) =>
    state.moves.moveGuids.map((moveGuid) => state.moves.movesByGuid[moveGuid])
  );

  return { moves, movesLoadingState };
};
