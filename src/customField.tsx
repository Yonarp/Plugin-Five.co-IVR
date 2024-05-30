import { ThemeProvider } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FiveInitialize,
  FormControl,
  FormControlLabel,
} from "./FivePluginApi";

import { CustomFieldProps } from "../../../common";
import { Radio, RadioGroup } from "@mui/material";
import MedicareForm from "./components/MedicareForm";
import PlaceAndDatePicker from "./components/PlaceAndDatePicker";
import Insurance from "./components/Insurance";
import Products from "./components/Products";
import CPTCode from "./components/CPTCode";
import Patient from "./components/Patient";
import Practitioner from "./components/Practitioner";

FiveInitialize();

const CustomField = (props: CustomFieldProps) => {
  // Initialize states
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [admitted, setAdmitted] = useState(null);
  const [patientSelected, setPatientSelected] = useState(true);
  const [databases, setDatabases] = useState([]);


  const { theme, value, variant, five } = props;

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  //@ts-ignore
  const form = five.form.Patients;
  //@ts-ignore
  const officeName = five.stack.OfficeName;
  //@ts-ignore
  const accountKey = five.stack.Account.AccountKey;

  const account = {
    'AccountKey': accountKey
  }


  const totalSteps = 5;

  // Revised useEffect
  useEffect(() => {
    console.log("useEffect triggered");

    // Fetch data sources
    //@ts-ignore
    const dataSources = five.five.dataSources.map((item) => [
      item.dataSourceId(),
      item.key(),
    ]);
    setDatabases(dataSources);
    console.log(databases);
    // Check patient selection status
    //@ts-ignore
    if (five.stack.Patient === undefined) {
      setPatientSelected(false);
    }

    // Execute external function
    //@ts-ignore
    const results = five.executeFunction("GetMembers", account, null, null, null, (result) => {
      console.log("Loggin to memeb results")
      console.log(JSON.parse(result.serverResponse.results))
      console.log(typeof(result.serverResponse.results))
    });
 
 
    
    console.log("useEffect completed");
  }, []); // Empty dependency array


  // Define handleNext and handleBack using useCallback to ensure stability
 const handleNext = useCallback(() => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [activeStep, totalSteps]);

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }, [activeStep]);

  // Event handlers
  const handleRadioChange = useCallback((value) => {
    setAdmitted(value === "Yes");
  }, []);

  const handlePatientSelected = useCallback(() => {
    setPatientSelected(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Button
        fullWidth
        variant={variant}
        value={value}
        onClick={handleDialogOpen}
        style={{
          background: "#1d343d",
          color: "white",
        }} // Open the dialog on button click
      >
        Start IVR
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        fullScreen
        maxWidth={false}
        PaperProps={{
          style: {
            width: "90%",
            height: "90%", // Sets the dialog to 90% of the screen width
            maxWidth: "none",
          },
        }}
      >
        <DialogTitle style={{ backgroundColor: "#225D7A", color: "white" }}>
          {"Insurance Verification Request"}
        </DialogTitle>
        <DialogContent>
          {!patientSelected ? (
            <div className="container" style={{ width: "100%" }}>
              <Patient />
              <div
                className="patient-buttons"
                style={{
                  position: "absolute",
                  bottom: "5%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={handleDialogClose}
                  style={{
                    width: "100px",
                    margin: "0 20px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={handlePatientSelected}
                  style={{
                    width: "100px",
                    height: "50px",
                    margin: "0 20px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            activeStep === 0 && (
              <div>
                <div
                  className="patient-details"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    margin: "20px 0", // Adjust as needed
                  }}
                >
                  <p>
                    <strong>{form?.NameFull}</strong> <br />{" "}
                    {form?.AddressStreet}
                    <br /> {form?.AddressCity}
                    <br /> {form?.AddressState}
                    <br /> {form?.AddressZip} <br />
                    Gender: {form?.Gender}
                  </p>
                  <p>{officeName}</p>
                </div>
                <div
                  className="IVR-page-1"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center", // Adjust as needed
                  }}
                >
                  <p>
                    Has this patient been admited to a Skilled Nursing Facility
                    within the past 100 day.
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
                      onChange={(event) =>
                        handleRadioChange(event.target.value)
                      }
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                        defaultChecked
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div
                  className="medicare-form"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center", // Adjust as needed
                  }}
                >
                  {admitted === null ? null : admitted ? (
                    <MedicareForm />
                  ) : (
                    <PlaceAndDatePicker />
                  )}
                </div>
              </div>
            )
          )}
          {activeStep === 1 && <Practitioner account = {account}/>}
          {activeStep === 2 && <Insurance />}
          {activeStep === 3 && <Products />}
          {activeStep === 4 && <CPTCode />}
          {admitted === null ? (
            patientSelected === true ? (
              <Button
                onClick={handleDialogClose}
                style={{
                  width: "100px",
                  height: "50px",
                  borderRadius: "0px",
                  background: "#285C79",
                  position: "absolute",
                  bottom: "5%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "white",
                }}
              >
                Close
              </Button>
            ) : (
              <></>
            )
          ) : (
            <Button
              onClick={handleBack}
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "0px",
                background: "#285C79",
                position: "absolute",
                bottom: "5%",
                left: "35%",
                color: "white",
              }}
            >
              Previous
            </Button>
          )}
          {admitted === null ? null : (
            <Button
              onClick={handleNext}
              style={{
                width: "100px",
                height: "50px",
                borderRadius: "0px",
                background: "#285C79",
                position: "absolute",
                bottom: "5%",
                left: "55%",
                color: "white",
              }}
            >
              Next
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleDialogClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default CustomField;
