import React, { useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '../FivePluginApi'


const PlaceAndDatePicker = ({placeOfServiceExternal , setPlaceOfServiceExternal}) => {

    const [placeOfService, setPlaceOfService] = React.useState('')
   /*  const [dateOfService, setDateOfService] = React.useState(''); */

    const placesOfService = [
        { code: 11, label: 'Office' },
        { code: 12, label: 'Home' },
        { code: 13, label: 'Assisted Living Facility' },
        { code: 31, label: 'Skilled Nursing Facility' },
        { code: 32, label: 'Nursing Facility' },
    ];

    const handlePlaceChange = (value) => {
            setPlaceOfService(value);
            setPlaceOfServiceExternal(value)
    }

/*     const handleDateChange = (value) => {
        setDateOfService(value)
    } */

    useEffect(() => {
        if(placeOfServiceExternal){
            setPlaceOfService(placeOfServiceExternal)
        }
    },[])

    return (
        <div id="place-service-container" style={{display: 'flex', width: '40vw', flexDirection: 'column', margin: '10px 0px' }}>
            {/* Place of Service Dropdown */}
            <FormControl fullWidth>
                <InputLabel>Place of Service</InputLabel>
                <Select
                    id="place-service-select"
                    value={placeOfService}
                    label="Place of Service"
                    onChange={(event) => handlePlaceChange(event.target.value)}
                >
                    {placesOfService.map((option) => (
                        <MenuItem 
                            id={`place-service-${option.code}`}
                            key={option.code} 
                            value={option.label}
                        >
                            {option.code} - {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


export default PlaceAndDatePicker