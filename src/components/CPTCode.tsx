import React from "react";
import { Box, FormControl, MenuItem, Select, TextField, Typography } from "../FivePluginApi";

const CPTCode = () => {

    const woundLocations = [
        "Trunk, Arm, Leg",
        "Face, Scalp, Eyelids, Mouth, Neck, Ears, Orbits, Genitalia, Hands, Feet"
      ];

    return (
      <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Determine the CPT and ICD 10 Codes
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="subtitle1">
            Wound location
          </Typography>
          <FormControl variant="outlined" sx={{ marginBottom: '20px' }}>
          <Select defaultValue="" displayEmpty>
            <MenuItem value="" disabled>
              <em>---</em>
            </MenuItem>
            {woundLocations.map((item, idx) => (
                <MenuItem value ={item} key = {idx}>
                    {item}
                </MenuItem>
            ))}
            {/* Add other MenuItem options here */}
          </Select>
        </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <TextField
            label="Size of wound (sq. cm)"
            type="number"
            variant="outlined"
            sx={{ width: '48%' }}
            defaultValue="50"
          />
          <TextField
            label="CPT Code"
            type="number"
            variant="outlined"
            sx={{ width: '48%' }}
            defaultValue="15273"
          />
        </Box>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
          <Select defaultValue="" displayEmpty>
            <MenuItem value="">
              <em>L Code</em>
            </MenuItem>
            {/* Add other MenuItem options here */}
          </Select>
        </FormControl>
      </Box>
    );
  };

export default CPTCode;
