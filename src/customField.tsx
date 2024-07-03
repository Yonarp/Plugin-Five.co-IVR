//@ts-nocheck

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
import { Alert, Container, Snackbar } from "@mui/material";
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
  const [placeOfService, setPlaceOfService] = useState(null);
  const [patientSelected, setPatientSelected] = useState(true);
  const [ivr, setIVR] = useState({});
  // const [existingPatient, setExistingPatient] = useState(false)
  //@ts-ignore
  const [payors, setPayors] = useState([]);
  const [products, setProducts] = useState([]);
  const [practitioner, setPractitioner] = useState(null);
  const [newPatient, setNewPatient] = useState(false);
  const [iCode, setICode] = useState(null);
  const [lCode, setLCode] = useState(null);
  const [eCode, setECode] = useState(null);
  const [cdCode, setCDCode] = useState(null);
  const [cptCode, setCPTCode] = useState(null);
  const [vlu, setVLU] = useState({ condition: "", location: "", type: "" });
  const [mohs, setMohs] = useState("");
  const [cptWound, setCPTWound] = useState(null);
  const [snf, setSNF] = useState()
  const [diabeticFU, setDiabeticFU] = useState();
  const [pressureUlcer, setPressureUlcer] = useState({
    location: "",
    side: "",
    severity: "",
  });
  //@ts-ignore
  const [patient, setPatient] = useState(null);
  const [data, setData] = useState(null);
  //@ts-ignore
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  //@ts-ignore
  const { theme, value, variant, five, formField, selectedRecord } = props;

  //@ts-ignore
  const form = five.form.Patients;
  //@ts-ignore
  const officeName = five.stack.OfficeName;
  //const accountKey = five.stack.Account.AccountKey;

  //@ts-ignore
  const accountKey = "5973932E-88D8-4ACA-9FFC-C17D037B5D66";
  

  const account = {
    AccountKey: accountKey,
  };

  const totalSteps = 8;
  const existingPatient =
    //@ts-ignore
    five.actionID() !== "IVR" && five.actionID() !== "Accounts";

  const handleDialogOpen = () => {
    console.log("Selected Records", selectedRecord.data.editLink)
    setDialogOpen(true);
    const fetchData = async () => {
      if (existingPatient) {
        await five.executeFunction(
          "getIVRDetails",
          //@ts-ignore
          selectedRecord.data,
          null,
          null,
          null,
          (result) => {
            console.log("Loggin IVR");
            const data = JSON.parse(result.serverResponse.results);
            const ivr = data.ivr;
            console.log(data);
            /* setData(JSON.parse(result.serverResponse.results)); */
            setIVR(data);
            handlePatient(data?.patient);
            setLCode(ivr?.ICD10_L);
            setICode(ivr?.ICD10_I);
            setCPTCode(ivr?.CPTCODE);
            setECode(ivr?.ICD10_E);
            setCDCode(ivr?.ICD10_CD);
            handlePractitioner(data?.practitioner);
            setCPTWound(ivr?.WoundType);
            setLoading(false);
            setAdmitted(() => ivr?.SNFAttendance ? ivr?.SNFAttendance : false)
            setPlaceOfService(ivr?.PlaceofService)
          }
        );
      }
      await five.executeFunction(
        "getAccountPatients",
        //@ts-ignore
        account,
        null,
        null,
        null,
        (result) => {
          setData(JSON.parse(result.serverResponse.results));
          setLoading(false);
        }
      );
    };

    if (data === null) {
      setLoading(true);
      // Check patient selection status
      //@ts-ignore
      if (five.stack.Patient === undefined) {
        setPatientSelected(false);
      }

    }

    fetchData();

    //@ts-ignore
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  //@ts-ignore

  const handleRadioChange = useCallback((value) => {
    setAdmitted(value === "Yes");
  }, []);
  //@ts-ignore
  const handlePatientSelected = useCallback(() => {
    setPatientSelected(true);
  }, []);

  const handlePatient = useCallback((patientData, index = null) => {
    setPatient({ data: patientData, index: index });
  }, []);

  const handlePractitioner = useCallback((practitionerData, index = null) => {
    setPractitioner({ data: practitionerData, index: index });
  }, []);

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }



  const handleSubmit = async () => {
    if (newPatient) {
      
      const IVR = {
        patient: patient,
        products,
        practitioner,
        eCode,
        iCode,
        admitted,
        placeOfService,
        lCode,
        cdCode,
        cptCode,
        Date: getFormattedDate(),
        vlu,
        mohs,
        diabeticFU,
        cptWound,
        pressureUlcer,
      }
      await five.executeFunction(
        "createNewPatientAndPushToIVR",
        IVR,
        null,
        null,
        null,
        (result) => {
          console.log(result);
          setSubmissionSuccess(true);
        }
      );
    } else if(!existingPatient){
      const IVR = {
        patient: patient?.data?.___PAT,
        products,
        admitted,
        placeOfService,
        practitioner,
        eCode,
        iCode,
        lCode,
        cdCode,
        cptCode,
        Date: getFormattedDate(),
        vlu,
        mohs,
        diabeticFU,
        cptWound,
        pressureUlcer,
      };
      await five.executeFunction(
        "pushToIVR",
        //@ts-ignore
        IVR,
        null,
        null,
        null,
        (result) => {
          console.log(result);
          setSubmissionSuccess(true);
        }
      );
    } else {
      console.log("This should execute on Update")
      const IVR = {
        link: selectedRecord.data.editLink,
        products,
        practitioner,
        eCode,
        admitted,
        placeOfService,
        iCode,
        lCode,
        cdCode,
        cptCode,
        Date: getFormattedDate(),
        vlu,
        mohs,
        diabeticFU,
        cptWound,
        pressureUlcer,
      };
      await five.executeFunction(
        "updateIVR",
        //@ts-ignore
        IVR,
        null,
        null,
        null,
        (result) => {
          console.log(result);
          setSubmissionSuccess(true);
        }
      );
    }

    console.log(IVR);
    
    handleDialogClose();
    await five.executeFunction(
      "submissionSuccessful",
      //@ts-ignore
      IVR,
      null,
      null,
      null,
      //@ts-ignore
      (result) => {
        console.log("Loggin submissionSuccessful")
      }
    );
  };

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  // Revised useEffect
  useEffect(() => {
    //@ts-ignore
    if (five.internal.actionID === "IVR") {
      setDialogOpen(true);
    }
    if (existingPatient && activeStep === 0) {
      setActiveStep(1);
    }
  }, [dialogOpen, existingPatient, activeStep, ivr]);

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
          background: "#266787",
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
        <DialogContent style={{ maxWidth: "100%", overflowX: "hidden" }}>
          {activeStep === 0 && (
            <NewPatient
              data={data}
              handlePatient={handlePatient}
              five={five}
              patient={patient}
              setPatient={setPatient}
              handleNext={handleNext}
              setNewPatient={setNewPatient}
            />
          )}

          {activeStep === 1 && patient &&(
            <PatientDetails
              patient={patient}
              admitted={admitted}
              handleRadioChange={handleRadioChange}
              officeName={officeName}
              placeOfService= {placeOfService}
              setPlaceOfService= {setPlaceOfService}
            />
          )}
          {activeStep === 2 && (
            <Practitioner
              five={five}
              setPractitioner={handlePractitioner}
              practitioner={practitioner}
              existingPatient={existingPatient}
              account={account}
            />
          )}
          {activeStep === 3 && patient &&(
            <Insurance
              patient={patient}
              five={five}
              setPayorsMain={setPayors}
              newPatient={newPatient}
            />
          )}
          {activeStep === 4 && (
            <Products setProducts={setProducts} productsSaved={products} />
          )}
          {activeStep === 5 && (
            <ICDCode
              setLCodeMain={setLCode}
              setICodeMain={setICode}
              setECodeMain={setECode}
              setCDCodeMain={setCDCode}
              setVLU={setVLU}
              setPressureUlcer={setPressureUlcer}
              setMohsMain={setMohs}
              setCPTWound={setCPTWound}
              setDiabeticFU={setDiabeticFU}
              codes={{
                lCode,
                iCode,
                cdCode,
                eCode,
                vlu,
                mohs,
                diabeticFU,
                pressureUlcer,
                cptWound,
              }}
            />
          )}

          {activeStep === 6 && (
            <CPTCode setCPTCodeMain={setCPTCode} cptCodeMain={cptCode} />
          )}
          {activeStep === 7 && (
            <Summary
              patient={patient}
              products={products}
              payors={payors}
              practitioner={practitioner}
              iCode={iCode}
              lCode={lCode}
              eCode={eCode}
              cdCode={cdCode}
              cptCode={cptCode}
              handleSubmit={handleSubmit}
            />
          )}
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
                zIndex: 99,
              }}
            >
              {activeStep === 0 || (existingPatient && activeStep === 1) ? (
                <Button
                  onClick={()=> { five.internal.actionID === "IVR" ? five.previousAction(true, 1) : handleDialogClose()}}
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
                    marginRight: "20px",
                  }}
                >
                  Previous
                </Button>
              )}

              {(activeStep === 7 )? (
                <Button
                  onClick={handleSubmit}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                    margin: "20px",
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                    margin: "20px",
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
        
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
      <Snackbar
        open={submissionSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Submission Successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomField;
