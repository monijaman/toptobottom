import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { selectFilterState, updatFilter, getProducts } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
function SearchFeature(props) {

   
    const dispatch = useDispatch();
    const { pagination }
        = useSelector(selectFilterState)
    const slectedSearch = pagination.search
    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
      // console.log(event.currentTarget.value)
      dispatch(updatFilter(event.currentTarget.value))
      dispatch(getProducts())

    }

    return (
        <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
         
        <Input
        id="outlined-name"
        placeholder="Search"
        value={SearchTerms}
        onChange={onChangeSearch}
        />

       
    
        </Box>
    )
}

export default SearchFeature
