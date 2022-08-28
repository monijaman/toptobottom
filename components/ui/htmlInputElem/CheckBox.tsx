import React, { useState, useEffect } from 'react'
// import { Checkbox, Collapse } from 'antd';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import Box from '@mui/material/Box';

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    // const [checked, setChecked] = React.useState([true, false]);
   

//   console.log(props.selectedChk)

const preCheck = (value) => {

    // setChecked(props.selectedChk)

    // console.log(props.selectedChk)

    // const currentIndex = Checked.indexOf(value);
    const newChecked = [...props.selectedChk];
 
    // if (currentIndex === -1) {
    //     newChecked.push(value)
    // } else {
    //     newChecked.splice(currentIndex, 1)
    // }
  
    // console.log(newChecked)
    setChecked(newChecked)
    props.handleFilters(newChecked)
    //update this checked information into Parent Component 

}

 
    const handleToggle = (value) => {

        // setChecked(props.selectedChk)

        // console.log(props.selectedChk)

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...props.selectedChk];
        console.log(newChecked)
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
      
        // console.log(newChecked)
        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }
 
   

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            
            <FormControlLabel
            defaultChecked={() => handleToggle(value._id)}
            control={
            <Checkbox
                label='My checkbox' 
           //    onChange={() => handleToggle(value._id)}
                type="checkbox"
                onChange={handleChange}
                checked={checked}
                //checked={Checked.indexOf(value._id) === -1 ? false : true}
            />   } label={value.name} />
           
        </React.Fragment>
    ))


    

    return (
        <div>
            {renderCheckboxLists()}
        </div>
    )
}

export default CheckBox
