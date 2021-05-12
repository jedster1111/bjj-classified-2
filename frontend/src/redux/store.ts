import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { movesSlice } from "./movesSlice";

const rootReducer = combineReducers({
  moves: movesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
