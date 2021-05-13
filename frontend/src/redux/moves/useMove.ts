import { useEffect, useState } from "react";
import { Move } from "common";
import { fetchMove } from "./movesSlice";
import { useAppDispatch, useAppSelector } from "../typedHooks";

export const useMove = (moveId: string) => {
  const dispatch = useAppDispatch();
  const movesLoadingState = useAppSelector((state) => state.moves.loadingState);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(false);
  }, [moveId]);

  const move = useAppSelector<Move | undefined>(
    (state) => state.moves.movesByGuid[moveId]
  );

  useEffect(() => {
    if (hasLoaded) return;

    if (
      movesLoadingState === "initial" ||
      (movesLoadingState === "loaded" && !move)
    ) {
      dispatch(fetchMove(moveId));
      setHasLoaded(true);
    }
  }, [moveId, movesLoadingState, move, dispatch, hasLoaded]);

  return { move, movesLoadingState };
};
