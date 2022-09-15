import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import Cookies from "js-cookie";
import { IAuthUser } from "types/index";
// Type for our state
export interface AuthState {
  authState: boolean;
  userInfo: IAuthUser | null;
}

const userCookie: string = Cookies.get("userInfo");
const authState: string = Cookies.get("authState");

// Initial state
const initialState: AuthState = {
  authState: authState ? authState : false,
  userInfo: userCookie ? userCookie : null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    userLogin(state, action) {
      return {
        ...state,
        userInfo: action.payload as IAuthUser
      };
    },

    userLogout(state, action) {
      return {
        ...state,
        userInfo: null,
        cart: {
          ...state.cart,
          cartItems: [],
          shippingAddress: null,
          paymentMethod: "",
        },
      };
    }
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, userLogin, userLogout } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;