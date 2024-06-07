//import { ThemeProvider } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FiveInitialize,
  FormControl,
  FormControlLabel,
} from "./FivePluginApi";

import { CustomFieldProps } from "../../../common";
import { Container, Radio, RadioGroup } from "@mui/material";
import MedicareForm from "./components/MedicareForm";
import PlaceAndDatePicker from "./components/PlaceAndDatePicker";
import Insurance from "./components/Insurance";
import Products from "./components/Products";
import CPTCode from "./components/CPTCode";
import Patient from "./components/Patient";
import Practitioner from "./components/Practitioner";
import ICDCode from "./components/ICDCode";
import Summary from "./components/Summary";
import NewPatient from "./components/NewPatient";

FiveInitialize();

const CustomField = (props: CustomFieldProps) => {
  // Initialize states
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [admitted, setAdmitted] = useState(null);
  const [patientSelected, setPatientSelected] = useState(true);
  //@ts-ignore
  const [payors, setPayors] = useState([]);
  //@ts-ignore
  const [products, setProducts] = useState([]);
  //@ts-ignore
  const [practitioner, setPractitioner] = useState();
  //@ts-ignore
  const [patient, setPatient] = useState();
  const [data, setData] = useState(null);
  //@ts-ignore
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  const { theme, value, variant, five } = props;

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  //@ts-ignore
  const form = five.form.Patients;
  //@ts-ignore
  const officeName = five.stack.OfficeName;
  //@ts-ignore
  //const accountKey = five.stack.Account.AccountKey;
  const accountKey = "5973932E-88D8-4ACA-9FFC-C17D037B5D66";

  const account = {
    AccountKey: accountKey,
  };

  const totalSteps = 7;

  // Revised useEffect
  useEffect(() => {
    if (data === null) {
      setLoading(true);
      console.log("useEffect triggered");
      // Check patient selection status
      //@ts-ignore
      if (five.stack.Patient === undefined) {
        setPatientSelected(false);
      }
      const fetchData = async () => {
        await five.executeFunction(
          "getAccountPatients",
          //@ts-ignore
          account,
          null,
          null,
          null,
          (result) => {
            console.log("Loggin to member results");
            console.log(result.serverResponse.results);
            console.log(JSON.parse(result.serverResponse.results));
            setData(JSON.parse(result.serverResponse.results));
            setLoading(false);
          }
        );
        console.log("useEffect completed");
      };
      fetchData();
    }
  }, []); // Empty dependency array

  console.log("data", data);
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

  const handlePatient = useCallback((patientKey) => {
    setPatient(patientKey);
  }, []);

  console.log("loggin patient key", patient);

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
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
              <Patient
                patients={data.response.value}
                handlePatient={handlePatient}
                five={five}
              />
              <div
                className="patient-buttons"
                style={{
                  position: "absolute",
                  bottom: "1%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
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
          {activeStep === 1 && (<NewPatient/>)}
          {activeStep === 2 && (
            <Practitioner five={five} setPractitioner={setPractitioner} />
          )}
          {activeStep === 3 && (
            <Insurance
              patient={patient}
              five={five}
              setPayorsMain={setPayors}
            />
          )}
          {activeStep === 4 && <Products setProducts={setProducts} />}
          {activeStep === 5 && <ICDCode />}
          {activeStep === 6 && <CPTCode />}
          {activeStep === 7 && (
            <Summary products={products} practitioner={practitioner} />
          )}

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
            <Box
              style={{
                position: "absolute",
                bottom: "1%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "white",
                padding: 5,
              }}
            >
              <Button
                onClick={handleBack}
                style={{
                  width: "100px",
                  height: "50px",
                  borderRadius: "0px",
                  background: "#285C79",
                  //position: "absolute",
                  //bottom: "5%",
                  //left: "35%",
                  color: "white",
                }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                style={{
                  width: "100px",
                  height: "50px",
                  borderRadius: "0px",
                  background: "#285C79",
                  //position: "absolute",
                  //bottom: "5%",
                  //left: "55%",
                  color: "white",
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleDialogClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomField;
