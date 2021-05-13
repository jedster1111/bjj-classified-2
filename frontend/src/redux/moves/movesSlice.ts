import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move } from "common";
import { movesApi } from "../../api/movesApi";
import { AppDispatch } from "../store";

type MovesSlice = {
  movesByGuid: { [guid: string]: Move };
  moveGuids: string[];
  loadingState: "initial" | "loading" | "loaded";
  fullMovesLoaded: boolean;
};

const initialState: MovesSlice = {
  movesByGuid: {},
  moveGuids: [],
  loadingState: "initial",
  fullMovesLoaded: false,
};

const movesReceived: CaseReducer<MovesSlice, PayloadAction<Move[]>> = (
  state,
  action
) => {
  state.moveGuids = action.payload.map((move) => move.id);

  state.movesByGuid = action.payload.reduce<MovesSlice["movesByGuid"]>(
    (accum, move) => {
      accum[move.id] = move;
      return accum;
    },
    {}
  );

  state.loadingState = "loaded";
  state.fullMovesLoaded = true;
};

const moveReceived: CaseReducer<MovesSlice, PayloadAction<Move | undefined>> = (
  state,
  action
) => {
  state.loadingState = "loaded";

  if (!action.payload) return;

  state.moveGuids.push(action.payload.id);

  state.movesByGuid[action.payload.id] = action.payload;
};

const movesLoading: CaseReducer<MovesSlice, PayloadAction> = (state) => {
  state.loadingState = "loading";
};

export const movesSlice = createSlice({
  name: "moves",
  initialState,
  reducers: {
    movesReceived,
    moveReceived,
    movesLoading,
  },
});

export const fetchMoves = () => async (dispatch: AppDispatch) => {
  dispatch(movesSlice.actions.movesLoading());

  const response = await movesApi.fetchMoves();
  dispatch(movesSlice.actions.movesReceived(response));

  return response;
};

export const fetchMove = (moveId: string) => async (dispatch: AppDispatch) => {
  dispatch(movesSlice.actions.movesLoading());

  const move = await movesApi.fetchMove(moveId);
  dispatch(movesSlice.actions.moveReceived(move));
};
