import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { selectFilterState, updatFilter, getProducts } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "@mui/material/FormControl";

interface checkProps  {
    lists: {
        _id: string;
        name: string;
    }[],
    checked?: boolean;
    text: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  }
  interface IMyProps {
    myValue: boolean;
  }
  
function ReCheckbox({
    lists,
    checked = false,
    indeterminate = false,
    invalid = false,
    text}:checkProps) {
 
 
 
    const [Checked, setChecked] = useState()
    const checkitemarray = []
 

    const handleToggle = (chkItm: any) => {

     console.log(chkItm)
         
    }

 
    const renderCheckboxLists = () => lists && lists.map((value, index) => (
        <React.Fragment key={index}>
 <div className='flexinput'>
            <FormControlLabel control={
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                     type="checkbox"
                    // checked={Checked?.indexOf(value._id) === -1 ? false : true}
                />} label={value.name} color="success"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }} />
                <input type="text " value="" />
                </div>
        </React.Fragment>
    ))


    return (
        <>
            <FormGroup>
                {renderCheckboxLists()}
            </FormGroup>
        </>
    )
}

export default ReCheckbox
