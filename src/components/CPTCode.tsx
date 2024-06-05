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


const CPTCode = () => {
    const woundLocations = [
        { label: "Trunk, Arm, Leg", value: 1 },
        { label: "Face, Scalp, Eyelids, Mouth, Neck, Ears, Orbits, Genitalia, Hands, Feet", value: 2 }
    ];

/*     const woundTypes = [
        { label: "Diabetic foot ulcer", value: "diabetic_foot_ulcer" },
        { label: "Venous leg ulcer", value: "venous_leg_ulcer" },
        { label: "Pressure ulcer or chronic wound", value: "pressure_ulcer" },
        { label: "Other...", value: "other" }
    ]; */

    const [woundLocation, setWoundLocation] = useState("");
    const [woundSize, setWoundSize] = useState("");
    const [cptCode, setCptCode] = useState("");
 /*    const [woundType, setWoundType] = useState("");
    const [eCode, setECode] = useState("");
    const [iCode, setICode] = useState("");
    const [lCode, setLCode] = useState(""); */

    useEffect(() => {
        calculateCPTCode();
    }, [woundLocation, woundSize]);

    const handleWoundLocationChange = (event) => {
        setWoundLocation(event.target.value);
    };

    const handleWoundSizeChange = (event) => {
        setWoundSize(event.target.value);
    };

    const cptCodeLookup = {
        1: { small: "15271", large: "15272" },
        2: { small: "15273", large: "15274" }
    };

    const calculateCPTCode = () => {
        //@ts-ignore
        const area = woundLocations.find(location => location.value === woundLocation)?.value || "";
        const size = parseFloat(woundSize);

        if (!area || isNaN(size)) {
            setCptCode("");
            return;
        }

        const codeType = size <= 100 ? 'small' : 'large';
        const cptCode = cptCodeLookup[area]?.[codeType] || "";
        setCptCode(cptCode);
    };

    return (
        <Container style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Box>
            <Typography variant="h6" gutterBottom>
                Determine the CPT and ICD 10 Codes
            </Typography>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1">
                    Wound location
                </Typography>
                <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
                    <Select value={woundLocation} onChange={handleWoundLocationChange} displayEmpty>
                        <MenuItem value="" disabled>
                            <em>---</em>
                        </MenuItem>
                        {woundLocations.map((location) => (
                            <MenuItem key={location.value} value={location.value}>
                                {location.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <TextField
                    label="Size of wound (sq. cm)"
                    type="number"
                    variant="outlined"
                    sx={{ width: '48%' }}
                    value={woundSize}
                    onChange={handleWoundSizeChange}
                />
                <TextField
                    label="CPT Code"
                    type="text"
                    variant="outlined"
                    sx={{ width: '48%' }}
                    value={cptCode}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
          {/*   <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
                <Select value={woundType} onChange={handleWoundTypeChange} displayEmpty>
                    <MenuItem value="" disabled>
                        <em>Wound type</em>
                    </MenuItem>
                    {woundTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                            {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {woundType === "diabetic_foot_ulcer" && (
                <>
                    <TextField
                        label="E Code"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={eCode}
                        onChange={handleECodeChange}
                        sx={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="L Code"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={lCode}
                        onChange={handleLCodeChange}
                        sx={{ marginBottom: '20px' }}
                    />
                </>
            )}
            {woundType === "venous_leg_ulcer" && (
                <>
                    <TextField
                        label="I Code"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={iCode}
                        onChange={handleICodeChange}
                        sx={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="L Code"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={lCode}
                        onChange={handleLCodeChange}
                        sx={{ marginBottom: '20px' }}
                    />
                </>
            )}
            {woundType === "pressure_ulcer" && (
                <TextField
                    label="L Code"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={lCode}
                    onChange={handleLCodeChange}
                    sx={{ marginBottom: '20px' }}
                />
            )} */}
        </Box>
        </Container>
    );
};

export default CPTCode;