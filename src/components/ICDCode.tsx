import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "../FivePluginApi";
import LCode from "./LCode";

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

  const mohsConditions = [
    {
      label: "Malignant neoplasm of external upper lip",
      value: "external_upper_lip",
    },
    {
      label: "Malignant neoplasm of external lower lip",
      value: "external_lower_lip",
    },
    {
      label: "Malignant neoplasm of external lip, unspecified",
      value: "external_lip_unspecified",
    },
    {
      label: "Malignant neoplasm of upper lip, inner aspect",
      value: "upper_lip_inner",
    },
    {
      label: "Malignant neoplasm of lower lip, inner aspect",
      value: "lower_lip_inner",
    },
    {
      label: "Malignant neoplasm of lip, unspecified, inner aspect",
      value: "lip_inner_unspecified",
    },
    {
      label: "Malignant neoplasm of commissure of lip, unspecified",
      value: "commissure_lip_unspecified",
    },
    {
      label: "Malignant neoplasm of overlapping sites of lip",
      value: "overlapping_lip",
    },
    {
      label: "Malignant neoplasm of lip, unspecified",
      value: "lip_unspecified",
    },
    { label: "Malignant melanoma of lip", value: "melanoma_lip" },
    {
      label: "Malignant melanoma of unspecified eyelid, including canthus",
      value: "melanoma_unspecified_eyelid",
    },
    {
      label: "Malignant melanoma of right upper eyelid, including canthus",
      value: "melanoma_right_upper_eyelid",
    },
    {
      label: "Malignant melanoma of right lower eyelid, including canthus",
      value: "melanoma_right_lower_eyelid",
    },
    {
      label: "Malignant melanoma of left upper eyelid, including canthus",
      value: "melanoma_left_upper_eyelid",
    },
    {
      label: "Malignant melanoma of left lower eyelid, including canthus",
      value: "melanoma_left_lower_eyelid",
    },
    {
      label: "Malignant melanoma of right ear and external auricular canal",
      value: "melanoma_right_ear",
    },
    {
      label: "Malignant melanoma of left ear and external auricular canal",
      value: "melanoma_left_ear",
    },
    {
      label: "Melanoma in situ of right lower limb, including hip",
      value: "melanoma_in_situ_right_lower_limb",
    },
    {
      label: "Melanoma in situ of left lower limb, including hip",
      value: "melanoma_in_situ_left_lower_limb",
    },
    {
      label: "Melanoma in situ of other sites",
      value: "melanoma_in_situ_other_sites",
    },
    {
      label: "Carcinoma in situ of skin of lip",
      value: "carcinoma_in_situ_lip",
    },
    {
      label:
        "Carcinoma in situ of skin of right upper eyelid, including canthus",
      value: "carcinoma_in_situ_right_upper_eyelid",
    },
    {
      label:
        "Carcinoma in situ of skin of right lower eyelid, including canthus",
      value: "carcinoma_in_situ_right_lower_eyelid",
    },
    {
      label:
        "Carcinoma in situ of skin of left upper eyelid, including canthus",
      value: "carcinoma_in_situ_left_upper_eyelid",
    },
    {
      label:
        "Carcinoma in situ of skin of left lower eyelid, including canthus",
      value: "carcinoma_in_situ_left_lower_eyelid",
    },
    {
      label:
        "Carcinoma in situ of skin of right ear and external auricular canal",
      value: "carcinoma_in_situ_right_ear",
    },
    {
      label:
        "Carcinoma in situ of skin of left ear and external auricular canal",
      value: "carcinoma_in_situ_left_ear",
    },
    {
      label: "Carcinoma in situ of skin of other parts of face",
      value: "carcinoma_in_situ_other_face",
    },
    {
      label: "Carcinoma in situ of skin of scalp and neck",
      value: "carcinoma_in_situ_scalp_neck",
    },
    {
      label:
        "Carcinoma in situ of skin of right upper limb, including shoulder",
      value: "carcinoma_in_situ_right_upper_limb",
    },
    {
      label: "Carcinoma in situ of skin of left upper limb, including shoulder",
      value: "carcinoma_in_situ_left_upper_limb",
    },
    {
      label: "Carcinoma in situ of skin of right lower limb, including hip",
      value: "carcinoma_in_situ_right_lower_limb",
    },
    {
      label: "Carcinoma in situ of skin of left lower limb, including hip",
      value: "carcinoma_in_situ_left_lower_limb",
    },
    {
      label: "Carcinoma in situ of skin of other sites",
      value: "carcinoma_in_situ_other_sites",
    },
    { label: "Carcinoma in situ of penis", value: "carcinoma_in_situ_penis" },
  ];

  const mohsConditionsMapping = {
    external_upper_lip: "C00.0",
    external_lower_lip: "C00.1",
    external_lip_unspecified: "C00.2",
    upper_lip_inner: "C00.3",
    lower_lip_inner: "C00.4",
    lip_inner_unspecified: "C00.5",
    commissure_lip_unspecified: "C00.6",
    overlapping_lip: "C00.8",
    lip_unspecified: "C00.9",
    melanoma_lip: "C43.0",
    melanoma_unspecified_eyelid: "C43.1",
    melanoma_right_upper_eyelid: "C43.11",
    melanoma_right_lower_eyelid: "C43.12",
    melanoma_left_upper_eyelid: "C43.13",
    melanoma_left_lower_eyelid: "C43.14",
    melanoma_right_ear: "C43.2",
    melanoma_left_ear: "C43.21",
    melanoma_in_situ_right_lower_limb: "D03.61",
    melanoma_in_situ_left_lower_limb: "D03.62",
    melanoma_in_situ_other_sites: "D03.7",
    carcinoma_in_situ_lip: "D04.0",
    carcinoma_in_situ_right_upper_eyelid: "D04.11",
    carcinoma_in_situ_right_lower_eyelid: "D04.12",
    carcinoma_in_situ_left_upper_eyelid: "D04.13",
    carcinoma_in_situ_left_lower_eyelid: "D04.14",
    carcinoma_in_situ_right_ear: "D04.21",
    carcinoma_in_situ_left_ear: "D04.22",
    carcinoma_in_situ_other_face: "D04.39",
    carcinoma_in_situ_scalp_neck: "D04.4",
    carcinoma_in_situ_right_upper_limb: "D04.51",
    carcinoma_in_situ_left_upper_limb: "D04.52",
    carcinoma_in_situ_right_lower_limb: "D04.61",
    carcinoma_in_situ_left_lower_limb: "D04.62",
    carcinoma_in_situ_other_sites: "D04.8",
    carcinoma_in_situ_penis: "D07.4",
  };

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

  const [woundType, setWoundType] = useState("");
  const [diabetesType, setDiabetesType] = useState("");
  const [eCode, setECode] = useState("");
  const [mohs, setMohs] = useState("");
  const [vluCondition, setVluCondition] = useState("");
  const [vluLocation, setVluLocation] = useState("");
  const [vluSide, setVluSide] = useState("");
  const [lLocation, setLLocation] = useState("");
  const [lSide, setLSide] = useState("");
  const [lSeverity, setLSeverity] = useState("");
  const [lCode, setLCode] = useState("");
  const [cdCode, setCDCode] = useState("");
  const [iCode, setICode] = useState("");

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

  const handleMohsType = (event) => {
    const selectedMohsType = event.target.value;
    setMohs(selectedMohsType);
    setCDCode(mohsConditionsMapping[selectedMohsType] || "");
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

  useEffect(() => {
    let code = "";
    if (vluCondition && vluLocation && vluSide) {
      switch (true) {
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "right":
          code = "I83.012";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "right":
          code = "I83.013";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "right":
          code = "I83.014";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "right":
          code = "I83.015";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "right":
          code = "I83.018";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "left":
          code = "I83.022";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "left":
          code = "I83.023";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "left":
          code = "I83.024";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "left":
          code = "I83.025";
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "left":
          code = "I83.028";
          break;
        case vluCondition === "postthrombotic_syndrome" && vluSide === "right":
          code = "I87.011";
          break;
        case vluCondition === "postthrombotic_syndrome" && vluSide === "left":
          code = "I87.012";
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluSide === "bilateral":
          code = "I87.013";
          break;
        case vluCondition === "venous_hypertension" && vluSide === "right":
          code = "I87.311";
          break;
        case vluCondition === "venous_hypertension" && vluSide === "left":
          code = "I87.312";
          break;
        case vluCondition === "venous_hypertension" && vluSide === "bilateral":
          code = "I87.313";
          break;
        default:
          code = "";
      }
    }
    setICode(code);
  }, [vluCondition, vluLocation, vluSide]);

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
          <LCode
            location={lLocation}
            setLocation={setLLocation}
            side={lSide}
            setSide={setLSide}
            severity={lSeverity}
            setSeverity={setLSeverity}
            setLCode={setLCode}
            lCode={lCode}
          />
        </Box>
      )}
      {woundType === "venous_leg_ulcer" && (
        <Box>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "20px", width: "100%" }}
          >
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
              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
                Select Condition:{" "}
              </Typography>
              <Select
                value={vluCondition}
                displayEmpty
                onChange={handleVluCondition}
                sx={{ width: "50%" }}
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
                marginBottom: "10px",
              }}
            >
              <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
                Select Location:{" "}
              </Typography>
              <Select
                value={vluLocation}
                displayEmpty
                onChange={handleVluLocation}
                sx={{ width: "50%" }}
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
              <Select
                value={vluSide}
                displayEmpty
                onChange={handleVluSide}
                sx={{ width: "50%" }}
              >
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
            {iCode && (
              <Box>
                <Typography variant="subtitle1">I Code</Typography>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    value={iCode}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Box>
            )}
          </FormControl>
          <LCode
            location={lLocation}
            setLocation={setLLocation}
            side={lSide}
            setSide={setLSide}
            severity={lSeverity}
            setSeverity={setLSeverity}
            setLCode={setLCode}
            lCode={lCode}
          />
        </Box>
      )}
      {woundType === "mohs" && (
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ marginBottom: "20px", width: "100%" }}
        >
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
            <Typography variant="subtitle1" sx={{ marginRight: "10px" }}>
              Select C/D Code:{" "}
            </Typography>
            <Select
              value={mohs}
              displayEmpty
              onChange={handleMohsType}
              sx={{ width: "50%" }}
            >
              <MenuItem value="" disabled>
                <em>---</em>
              </MenuItem>
              {mohsConditions.map((location) => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="C / D Code"
              value={cdCode}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              sx={{
                width: "30%",
              }}
            />
          </Box>
        </FormControl>
      )}
      {woundType === "pressure_ulcer" && (
        <LCode
          location={lLocation}
          setLocation={setLLocation}
          side={lSide}
          setSide={setLSide}
          severity={lSeverity}
          setSeverity={setLSeverity}
          setLCode={setLCode}
          lCode={lCode}
        />
      )}
    </Container>
  );
};

export default ICDCode;
