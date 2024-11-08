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
}) => {
  console.log("Comes from patient Detail", patient);
  // const [hospice, setHospice] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    console.log("Check Patient", patient)
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
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Box>
      <div
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
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>

      <div
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
          />
        ) : (
          <PlaceAndDatePicker
            placeOfServiceExternal={placeOfService}
            setPlaceOfServiceExternal={setPlaceOfService}
          />
        )}
      </div>
      <div
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
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    </Box>
  );
};

export default PatientDetails;
