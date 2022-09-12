import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import userService from './services/userService';

export interface UserState {

  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  userinfo: string[],
  name: string,
  email: string,
  password: string,
  username:string
}


 
/**
 * Default state object with initial values.
 */
const initialState: UserState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  userinfo: [],
  name: '',
  email: '',
  password: '',
  username: '',
} ;
 
export const createUser = createAsyncThunk(
  'users/create',
  async (userData, thunkAPI) => {
    try {
      return await userService.createUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
 

// Login user
export const login = createAsyncThunk(
  'users/login', 
  async (userData, thunkAPI) => {
  try {
    return await userService.login(userData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk(
  'auth/logout', 
  async () => {
  await userService.logout()
})


/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
 export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
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
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userinfo.push(action.payload)
    })
    .addCase(createUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      // state.message = action.payload
      // state.message = action.payload
    }) .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.userinfo = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
    })
    .addCase(logout.fulfilled, (state) => {
      state.isSuccess = true
    })
  },
})

// A small helper of user state for `useSelector` function.
export const getUserState = (state: { user: UserState }) => state.user;

// Exports all actions
export const { setName, setEmail,reset  } = userSlice.actions;

export default userSlice.reducer;
