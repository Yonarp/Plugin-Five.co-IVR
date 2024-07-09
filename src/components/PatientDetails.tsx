import React from 'react';
import { Box, FormControl, FormControlLabel } from '../FivePluginApi';
import MedicareForm from './MedicareForm';
import PlaceAndDatePicker from './PlaceAndDatePicker';
import { Radio, RadioGroup } from '@mui/material';

//@ts-ignore
const PatientDetails = ({ admitted, officeName, handleRadioChange, patient, placeOfService, setPlaceOfService }) => {
  console.log("Comes from patient Detail", placeOfService);

  return (
    <Box>

      <div
        className="IVR-page-1"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Has this patient been admitted to a Skilled Nursing Facility within the past 100 day.</p>
        <FormControl component="fieldset">
          <RadioGroup
            name="exclusive-options"
            style={{
              width: 'auto',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginLeft: '10px',
            }}
            onChange={(event) => handleRadioChange(event.target.value)}
            value={admitted === null ? '' : admitted ? 'Yes' : 'No'}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>

      <div
        className="medicare-form"
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {admitted === null ? null : admitted ? <MedicareForm  placeOfServiceExternal ={placeOfService} setPlaceOfServiceExternal={setPlaceOfService}/> : <PlaceAndDatePicker placeOfServiceExternal={placeOfService}  setPlaceOfServiceExternal={setPlaceOfService}/>}
      </div>
    </Box>
  );
};

export default PatientDetails;