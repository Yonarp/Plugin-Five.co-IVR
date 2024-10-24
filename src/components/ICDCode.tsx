import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select } from "../FivePluginApi";
import LCode from "./LCode";

const ICDCode = ({
  setICodeMain,
  setLCodeMain,
  setECodeMain,
  setCDCodeMain,
  setVLU,
  setPressureUlcer,
  setMohsMain,
  setCPTWound,
  setDiabeticFU,
  codes,
}) => {
  const woundTypes = [
    { label: "Diabetic foot ulcer", value: "Diabetic foot ulcer" },
    { label: "Venous leg ulcer", value: "Venous leg ulcer" },
    { label: "Pressure ulcer", value: "Pressure ulcer" },
    { label: "Mohs", value: "Mohs" },
    { label: "Other", value: "Other" },
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

  const [mohsCodes, setMohsCodes] = useState([
    "C00.0",
    "C00.1",
    "C00.2",
    "C00.3",
    "C00.4",
    "C00.5",
    "C00.6",
    "C00.8",
    "C00.9",
    "C43.0",
    "C43.1",
    "C43.11",
    "C43.12",
    "C43.13",
    "C43.14",
    "C43.2",
    "C43.21",
    "D03.61",
    "D03.62",
    "D03.7",
    "D04.0",
    "D04.11",
    "D04.12",
    "D04.13",
    "D04.14",
    "D04.21",
    "D04.22",
    "D04.39",
    "D04.4",
    "D04.51",
    "D04.52",
    "D04.61",
    "D04.62",
    "D04.8",
    "D07.4",
    "Other",
  ]);

  const mohsConditionsMapping = {
    external_upper_lip: mohsCodes[0],
    external_lower_lip: mohsCodes[1],
    external_lip_unspecified: mohsCodes[2],
    upper_lip_inner: mohsCodes[3],
    lower_lip_inner: mohsCodes[4],
    lip_inner_unspecified: mohsCodes[5],
    commissure_lip_unspecified: mohsCodes[6],
    overlapping_lip: mohsCodes[7],
    lip_unspecified: mohsCodes[8],
    melanoma_lip: mohsCodes[9],
    melanoma_unspecified_eyelid: mohsCodes[10],
    melanoma_right_upper_eyelid: mohsCodes[11],
    melanoma_right_lower_eyelid: mohsCodes[12],
    melanoma_left_upper_eyelid: mohsCodes[13],
    melanoma_left_lower_eyelid: mohsCodes[14],
    melanoma_right_ear: mohsCodes[15],
    melanoma_left_ear: mohsCodes[16],
    melanoma_in_situ_right_lower_limb: mohsCodes[17],
    melanoma_in_situ_left_lower_limb: mohsCodes[18],
    melanoma_in_situ_other_sites: mohsCodes[19],
    carcinoma_in_situ_lip: mohsCodes[20],
    carcinoma_in_situ_right_upper_eyelid: mohsCodes[21],
    carcinoma_in_situ_right_lower_eyelid: mohsCodes[22],
    carcinoma_in_situ_left_upper_eyelid: mohsCodes[23],
    carcinoma_in_situ_left_lower_eyelid: mohsCodes[24],
    carcinoma_in_situ_right_ear: mohsCodes[25],
    carcinoma_in_situ_left_ear: mohsCodes[26],
    carcinoma_in_situ_other_face: mohsCodes[27],
    carcinoma_in_situ_scalp_neck: mohsCodes[28],
    carcinoma_in_situ_right_upper_limb: mohsCodes[29],
    carcinoma_in_situ_left_upper_limb: mohsCodes[30],
    carcinoma_in_situ_right_lower_limb: mohsCodes[31],
    carcinoma_in_situ_left_lower_limb: mohsCodes[32],
    carcinoma_in_situ_other_sites: mohsCodes[33],
    carcinoma_in_situ_penis: mohsCodes[34],
  };

  const [eCodes, setECodes] = useState([
    "E08.621",
    "E08.622",
    "E09.621",
    "E09.622",
    "E10.621",
    "E10.622",
    "E11.621",
    "E11.622",
    "E13.621",
    "E13.622",
    "Other",
  ]);

  const eCodeMapping = {
    underlying_foot_ulcer: eCodes[0],
    underlying_skin_ulcer: eCodes[1],
    drug_foot_ulcer: eCodes[2],
    drug_skin_ulcer: eCodes[3],
    type1_foot_ulcer: eCodes[4],
    type1_skin_ulcer: eCodes[5],
    type2_foot_ulcer: eCodes[6],
    type2_skin_ulcer: eCodes[7],
    other_foot_ulcer: eCodes[8],
    other_skin_ulcer: eCodes[9],
  };

  const vluAdditional = [
    { label: "Varicose Veins", value: "varicose_veins" },
    { label: "Postthrombotic Syndrome", value: "postthrombotic_syndrome" },
    { label: "Venous Hypertension", value: "venous_hypertension" },
  ];

  const vluPart1 = [
    { label: "Thigh", value: "thigh" },
    { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel and Midfoot", value: "heel_midfoot" },
    { label: "Other part of foot", value: "other_foot" },
    { label: "Other part of lower leg", value: "other_lower_leg" },
    { label: "Unspecified Site", value: "unspecified" },
  ];

  const vluPart2 = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
    { label: "Bilateral", value: "bilateral" },
  ];

  const vluPart2WBilateral = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
  ];

  const vluPart1PSyndrome = [
    { label: "Lower extremity", value: "lower_extremity" },
    { label: "Unspecified lower extremity", value: "unpsecified_lower" },
  ];

  const [iCodes, setICodes] = useState([
    "I83.012", // 0
    "I83.013", // 1
    "I83.014", // 2
    "I83.015", // 3
    "I83.018", // 4
    "I83.022", // 5
    "I83.023", // 6
    "I83.024", // 7
    "I83.025", // 8
    "I83.028", // 9
    "I87.011", // 10
    "I87.012", // 11
    "I87.013", // 12
    "I87.311", // 13
    "I87.312", // 14
    "I87.313", // 15
    "Other", // 16
    "I83.001", // 17
    "I83.002", // 18
    "I83.003", // 19
    "I83.004", // 20
    "I83.005", // 21
    "I83.008", // 22
    "I83.009", // 23
    "I83.011", // 24
    "I83.019", // 25
    "I83.021", // 26
    "I83.029", // 27
    "I83.201", // 28
    "I83.202", // 29
    "I83.203", // 30
    "I83.204", // 31
    "I83.205", // 32
    "I83.208", // 33
    "I83.209", // 34
    "I83.211", // 35
    "I83.212", // 36
    "I83.213", // 37
    "I83.214", // 38
    "I83.215", // 39
    "I83.218", // 40
    "I83.219", // 41
    "I83.221", // 42
    "I83.222", // 43
    "I83.223", // 44
    "I83.224", // 45
    "I83.225", // 46
    "I83.228", // 47
    "I83.229", // 48
    "I87.011", // 49
    "I87.012", // 50
    "I87.013", // 51
    "I87.019", // 52
    "I87.031", // 53
    "I87.032", // 54
    "I87.033", // 55
    "I87.039", // 56
    "I87.311", // 57
    "I87.312", // 58
    "I87.313", // 59
    "I87.319", // 60
    "I87.331", // 61
    "I87.332", // 62
    "I87.333", // 63
    "I87.339", // 64
  ]);
  //@ts-ignore
  const [loading, setLoading] = useState(false);
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
  //@ts-ignore
  const [inflammation, setInflammation] = useState(false);

  const vluPart2Selected =
    vluCondition === "varicose_veins" ? vluPart2WBilateral : vluPart2;
  const vluPart1Selected =
    vluCondition === "varicose_veins" ? vluPart1 : vluPart1PSyndrome;

  const resetCodes = () => {
    setLCode("");
    setLCodeMain("");
    setICode("");
    setICodeMain("");
    setCDCode("");
    setCDCodeMain("");
    setECode("");
    setECodeMain("");
  };

  const handleWoundType = (event) => {
    resetCodes();
    setWoundType(event.target.value);
    setCPTWound(event.target.value);
    setDiabetesType(""); // Reset diabetes type when wound type changes
    setECode(""); // Reset E code when wound type changes
  };

  const handleDiabetesType = (event) => {
    const selectedDiabetesType = event.target.value;
    setDiabetesType(selectedDiabetesType);
    setDiabeticFU(selectedDiabetesType);
    setECode(eCodeMapping[selectedDiabetesType] || "");
    setECodeMain(eCodeMapping[selectedDiabetesType] || "");
  };

  const handleMohsType = (event) => {
    const selectedMohsType = event.target.value;
    setMohs(selectedMohsType);
    setMohsMain(selectedMohsType);
    setCDCode(mohsConditionsMapping[selectedMohsType] || "");
    setCDCodeMain(mohsConditionsMapping[selectedMohsType] || "");
  };
  const handleVluCondition = (event) => {
    const selectedVLU = event.target.value;
    setVluCondition(selectedVLU);
    setVLU((prevState) => ({
      ...prevState,
      condition: selectedVLU,
    }));
  };

  const handleVluLocation = (event) => {
    const selectedVLU = event.target.value;
    setVluLocation(selectedVLU);
    setVLU((prevState) => ({
      ...prevState,
      location: selectedVLU,
    }));
  };

  const handleVluSide = (event) => {
    const selectedVLU = event.target.value;
    setVluSide(selectedVLU);
    setVLU((prevState) => ({
      ...prevState,
      side: selectedVLU,
    }));
  };

  const handleICode = (event) => {
    const selectedICode = event.target.value;
    setICode(selectedICode);
    setICodeMain(selectedICode);
    setVluCondition("");
    setVluLocation("");
    setVluSide("");
    setVLU(null);
  };

  const handleECode = (event) => {
    const selectedECode = event.target.value;
    setECode(selectedECode);
    setECodeMain(selectedECode);
    setDiabetesType("");
  };
  const handleECodeOther = (event) => {
    const selectedECode = event.target.value;
    setECodeMain(selectedECode);
  };

  const handleMohsCode = (event) => {
    const selectedLCode = event.target.value;
    setCDCode(selectedLCode);
    setCDCodeMain(selectedLCode);
  };
  const handleMohsCodeOther = (event) => {
    const selectedLCode = event.target.value;
    setCDCodeMain(selectedLCode);
  };

  const handleICodeOther = (event) => {
    const selectedICode = event.target.value;
    setICodeMain(selectedICode);
  };

  const handleInflammation = (event) => {
    const value = event.target.value === "true";
    setInflammation(value);
    console.log(inflammation);
  };

  /*   { label: "Diabetic foot ulcer", value: "diabetic_foot_ulcer" },
    { label: "Venous leg ulcer", value: "venous_leg_ulcer" },
    { label: "Pressure ulcer", value: "pressure_ulcer" },
    { label: "Mohs", value: "mohs" },
    { label: "Other...", value: "other" }, */

  useEffect(() => {
    let code = "";

    if (vluCondition && vluLocation) {
      switch (true) {
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          inflammation:
          code = iCodes[28];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          inflammation:
          code = iCodes[29];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          inflammation:
          code = iCodes[30];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          inflammation:
          code = iCodes[31];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          inflammation:
          code = iCodes[32];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          inflammation:
          code = iCodes[33];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "unspecified" &&
          inflammation:
          code = iCodes[34];
          break;

        case vluCondition === "varicose_veins" && vluLocation === "thigh":
          code = iCodes[17];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "calf":
          code = iCodes[18];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "ankle":
          code = iCodes[19];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "unspecified_lower":
          code = iCodes[52];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "unspecified_lower" &&
          inflammation:
          code = iCodes[56];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "unspecified_lower" &&
          inflammation:
          code = iCodes[64];
          break;
      }
      setICode(code);
      setICodeMain(code);
    }

    if (vluCondition && vluLocation && vluSide) {
      switch (true) {
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[35];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[36];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[37];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[38];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[39];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[40];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "unspecified" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[41];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[42];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[43];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[44];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[45];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[46];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[47];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "unspecified" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[48];
          break;

        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "right":
          code = iCodes[0];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "right":
          code = iCodes[1];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "right":
          code = iCodes[2];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "right":
          code = iCodes[3];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "right":
          code = iCodes[4];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "calf" &&
          vluSide === "left":
          code = iCodes[5];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "ankle" &&
          vluSide === "left":
          code = iCodes[6];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot" &&
          vluSide === "left":
          code = iCodes[7];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_foot" &&
          vluSide === "left":
          code = iCodes[8];

          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg" &&
          vluSide === "left":
          code = iCodes[9];

          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "right":
          code = iCodes[49];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "left":
          code = iCodes[50];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "bilateral":
          code = iCodes[51];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "unspecified_lower" &&
          vluSide === "bilateral" ||
          "left" ||
          "right" ||
          "":
          code = iCodes[52];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "right" &&
          inflammation:
          code = iCodes[53];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "left" &&
          inflammation:
          code = iCodes[54];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "lower_extremity" &&
          vluSide === "bilateral" &&
          inflammation:
          code = iCodes[55];
          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluLocation === "unspecified_lower" &&
          inflammation &&
          vluSide === "bilateral" ||
          "left" ||
          "right" ||
          "":
          code = iCodes[56];
          break;

        case vluCondition === "postthrombotic_syndrome" && vluSide === "right":
          code = iCodes[10];

          break;
        case vluCondition === "postthrombotic_syndrome" && vluSide === "left":
          code = iCodes[11];

          break;
        case vluCondition === "postthrombotic_syndrome" &&
          vluSide === "bilateral":
          code = iCodes[12];

          break;
        case vluCondition === "venous_hypertension" && vluSide === "right":
          code = iCodes[13];

          break;
        case vluCondition === "venous_hypertension" && vluSide === "left":
          code = iCodes[14];

          break;
        case vluCondition === "venous_hypertension" && vluSide === "bilateral":
          code = iCodes[15];
          break;

        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          vluSide === "right":
          code = iCodes[57];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          vluSide === "left":
          code = iCodes[58];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          vluSide === "bilateral":
          code = iCodes[59];
          break;
        case (vluCondition === "venous_hypertension" &&
          vluLocation === "unspecified_lower" &&
          vluSide === "bilateral") ||
          "left" ||
          "right":
          code = iCodes[60];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          inflammation &&
          vluSide === "right":
          code = iCodes[61];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          inflammation &&
          vluSide === "left":
          code = iCodes[62];
          break;
        case vluCondition === "venous_hypertension" &&
          vluLocation === "lower_extremity" &&
          inflammation &&
          vluSide === "bilateral":
          code = iCodes[63];
          break;
        case (vluCondition === "venous_hypertension" &&
          vluLocation === "unspecified_lower" &&
          inflammation &&
          vluSide === "bilateral") ||
          "left" ||
          "right":
          code = iCodes[64];
          break;

        case vluCondition === "varicose_veins" && vluLocation === "thigh":
          code = iCodes[17];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "calf":
          code = iCodes[18];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "ankle":
          code = iCodes[19];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "heel_midfoot":
          code = iCodes[20];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "other_foot":
          code = iCodes[21];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "other_lower_leg":
          code = iCodes[22];
          break;
        case vluCondition === "varicose_veins" && vluLocation === "unspecified":
          code = iCodes[23];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          vluSide === "right":
          code = iCodes[24];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "unspecified" &&
          vluSide === "right":
          code = iCodes[25];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          vluSide === "left":
          code = iCodes[26];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "unspecified" &&
          vluSide === "left":
          code = iCodes[27];
          break;
        case vluCondition === "varicose_veins" &&
          vluLocation === "thigh" &&
          inflammation:
          code = iCodes[28];
          break;

        default:
          code = "";
      }
      setICode(code);
      setICodeMain(code);
    }

    if (woundType === "" && codes?.cptWound !== null) {
      const wound = codes?.cptWound;
      setWoundType(wound);

      switch (wound) {
        case "Diabetic foot ulcer":
          if (!eCodes.includes(codes?.eCode)) {
            setECodes((prevEcodes) => [...prevEcodes, codes?.eCode]);
          }
          setECode(codes?.eCode);
          setLCode(codes?.lCode);
          break;
        case "Venous leg ulcer":
          if (!iCodes.includes(codes?.iCode)) {
            setICodes((prevIcodes) => [...prevIcodes, codes?.iCode]);
          }
          setICode(codes?.iCode);
          setLCode(codes?.lCode);
          break;
        case "Pressure ulcer":
          setLCode(codes?.lCode);
          break;
        case "Mohs":
          if (!mohsCodes.includes(codes.cdCode)) {
            setMohsCodes((prevCDCodes) => [...prevCDCodes, codes.cdCode]);
          }
          setCDCode(codes.cdCode);
          break;
      }
    }
  }, [vluCondition, vluLocation, vluSide, inflammation]);
  /* TODO: Makes Labels consistent with  */
  return (
    <Container>
      <Typography
        variant="h5"
        sx={{ margin: "10px , 0", textAlign: "center" }}
        mt={6}
      >
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
        <Typography
          variant="subtitle1"
          sx={{ marginRight: "10px", marginBottom: "20px" }}
        >
          Wound Type{" "}
        </Typography>
        <FormControl
          variant="outlined"
          sx={{ marginBottom: "20px", width: "50%" }}
        >
          <Select value={woundType} displayEmpty onChange={handleWoundType}>
            <MenuItem value="" disabled>
              <em>Select</em>
            </MenuItem>
            {woundTypes.map((location) => (
              <MenuItem key={location.value} value={location.value}>
                {location.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {woundType === "Diabetic foot ulcer" && (
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
                marginBottom: "10px",
              }}
            >
              <Typography variant="subtitle1" mr={2} sx={{ minWidth: 40 }}>
                Type{"  "}
              </Typography>
              <Select
                value={diabetesType}
                displayEmpty
                onChange={handleDiabetesType}
                sx={{ flex: 1 }}
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {diabetesTypes.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "5px" }}
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
              <Typography variant="subtitle1" sx={{ minWidth: 40 }} mr={2}>
                E Code<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <Select
                value={eCode}
                variant="outlined"
                onChange={handleECode}
                displayEmpty
                sx={{ flex: 1 }}
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {eCodes.map((eCode) => (
                  <MenuItem key={eCode} value={eCode}>
                    {eCode}
                  </MenuItem>
                ))}
              </Select>

              {eCode === "Other" ? (
                <TextField
                  placeholder="Input Ecode"
                  onChange={handleECodeOther}
                />
              ) : null}
            </Box>
          </FormControl>
          {/* //@ts-ignore */}
          <LCode
            location={lLocation}
            setLocation={setLLocation}
            side={lSide}
            vluSide={vluSide}
            vluLocation={vluLocation}
            type="DFU"
            setSide={setLSide}
            severity={lSeverity}
            lCodeServer={codes?.lCode}
            setSeverity={setLSeverity}
            setLCode={setLCode}
            lCode={lCode}
            setLCodeMain={setLCodeMain}
            setPressureUlcer={setPressureUlcer}
          />
        </Box>
      )}

      {woundType === "Venous leg ulcer" && (
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
              <Typography
                variant="subtitle1"
                sx={{ marginRight: "10px", minWidth: "150px" }}
              >
                Condition{" "}
              </Typography>
              <Select
                value={vluCondition}
                displayEmpty
                onChange={handleVluCondition}
                sx={{ flex: 1 }}
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
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
              <Typography
                variant="subtitle1"
                sx={{ marginRight: "10px", minWidth: "150px" }}
              >
                Location{" "}
              </Typography>
              <Select
                value={vluLocation}
                displayEmpty
                onChange={handleVluLocation}
                sx={{ flex: 1 }}
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {vluPart1Selected.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography
                variant="subtitle1"
                sx={{
                  marginRight: "3px",
                  marginLeft: "5px",
                  minWidth: "150px",
                }}
              >
                Inflammation
              </Typography>
              <RadioGroup
                row
                value={String(inflammation)}
                onChange={handleInflammation}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </Box>

            {/*  <FormControl>
                <FormLabel id="inflamation-label">Inflammation</FormLabel>
                <RadioGroup
                  aria-labelledby="inflamation-label-radios"
                  defaultValue="No"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="No"
                    control={<Radio />}
                    label="No"
                    onSelect={() => setInflamation(false)}
                  />
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                    onSelect={() => setInflamation(true)}
                  />
           
                </RadioGroup>
              </FormControl> */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ marginRight: "10px", minWidth: "150px" }}
              >
                Side{" "}
              </Typography>
              <Select
                value={vluSide}
                displayEmpty
                onChange={handleVluSide}
                sx={{ flex: 1 }}
              >
                <MenuItem value="" disabled>
                  <em>Select</em>
                </MenuItem>
                {vluPart2Selected.map((location) => (
                  <MenuItem key={location.value} value={location.value}>
                    {location.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <FormControl fullWidth variant="outlined">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ marginRight: "10px", minWidth: "150px" }}
                >
                  I Code<span style={{ color: "red" }}>*</span>
                </Typography>
                <Select
                  value={iCode}
                  variant="outlined"
                  fullWidth
                  displayEmpty
                  onChange={handleICode}
                  placeholder="Select"
                >
                  <MenuItem value="" disabled>
                    <em>Select</em>
                  </MenuItem>
                  {iCodes.map((iCode) => (
                    <MenuItem key={iCode} value={iCode}>
                      {iCode}
                    </MenuItem>
                  ))}
                </Select>
                {iCode === "Other" ? (
                  <TextField
                    placeholder="Input Icode"
                    onChange={handleICodeOther}
                  />
                ) : null}
              </Box>
            </FormControl>
          </FormControl>
          <LCode
            location={lLocation}
            setLocation={setLLocation}
            side={lSide}
            vluSide={vluSide}
            vluLocation={vluLocation}
            type="VLU"
            setSide={setLSide}
            severity={lSeverity}
            lCodeServer={codes?.lCode}
            setSeverity={setLSeverity}
            setLCode={setLCode}
            lCode={lCode}
            setLCodeMain={setLCodeMain}
            setPressureUlcer={setPressureUlcer}
          />
        </Box>
      )}
      {woundType === "Mohs" && (
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
              Select C/D Code<span style={{ color: "red" }}>*</span>{" "}
            </Typography>
            <Select
              value={mohs}
              displayEmpty
              onChange={handleMohsType}
              sx={{ width: "50%" }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {mohsConditions.map((location) => (
                <MenuItem key={location.value} value={location.value}>
                  {location.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={cdCode}
              variant="outlined"
              onChange={handleMohsCode}
              displayEmpty
              sx={{
                width: "30%",
                marginLeft: "5px",
              }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {mohsCodes.map((mohs) => (
                <MenuItem key={mohs} value={mohs}>
                  {mohs}
                </MenuItem>
              ))}
            </Select>
            {cdCode === "Other" ? (
              <TextField
                placeholder="Input Icode"
                onChange={handleMohsCodeOther}
              />
            ) : null}
          </Box>
        </FormControl>
      )}
      {woundType === "Pressure ulcer" && (
        <LCode
          location={lLocation}
          setLocation={setLLocation}
          side={lSide}
          vluSide={vluSide}
          vluLocation={vluLocation}
          type="PU"
          setSide={setLSide}
          severity={lSeverity}
          lCodeServer={codes?.lCode}
          setSeverity={setLSeverity}
          setLCode={setLCode}
          lCode={lCode}
          setLCodeMain={setLCodeMain}
          setPressureUlcer={setPressureUlcer}
        />
      )}
      {woundType === "Other" && (
        <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField placeholder="Input ICD-10 Code" sx={{ width: "60%" }} />
          <Typography variant="h6">Comments:</Typography>
          <TextField
            sx={{
              width: "60%",
              "& .MuiInputBase-root": {
                height: "300px",
              },
              "& .MuiOutlinedInput-input": {
                height: "300px",
              },
            }}
            style={{
              width: "60%",
              padding: "10px 10px",
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default ICDCode;
