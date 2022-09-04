import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

// import type { Draft, PayloadAction } from '@reduxjs/toolkit'
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
// import { createContext } from "react";
 import { priceTerm, categoryType, queryParamType } from "types/index";

 


export type filterState = {
  filter: {
    searchTem: queryParamType | null
    categoryTerm: categoryType | null;
    priceTerm: string | undefined;
  };
};

export type ContextType = {
  state: filterState;
  dispatch: React.Dispatch<any>;
};

let queryParama = {
  skip: 0,
  limit: 2,
  page: 1,
  price: [0,999999],
  search: '',
  category: ''
}

// console.log(shippingCookie) 

const initialState: filterState = {
  filter: {
    searchTem: 
    categoryTerm: null;
    priceTerm: 0;
  }

};

 

// Actual Slice
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
      // Action to set the authentication status
    
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
          filter: {
            ...state.filter,
            shippingAddress: action.payload as ShippingAddressType,
          },
        };
      },

   

      clearCart(state){
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
  
  export const {   additem, 
    removeitems, saveShippingAddress, 
     clearCart} = filterSlice.actions;
  
  export const selectCartState = (state: AppState) => state.filter;
  
  export default filterSlice.reducer;

 