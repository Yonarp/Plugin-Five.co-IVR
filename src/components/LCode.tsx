import React from "react";
import { Box, FormControl, MenuItem, Select, Typography, Container } from "@mui/material";

const lCodeLocations = [
  { label: "Calf", value: "calf" },
  { label: "Ankle", value: "ankle" },
  { label: "Heel and Midfoot", value: "heel_midfoot" },
  { label: "Other part of Foot", value: "other_foot" },
  { label: "Other part of Lower Leg", value: "other_lower_leg" }
];

const lCodeSides = [
  { label: "Right", value: "right" },
  { label: "Left", value: "left" }
];

const lCodeSeverity = [
  { label: "Limited to Breakdown of Skin", value: "breakdown_skin" },
  { label: "Fat Layer Exposed", value: "fat_layer_exposed" }
];

const LCode = ({ location, setLocation, side, setSide, severity, setSeverity }) => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select Location</em>
            </MenuItem>
            {lCodeLocations.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={side}
            onChange={(e) => setSide(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select Side</em>
            </MenuItem>
            {lCodeSides.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select Severity</em>
            </MenuItem>
            {lCodeSeverity.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="subtitle1">L Code</Typography>
        <FormControl fullWidth variant="outlined">
          <Select displayEmpty>
            <MenuItem value="" disabled>
              <em>L Code</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      
    </Container>
  );
};

export default LCode;
