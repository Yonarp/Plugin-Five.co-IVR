//@ts-nocheck
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
const CPTCode = ({
  setCPTCodeMain,
  cptCodeMain,
  setCPTWoundSize,
  cptWoundSizeMain,
  setCPTCode2Main,
  cptCode2Main,
  setCPTWoundSize2,
  cptWoundSize2Main,
  setCPTWoundLocation,
  cptWoundLocationMain,
  setCPTTotalWoundSize,
  cptTotalWoundSizeMain,
}) => {
  const woundLocations = [
    { label: "Trunk, Arm, Leg", value: 1 },
    {
      label:
        "Face, Scalp, Eyelids, Mouth, Neck, Ears, Orbits, Genitalia, Hands, Feet",
      value: 2,
    },
  ];

  const [woundLocation, setWoundLocation] = useState("");
  const [totalWoundSize, setTotalWoundSize] = useState();
  const [woundSize, setWoundSize] = useState("");
  const [woundSize2, setWoundSize2] = useState("");
  const [cptCode, setCptCode] = useState("");
  const [cptCode2, setCptCode2] = useState("");

  const handleCPTCode = (event) => {
    const cptCodeSelected = event.target.value;
    setCptCode(cptCodeSelected);
    setCPTCodeMain(cptCodeSelected);
  };

  const handleCPTCode2 = (event) => {
    const cptCodeSelected = event.target.value;
    setCptCode2(cptCodeSelected);
    setCPTCode2Main(cptCodeSelected);
  };

  useEffect(() => {
    calculateCPTCode();

    if (cptCodeMain) {
      if (!cptCodes.includes(cptCodeMain)) {
        cptCodes.push(cptCodeMain);
      }
      setCptCode(cptCodeMain);
      setWoundSize(cptWoundSizeMain);
    }
    if (cptCode2Main) {
      if (!cptCodes.includes(cptCode2Main)) {
        cptCodes.push(cptCode2Main);
      }
      setCptCode2(cptCode2Main);
      setWoundSize2(cptWoundSize2Main);
    }

    setWoundLocation(cptWoundLocationMain);
    setTotalWoundSize(parseFloat(cptTotalWoundSizeMain));
  }, [woundLocation, woundSize, totalWoundSize]);

  const handleWoundLocationChange = (event) => {
    setWoundLocation(event.target.value);
    setCPTWoundLocation(event.target.value);
  };

  const handleTotalWoundSize = (event) => {
    const totalSize = event.target.value;
    setTotalWoundSize(totalSize);
    setCPTTotalWoundSize(totalSize);
  };

  const handleWoundSizeChange = (event) => {
    setWoundSize(event.target.value);
    setCPTWoundSize(event.target.value);
  };
  const handleWoundSizeChange2 = (event) => {
    setWoundSize2(event.target.value);
    setCPTWoundSize2(event.target.value);
  };

  const cptCodes = [
    "15271",
    "15272",
    "15273",
    "15274",
    "15275",
    "15276",
    "15277",
    "15278",
  ];

  const cptCodeLookup = {
    1: { small: "15271", large: "15272", larger: "15273", largest: "15274" },
    2: { small: "15275", large: "15276", larger: "15277", largest: "15278" },
  };

  const calculateCPTCode = () => {
    const area =
      //@ts-ignore
      woundLocations.find((location) => location.value === woundLocation)
        ?.value || "";
    const size = parseFloat(woundSize);

    if (!area || isNaN(totalWoundSize)) {
      setCptCode("");
      return;
    }

    const cptCode = cptCodeLookup[area]?.["small"] || "";

    if (totalWoundSize > 25 && totalWoundSize <= 100) {
        setWoundSize("25");
        setCPTWoundSize("25");
        const remainder = totalWoundSize - 25;
        console.log("Part 2 triggered", remainder);
        setWoundSize2(remainder.toString());
        setCPTWoundSize2(remainder.toString());
        setCptCode(cptCode);
        setCPTCodeMain(cptCode);
        const secondCptCode = cptCodeLookup[area]?.["large"] || "";
        setCptCode2(secondCptCode);
        setCPTCode2Main(secondCptCode);
    } else if (totalWoundSize > 200) {
          console.log("Part 4 triggered");
          setWoundSize("200");
          setCPTWoundSize("200");
          const remainder = totalWoundSize - 200;
          setWoundSize2(remainder.toString());
          setCPTWoundSize2(remainder.toString());
          const firstCPTCode = cptCodeLookup[area]?.["larger"] || "";
          setCptCode(firstCPTCode);
          setCPTCodeMain(firstCPTCode);
          const secondCptCode = cptCodeLookup[area]?.["largest"] || "";
          setCptCode2(secondCptCode);
          setCPTCode2Main(secondCptCode);
    } else if (totalWoundSize > 100 && totalWoundSize <= 200) {
        console.log("Part 3 triggered");
        setWoundSize(totalWoundSize.toString());
        setCPTWoundSize(totalWoundSize.toString());
        const selectedCode = cptCodeLookup[area]?.["larger"] || "";
        setCptCode(selectedCode);
        setCPTCodeMain(selectedCode);
        setCptCode2("");
        setCPTCode2Main("");
        setWoundSize2(0);
        setCPTCode2Main("")
        setCPTWoundSize2(0);
    } else if (totalWoundSize <= 25) {
        console.log("Part 1 triggered");
        setWoundSize(totalWoundSize.toString());
        setCPTWoundSize(totalWoundSize.toString());
        setCptCode(cptCode);
        setCPTCodeMain(cptCode);
        setWoundSize2(0);
        setCptCode2("");
        setCPTCode2Main("")
        setCPTWoundSize2(0);
    }

    if (totalWoundSize <= 0) {
      setCptCode2("");
      setCptCode("");
    }
  };

  return (
    <Container
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h5"
          mt={6}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Determine the CPT Code
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
        <Box>
          <Typography variant="body1" mb={2}>
            {" "}
            Total Wound Size:{" "}
          </Typography>
          <TextField
            label="Total Wound Size"
            type="number"
            variant="outlined"
            sx={{ width: "40%", marginBottom: "20px" }}
            value={totalWoundSize}
            onChange={handleTotalWoundSize}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Size Of Wound (sq. cm)"
            type="number"
            variant="outlined"
            sx={{ width: "40%" }}
            value={woundSize}
            onChange={handleWoundSizeChange}
            disabled
          />

          <Typography variant="subtitle1" ml={3}>
            CPT Code<span style={{ textAlign: "left", color: "red" }}>*</span>{" "}
          </Typography>
          <Select
            type="text"
            variant="outlined"
            sx={{ width: "40%" }}
            value={cptCode}
            displayEmpty
            onChange={handleCPTCode}
          >
            <MenuItem value="" disabled>
              <em>Select</em>
            </MenuItem>
            {cptCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {woundSize2 !== 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <TextField
              label="Size of wound (sq. cm)"
              type="number"
              variant="outlined"
              sx={{ width: "40%" }}
              value={woundSize2}
              onChange={handleWoundSizeChange2}
              disabled
            />

            <Typography variant="subtitle1" ml={3}>
              Second CPT Code
              <span style={{ textAlign: "left", color: "red" }}>*</span>{" "}
            </Typography>
            <Select
              type="text"
              variant="outlined"
              sx={{ width: "40%" }}
              value={cptCode2}
              displayEmpty
              onChange={handleCPTCode2}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {cptCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : null}
      </Box>
    </Container>
  );
};

export default CPTCode;
