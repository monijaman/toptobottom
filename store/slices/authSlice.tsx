import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  email: string;
  name: string;
}


/**
 * Default state object with initial values.
 */
const initialState: AuthState = {
  name: 'Sulhadin',
  email: 'sulhadin@gmail.com',
} as const;

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.name>
    ) => {
      state.name = action.payload;
    },
    setEmail: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.email>
    ) => {
      state.email = action.payload;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getAuthState = (state: { user: AuthState }) => state.user;

// Exports all actions
export const { setName, setEmail } = authSlice.actions;

export default authSlice.reducer;
