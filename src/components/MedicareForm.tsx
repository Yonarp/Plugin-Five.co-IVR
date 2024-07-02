import React from "react";
import { FormControl, FormControlLabel } from "../FivePluginApi";
import { Radio, RadioGroup } from "@mui/material";
import PlaceAndDatePicker from "./PlaceAndDatePicker";

const MedicareForm = ({placeOfServiceExternal, setPlaceOfServiceExternal}) => {
  const [medicare, setMedicare] = React.useState(null);

  const handleChange = (value) => {
    if (value === "A") {
      setMedicare(false);
    } else setMedicare(true);
  };
  
  return (
    <div className="medicare">
      <p>Do you know if the patient had Medicare Part A or Medicare Part B</p>
      <FormControl component="fieldset">
        <RadioGroup
          name="exclusive-options"
          style={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginLeft: "10px",
          }}
          onChange={(event) => handleChange(event.target.value)}
        >
          <FormControlLabel value="A" control={<Radio />} label="Part A" />
          <FormControlLabel value="B" control={<Radio />} label="Part B" />
        </RadioGroup>
      </FormControl>
      {medicare === null ? null : medicare ? (
        <PlaceAndDatePicker placeOfServiceExternal={placeOfServiceExternal} setPlaceOfServiceExternal={setPlaceOfServiceExternal}/>
      ) : (
        <p style = {{color: 'red'}}>

          This treatment will not be eligible for coverage, Please do not
          continue with verification request

        </p>
      )} 
    </div>
  );
};

export default MedicareForm;
