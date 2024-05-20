import { ThemeProvider } from "@mui/system";
import React from "react";

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

FiveInitialize();

const CustomField = (props: CustomFieldProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { theme, value, variant, five } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [admitted, setAdmitted] = React.useState(null);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);


  //@ts-ignore
  const form = five.form.Patients;
  //@ts-ignore
  const officeName = five.stack.OfficeName;

  const totalSteps = 5;

  // Getting Database Definition from Five
  let databases = [];
  //@ts-ignore
  console.log("Data Sources of the application");
  //@ts-ignore
  five.five.dataSources.forEach((item) => {
    const arrItem = [item.dataSourceId(), item.key()];
    databases.push(arrItem);
  });
  console.log(databases);
  console.log("Logging items");
  const patientKey = databases.find((item) => {
    console.log(item);
    return item[0] === "Patient";
  });

  console.log(patientKey);
  //@ts-ignore

  const handleNext = () => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((preActiveStep) => preActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((preActiveStep) => preActiveStep - 1);
    }
  };
  

  const handleRadioChange = (value) => {
    if (value === "Yes") {
      setAdmitted(true);
    } else setAdmitted(false);
  };

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
          {activeStep === 0 && (
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
                  <strong>{form?.NameFull}</strong> <br /> {form?.AddressStreet}
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
                  within the past 100 day
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
          )}
          {activeStep === 1 && <Insurance />}
          {activeStep === 2 && <Products />}
          {activeStep === 3 && <CPTCode/>}
          {admitted === null ? (
            <Button
              onClick={handleDialogClose}
              style={{
                width: '100px',
                height: '50px',
                borderRadius: "0px",
                background: "#285C79",
                position: "absolute",
                bottom: "5%",
                left: "50%",
                transform: 'translate(-50%,-50%)',
                color: "white",
               }}
            >
              Close 
            </Button>
          ) : (
            <Button
              onClick={handleBack}
              style={{
                width: '100px',
                height: '50px',
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
                width: '100px',
                height: '50px',
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
