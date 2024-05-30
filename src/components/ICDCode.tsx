import { Container, Typography } from "@mui/material";
import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "../FivePluginApi";

const ICDCode = () => {
  const woundTypes = [
    { label: "Diabetic foot ulcer", value: "diabetic_foot_ulcer" },
    { label: "Venous leg ulcer", value: "venous_leg_ulcer" },
    { label: "Pressure ulcer", value: "pressure_ulcer" },
    { label: "Mohs", value: "mohs" },
    { label: "Other...", value: "other" },
  ];

  const diabetesTypes = [
    {
      label: "Diabetes mellitus due to underlying condition with foot ulcer",
      value: "underlying_foot_ulcer",
    },
    {
      label:
        "Diabetes mellitus due to underlying condition with other skin ulcer",
      value: "underlying_skin_ulcer",
    },
    {
      label: "Drug or chemical induced diabetes mellitus with foot ulcer",
      value: "drug_foot_ulcer",
    },
    {
      label: "Drug or chemical induced diabetes mellitus with other skin ulcer",
      value: "drug_skin_ulcer",
    },
    {
      label: "Type 1 diabetes mellitus with foot ulcer",
      value: "type1_foot_ulcer",
    },
    {
      label: "Type 1 diabetes mellitus with other skin ulcer",
      value: "type1_skin_ulcer",
    },
    {
      label: "Type 2 diabetes mellitus with foot ulcer",
      value: "type2_foot_ulcer",
    },
    {
      label: "Type 2 diabetes mellitus with other skin ulcer",
      value: "type2_skin_ulcer",
    },
    {
      label: "Other specified diabetes mellitus with foot ulcer",
      value: "other_foot_ulcer",
    },
    {
      label: "Other specified diabetes mellitus with other skin ulcer",
      value: "other_skin_ulcer",
    },
  ];

  const eCodeMapping = {
    underlying_foot_ulcer: "E08.621",
    underlying_skin_ulcer: "E08.622",
    drug_foot_ulcer: "E09.621",
    drug_skin_ulcer: "E09.622",
    type1_foot_ulcer: "E10.621",
    type1_skin_ulcer: "E10.622",
    type2_foot_ulcer: "E11.621",
    type2_skin_ulcer: "E11.622",
    other_foot_ulcer: "E13.621",
    other_skin_ulcer: "E13.622",
  };

  const vluAdditional = [
    { label: "Varicose Veins", value: "varicose_veins" },
    { label: "Postthrombotic Syndrome", value: "postthrombotic_syndrome" },
    { label: "Venous Hypertension", value: "venous_hypertension" },
  ];

  const vluPart1 = [
    { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel and Midfoot", value: "heel_midfoot" },
    { label: "Other part of foot", value: "other_foot" },
    { label: "Other part of lower leg", value: "other_lower_leg" },
  ];

  const vluPart2 = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
    { label: "Bilateral", value: "bilateral" },
  ];

  const [woundType, setWoundType] = React.useState("");
  const [diabetesType, setDiabetesType] = React.useState("");
  const [eCode, setECode] = React.useState("");
  const [vluCondition, setVluCondition] = React.useState("");
  const [vluLocation, setVluLocation] = React.useState("");
  const [vluSide, setVluSide] = React.useState("");

  const handleWoundType = (event) => {
    setWoundType(event.target.value);
    setDiabetesType(""); // Reset diabetes type when wound type changes
    setECode(""); // Reset E code when wound type changes
  };

  const handleDiabetesType = (event) => {
    const selectedDiabetesType = event.target.value;
    setDiabetesType(selectedDiabetesType);
    setECode(eCodeMapping[selectedDiabetesType] || "");
  };

  const handleVluCondition = (event) => {
    const selectedVLU = event.target.value;
    setVluCondition(selectedVLU);
  };

  const handleVluLocation = (event) => {
    const selectedVLU = event.target.value;
    setVluLocation(selectedVLU);
  };

  const handleVluSide = (event) => {
    const selectedVLU = event.target.value;
    setVluSide(selectedVLU);
  };
  return (
    <Container>
      <Typography variant="h5" sx={{ margin: "10px , 0", textAlign: "center" }}>
        Determine ICD-10 Codes
      </Typography>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
          Wound Type:{" "}
        </Typography>
        <FormControl
          variant="outlined"
          sx={{ marginBottom: "20px", width: "50%" }}
        >
          <Select value={woundType} displayEmpty onChange={handleWoundType}>
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
      {woundType === "diabetic_foot_ulcer" && (
        <Box>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          >
            <Select
              value={diabetesType}
              displayEmpty
              onChange={handleDiabetesType}
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
          <TextField
            label="E Code"
            value={eCode}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
      )}
      {woundType === "venous_leg_ulcer" && (
        <Box>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: '10px'
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
                Select Condition:{" "}
              </Typography>
              <Select
                value={vluCondition}
                displayEmpty
                onChange={handleVluCondition}
              >
                <MenuItem value="" disabled>
                  <em>---</em>
                </MenuItem>
                {vluAdditional.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: '10px'
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
                Select Location:{" "}
              </Typography>
              <Select
                value={vluLocation}
                displayEmpty
                onChange={handleVluLocation}
              >
                <MenuItem value="" disabled>
                  <em>---</em>
                </MenuItem>
                {vluPart1.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
                Select Side:{" "}
              </Typography>
              <Select value={vluSide} displayEmpty onChange={handleVluSide}>
                <MenuItem value="" disabled>
                  <em>---</em>
                </MenuItem>
                {vluPart2.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        </Box>
      )}
    </Container>
  );
};

export default ICDCode;
