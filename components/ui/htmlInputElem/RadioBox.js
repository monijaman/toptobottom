import React, { useState, useEffect } from 'react'
 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { selectFilterState, updatFilter, getProducts } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";

function RadioBox(props) {


    //const [Value, setValue] = useState(props.selectedRdo)
    const dispatch = useDispatch();
    const { pagination }
        = useSelector(selectFilterState)

    const slectedprice = pagination.price
    const [Checked, setChecked] = useState(props.selectedRdo)
    

    // useEffect(() => {
    //     // dispatch(updateFilter())
    //     dispatch(getProducts())
    
    //   }, [Checked])

      
    const renderRadioBox = () => (
        props.list && props.list.map((value, index) => (
            <React.Fragment key={index}>
                <FormControlLabel value={`${value._id}`} control={
                    <Radio 
                    color="primary"
                    key={value._id} 
                    checked={`${value.array}` === Checked}
                    value={`${value.array}`}>{value.name}</Radio>}
                    label={value.name} />
            </React.Fragment>
        ))
    )

    const handleChange = (event) => {
        setChecked(event.target.value)
        dispatch(updatFilter({RadioItm:event.target.value}  ))
        dispatch(getProducts())
    }

    return (
        <>
            <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                   
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    {renderRadioBox()}
                </RadioGroup>
            </FormControl>

        </>
    )
}

export default RadioBox
