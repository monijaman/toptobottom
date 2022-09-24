import React, { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 

function RadioBtn(props) {

    const [Checked, setChecked] = useState(props.selectedRdo)
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
        props.handleFilters(event.target.value)
    }
    return (
        <>
            <FormControl>
                <RadioGroup
                row
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

export default RadioBtn
