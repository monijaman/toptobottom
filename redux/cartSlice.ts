import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

// import type { Draft, PayloadAction } from '@reduxjs/toolkit'
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";

import { IAuthUser, IProduct, ShippingAddressType } from "types/index";




export type cartState = {
  darkMode: boolean;
  cart: {
    cartItems: IProduct[] | [];
    shippingAddress: ShippingAddressType | null;
    paymentMethod: string | undefined;
  };

};

export type ContextType = {
  state: cartState;
  dispatch: React.Dispatch<any>;
};

const cartCookie: string = Cookies.get("cartItems");
const shippingCookie: string = Cookies.get("shippingAddress");
const paymentCookie: string = Cookies.get("paymentMethod");
//  const userCookie:string = Cookies.get("userInfo");
// console.log(shippingCookie) 

const initialState: cartState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,

  cart: {
    cartItems: cartCookie ? JSON.parse(cartCookie) : [],
    shippingAddress: shippingCookie ? JSON.parse(shippingCookie) : {},
    paymentMethod: paymentCookie ? paymentCookie : "",
  },
  //  userInfo: userCookie  ? userCookie : null,
  // userInfo: userCookie ? userCookie : null,

};

// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to set the authentication status

    additem(state, action) {

      const newItem = action.payload as IProduct;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          item.name === existItem.name ? newItem : item
        )
        : [...state.cart.cartItems, newItem];

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    },
    removeitems(state, action) {
      // const newItem = action.payload.item as IProduct;
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== (action.payload.item as IProduct)?._id
      );

      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
      //state =  { ...state, cart: { ...state.cart, cartItems } };
    },

    saveShippingAddress(state, action) {

      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload as ShippingAddressType,
        },
      };
    },

    savePaymentMethod(state, action) {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload as string },
      };
    },

    clearCart(state) {
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    },


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

export const { additem,
  removeitems, saveShippingAddress,
  savePaymentMethod, clearCart } = cartSlice.actions;

export const selectCartState = (state: AppState) => state.cart;

export default cartSlice.reducer;
