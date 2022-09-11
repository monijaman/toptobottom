// import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { createAsyncThunk, createAction, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import filterService from './services/filterService';
const querystring = require('querystring');


import { AppState } from "./store";
// import {configureStore, createAction, createSlice, ThunkAction} from '@reduxjs/toolkit';
import { Action } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const hydrate = createAction(HYDRATE);
// import type { Draft, PayloadAction } from '@reduxjs/toolkit'
/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
// import { createContext } from "react";
import { queryParamType } from "types/index";
import Pagination from '@material-ui/lab/Pagination';


export type filterState = {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  dataSet: string[];
  pagination: queryParamType | null
};

export type ContextType = {
  state: filterState;
  dispatch: React.Dispatch<any>;
};


// console.log(shippingCookie) 

const initialState: filterState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  dataSet: [],
  pagination: {
    skip: 0,
    limit: 12,
    page: 1,
    totalPage: 1,
    search: "",
    category: [],
    price: ["any"]
  },

};


export const getProducts = createAsyncThunk(
  'cart/getproduct',
  async (_, thunkAPI) => {
    // async ('_', thunkAPI) => {
    try {

      const pagiData = thunkAPI.getState().filter.pagination

      return await filterService.getProducts(pagiData)
    } catch (error) {

      return thunkAPI.rejectWithValue("Sorry error")
    }
  }
)

// Actual Slice
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Action to set the authentication status

    updatFilter(state, action) {

      const newItem = action.payload.chkItm;
      const price = action.payload.RadioItm;
      const search = action.payload;
      let page = action.payload.page;

      let category = []

      if (action.payload.type == "checkAll") {
        category = newItem;

      } else if (action.payload.type == "checkOutAll") {
        category = []
      } else {
        let existItem = state.pagination.category.find(
          (item) => item === newItem
        );
        category = existItem ? state.pagination.category.filter(
          (item) => item !== newItem)
          : [...state.pagination.category, newItem];
      }

      if (newItem) {
        page = 1
        return {
          ...state,
          pagination: { ...state.pagination, category, page },

        };
      } else if (price) {
        page = 1
        return {
          ...state,
          pagination: { ...state.pagination, price, page },

        };
      } else if (page) {
        return {
          ...state,
          pagination: { ...state.pagination, page },
        }

      } else {
        page = 1
        return {
          ...state,
          pagination: { ...state.pagination, search, page },
        }
      }





      //  return { ...state, ...state.pagination.category, filterItms  };
      //  return { ...state, filter: { ...state.pagination.skip, filterItms } };
      //  const cartItems = state.cart.cartItems.filter(
      //   (item) => item._id !== (action.payload.item as IProduct)?._id 
      // );          


      // const cartItems = existItem
      //  ? state.pagination.category.map((item) =>
      //      item.name === existItem.name ? newItem : item
      //    )
      //  : [...state.pagination.category, newItem];  

      //   if(!state.pagination.category.includes("newItem")){
      //     state.pagination.category.push(action.payload.chkItm) 
      //   }   

      // const filterItems = existItem
      //   ? state.filter.category.map((item) =>
      //       item.name === existItem.name ? newItem : item
      //     )
      //   : [...state.cart.cartItems, newItem];            

      // Cookies.set("cartItems", JSON.stringify(cartItems));         
      // return { ...state, cart: { ...state.cart, cartItems } };
    },

    clearFilter(state) {
      return { ...state, filter: { ...initialState } };
    },


  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper

  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE', state[slice.name], action.payload);
      return {
        ...state[slice.name],
        ...(action.payload as any)[slice.name],
      };
    })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.dataSet = action.payload.dataSet
        state.pagination.page = action.payload.page
        state.pagination.totalPage = action.payload.totalPage
        // state.pagination.pages= action.payload.pages
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        // state.message = action.payload
        // state.message = action.payload
      })
  },

  /*   extraReducers: {
     // extraReducers: {
       [HYDRATE]: (state, action) => {
         return {
           ...state,
           ...action.payload.filter,
         };
       },
     },*/
});

export const { clearFilter, updatFilter } = filterSlice.actions;

export const selectFilterState = (state: AppState) => state.filter;

export default filterSlice.reducer;

