import React, { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { TextField } from "../FivePluginApi";

//@ts-ignore
const LCodeSelector = ({
  woundType,
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
  vluSide,
  vluLocation,
  type,
  stage,
  setStage
}) => {
  const lCodeLocations = [
    { label: "Thigh", value: "thigh" },
    { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel and Midfoot", value: "heel_midfoot" },
    { label: "Other Part of Foot", value: "other_foot" },
    { label: "Other Part of Lower Leg", value: "other_lower_leg" },
    { label: "Unspecified Part of Lower Leg", value: "unspecified" },
    { label: "Left Buttock", value: "left_buttock" },
    { label: "Right Buttock", value: "right_buttock" },
    { label: "Unspecified Buttock", value: "unspecified_buttock" },
    { label: "Hip", value: "hip" },
    { label: "Unspecified Hip", value: "unspecified_hip" },
    { label: "Contiguous Site of Back, Buttock and Hip", value: "contiguous" },
    { label: "Upper Back", value: "upper_back" },
    { label: "Lower Back", value: "lower_back" },
    { label: "Skin of Other Sites", value: "skin" },
    { label: "Elbow", value: "elbow" },
    { label: "Sacral Region", value: "sacral_region" },
    { label: "Unspecified Part of Back", value: "skin" },
    { label: "Head", value: "head" },
    { label: "Other Site", value: "other_site" },
    { label: "Unspecified Site", value: " unspecified_site" },
  ];

  const lCodeLocationsPressureUlcer = [
    { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel", value: "heel" },
    { label: "Other Part of Foot", value: "other_foot" },
    { label: "Other Part of Lower Leg", value: "other_lower_leg" },
    { label: "Unspecified Part of Lower Leg", value: "unspecified" },
    { label: "Buttock", value: "buttock" },
    { label: "Hip", value: "hip" },
    { label: "Sacral Region", value: "sacral_region" },
    { label: "Upper Back", value: "upper_back" },
    { label: "Lower Back", value: "lower_back" },
    { label: "Contiguous Site of Back, Buttock and Hip", value: "contiguous" },
    { label: "Unspecified Part of Back", value: "unspecified_back" },
    { label: "Skin of Other Sites", value: "skin" },
    { label: "Elbow", value: "elbow" },
    { label: "Head", value: "head" },
    { label: "Other Site", value: "other_site" },
    { label: "Unspecified Site", value: " unspecified_site" },
  ];

  //When Wound Type is Pressure Ulcer the selected dropdown for Location Changes
  const selectedLcodeList =
    woundType === "Pressure ulcer"
      ? lCodeLocationsPressureUlcer
      : lCodeLocations;

  const lCodeSides = [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
  ];

  const lCodeSeverity = [
    {
      label: "Non-Pressure Chronic Ulcer Limited to Breakdown of Skin",
      value: "breakdown_skin",
    },
    {
      label: "Non-Pressure Chronic Ulcer With Fat Layer Exposed",
      value: "fat_layer_exposed",
    },
    /* {
      label: "Non-Pressure Chronic Ulcer With Necrosis Of Muscle",
      value: "necrosis_of_muscle",
    },
    {
      label: "Non-Pressure Chronic Ulcer With Necrosis Of Bone",
      value: "necrosis_of_bone",
    }, */
    {
      label: "Non-Pressure Chronic Ulcer With Unspecified Severity",
      value: "unspecified_severity",
    },
  ];

  //const [stage, setStage] = useState("");
  console.log("Loggin Stage", stage);

  const [lCodes, setLCodes] = useState([
    "L97.101", // 0
    "L97.102", // 1
    "L97.103", // 2
    "L97.104", // 3
    "L97.109", // 4
    "L97.111", // 5
    "L97.112", // 6
    "L97.113", // 7
    "L97.114", // 8
    "L97.119", // 9
    "L97.121", // 10
    "L97.122", // 11
    "L97.123", // 12
    "L97.124", // 13
    "L97.129", // 14
    "L97.201", // 15
    "L97.202", // 16
    "L97.203", // 17
    "L97.204", // 18
    "L97.209", // 19
    "L97.211", // 20
    "L97.212", // 21
    "L97.213", // 22
    "L97.214", // 23
    "L97.219", // 24
    "L97.221", // 25
    "L97.222", // 26
    "L97.223", // 27
    "L97.224", // 28
    "L97.229", // 29
    "L97.301", // 30
    "L97.302", // 31
    "L97.303", // 32
    "L97.304", // 33
    "L97.309", // 34
    "L97.311", // 35
    "L97.312", // 36
    "L97.313", // 37
    "L97.314", // 38
    "L97.319", // 39
    "L97.321", // 40
    "L97.322", // 41
    "L97.323", // 42
    "L97.324", // 43
    "L97.329", // 44
    "L97.401", // 45
    "L97.402", // 46
    "L97.403", // 47
    "L97.404", // 48
    "L97.409", // 49
    "L97.411", // 50
    "L97.412", // 51
    "L97.413", // 52
    "L97.414", // 53
    "L97.419", // 54
    "L97.421", // 55
    "L97.422", // 56
    "L97.423", // 57
    "L97.424", // 58
    "L97.429", // 59
    "L97.501", // 60
    "L97.502", // 61
    "L97.503", // 62
    "L97.504", // 63
    "L97.509", // 64
    "L97.511", // 65
    "L97.512", // 66
    "L97.513", // 67
    "L97.514", // 68
    "L97.519", // 69
    "L97.521", // 70
    "L97.522", // 71
    "L97.523", // 72
    "L97.524", // 73
    "L97.529", // 74
    "L97.801", // 75
    "L97.802", // 76
    "L97.803", // 77
    "L97.804", // 78
    "L97.809", // 79
    "L97.811", // 80
    "L97.812", // 81
    "L97.813", // 82
    "L97.814", // 83
    "L97.819", // 84
    "L97.821", // 85
    "L97.822", // 86
    "L97.823", // 87
    "L97.824", // 88
    "L97.829", // 89
    "L97.901", // 90
    "L97.902", // 91
    "L97.903", // 92
    "L97.904", // 93
    "L97.909", // 94
    "L97.911", // 95
    "L97.912", // 96
    "L97.913", // 97
    "L97.914", // 98
    "L97.919", // 99
    "L97.921", // 100
    "L97.922", // 101
    "L97.923", // 102
    "L97.924", // 103
    "L97.929", // 104
    "L98.411", // 105
    "L98.412", // 106
    "L98.413", // 107
    "L98.414", // 108
    "L98.419", // 109
    "L98.421", // 110
    "L98.422", // 111
    "L98.423", // 112
    "L98.424", // 113
    "L98.429", // 114
    "L98.491", // 115
    "L98.492", // 116
    "L98.493", // 117
    "L98.494", // 118
    "L98.499", // 119
    "L89.000", // 120
    "L89.001", // 121
    "L89.002", // 122
    "L89.003", // 123
    "L89.004", // 124
    "L89.009", // 125
    "L89.010", // 126
    "L89.011", // 127
    "L89.012", // 128
    "L89.013", // 129
    "L89.014", // 130
    "L89.019", // 131
    "L89.020", // 132
    "L89.021", // 133
    "L89.022", // 134
    "L89.023", // 135
    "L89.024", // 136
    "L89.029", // 137
    "L89.100", // 138
    "L89.101", // 139
    "L89.102", // 140
    "L89.103", // 141
    "L89.104", // 142
    "L89.109", // 143
    "L89.110", // 144
    "L89.111", // 145
    "L89.112", // 146
    "L89.113", // 147
    "L89.114", // 148
    "L89.119", // 149
    "L89.120", // 150
    "L89.121", // 151
    "L89.122", // 152
    "L89.123", // 153
    "L89.124", // 154
    "L89.129", // 155
    "L89.130", // 156
    "L89.131", // 157
    "L89.132", // 158
    "L89.133", // 159
    "L89.134", // 160
    "L89.139", // 161
    "L89.140", // 162
    "L89.141", // 163
    "L89.142", // 164
    "L89.143", // 165
    "L89.144", // 166
    "L89.149", // 167
    "L89.150", // 168
    "L89.151", // 169
    "L89.152", // 170
    "L89.153", // 171
    "L89.154", // 172
    "L89.159", // 173
    "L89.200", // 174
    "L89.201", // 175
    "L89.202", // 176
    "L89.203", // 177
    "L89.204", // 178
    "L89.209", // 179
    "L89.210", // 180
    "L89.211", // 181
    "L89.212", // 182
    "L89.213", // 183
    "L89.214", // 184
    "L89.219", // 185
    "L89.220", // 186
    "L89.221", // 187
    "L89.222", // 188
    "L89.223", // 189
    "L89.224", // 190
    "L89.229", // 191
    "L89.300", // 192
    "L89.301", // 193
    "L89.302", // 194
    "L89.303", // 195
    "L89.304", // 196
    "L89.309", // 197
    "L89.310", // 198
    "L89.311", // 199
    "L89.312", // 200
    "L89.313", // 201
    "L89.314", // 202
    "L89.319", // 203
    "L89.320", // 204
    "L89.321", // 205
    "L89.322", // 206
    "L89.323", // 207
    "L89.324", // 208
    "L89.329", // 209
    "L89.40", // 210
    "L89.41", // 211
    "L89.42", // 212
    "L89.43", // 213
    "L89.44", // 214
    "L89.45", // 215
    "L89.500", // 216
    "L89.501", // 217
    "L89.502", // 218
    "L89.503", // 219
    "L89.504", // 220
    "L89.509", // 221
    "L89.510", // 222
    "L89.511", // 223
    "L89.512", // 224
    "L89.513", // 225
    "L89.514", // 226
    "L89.519", // 227
    "L89.520", // 228
    "L89.521", // 229
    "L89.522", // 230
    "L89.523", // 231
    "L89.524", // 232
    "L89.529", // 233
    "L89.600", // 234
    "L89.601", // 235
    "L89.602", // 236
    "L89.603", // 237
    "L89.604", // 238
    "L89.609", // 239
    "L89.610", // 240
    "L89.611", // 241
    "L89.612", // 242
    "L89.613", // 243
    "L89.614", // 244
    "L89.619", // 245
    "L89.620", // 246
    "L89.621", // 247
    "L89.622", // 248
    "L89.623", // 249
    "L89.624", // 250
    "L89.629", // 251
    "L89.810", // 252
    "L89.811", // 253
    "L89.812", // 254
    "L89.813", // 255
    "L89.814", // 256
    "L89.819", // 257
    "L89.890", // 258
    "L89.891", // 259
    "L89.892", // 260
    "L89.893", // 261
    "L89.894", // 262
    "L89.899", // 263
    "L89.90", // 264
    "L89.91", // 265
    "L89.92", // 266
    "L89.93", // 267
    "L89.94", // 268
    "L89.95", // 269
  ]);

  /*             "L97.811", // 12
    "L97.812", // 13
    "L97.821", // 14
    "L97.822", // 15*/

  const handleLcode = (event) => {
    const selectedLcode = event.target.value;
    setLCode(selectedLcode);
    setLCodeMain(selectedLcode);
    setLocation("");
    setSide("");
    setSeverity("");
    setStage("");
    setError(false);
  };
  const handleLcodeOther = (event) => {
    const selectedLcode = event.target.value;
    setLCodeMain(selectedLcode);
  };

  // Error state
  const [error, setError] = useState(false);
  
  /* case location === "ankle" &&
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
          lCode = ""; */

  useEffect(() => {
    let lCode = "";
    setError(false);

    if (location && severity) {
      setPressureUlcer((prevState) => ({
        ...prevState,
        location,
        side,
        severity,
        stage,
      }));
      switch (true) {
        case location === "thigh" && severity === "breakdown_skin":
          lCode = lCodes[0];
          break;
        case location === "thigh" && severity === "fat_layer_exposed":
          lCode = lCodes[1];
          break;
        case location === "thigh" && severity === "necrosis_of_muscle":
          lCode = lCodes[2];
          break;
        case location === "thigh" && severity === "necrosis_of_bone":
          lCode = lCodes[3];
          break;
        case location === "thigh" && severity === "unspecified_severity":
          lCode = lCodes[4];
          break;
        case location === "calf" && severity === "breakdown_skin":
          lCode = lCodes[15];
          break;
        case location === "calf" && severity === "fat_layer_exposed":
          lCode = lCodes[16];
          break;
        case location === "calf" && severity === "necrosis_of_muscle":
          lCode = lCodes[17];
          break;
        case location === "calf" && severity === "necrosis_of_bone":
          lCode = lCodes[18];
          break;
        case location === "calf" && severity === "unspecified_severity":
          lCode = lCodes[19];
          break;
        case location === "ankle" && severity === "breakdown_skin":
          lCode = lCodes[30];
          break;
        case location === "ankle" && severity === "fat_layer_exposed":
          lCode = lCodes[31];
          break;
        case location === "ankle" && severity === "necrosis_of_muscle":
          lCode = lCodes[32];
          break;
        case location === "ankle" && severity === "necrosis_of_bone":
          lCode = lCodes[33];
          break;
        case location === "ankle" && severity === "unspecified_severity":
          lCode = lCodes[34];
          break;
        case location === "heel_midfoot" && severity === "breakdown_skin":
          lCode = lCodes[45];
          break;
        case location === "heel_midfoot" && severity === "fat_layer_exposed":
          lCode = lCodes[46];
          break;
        case location === "heel_midfoot" && severity === "necrosis_of_muscle":
          lCode = lCodes[47];
          break;
        case location === "heel_midfoot" && severity === "necrosis_of_bone":
          lCode = lCodes[48];
          break;
        case location === "heel_midfoot" && severity === "unspecified_severity":
          lCode = lCodes[49];
          break;
        case location === "other_foot" && severity === "breakdown_skin":
          lCode = lCodes[60];
          break;
        case location === "other_foot" && severity === "fat_layer_exposed":
          lCode = lCodes[61];
          break;
        case location === "other_foot" && severity === "necrosis_of_muscle":
          lCode = lCodes[62];
          break;
        case location === "other_foot" && severity === "necrosis_of_bone":
          lCode = lCodes[63];
          break;
        case location === "other_foot" && severity === "unspecified_severity":
          lCode = lCodes[64];
          break;
        case location === "other_lower_leg" && severity === "breakdown_skin":
          lCode = lCodes[75];
          break;
        case location === "other_lower_leg" && severity === "fat_layer_exposed":
          lCode = lCodes[76];
          break;
        case location === "other_lower_leg" &&
          severity === "necrosis_of_muscle":
          lCode = lCodes[77];
          break;
        case location === "other_lower_leg" && severity === "necrosis_of_bone":
          lCode = lCodes[78];
          break;

        case location === "other_lower_leg" &&
          severity === "unspecified_severity":
          lCode = lCodes[79];
          break;
        case location === "unspecified" && severity === "breakdown_skin":
          lCode = lCodes[90];
          break;
        case location === "unspecified" && severity === "fat_layer_exposed":
          lCode = lCodes[91];
          break;
        case location === "unspecified" && severity === "necrosis_of_muscle":
          lCode = lCodes[92];
          break;
        case location === "unspecified" && severity === "necrosis_of_bone":
          lCode = lCodes[93];
          break;
        case location === "unspecified" && severity === "unspecified_severity":
          lCode = lCodes[94];
          break;
      }
      setLCode(lCode);
      setLCodeMain(lCode);
      if (lCode === "") {
        setError(true);
        return;
      }
    }

    /*     { label: "Calf", value: "calf" },
    { label: "Ankle", value: "ankle" },
    { label: "Heel", value: "heel_midfoot" },
    { label: "Other Part of Foot", value: "other_foot" },
    { label: "Other Part of Lower Leg", value: "other_lower_leg" },
    { label: "Unspecified Part of Lower Leg", value: "unspecified" },
    { label: "Left Buttock", value: "left_buttock" },
    { label: "Right Buttock", value: "right_buttock" },
    { label: "Unspecified Buttock", value: "unspecified_buttock" },
    { label: "Hip", value: "hip" },
   
    { label: "Contiguous Site of Back, Buttock and Hip", value: "contiguous" },
    { label: "Upper Back", value: "upper_back" },
    { label: "Lower Back", value: "lower_back" },
    { label: "Unspecified Part of Back", value: "unspecified_back" },
    { label: "Skin of Other Sites", value: "skin" },
    { label: "Elbow", value: "elbow" },
    { label: "Sacral Region", value: "sacral_region" },
    { label: "Head", value: "head" },
    { label: "Other Site", value: "other_site" },
    { label: "Unspecified Site", value: " unspecified_site" }, */

    /*               <MenuItem value="unstageable">Unstageable</MenuItem>
              <MenuItem value="one">1</MenuItem>
              <MenuItem value="two">2</MenuItem>
              <MenuItem value="three">3</MenuItem>
              <MenuItem value="four">4</MenuItem>
              <MenuItem value="unspecified">Unspecified Stage</MenuItem> */

    if (location && stage && woundType === "Pressure ulcer") {
      setPressureUlcer((prevState) => ({
        ...prevState,
        location,
        side,
        severity,
        stage,
      }));
      switch (true) {
        case location === "elbow" && stage === "unstageable":
          lCode = lCodes[120];
          break;
        case location === "elbow" && stage === "one":
          lCode = lCodes[121];
          break;
        case location === "elbow" && stage === "two":
          lCode = lCodes[122];
          break;
        case location === "elbow" && stage === "three":
          lCode = lCodes[123];
          break;
        case location === "elbow" && stage === "four":
          lCode = lCodes[124];
          break;
        case location === "elbow" && stage === "unspecified":
          lCode = lCodes[125];
          break;
        case location === "unspecified_back" && stage === "unstageable":
          lCode = lCodes[138];
          break;
        case location === "unspecified_back" && stage === "one":
          lCode = lCodes[139];
          break;
        case location === "unspecified_back" && stage === "two":
          lCode = lCodes[140];
          break;
        case location === "unspecified_back" && stage === "three":
          lCode = lCodes[141];
          break;
        case location === "unspecified_back" && stage === "four":
          lCode = lCodes[142];
          break;
        case location === "unspecified_back" && stage === "unspecified":
          lCode = lCodes[143];
          break;
        case location === "sacral_region" && stage === "unstageable":
          lCode = lCodes[168];
          break;
        case location === "sacral_region" && stage === "one":
          lCode = lCodes[169];
          break;
        case location === "sacral_region" && stage === "two":
          lCode = lCodes[170];
          break;
        case location === "sacral_region" && stage === "three":
          lCode = lCodes[171];
          break;
        case location === "sacral_region" && stage === "four":
          lCode = lCodes[172];
          break;
        case location === "sacral_region" && stage === "unspecified":
          lCode = lCodes[173];
          break;
        case location === "hip" && stage === "unstageable":
          lCode = lCodes[174];
          break;
        case location === "hip" && stage === "one":
          lCode = lCodes[175];
          break;
        case location === "hip" && stage === "two":
          lCode = lCodes[176];
          break;
        case location === "hip" && stage === "three":
          lCode = lCodes[177];
          break;
        case location === "hip" && stage === "four":
          lCode = lCodes[178];
          break;
        case location === "hip" && stage === "unspecified":
          lCode = lCodes[179];
          break;
        case location === "buttock" && stage === "unstageable":
          lCode = lCodes[192];
          break;
        case location === "buttock" && stage === "one":
          lCode = lCodes[193];
          break;
        case location === "buttock" && stage === "two":
          lCode = lCodes[194];
          break;
        case location === "buttock" && stage === "three":
          lCode = lCodes[195];
          break;
        case location === "buttock" && stage === "four":
          lCode = lCodes[196];
          break;
        case location === "buttock" && stage === "unspecified":
          lCode = lCodes[197];
          break;
        case location === "contiguous" && stage === "unstageable":
          lCode = lCodes[210];
          break;
        case location === "contiguous" && stage === "one":
          lCode = lCodes[211];
          break;
        case location === "contiguous" && stage === "two":
          lCode = lCodes[212];
          break;
        case location === "contiguous" && stage === "three":
          lCode = lCodes[213];
          break;
        case location === "contiguous" && stage === "four":
          lCode = lCodes[214];
          break;
        case location === "contiguous" && stage === "unspecified":
          lCode = lCodes[215];
          break;
        case location === "ankle" && stage === "unstageable":
          lCode = lCodes[216];
          break;
        case location === "ankle" && stage === "one":
          lCode = lCodes[217];
          break;
        case location === "ankle" && stage === "two":
          lCode = lCodes[218];
          break;
        case location === "ankle" && stage === "three":
          lCode = lCodes[219];
          break;
        case location === "ankle" && stage === "four":
          lCode = lCodes[220];
          break;
        case location === "ankle" && stage === "unspecified":
          lCode = lCodes[221];
          break;
        case location === "heel" && stage === "unstageable":
          lCode = lCodes[234];
          break;
        case location === "heel" && stage === "one":
          lCode = lCodes[235];
          break;
        case location === "heel" && stage === "two":
          lCode = lCodes[236];
          break;
        case location === "heel" && stage === "three":
          lCode = lCodes[237];
          break;
        case location === "heel" && stage === "four":
          lCode = lCodes[238];
          break;
        case location === "heel" && stage === "unspecified":
          lCode = lCodes[239];
          break;
        case location === "head" && stage === "unstageable":
          lCode = lCodes[252];
          break;
        case location === "head" && stage === "one":
          lCode = lCodes[253];
          break;
        case location === "head" && stage === "two":
          lCode = lCodes[254];
          break;
        case location === "head" && stage === "three":
          lCode = lCodes[255];
          break;
        case location === "head" && stage === "four":
          lCode = lCodes[256];
          break;
        case location === "head" && stage === "unspecified":
          lCode = lCodes[257];
          break;
        case location === "other_site" && stage === "unstageable":
          lCode = lCodes[258];
          break;
        case location === "other_site" && stage === "one":
          lCode = lCodes[259];
          break;
        case location === "other_site" && stage === "two":
          lCode = lCodes[260];
          break;
        case location === "other_site" && stage === "three":
          lCode = lCodes[261];
          break;
        case location === "other_site" && stage === "four":
          lCode = lCodes[262];
          break;
        case location === "other_site" && stage === "unspecified":
          lCode = lCodes[263];
          break;
          case location === "unspecified_site" && stage === "unstageable":
            lCode = lCodes[264];
            break;
          case location === "unspecified_site" && stage === "one":
            lCode = lCodes[265];
            break;
          case location === "unspecified_site" && stage === "two":
            lCode = lCodes[266];
            break;
          case location === "unspecified_site" && stage === "three":
            lCode = lCodes[267];
            break;
          case location === "unspecified_site" && stage === "four":
            lCode = lCodes[268];
            break;
          case location === "unspecified_site" && stage === "unspecified":
            lCode = lCodes[269];
            break;  
      }
      setLCode(lCode);
      setLCodeMain(lCode);
      if (lCode === "") {
        setError(true);
        return;
      }
    }

    if (location && side && stage && woundType === "Pressure ulcer") {
      setPressureUlcer((prevState) => ({
        ...prevState,
        location,
        side,
        severity,
        stage,
      }));
      switch (true) {
        case location === "elbow" &&
          side === "right" &&
          stage === "unstageable":
          lCode = lCodes[126];
          break;
        case location === "elbow" && side === "right" && stage === "one":
          lCode = lCodes[127];
          break;
        case location === "elbow" && side === "right" && stage === "two":
          lCode = lCodes[128];
          break;
        case location === "elbow" && side === "right" && stage === "three":
          lCode = lCodes[129];
          break;
        case location === "elbow" && side === "right" && stage === "four":
          lCode = lCodes[130];
          break;
        case location === "elbow" &&
          side === "right" &&
          stage === "unspecified":
          lCode = lCodes[131];
          break;
        case location === "elbow" && side === "left" && stage === "unstageable":
          lCode = lCodes[132];
          break;
        case location === "elbow" && side === "left" && stage === "one":
          lCode = lCodes[133];
          break;
        case location === "elbow" && side === "left" && stage === "two":
          lCode = lCodes[134];
          break;
        case location === "elbow" && side === "left" && stage === "three":
          lCode = lCodes[135];
          break;
        case location === "elbow" && side === "left" && stage === "four":
          lCode = lCodes[136];
          break;
        case location === "elbow" && side === "left" && stage === "unspecified":
          lCode = lCodes[137];
          break;
        case location === "upper_back" &&
          side === "right" &&
          stage === "unstageable":
          lCode = lCodes[144];
          break;
        case location === "upper_back" && side === "right" && stage === "one":
          lCode = lCodes[145];
          break;
        case location === "upper_back" && side === "right" && stage === "two":
          lCode = lCodes[146];
          break;
        case location === "upper_back" && side === "right" && stage === "three":
          lCode = lCodes[147];
          break;
        case location === "upper_back" && side === "right" && stage === "four":
          lCode = lCodes[148];
          break;
        case location === "upper_back" &&
          side === "right" &&
          stage === "unspecified":
          lCode = lCodes[149];
          break;
        case location === "upper_back" &&
          side === "left" &&
          stage === "unstageable":
          lCode = lCodes[150];
          break;
        case location === "upper_back" && side === "left" && stage === "one":
          lCode = lCodes[151];
          break;
        case location === "upper_back" && side === "left" && stage === "two":
          lCode = lCodes[152];
          break;
        case location === "upper_back" && side === "left" && stage === "three":
          lCode = lCodes[153];
          break;
        case location === "upper_back" && side === "left" && stage === "four":
          lCode = lCodes[154];
          break;
        case location === "upper_back" &&
          side === "left" &&
          stage === "unspecified":
          lCode = lCodes[155];
          break;
        case location === "lower_back" &&
          side === "right" &&
          stage === "unstageable":
          lCode = lCodes[156];
          break;
        case location === "lower_back" && side === "right" && stage === "one":
          lCode = lCodes[157];
          break;
        case location === "lower_back" && side === "right" && stage === "two":
          lCode = lCodes[158];
          break;
        case location === "lower_back" && side === "right" && stage === "three":
          lCode = lCodes[159];
          break;
        case location === "lower_back" && side === "right" && stage === "four":
          lCode = lCodes[160];
          break;
        case location === "lower_back" &&
          side === "right" &&
          stage === "unspecified":
          lCode = lCodes[161];
          break;
        case location === "lower_back" &&
          side === "left" &&
          stage === "unstageable":
          lCode = lCodes[162];
          break;
        case location === "lower_back" && side === "left" && stage === "one":
          lCode = lCodes[163];
          break;
        case location === "lower_back" && side === "left" && stage === "two":
          lCode = lCodes[164];
          break;
        case location === "lower_back" && side === "left" && stage === "three":
          lCode = lCodes[165];
          break;
        case location === "lower_back" && side === "left" && stage === "four":
          lCode = lCodes[166];
          break;
        case location === "lower_back" &&
          side === "left" &&
          stage === "unspecified":
          lCode = lCodes[167];
          break;
        case location === "hip" && side === "right" && stage === "unstageable":
          lCode = lCodes[180];
          break;
        case location === "hip" && side === "right" && stage === "one":
          lCode = lCodes[181];
          break;
        case location === "hip" && side === "right" && stage === "two":
          lCode = lCodes[182];
          break;
        case location === "hip" && side === "right" && stage === "three":
          lCode = lCodes[183];
          break;
        case location === "hip" && side === "right" && stage === "four":
          lCode = lCodes[184];
          break;
        case location === "hip" && side === "right" && stage === "unspecified":
          lCode = lCodes[185];
          break;
        case location === "hip" && side === "left" && stage === "unstageable":
          lCode = lCodes[186];
          break;
        case location === "hip" && side === "left" && stage === "one":
          lCode = lCodes[187];
          break;
        case location === "hip" && side === "left" && stage === "two":
          lCode = lCodes[188];
          break;
        case location === "hip" && side === "left" && stage === "three":
          lCode = lCodes[189];
          break;
        case location === "hip" && side === "left" && stage === "four":
          lCode = lCodes[190];
          break;
        case location === "hip" && side === "left" && stage === "unspecified":
          lCode = lCodes[191];
          break;
        case location === "buttock" &&
          side === "right" &&
          stage === "unstageable":
          lCode = lCodes[198];
          break;
        case location === "buttock" && side === "right" && stage === "one":
          lCode = lCodes[199];
          break;
        case location === "buttock" && side === "right" && stage === "two":
          lCode = lCodes[200];
          break;
        case location === "buttock" && side === "right" && stage === "three":
          lCode = lCodes[201];
          break;
        case location === "buttock" && side === "right" && stage === "four":
          lCode = lCodes[202];
          break;
        case location === "buttock" &&
          side === "right" &&
          stage === "unspecified":
          lCode = lCodes[203];
          break;
        case location === "buttock" &&
          side === "left" &&
          stage === "unstageable":
          lCode = lCodes[204];
          break;
        case location === "buttock" && side === "left" && stage === "one":
          lCode = lCodes[205];
          break;
        case location === "buttock" && side === "left" && stage === "two":
          lCode = lCodes[206];
          break;
        case location === "buttock" && side === "left" && stage === "three":
          lCode = lCodes[207];
          break;
        case location === "buttock" && side === "left" && stage === "four":
          lCode = lCodes[208];
          break;
        case location === "buttock" &&
          side === "left" &&
          stage === "unspecified":
          lCode = lCodes[209];
          break;
        case location === "ankle" &&
          side === "right" &&
          stage === "unstageable":
          lCode = lCodes[222];
          break;
        case location === "ankle" && side === "right" && stage === "one":
          lCode = lCodes[223];
          break;
        case location === "ankle" && side === "right" && stage === "two":
          lCode = lCodes[224];
          break;
        case location === "ankle" && side === "right" && stage === "three":
          lCode = lCodes[225];
          break;
        case location === "ankle" && side === "right" && stage === "four":
          lCode = lCodes[226];
          break;
        case location === "ankle" &&
          side === "right" &&
          stage === "unspecified":
          lCode = lCodes[227];
          break;
        case location === "ankle" && side === "left" && stage === "unstageable":
          lCode = lCodes[228];
          break;
        case location === "ankle" && side === "left" && stage === "one":
          lCode = lCodes[229];
          break;
        case location === "ankle" && side === "left" && stage === "two":
          lCode = lCodes[230];
          break;
        case location === "ankle" && side === "left" && stage === "three":
          lCode = lCodes[231];
          break;
        case location === "ankle" && side === "left" && stage === "four":
          lCode = lCodes[232];
          break;
        case location === "ankle" && side === "left" && stage === "unspecified":
          lCode = lCodes[233];
          break;
        case location === "heel" && side === "right" && stage === "unstageable":
          lCode = lCodes[240];
          break;
        case location === "heel" && side === "right" && stage === "one":
          lCode = lCodes[241];
          break;
        case location === "heel" && side === "right" && stage === "two":
          lCode = lCodes[242];
          break;
        case location === "heel" && side === "right" && stage === "three":
          lCode = lCodes[243];
          break;
        case location === "heel" && side === "right" && stage === "four":
          lCode = lCodes[244];
          break;
        case location === "heel" && side === "right" && stage === "unspecified":
          lCode = lCodes[245];
          break;
        case location === "heel" && side === "left" && stage === "unstageable":
          lCode = lCodes[246];
          break;
        case location === "heel" && side === "left" && stage === "one":
          lCode = lCodes[247];
          break;
        case location === "heel" && side === "left" && stage === "two":
          lCode = lCodes[248];
          break;
        case location === "heel" && side === "left" && stage === "three":
          lCode = lCodes[249];
          break;
        case location === "heel" && side === "left" && stage === "four":
          lCode = lCodes[250];
          break;
        case location === "heel" && side === "left" && stage === "unspecified":
          lCode = lCodes[251];
          break;
      }
      setLCode(lCode);
      setLCodeMain(lCode);
      if (lCode === "") {
        setError(true);
        return;
      }
    }

    if (location && side && severity) {
      setPressureUlcer((prevState) => ({
        ...prevState,
        location,
        side,
        severity,
        stage,
      }));
      switch (true) {
        case location === "thigh" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[5];
          break;
        case location === "thigh" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[6];
          break;
        case location === "thigh" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[7];
          break;
        case location === "thigh" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[8];
          break;
        case location === "thigh" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[9];
          break;
        case location === "thigh" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[10];
          break;
        case location === "thigh" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[11];
          break;
        case location === "thigh" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[12];
          break;
        case location === "thigh" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[13];
          break;
        case location === "thigh" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[14];
          break;

        case location === "calf" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[20];
          break;
        case location === "calf" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[21];
          break;
        case location === "calf" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[22];
          break;
        case location === "calf" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[23];
          break;
        case location === "calf" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[24];
          break;

        case location === "calf" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[25];
          break;
        case location === "calf" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[26];
          break;
        case location === "calf" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[27];
          break;
        case location === "calf" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[28];
          break;
        case location === "calf" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[29];
          break;

        case location === "ankle" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[35];
          break;
        case location === "ankle" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[36];
          break;
        case location === "ankle" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[37];
          break;
        case location === "ankle" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[38];
          break;
        case location === "ankle" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[39];
          break;
        case location === "ankle" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[40];
          break;
        case location === "ankle" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[41];
          break;
        case location === "ankle" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[42];
          break;
        case location === "ankle" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[43];
          break;
        case location === "ankle" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[44];
          break;

        case location === "heel_midfoot" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[50];
          break;
        case location === "heel_midfoot" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[51];
          break;
        case location === "heel_midfoot" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[52];
          break;
        case location === "heel_midfoot" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[53];
          break;
        case location === "heel_midfoot" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[54];
          break;
        case location === "heel_midfoot" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[55];
          break;
        case location === "heel_midfoot" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[56];
          break;
        case location === "heel_midfoot" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[57];
          break;
        case location === "heel_midfoot" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[58];
          break;
        case location === "heel_midfoot" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[59];
          break;

        case location === "other_foot" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[65];
          break;
        case location === "other_foot" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[66];
          break;
        case location === "other_foot" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[67];
          break;
        case location === "other_foot" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[68];
          break;
        case location === "other_foot" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[69];
          break;
        case location === "other_foot" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[70];
          break;
        case location === "other_foot" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[71];
          break;
        case location === "other_foot" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[72];
          break;
        case location === "other_foot" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[73];
          break;
        case location === "other_foot" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[74];
          break;

        case location === "other_lower_leg" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[80];
          break;
        case location === "other_lower_leg" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[81];
          break;
        case location === "other_lower_leg" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[82];
          break;
        case location === "other_lower_leg" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[83];
          break;
        case location === "other_lower_leg" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[84];
          break;
        case location === "other_lower_leg" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[85];
          break;
        case location === "other_lower_leg" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[86];
          break;
        case location === "other_lower_leg" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[87];
          break;
        case location === "other_lower_leg" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[88];
          break;
        case location === "other_lower_leg" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[89];
          break;

        case location === "unspecified" &&
          severity === "breakdown_skin" &&
          side === "right":
          lCode = lCodes[95];
          break;
        case location === "unspecified" &&
          severity === "fat_layer_exposed" &&
          side === "right":
          lCode = lCodes[96];
          break;
        case location === "unspecified" &&
          severity === "necrosis_of_muscle" &&
          side === "right":
          lCode = lCodes[97];
          break;
        case location === "unspecified" &&
          severity === "necrosis_of_bone" &&
          side === "right":
          lCode = lCodes[98];
          break;
        case location === "unspecified" &&
          severity === "unspecified_severity" &&
          side === "right":
          lCode = lCodes[99];
          break;
        case location === "unspecified" &&
          severity === "breakdown_skin" &&
          side === "left":
          lCode = lCodes[100];
          break;
        case location === "unspecified" &&
          severity === "fat_layer_exposed" &&
          side === "left":
          lCode = lCodes[101];
          break;
        case location === "unspecified" &&
          severity === "necrosis_of_muscle" &&
          side === "left":
          lCode = lCodes[102];
          break;
        case location === "unspecified" &&
          severity === "necrosis_of_bone" &&
          side === "left":
          lCode = lCodes[103];
          break;
        case location === "unspecified" &&
          severity === "unspecified_severity" &&
          side === "left":
          lCode = lCodes[104];
          break;
      }
      setLCode(lCode);
      setLCodeMain(lCode);
      if (lCode === "") {
        setError(true);
        return;
      }
    }

    if (lCode === "" && lCodeServer) {
      if (!lCodes.includes(lCodeServer)) {
        setLCodes((prevCodes) => [...prevCodes, lCodeServer]);
      }
      setLCode(lCodeServer);
    }

    if (type === "VLU") {
      setSide(vluSide);
      setLocation(vluLocation);
    }
  }, [location, side, severity, vluSide, vluLocation, stage]);

  return (
    <Box mb={10}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        <FormControl
          sx={{
            minWidth: 120,
            ...(type === "VLU" && {
              display: "none",
              minWidth: 0,
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
              ...(type === "VLU" && {
                display: "none",
              }),
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "10px", minWidth: "150px" }}
            >
              Location{"  "}
            </Typography>

            <Select
              value={type === "VLU" ? vluLocation : location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
              sx={{
                flex: 1,
                ...(type === "VLU" && {
                  display: "none",
                }),
              }}
            >
              <MenuItem value="" disabled>
                <em>Select</em>
              </MenuItem>
              {selectedLcodeList.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 120,
            ...(type === "VLU" && {
              display: "none",
              minWidth: 0,
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
              ...(type === "VLU" && {
                display: "none",
              }),
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "10px", minWidth: "150px" }}
            >
              Side{"  "}
            </Typography>
            <Select
              value={type === "VLU" ? vluSide : side}
              onChange={(e) => setSide(e.target.value)}
              displayEmpty
              sx={{
                flex: 1,
                ...(type === "VLU" && {
                  display: "none",
                }),
              }}
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
        <FormControl
          sx={{
            minWidth: 180,
            ...(type === "VLU" && {
              minWidth: "100%",
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
              ...(woundType === "Pressure ulcer" && {
                display: "none",
              }),
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "10px", minWidth: "150px" }}
            >
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
        <FormControl
          sx={{
            minWidth: 180,
            ...(type === "VLU" && {
              minWidth: "100%",
            }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginBottom: "10px",
              ...(woundType !== "Pressure ulcer" && {
                display: "none",
              }),
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "10px", minWidth: "150px" }}
            >
              Stage
            </Typography>
            {/* @ts-ignore */}
            <Select
              sx={{ flex: 1 }}
              onChange={(e) => setStage(e.target.value)}
              displayEmpty
              value={stage}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value="unstageable">Unstageable</MenuItem>
              <MenuItem value="one">1</MenuItem>
              <MenuItem value="two">2</MenuItem>
              <MenuItem value="three">3</MenuItem>
              <MenuItem value="four">4</MenuItem>
              <MenuItem value="unspecified">Unspecified Stage</MenuItem>
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
          <Typography
            variant="subtitle1"
            sx={{ marginRight: "10px", minWidth: "150px" }}
          >
            L Code<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            value={lCode}
            onChange={handleLcode}
            displayEmpty
            sx={{ flex: 1 }}
          >
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
            <TextField placeholder="Input Ecode" onChange={handleLcodeOther} />
          ) : null}
        </Box>
      </FormControl>
      {error && (
        <FormControl fullWidth variant="outlined">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "left",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ marginRight: "10px", minWidth: "150px" }}
            >&nbsp;
            </Typography>
              <Typography color="error" sx={{ flex: 1 }}>
                The selected options do not result in a valid L Code
              </Typography>
          </Box>
        </FormControl>
       )}
    </Box>
  );
};

export default LCodeSelector;
