import React, { useEffect } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { TextField } from "../FivePluginApi";

const LCodeSelector = ({ location, setLocation, side, setSide, severity, setSeverity, setLCode, lCode }) => {
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

  useEffect(() => {
    let lCode = "";
    if (location && side && severity) {
      switch (true) {
        case location === "ankle" && side === "right" && severity === "breakdown_skin":
          lCode = "L97.311";
          break;
        case location === "ankle" && side === "right" && severity === "fat_layer_exposed":
          lCode = "L97.312";
          break;
        case location === "ankle" && side === "left" && severity === "breakdown_skin":
          lCode = "L97.321";
          break;
        case location === "ankle" && side === "left" && severity === "fat_layer_exposed":
          lCode = "L97.322";
          break;
        case location === "heel_midfoot" && side === "right" && severity === "breakdown_skin":
          lCode = "L97.411";
          break;
        case location === "heel_midfoot" && side === "right" && severity === "fat_layer_exposed":
          lCode = "L97.412";
          break;
        case location === "heel_midfoot" && side === "left" && severity === "breakdown_skin":
          lCode = "L97.421";
          break;
        case location === "heel_midfoot" && side === "left" && severity === "fat_layer_exposed":
          lCode = "L97.422";
          break;
        case location === "other_foot" && side === "right" && severity === "breakdown_skin":
          lCode = "L97.511";
          break;
        case location === "other_foot" && side === "right" && severity === "fat_layer_exposed":
          lCode = "L97.512";
          break;
        case location === "other_foot" && side === "left" && severity === "breakdown_skin":
          lCode = "L97.521";
          break;
        case location === "other_foot" && side === "left" && severity === "fat_layer_exposed":
          lCode = "L97.522";
          break;
        case location === "other_lower_leg" && side === "right" && severity === "breakdown_skin":
          lCode = "L97.811";
          break;
        case location === "other_lower_leg" && side === "right" && severity === "fat_layer_exposed":
          lCode = "L97.812";
          break;
        case location === "other_lower_leg" && side === "left" && severity === "breakdown_skin":
          lCode = "L97.821";
          break;
        case location === "other_lower_leg" && side === "left" && severity === "fat_layer_exposed":
          lCode = "L97.822";
          break;
        case location === "calf" && side === "right" && severity === "breakdown_skin":
          lCode = "L97.811";
          break;
        case location === "calf" && side === "right" && severity === "fat_layer_exposed":
          lCode = "L97.812";
          break;
        case location === "calf" && side === "left" && severity === "breakdown_skin":
          lCode = "L97.821";
          break;
        case location === "calf" && side === "left" && severity === "fat_layer_exposed":
          lCode = "L97.822";
          break;
        default:
          lCode = "";
      }
    }
    setLCode(lCode);
  }, [location, side, severity]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
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
          <TextField value={lCode}  />
        </FormControl>
      </Box>
    </Box>
  );
};

export default LCodeSelector;
