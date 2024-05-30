import { Container, Typography } from "@mui/material";
import React from "react";
import { Box, FormControl, MenuItem, Select } from "../FivePluginApi";
import { Margin } from "@mui/icons-material";

const ICDCode = () => {
  const woundTypes = [
    { label: "Diabetic foot ulcer", value: "diabetic_foot_ulcer" },
    { label: "Venous leg ulcer", value: "venous_leg_ulcer" },
    { label: "Pressure ulcer", value: "pressure_ulcer" },
    { label: "Mohs", value: "mohs" },
    { label: "Other...", value: "other" },
  ];

  const diabetesTypes = [
    { label: "Diabetes mellitus due to underlying condition with foot ulcer", value: "underlying_foot_ulcer" },
    { label: "Diabetes mellitus due to underlying condition with other skin ulcer", value: "underlying_skin_ulcer" },
    { label: "Drug or chemical induced diabetes mellitus with foot ulcer", value: "drug_foot_ulcer" },
    { label: "Drug or chemical induced diabetes mellitus with other skin ulcer", value: "drug_skin_ulcer" },
    { label: "Type 1 diabetes mellitus with foot ulcer", value: "type1_foot_ulcer" },
    { label: "Type 1 diabetes mellitus with other skin ulcer", value: "type1_skin_ulcer" },
    { label: "Type 2 diabetes mellitus with foot ulcer", value: "type2_foot_ulcer" },
    { label: "Type 2 diabetes mellitus with other skin ulcer", value: "type2_skin_ulcer" },
    { label: "Other specified diabetes mellitus with foot ulcer", value: "other_foot_ulcer" },
    { label: "Other specified diabetes mellitus with other skin ulcer", value: "other_skin_ulcer" }
  ];

  const [woundType, setWoundType] = React.useState("");

 const handleWoundType = (event) => {
    setWoundType(event.target.value)
  }
 
  return (
    <Container>
      <Typography variant="h5" sx={{ margin: "10px , 0", textAlign: "center" }}>
        Determine ICD-10 Codes
      </Typography>
      <Box sx={{ marginTop: "20px", display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems:'center', width: '100%'  }} >
        <Typography variant="subtitle1" sx={{marginRight:'10px'}}>Wound Type:  </Typography>
        <FormControl  variant="outlined" sx={{ marginBottom: "20px", width: '50%' }}>
          <Select
            value={woundType}
            displayEmpty
            onChange={handleWoundType}
          >
            <MenuItem value="" disabled>
              <em>---</em>
            </MenuItem>
            {woundTypes.map((location) => (
              <MenuItem key={location.value} value={location.value}>
                {location.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        {woundType === "diabetic_foot_ulcer" && (
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          >
            <Select
             // value={woundTypes}
              displayEmpty
              //@ts-ignore
             // onClick={(event) => setWoundType(event.target.value)}
            >
              <MenuItem value="" disabled>
                <em>---</em>
              </MenuItem>
              {diabetesTypes.map((location) => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    </Container>
  );
};

export default ICDCode;
