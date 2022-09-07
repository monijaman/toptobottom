import axios from 'axios'
// import { createAsyncThunk,  Draft, PayloadAction } from '@reduxjs/toolkit';
// import filterService from '../services/filterService';

const API_URL = '/api/products/filter'

// Create new goal
const getProducts = async (quertyString) => { 
  //const token = thunkAPI.getState().auth.user.token
  // alert(quertyString)
 
  const response = await axios.get(API_URL, {
    params: {
      ...quertyString
    }
  })
  // const response = await axios.get('https://dummyjson.com/products/7')
  return response.data
}

   
const filterService = {
    getProducts 
}

export default filterService
