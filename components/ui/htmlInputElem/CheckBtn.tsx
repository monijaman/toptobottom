import React, { useState, useEffect } from 'react'
// import { Checkbox, Collapse } from 'antd';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import {
    Grid,
    makeStyles,
    Typography
  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      marginTop: 20,
      background:"#efefef"
    },
    
  });
  
function CheckBox(props) {

    const [Checked, setChecked] = useState()

    if(props.selectedChk){
        setChecked(props.selectedChk.split(","))
    }
    const classes = useStyles();
    const handleToggle = (value) => {
 
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]
        const allCat:string[] = []

        if(value=="All" && currentIndex===-1){
           
            props.list.map((value) => (
                allCat.push(value._id)
             ))
            
             setChecked(allCat)
             props.handleFilters(allCat)
           
        }else  if(value=="All" && currentIndex!=-1){
           
            setChecked([])
            props.handleFilters([])

        }else  if (currentIndex === -1) {
            newChecked.push(value)
            setChecked(newChecked)
            props.handleFilters(newChecked)
        } else {
            newChecked.splice(currentIndex, 1)
            setChecked(newChecked)
            props.handleFilters(newChecked)
        }
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}  >
            <FormControlLabel
             
            control={ 
            <Checkbox
                label='My checkbox' 
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked?.indexOf(value._id) === -1 ? false : true}
            />   } label={value.name} />
           
        </React.Fragment>
    ))
    

    return (
        <div className={classes.root} >
            {renderCheckboxLists()}
        </div>
    )
}

export default CheckBox
