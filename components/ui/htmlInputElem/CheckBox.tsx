import React, { useState } from 'react'
// import { Checkbox, Collapse } from 'antd';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { selectFilterState, updatFilter, getProducts } from "redux/filterSlice";
import { useDispatch, useSelector } from "react-redux";

interface checkProps  {
    lists: {
        _id: string;
        name: string;
    }[];
  };
  interface IMyProps {
    myValue: boolean;
  }
  
function CheckBox({lists}:checkProps) {
    
    const dispatch = useDispatch();
    const { pagination }
        = useSelector(selectFilterState)

    const slectedCat = pagination?.category
    const [Checked, setChecked] = useState(slectedCat)

 

    const handleToggle = (chkItm: any) => {

        const currentIndex:any = Checked?.indexOf(chkItm)
        const newChecked = [...Checked]
        const allCat:string[] = []


        if (chkItm == "All" && currentIndex === -1) {
            lists.map((item) => (
                allCat.push(item._id)
            )),
                dispatch(updatFilter({ chkItm: allCat, type: "checkAll" }))
            setChecked(allCat)

        } else if (chkItm == "All" && currentIndex != -1) {
           // lists.map(() => (
               // allCat.push([])
          //  )),
                dispatch(updatFilter({ chkItm: allCat, type: "checkOutAll" }))
            setChecked([])

        } else if (currentIndex === -1) {
            newChecked.push(chkItm)
            setChecked(newChecked)
            dispatch(updatFilter({ chkItm, type: "single" }))
        } else {
            newChecked.splice(currentIndex, 1)
            setChecked(newChecked)
            dispatch(updatFilter({ chkItm, type: "single" }))
        }
        // @ts-ignore
        dispatch(getProducts())
    }

 
    const renderCheckboxLists = () => lists && lists.map((value, index) => (
        <React.Fragment key={index}>

            <FormControlLabel control={
                <Checkbox
                    onChange={() => handleToggle(value._id)}
                    // type="checkbox"
                    checked={Checked?.indexOf(value._id) === -1 ? false : true}
                />} label={value.name} color="success"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 24 } }} />

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

export default CheckBox
