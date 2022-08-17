import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

// Type for our state
export interface TestState {
  testState: boolean;
}

// Initial state
const initialState: TestState = {
  testState: false,
};

// Actual Slice
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    // Action to set the authentication status
    setTestState(state, action) {
      state.testState = action.payload;
    },
  },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.test,
        };
      },
    },
});

export const { setTestState } = testSlice.actions;

export const selectTestState = (state: AppState) => state.test.testState;

export default testSlice.reducer;