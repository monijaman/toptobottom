import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function RadioBox(props) {

    const [Value, setValue] = useState(props.selectedRdo)

    const renderRadioBox = () => (
        props.list && props.list.map((value, index) => (
            <React.Fragment key={index}>
                <FormControlLabel value={`${value._id}`} control={
                    <Radio 
                    key={value._id} 
                    checked={`${value.array}` === Value}
                    value={`${value.array}`}>{value.name}</Radio>}
                    label={value.name} />
            </React.Fragment>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <>

            <FormControl>
                {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleChange}
                >
                    {renderRadioBox()}
                </RadioGroup>
            </FormControl>

        </>
    )
}

export default RadioBox
