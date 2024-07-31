import React, { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { TextField } from "../FivePluginApi";

//@ts-ignore
const LCodeSelector = ({
  location,
  setLocation,
  side,
  setSide,
  severity,
  setSeverity,
  setLCode,
  lCode,
  setLCodeMain,
  setPressureUlcer,
  lCodeServer,
}) => {
  const lCodeLocations = [
    { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel and Midfoot", value: "heel_midfoot" },
    { label: "Other part of Foot", value: "other_foot" },
    { label: "Other part of Lower Leg", value: "other_lower_leg" },
  ];

  const lCodeSides = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
  ];

  const lCodeSeverity = [
    { label: "Limited to Breakdown of Skin", value: "breakdown_skin" },
    { label: "Fat Layer Exposed", value: "fat_layer_exposed" },
  ];

  const [lCodes, setLCodes] = useState([
    "L97.311", // 0
    "L97.312", // 1
    "L97.321", // 2
    "L97.322", // 3
    "L97.411", // 4
    "L97.412", // 5
    "L97.421", // 6
    "L97.422", // 7
    "L97.511", // 8
    "L97.512", // 9
    "L97.521", // 10
    "L97.522", // 11
    "L97.811", // 12
    "L97.812", // 13
    "L97.821", // 14
    "L97.822", // 15
    "L97.811", // 16 (duplicate, if needed)
    "L97.812", // 17 (duplicate, if needed)
    "L97.821", // 18 (duplicate, if needed)
    "L97.822", // 19
    "Other",
  ]);

  const handleLcode = (event) => {
    const selectedLcode = event.target.value;
    setLCode(selectedLcode);
    setLCodeMain(selectedLcode);
    setLocation("")
    setSide("")
    setSeverity("")
  };
  const handleLcodeOther = (event) => {
    const selectedLcode = event.target.value;
    setLCodeMain(selectedLcode);
  };

  useEffect(() => {
    let lCode = "";
    if (location && side && severity) {
      setPressureUlcer((prevState) => ({
        ...prevState,
        location,
        side,
        severity,
      }));
      switch (true) {
        case location === "ankle" &&
          side === "right" &&
          severity === "breakdown_skin":
          lCode = lCodes[0];
          break;
        case location === "ankle" &&
          side === "right" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[1];
          break;
        case location === "ankle" &&
          side === "left" &&
          severity === "breakdown_skin":
          lCode = lCodes[2];
          break;
        case location === "ankle" &&
          side === "left" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[3];
          break;
        case location === "heel_midfoot" &&
          side === "right" &&
          severity === "breakdown_skin":
          lCode = lCodes[4];
          break;
        case location === "heel_midfoot" &&
          side === "right" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[5];
          break;
        case location === "heel_midfoot" &&
          side === "left" &&
          severity === "breakdown_skin":
          lCode = lCodes[6];
          break;
        case location === "heel_midfoot" &&
          side === "left" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[7];
          break;
        case location === "other_foot" &&
          side === "right" &&
          severity === "breakdown_skin":
          lCode = lCodes[8];
          break;
        case location === "other_foot" &&
          side === "right" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[9];
          break;
        case location === "other_foot" &&
          side === "left" &&
          severity === "breakdown_skin":
          lCode = lCodes[10];
          break;
        case location === "other_foot" &&
          side === "left" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[11];
          break;
        case location === "other_lower_leg" &&
          side === "right" &&
          severity === "breakdown_skin":
          lCode = lCodes[12];
          break;
        case location === "other_lower_leg" &&
          side === "right" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[13];
          break;
        case location === "other_lower_leg" &&
          side === "left" &&
          severity === "breakdown_skin":
          lCode = lCodes[14];
          break;
        case location === "other_lower_leg" &&
          side === "left" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[15];
          break;
        case location === "calf" &&
          side === "right" &&
          severity === "breakdown_skin":
          lCode = lCodes[16];
          break;
        case location === "calf" &&
          side === "right" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[17];
          break;
        case location === "calf" &&
          side === "left" &&
          severity === "breakdown_skin":
          lCode = lCodes[18];
          break;
        case location === "calf" &&
          side === "left" &&
          severity === "fat_layer_exposed":
          lCode = lCodes[19];
          break;
        default:
          lCode = "";
      }
      setLCode(lCode);
      setLCodeMain(lCode);
    }

    if (lCode === "" && lCodeServer) {
      if(!lCodes.includes(lCodeServer)){
        setLCodes((prevCodes) => [...prevCodes, lCodeServer])
      }
      setLCode(lCodeServer);
    }
  }, [location, side, severity]);

  return (
    <Box mb={10}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Typography variant="subtitle1" mr={2} sx={{minWidth: 40}}>
                Location{"  "}
            </Typography>

            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {lCodeLocations.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Typography variant="subtitle1" mr={2}>
                Side{"  "}
              </Typography>
            <Select
              value={side}
              onChange={(e) => setSide(e.target.value)}
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {lCodeSides.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Typography variant="subtitle1" mr={2}>
                Severity{"  "}
              </Typography>
            <Select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {lCodeSeverity.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
      </Box>
        <FormControl fullWidth variant="outlined">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <Typography variant="subtitle1" mr={2} sx={{minWidth: 40}}>L Code<span style={{color: 'red'}}>*</span></Typography>
          <Select value={lCode} onChange={handleLcode} displayEmpty sx={{ flex: 1 }}>
            <MenuItem value="" disabled>
              <em>Select</em>
            </MenuItem>
            {lCodes.map((lcode) => (
              <MenuItem key={lcode} value={lcode}>
                {lcode}
              </MenuItem>
            ))}
          </Select>
          {lCode === "Other" ? (
                <TextField
                  placeholder="Input Ecode"
                  onChange={handleLcodeOther}
                />) : null }
      </Box>
        </FormControl>
    </Box>
  );
};

export default LCodeSelector;
