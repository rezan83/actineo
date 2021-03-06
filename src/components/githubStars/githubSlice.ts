import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getData } from "./githubStarsAPI";

export interface GithubState {
  value: any[];
  status: "success" | "loading" | "failed";
  filtered: boolean;
}

const initialState: GithubState = {
  value: [],
  status: "loading",
  filtered: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const githubDataAsync = createAsyncThunk(
  "githubStars/githubData",
  async () => {
    const repos = await getData();
    await repos.forEach((item: any) => {
      item.star = false;
    });
    if (localStorage.stared) {
      for (const id of JSON.parse(localStorage.stared)) {
        let toBeStared = repos.find((item: any) => item.id === id);
        if (toBeStared) {
          toBeStared.star = true;
        }
      }
    }
    // The repos we return becomes the `fulfilled` action payload
    return repos;
  }
);

export const reposSlice = createSlice({
  name: "repos",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    star: (state, action: PayloadAction<string>) => {
      let id = action.payload;
      let toBeStared = state.value.find((item) => item.id === id);
      toBeStared.star = !toBeStared.star;
      let storage: string[] = [];
      if (localStorage.stared) {
        storage = JSON.parse(localStorage.stared);
        if (storage.includes(id)) {
          storage = storage.filter((item) => item !== id);
        } else {
          storage.push(id);
        }
        localStorage.setItem("stared", JSON.stringify(storage));
      } else if (toBeStared.star) {
        storage.push(id);
        localStorage.setItem("stared", JSON.stringify(storage));
      }
    },
    filter: (state) => {
      state.filtered = !state.filtered;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(githubDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(githubDataAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.value = action.payload;
      })
      .addCase(githubDataAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { star, filter } = reposSlice.actions;

// The function below is called a selector and allows us to select a repos from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.repos)`
export const selectRepos = (state: RootState) => {
  return state.repos.value;
};
export const selectfiltered = (state: RootState) => {
  return state.repos.filtered;
};
export const selectStaredRepos = (state: RootState) =>
  state.repos.value.filter((repo) => repo.star);

export default reposSlice.reducer;
