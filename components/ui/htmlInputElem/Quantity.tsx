import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Popup, PopupContent, PopupHandle } from '../../popup'
import { colors, measurements,sizes, brands, categories, materials } from 'data/filterdata';
import Button from '@mui/material/Button';


import {
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        marginTop: 20,
        background: "#efefef"
    },

});
interface checkProps {
    lists: {
        _id: string;
        name: string;
    }[];
};


function Quantity({  lists }: checkProps) {

    const [Checked, setChecked] = useState()
    const [showInput, setShowInput] = useState(false)
    const classes = useStyles();



    type formData = {
        measurement: {
          [key: string]: {}  
      }
    
    };
 
 
    const initialState: formData = {
        measurement:{
        
      }
    };

    const handleToggle = (event, newItem) => {  
   

        // const existItem = state.measurement.map(
        //     (item) => item.name === newItem.name
        //   );

        // const existItem = state.measurement.map(
        //     (item) => item.name === newItem.name
        //   );
   
        //   console.log(typeof (state.measurement))

        //   state.measurement.filter((fruit) => fruit.id !== 2 )

        //check if item exist

        // const tem = Object.fromEntries(Object.entries(state.measurement));
        // const propertyValues = Object.values(person);  get values

        // const entries = Object.entries(state.measurement);
    // console.log(entries);

        const dataExist = Object.keys(state.measurement).includes(newItem.name);
        
        const existingItem = Object.fromEntries(Object.entries(state.measurement).filter(([key]) => key !=newItem.name ));
        // console.log('exist', existingItem)
        // console.log('newitem', newItem)
        // console.log('state', state)
        

        dataExist ?   setState({
            ...state,                     
            measurement:{
                ...existingItem
            }

            })
            :
        setState({
            ...state,                     
            measurement:{
            ...state.measurement,
            [newItem.name]: null

            }

            })
            
      
        

        // console.log('exist', existingItem)
        // console.log('newitem', newItem)
        // console.log('state', state)

            // const names = Object.keys(state.measurement)
            // .filter(([key, value]) => key ).
            // reduce((cur, key) => { return Object.assign(cur, { [key]: state.measurement[key] })}, {});


          
        //    const na = Object.fromEntries(Object.entries(state.measurement).filter(([key]) => key ));


            // const filteredByValue = Object.fromEntries(
            //     Object.entries(state.measurement).filter(([key, value]) => value) )
            
              
 

            // console.log(state)
 

    }

    // https://stackabuse.com/how-to-filter-an-object-by-key-in-javascript/
      // cart: {
      //   cartItems: cartCookie ? JSON.parse(cartCookie) : [],
      //   shippingAddress: shippingCookie ? JSON.parse(shippingCookie) : {},
      //   SelPaymentMethod: paymentCookie ? paymentCookie : "",
      // },
      //  userInfo: userCookie  ? userCookie : null,
      // userInfo: userCookie ? userCookie : null,
    
  
    
  // const [state, setState] = useState<{
  //   current: string,
  //   data: Record<string, {
  //     filters: object,
  //     applied: {
  //       sortBy?: string,
  //       sortType?: string,
  //       options?: Record<string, string[]>
  //     },
  //     fetchNeeded: boolean,
  //     rows: object[],
  //     legend: object[]
  //   }>
  // }>({
  //   current: '',
  //   data: {
  //     '': initialStateData
  //   }
  // })
    const [state, setState] = useState(initialState)
   

    useEffect(() => {
    //    console.log(state)   
    },[state]);
 
    
    const renderCheckboxLists = () => lists && lists.map((item, index) => (


        <div key={index} >
            <h4 style={{ borderBottom: "3px solid" + item.code }}>{item.name}</h4>
            <FormControlLabel
            control={
                <Checkbox
                    onChange={event => handleToggle(event, item)}
                // checked={Checked.indexOf(value._id) === -1 ? false : true}
                />} label={item.name} />

 
   
    <TextField name={item.name} defaultValue={state.measurement[item.name]}   onChange={(evt) =>  {
            setState({
            ...state,                     
            measurement:{
            ...state.measurement,
            [item.name]: evt.target.value 

            }

            })
            }} label="Price" variant="outlined" />
       
            <hr /> 

            
        </div>
    ))


    return (
        <div className={classes.root} style={{ display: "flex", flexDirection: "row", width: "30%" }}>
            {renderCheckboxLists()}
            
        </div>
    )
}

export default Quantity
