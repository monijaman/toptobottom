import { createAsyncThunk, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import cartService from './services/cartService';


export interface CartState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  dataSet: string[];
  id:number;
  name: string;
  title: string;
  category?: string;
  image?:string;
  rating?: {
    rate:number,
    count:number
};
}


 
/**
 * Default state object with initial values.
 */
const initialState: CartState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  dataSet: [],
  id:0,
  name: '',
  title: '',
  category: '',
  image:'',
  rating: {
    rate:0,
    count:0
  }
} 
 
export const getProducts = createAsyncThunk(
  'cart/getproduct',
  async (_, thunkAPI) => {
  // async ('_', thunkAPI) => {
    try {
      return await cartService.getProducts()
    } catch (error) {
        
      return thunkAPI.rejectWithValue("")
    }
  }
)
 

 
 

/**
 * Create a slice as a reducer containing actions.
 *
 * In this example actions are included in the slice. It is fine and can be
 * changed based on your needs.
 */
 export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setName: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.name>
    ) => {
      state.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.dataSet.push(action.payload)
    })
    .addCase(getProducts.rejected, (state) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      // state.message = action.payload
      // state.message = action.payload
    }) 
  },
})

// A small helper of user state for `useSelector` function.
export const getCartState = (state: { cart: CartState }) => state.cart;

// Exports all actions
export const {  reset  } = cartSlice.actions;

export default cartSlice.reducer;
