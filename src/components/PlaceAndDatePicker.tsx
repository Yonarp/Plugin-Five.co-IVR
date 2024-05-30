import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '../FivePluginApi'


const PlaceAndDatePicker = () => {

    const [placeOfService, setPlaceOfService] = React.useState('')
   /*  const [dateOfService, setDateOfService] = React.useState(''); */

    const placesOfService = [
        { code: 11, label: 'Office Visit' },
        { code: 12, label: 'Home' },
        { code: 13, label: 'Assisted Living Facility' },
        { code: 31, label: 'Skilled Nursing Facility' },
        { code: 32, label: 'Nursing Facility' },
    ];

    const handlePlaceChange = (value) => {
            setPlaceOfService(value);
    }

/*     const handleDateChange = (value) => {
        setDateOfService(value)
    } */

    return (
        <div style={{display: 'flex', width: '40vw', flexDirection: 'column', margin: '10px 0px' }}>
            {/* Place of Service Dropdown */}
            <FormControl fullWidth>
                <InputLabel>Place of Service</InputLabel>
                <Select
                    value={placeOfService}
                    label="Place of Service"
                    onChange={(event) => handlePlaceChange(event.target.value)}
                >
                    {placesOfService.map((option) => (
                        <MenuItem key={option.code} value={option.label}>
                         {option.code} - {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </div>
    )
}


export default PlaceAndDatePicker