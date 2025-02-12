import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
} from "../FivePluginApi";
import MedicareForm from "./MedicareForm";
import PlaceAndDatePicker from "./PlaceAndDatePicker";
import { Container, Radio, RadioGroup } from "@mui/material";

//@ts-ignore
const PatientDetails = ({
  admitted,
  handleRadioChange,
  placeOfService,
  setPlaceOfService,
  hospiceMain,
  setHospiceMain,
  medicare,
  setMedicare,
  patient,
  setPreventNext,
}) => {
  // const [hospice, setHospice] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);

    if (patient) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#14706A" }} />
      </Container>
    );
  }

  return (
    <Box id="patient-details-container">
      <div
        id="admission-section"
        className="IVR-page-1"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>
          Has this patient been admitted to a Skilled Nursing Facility within
          the past 100 day.<span style={{ color: "red" }}>*</span>
        </p>
        <FormControl component="fieldset">
          <RadioGroup
            id="admission-radio-group"
            name="exclusive-options"
            style={{
              width: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginLeft: "10px",
            }}
            onChange={(event) => handleRadioChange(event.target.value)}
            value={admitted === null ? "" : admitted ? "Yes" : "No"}
          >
            <FormControlLabel
              id="admission-yes"
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              id="admission-no"
              value="No"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div
        id="medicare-section"
        className="medicare-form"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {admitted === null ? null : admitted ? (
          <MedicareForm
            placeOfServiceExternal={placeOfService}
            setPlaceOfServiceExternal={setPlaceOfService}
            medicare={medicare}
            setMedicare={setMedicare}
            setPreventNext={setPreventNext}
          />
        ) : (
          <PlaceAndDatePicker
            placeOfServiceExternal={placeOfService}
            setPlaceOfServiceExternal={setPlaceOfService}
          />
        )}
      </div>
      <div
        id="hospice-section"
        className="medicare-form"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>
          Is this patient in Hospice? <span style={{ color: "red" }}>*</span>
        </p>
        <FormControl component="fieldset">
          <RadioGroup
            id="hospice-radio-group"
            name="exclusive-options"
            style={{
              width: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginLeft: "10px",
            }}
            onChange={(event) => setHospiceMain(event.target.value)}
            value={hospiceMain === null ? "" : hospiceMain}
          >
            <FormControlLabel
              id="hospice-yes"
              value="Yes"
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              id="hospice-no"
              value="No"
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </Box>
  );
};

export default PatientDetails;
