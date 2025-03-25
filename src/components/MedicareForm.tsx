import React from "react";
import { FormControl, FormControlLabel } from "../FivePluginApi";
import { Radio, RadioGroup } from "@mui/material";
import PlaceAndDatePicker from "./PlaceAndDatePicker";

const MedicareForm = ({placeOfServiceExternal, setPlaceOfServiceExternal, medicare, setMedicare, setPreventNext }) => {
  

  const handleChange = (value) => {
    if (value === "A") {
      setMedicare(false);
      setPreventNext(true)
    } else {
      setMedicare(true)
      setPreventNext(false)
    };
  };
  
  return (
    <div id="medicare-form" className="medicare">
      <p>Do you know if the patient is in Medicare Part A or Medicare Part B</p>
      <FormControl component="fieldset">
        <RadioGroup
          id="medicare-type-group"
          name="exclusive-options"
          style={{
            width: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginLeft: "10px",
          }}
          value={medicare ? "B" : "A"}
          onChange={(event) => handleChange(event.target.value)}
        >
          <FormControlLabel 
            id="medicare-part-a"
            value="A" 
            control={<Radio />} 
            label="Part A" 
          />
          <FormControlLabel 
            id="medicare-part-b"
            value="B" 
            control={<Radio />} 
            label="Part B" 
          />
        </RadioGroup>
      </FormControl>
      {medicare === null ? null : medicare ? (
        <PlaceAndDatePicker 
          placeOfServiceExternal={placeOfServiceExternal} 
          setPlaceOfServiceExternal={setPlaceOfServiceExternal}
        />
      ) : (
        <p id="ineligible-message" style={{ color: 'red' }}>
          This treatment will not be eligible for coverage, Please do not
          continue with verification request
        </p>
      )} 
    </div>
  );
};

export default MedicareForm;
