import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import githubReducer from "../components/githubStars/githubSlice";

export const store = configureStore({
  reducer: {
    repos: githubReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
