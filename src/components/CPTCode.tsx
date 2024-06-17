import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "../FivePluginApi";
import Container from "@mui/material/Container";
//@ts-ignore
const CPTCode = ({setCPTCodeMain, cptCodeMain}) => {
  const woundLocations = [
    { label: "Trunk, Arm, Leg", value: 1 },
    {
      label:
        "Face, Scalp, Eyelids, Mouth, Neck, Ears, Orbits, Genitalia, Hands, Feet",
      value: 2,
    },
  ];

  const [woundLocation, setWoundLocation] = useState("");
  const [woundSize, setWoundSize] = useState("");
  const [cptCode, setCptCode] = useState("");


  const handleCPTCode = (event) => {
    const cptCodeSelected = event.target.value
    setCptCode(cptCodeSelected)
    setCPTCodeMain(cptCodeSelected)

  }


  useEffect(() => {
    calculateCPTCode();

    console.log("CPT Code Use Effect")
    console.log(cptCodeMain)
    if(cptCodeMain){
      
      console.log("Reached Condition")
      if(!cptCodes.includes(cptCodeMain)) {
        cptCodes.push(cptCodeMain)
      }
      setCptCode(cptCodeMain)
    }
  }, [woundLocation, woundSize]);

  const handleWoundLocationChange = (event) => {
    setWoundLocation(event.target.value);
  };

  const handleWoundSizeChange = (event) => {
    setWoundSize(event.target.value);
  };

  const cptCodes = ["15271", "15272", "15273", "15274"];

  const cptCodeLookup = {
    1: { small: "15271", large: "15272" },
    2: { small: "15273", large: "15274" },
  };

  const calculateCPTCode = () => {
      const area =
      //@ts-ignore
      woundLocations.find((location) => location.value === woundLocation)
        ?.value || "";
    const size = parseFloat(woundSize);

    if (!area || isNaN(size)) {
      setCptCode("");
      return;
    }

    const codeType = size <= 100 ? "small" : "large";
    const cptCode = cptCodeLookup[area]?.[codeType] || "";
    setCptCode(cptCode);
    setCPTCodeMain(cptCode)
  };



  return (
    <Container
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h6" gutterBottom>
          Determine the CPT and ICD 10 Codes
        </Typography>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="subtitle1">Wound location</Typography>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          >
            <Select
              value={woundLocation}
              onChange={handleWoundLocationChange}
              displayEmpty

            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {woundLocations.map((location) => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Size of wound (sq. cm)"
            type="number"
            variant="outlined"
            sx={{ width: "48%" }}
            value={woundSize}
            onChange={handleWoundSizeChange}
          />
          
            <Typography variant="subtitle1" ml={3}>
              CPT Code: {" "}
            </Typography>
          <Select
            label="CPT Code"
            type="text"
            variant="outlined"
            sx={{ width: "48%" }}
            value={cptCode}
            displayEmpty
            onChange={handleCPTCode}
          >
               <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
            {cptCodes.map(code => (
                <MenuItem key={code} value={code}>
                    {code}
                </MenuItem>
            ))}
          </Select>

        </Box>

      </Box>
    </Container>
  );
};

export default CPTCode;
