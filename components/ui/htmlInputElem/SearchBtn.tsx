import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
 

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState(props.searchTrm)

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.handleFilters(event.currentTarget.value)

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
