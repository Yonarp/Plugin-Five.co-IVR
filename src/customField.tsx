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
} from "./FivePluginApi";

import { CustomFieldProps } from "../../../common";
import { Container } from "@mui/material";
import Insurance from "./components/Insurance";
import Products from "./components/Products";
import CPTCode from "./components/CPTCode";
//import Patient from "./components/Patient";
import Practitioner from "./components/Practitioner";
import ICDCode from "./components/ICDCode";
import Summary from "./components/Summary";
import NewPatient from "./components/NewPatient";
import PatientDetails from "./components/PatientDetails";

FiveInitialize();
const CustomField = (props: CustomFieldProps) => {
  // Initialize states
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [admitted, setAdmitted] = useState(null);
  const [patientSelected, setPatientSelected] = useState(true);
  // const [existingPatient, setExistingPatient] = useState(false)
  //@ts-ignore
  const [payors, setPayors] = useState([]);
  //@ts-ignore
  const [products, setProducts] = useState([]);
  //@ts-ignore
  const [practitioner, setPractitioner] = useState(null);
  
  //@ts-ignore
  const [iCode, setICode] = useState(null)
  //@ts-ignore
  const [lCode, setLCode] = useState(null)
  //@ts-ignore
  const [eCode, setECode] = useState(null)
  //@ts-ignore
  const [cdCode, setCDCode] = useState(null)
  //@ts-ignore
  const [cptCode, setCPTCode] = useState(null)
  //@ts-ignore
  const [patient, setPatient] = useState(null);
  const [data, setData] = useState(null);
  //@ts-ignore
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  const { theme, value, variant, five } = props;

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
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

  const totalSteps = 8;
  const existingPatient =
  //@ts-ignore
    five.internal.actionID !== "IVR" && five.internal.actionID !== "Accounts";
    if(existingPatient) {

    }
  //@ts-ignore

  // Revised useEffect
  useEffect(() => {
    //@ts-ignore
    if (five.internal.actionID === "IVR") {
      setDialogOpen(true);
    }
    if (existingPatient && activeStep === 0) {
      setActiveStep(1);
    }
    if (data === null) {
      //@ts-ignore
      /*  if(five.internal.actionID === 'PatientsView') {
        setExistingPatient(true)
      } */
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
    } //@ts-ignore
  }, [dialogOpen, existingPatient, activeStep]);


  // Define handleNext and handleBack using useCallback to ensure stability
  const handleNext = useCallback(() => {
    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [activeStep, totalSteps]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => {
      if (existingPatient && prevActiveStep === 1) {
        return 1;
      } else {
        return Math.max(prevActiveStep - 1, 0);
      }
    });
  }, []);

  // Event handlers
  const handleRadioChange = useCallback((value) => {
    setAdmitted(value === "Yes");
  }, []);
  //@ts-ignore
  const handlePatientSelected = useCallback(() => {
    setPatientSelected(true);
  }, []);

  const handlePatient = useCallback((patientData, index) => {
    setPatient({ data: patientData, index: index });
  }, []);

  const handlePractitioner = useCallback((practitionerData, index) => {
    setPractitioner({data: practitionerData, index: index})
  }, [])



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
        {existingPatient ? "Open IVR" : "Start IVR"}
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        fullScreen
        PaperProps={{
          style: {
            width: "90%",
            height: "90%", // Sets the dialog to 90% of the screen width
          },
        }}
      >
        <DialogTitle style={{ backgroundColor: "#225D7A", color: "white" }}>
          {"Insurance Verification Request"}
        </DialogTitle>
        <DialogContent style={{maxWidth:"100%", overflowX: 'hidden'}}>
          {activeStep === 0 && (
            <NewPatient data={data} handlePatient={handlePatient} five={five} patient={patient} />
          )}

          {activeStep === 1 && (
            <PatientDetails
              patient= {patient}
              admitted={admitted}
              handleRadioChange={handleRadioChange}
              officeName={officeName}
            />
          )}
          {activeStep === 2 && (
            <Practitioner five={five} setPractitioner={handlePractitioner} practitioner={practitioner}/>
          )}
          {activeStep === 3 && (
            <Insurance
              patient={patient}
              five={five}
              setPayorsMain={setPayors}
            />
          )}
          {activeStep === 4 && <Products setProducts={setProducts} productsSaved = { products }/>}
          {activeStep === 5 && <ICDCode setLCodeMain = {setLCode} setICodeMain = {setICode} setECodeMain = {setECode} setCDCodeMain = {setCDCode}/>}
          {activeStep === 6 && <CPTCode setCPTCodeMain = {setCPTCode}/>}
          {activeStep === 7 && (
            <Summary patient={patient} products={products} practitioner={practitioner} iCode = {iCode} lCode = {lCode} eCode={eCode} cdCode = {cdCode} cptCode={cptCode} five={five} handleDialogClose = {handleDialogClose}/>
          )} 

          {patientSelected === true ? (
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
            <Box
              style={{
                position: "absolute",
                bottom: "1%",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 5,
                zIndex: 99
              }}
            >
              {activeStep === 0 ? (
                <Button
                  onClick={handleDialogClose}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                    marginRight: "20px",
                  }}
                >
                  Close
                </Button>
              ) : (
                <Button
                  onClick={handleBack}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                    marginRight: "20px"
                  }}
                >
                  Previous
                </Button>
              )}

              <Button
                onClick={handleNext}
                style={{
                  width: "100px",
                  height: "50px",
                  borderRadius: "0px",
                  background: "#285C79",
                  color: "white",
                  margin: "20px"
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {
            //@ts-ignore
            five.internal.actionID === "IVR" ? (
              //@ts-ignore
              <Button onClick={() => five.previousAction(true, 1)}>
                Go Back To IVR
              </Button>
            ) : (
              <></>
            )
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomField;
