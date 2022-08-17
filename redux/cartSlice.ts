import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

// import type { Draft, PayloadAction } from '@reduxjs/toolkit'
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
// import { createContext } from "react";
import { IAuthUser, IProduct, ShippingAddressType } from "types/index";

 


export type cartState = {
  darkMode: boolean;
  cart: {
    cartItems: IProduct[] | [];
    shippingAddress: ShippingAddressType | null;
    paymentMethod: string | undefined;
  };
  userInfo: IAuthUser | null;
  authState: boolean;
 
};

export type ContextType = {
  state: cartState;
  dispatch: React.Dispatch<any>;
};

 const cartCookie :string = Cookies.get("cartItems");
 const shippingCookie:string = Cookies.get("cartItems");
 const paymentCookie:string = Cookies.get("cartItems");
 const userCookie:string = Cookies.get("userInfo");

const initialState: cartState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,

  cart: {
    cartItems: cartCookie ? JSON.parse(cartCookie): [],
    shippingAddress: shippingCookie ? JSON.parse(shippingCookie): {},
    paymentMethod: paymentCookie ? JSON.parse(paymentCookie): "",
  },

  userInfo: userCookie  ? JSON.parse(userCookie!) : null,
  authState: false,
};

// const StoreContext = createContext<ContextType>({
//   state: initialState,
//   dispatch: () => null,
// });


// export interface AuthState {
//   authState: boolean;
// }

// // Initial state
// const initialState: AuthState = {
//   authState: false,
// };


// Actual Slice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      // Action to set the authentication status
      setCartState(state, action) {
        state.authState = action.payload;
      },

      additem(state, action){
       
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

          state =  { ...state, cart: { ...state.cart, cartItems } };
        
      },
      removeitems(state, action) {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._id !== (action.payload as IProduct)?._id
        );
        Cookies.set("cartItems", JSON.stringify(cartItems));
        state =  { ...state, cart: { ...state.cart, cartItems } };
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
  
  export const { setCartState, additem, removeitems } = cartSlice.actions;
  
  export const selectCartState = (state: AppState) => state.cart;
  
  export default cartSlice.reducer;

/*
const reducer = (state = initialState, action: Actions): StateType => {
  switch (action.type) {
    case actionTypes.DARK_MODE_ON:
      return { ...state, darkMode: true };

    case actionTypes.DARK_MODE_OFF:
      return { ...state, darkMode: false };

    case actionTypes.CART_ADD_ITEM: {
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
    }

    case actionTypes.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== (action.payload as IProduct)?._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case actionTypes.CART_CLEAR:
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case actionTypes.USER_LOGIN:
      return { ...state, userInfo: action.payload as IAuthUser };

    case actionTypes.USER_LOGOUT:
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

    case actionTypes.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload as ShippingAddressType,
        },
      };

    case actionTypes.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload as string },
      };
      
    default:
      return state;
  }
};


*/