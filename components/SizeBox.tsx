import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';

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


function SizeBox({ lists }: checkProps) {

    const [Checked, setChecked] = useState()
    const classes = useStyles();
    const handleToggle = (value: string) => {
        console.log(value)
        // const currentIndex = Checked.indexOf(value)
        // const newChecked = [...Checked]
        // const allCat:string[] = []

    }



    const sizeInput = () => (

        <div>
        <h2>Select Size for Color (Optional)</h2>

            <FormControlLabel control={<Checkbox />} label={value.name + " Open size"} />
            <TextField label="In Stock" variant="outlined" />

            <FormControlLabel control={<Checkbox />} label="S (size)" />
            <TextField label="In Stock" variant="outlined" />
            <FormControlLabel control={<Checkbox />} label="M  (size)" />
            <TextField label="In Stock" variant="outlined" />
            <FormControlLabel control={<Checkbox />} label="L  (size)" />
            <TextField label="In Stock" variant="outlined" />
            <FormControlLabel control={<Checkbox />} label="XL  (size)" />
            <TextField label="In Stock" variant="outlined" />
            <FormControlLabel control={<Checkbox />} label="XXL  (size)" />
            <TextField label="In Stock" variant="outlined" />


            <hr />


        </div>
    )


    return (
        <div className={classes.root} style={{ display: "flex", flexDirection: "row", width: "30%" }}>
            {sizeInput()}
        </div>
    )
}

export default SizeBox
