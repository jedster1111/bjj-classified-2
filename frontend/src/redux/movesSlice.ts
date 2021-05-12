import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Move } from "common";
import { movesApi } from "../api/movesApi";
import { AppDispatch } from "./store";

type MovesSlice = {
  movesByGuid: { [guid: string]: Move };
  moveGuids: string[];
  loadingState: "initial" | "loading" | "loaded";
};

const initialState: MovesSlice = {
  movesByGuid: {},
  moveGuids: [],
  loadingState: "initial",
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
};

const movesLoading: CaseReducer<MovesSlice, PayloadAction> = (state) => {
  state.loadingState = "loading";
};

export const movesSlice = createSlice({
  name: "moves",
  initialState,
  reducers: {
    movesReceived,
    movesLoading,
  },
});

export const fetchMoves = () => async (dispatch: AppDispatch) => {
  dispatch(movesSlice.actions.movesLoading());
  const response = movesApi.fetchMoves();
  dispatch(movesSlice.actions.movesReceived(response));

  return response;
};
