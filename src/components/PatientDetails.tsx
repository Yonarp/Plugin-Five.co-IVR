import React from 'react'
import { Box, FormControl, FormControlLabel } from '../FivePluginApi'
import MedicareForm from './MedicareForm'
import PlaceAndDatePicker from './PlaceAndDatePicker'
import { Radio, RadioGroup } from '@mui/material'

//@ts-ignore
const PatientDetails = ({ admitted, officeName, handleRadioChange, patient}) => {
  console.log( "Comes from patiend Detail",patient)
    return(
        <Box>
        <div
          className="patient-details"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "20px 0", // Adjust as needed
          }}
        >
          {patient ? ( 
            <p>
            <strong>{patient?.NameFirst + " " + patient?.NameLast} </strong> 
            <br /> 
            <br /> {patient?.AddressStreet + " " +  (patient.AddressStreet2 ? patient?.AddressStreet2 : "") } <br></br>{ patient?.AddressCity +  " " + patient?.AddressState + " "  + patient?.AddressZip}
          </p>
          ): <></>}
          
          <p>Sunnyside</p>
        </div>
        <div
          className="IVR-page-1"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center", // Adjust as needed
          }}
        >
          <p>
            Has this patient been admited to a Skilled Nursing Facility
            within the past 100 day.
          </p>
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
              onChange={(event) =>
                handleRadioChange(event.target.value)
              }
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No"
                defaultChecked
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div
          className="medicare-form"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center", // Adjust as needed
          }}
        >
          {admitted === null ? null : admitted ? (
            <MedicareForm />
          ) : (
            <PlaceAndDatePicker />
          )}
        </div>
      </Box>
    )
}


export default PatientDetails