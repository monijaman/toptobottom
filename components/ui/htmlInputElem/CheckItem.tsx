import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import { Popup, PopupContent, PopupHandle } from '../../popup'
import { colors, measurements, sizes, brands, categories, materials } from 'data/filterdata';
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
  }[],
  changeSiteState: (arg: any) => void
};

type formData = {
  colors: {
    [key: string]: {}
  }

};


function CheckItem({ lists, changeSiteState }: checkProps) {


  const [Checked, setChecked] = useState()
  const classes = useStyles();
  const handleToggle = (value: string) => {
    console.log(value)

    changeSiteState({ ...state })
    // console
    // const currentIndex = Checked.indexOf(value)
    // const newChecked = [...Checked]
    // const allCat:string[] = []

  }



  const initialState: formData = {
    colors: {}

    // cart: {
    //   cartItems: cartCookie ? JSON.parse(cartCookie) : [],
    //   shippingAddress: shippingCookie ? JSON.parse(shippingCookie) : {},
    //   SelPaymentMethod: paymentCookie ? paymentCookie : "",
    // },
    //  userInfo: userCookie  ? userCookie : null,
    // userInfo: userCookie ? userCookie : null,

  };

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
    changeSiteState ({ ...state })
    console.log("htmlinputElem/Checkitem.tsx line 99")
  }, [state]);

  const wrapWithFilter = (name: string) => {
    return <Popup action="click">
      <PopupHandle>
        <div className="inline-flex max-sm:text-left align-middle items-center text-center">
          +
        </div>
      </PopupHandle>
      <PopupContent position="below">
        <form className="w-full max-w-sm" onSubmit={event => {
          event.preventDefault()
        }}>


          <h3 className="text-xs text-left font-normal normal-case text-nsw-grey-01">
            {name} size available in stock
          </h3>

          <hr className="my-1 bg-nsw-grey-03 mb-4" />


          <ul className="items-center m-0 w-full text-sm rounded-lg sm:flex">
            {measurements.map((data, index) => (
              <li key={index} className="w-full">
                <div className="flex items-center">

                  <label
                    htmlFor={data.name}
                    className="w-full text-left py-1 ml-1 text-sm font-normal"
                  >
                    {data.code}

                    <input
                      type="text"
                      value={state[name]}
                      name={name + data.name}
                      id={name + data.name}
                      className="relative searchInput appearance-none focus-shadow-sm m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-nsw-grey-02 bg-transparent bg-nsw-white px-1 py-[0.5rem] text-sm font-normal leading-[0.6] text-neutral-700 outline-none transition duration-200 ease-in-out  focus:border-nsw-info-blue --tw-shadow-color: #fff;   dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-nsw-info-blue"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="button-addon1"
                      onChange={(evt) => {
                        setState({
                          ...state,
                          colors: {
                            ...state.colors,
                            [name]: {
                              ...state.colors[name],
                              [data.name]: evt.target.value
                            }
                          }

                        })
                      }}
                    />



                  </label>

                </div>
              </li>
            ))}
          </ul>


          <Button>Primary  ww</Button>

        </form>
      </PopupContent>
    </Popup>
  }

  const renderCheckboxLists = () => lists && lists.map((value, index) => (


    <div key={index} >
      <h4 style={{ borderBottom: "3px solid" + value.code }}>{value.name}</h4>



      <FormControlLabel

        control={
          <Checkbox
            onChange={() => handleToggle(name)}
          // checked={Checked.indexOf(value._id) === -1 ? false : true}
          />} label={name} />

      {wrapWithFilter(value.name)}

      <hr />

    </div>
  ))


  return (
    <div className={classes.root} style={{ display: "flex", flexDirection: "row", width: "30%" }}>
      {renderCheckboxLists()}
    </div>
  )
}

export default CheckItem
