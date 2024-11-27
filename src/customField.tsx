//@ts-nocheck

//TODO: Remember to update FDF functions: pushPayer, getall

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
import { Alert, Container, DialogContentText, Snackbar, Zoom } from "@mui/material";
import Insurance from "./components/Insurance";
import Products from "./components/Products";
import CPTCode from "./components/CPTCode";
//import Patient from "./components/Patient";
import Practitioner from "./components/Practitioner";
import ICDCode from "./components/ICDCode";
import Summary from "./components/Summary";
import NewPatient from "./components/NewPatient";
import PatientDetails from "./components/PatientDetails";
import { Padding } from "@mui/icons-material";

FiveInitialize();
const CustomField = (props: CustomFieldProps) => {

  // Styles for the custom Dialog box that triggers after handle Submit
  const CustomDialogContent = styled(DialogContent)(({theme}) => ({
    padding: '5px',
    fontWeight: 'bold'

  }))








  // Initialize states
  const [activeStep, setActiveStep] = useState(0);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [page, setPage] = useState(0); //pages for NewPatient component
  const [formState, setFormState] = useState({
    NameFirst: "",
    NameLast: "",
    Gender: "",
    Birthdate: "",
    AddressStreet: "",
    AddressStreet2: "",
    AddressCity: "",
    AddressState: "",
    AddressZip: "",
  }); // form for Newpatient
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
  const [cptCode2, setCPTCode2] = useState(null);
  const [vlu, setVLU] = useState({ condition: "", location: "", type: "" });
  const [mohs, setMohs] = useState("");
  const [cptWound, setCPTWound] = useState(null);
  const [cptWoundSize, setCPTWoundSize] = useState(null);
  const [cptWoundSize2, setCPTWoundSize2] = useState(null);
  const [snf, setSNF] = useState();
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
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [hospice, setHospice] = useState(null);
  const [medicare, setMedicare] = useState(null);
  //@ts-ignore
  const { theme, value, variant, five, formField, selectedRecord } = props;

  //const accountKey = five.stack.Account.AccountKey;

  //@ts-ignore

  const account = {
    AccountKey: selectedRecord?.data?.ACT,
  };

  const AccountDetails = selectedRecord?.data;

  const totalSteps = 8;
  const existingPatient =
    //@ts-ignore
    five.actionID() !== "IVR" && five.actionID() !== "Accounts";

  const handleDialogOpen = () => {
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
            setAdmitted(() =>
              ivr?.SNFAttendance ? ivr?.SNFAttendance : false
            );
            setPlaceOfService(ivr?.PlaceofService);
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
    }

    fetchData();

    //@ts-ignore
  };

  const resetForm = () => {
    setActiveStep(0);
    setPage(0);
    setAdmitted(null);
    setPlaceOfService(null);
    setPatientSelected(true);
    setIVR({});
    setPayors([]);
    setProducts([]);
    setPractitioner(null);
    setNewPatient(false);
    setICode(null);
    setLCode(null);
    setECode(null);
    setCDCode(null);
    setCPTCode(null);
    setVLU({ condition: "", location: "", type: "" });
    setMohs("");
    setCPTWound(null);
    setCPTWoundSize(null);
    setSNF(undefined);
    setDiabeticFU(undefined);
    setPressureUlcer({ location: "", side: "", severity: "" });
    setPatient(null);
    setData(null);
    setMembers(null);
    setLoading(false);
    setSubmissionSuccess(false);
    setReadyToSubmit(false);
    setHospice(null);
    setMedicare(null);
    setFormState({
      NameFirst: "",
      NameLast: "",
      Gender: "",
      Birthdate: "",
      AddressStreet: "",
      AddressStreet2: "",
      AddressCity: "",
      AddressState: "",
      AddressZip: "",
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm();
  };

  const handleCloseOutsideClick = (event, reason) => {
    if (reason !== "backdropClick") {
      handleDialogClose();
    }
  };

  //@ts-ignore

  const handleRadioChange = useCallback((value) => {
    setAdmitted(value === "Yes");
  }, []);
  //@ts-ignore
  const handlePatientSelected = useCallback(() => {
    setPatientSelected(true);
  }, []);

  const handlePatient = useCallback((patientData, index = null, document) => {
    setPatient({ data: patientData, index: index, document: document });
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

  const handleSubmit = async (complete) => {
    if (!readyToSubmit && complete) {
      setSubmissionSuccess(true);
      return 0;
    }

    if (!existingPatient) {
      const IVR = {
        patient: patient?.data?.___PAT,
        products,
        admitted,
        placeOfService,
        practitioner,
        status: complete ? "Pending" : "Unsubmitted",
        eCode,
        iCode,
        lCode,
        cdCode,
        cptCode,
        cptCode2,
        Date: getFormattedDate(),
        vlu,
        mohs,
        diabeticFU,
        cptWound,
        pressureUlcer,
        cptWoundSize,
        cptWoundSize2,
        payors,
        AccountKey: selectedRecord?.data?.ACT,
      };

      await five.executeFunction(
        "pushToIVR",
        //@ts-ignore
        IVR,
        null,
        null,
        null,
        (result) => {
          setSubmissionSuccess(true);
        }
      );
    } else {
      console.log("This should execute on Update");

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
        cptWoundSize,
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
        }
      );
    }

    console.log(IVR);

    const submissionText = {
      message: complete ? "Submission Successful" : "The IVR has been saved.",
    };

    /*     await five.executeFunction(
      "submissionSuccessful",
      //@ts-ignore
      submissionText,
      null,
      null,
      null,
      //@ts-ignore
      (result) => {
        console.log("Loggin submissionSuccessful");
      }
    );
 */

    setSubmissionText(submissionText.message);
    setCustomDialogOpen(true);

    if (five.internal.actionID === "IVR") {
      five.previousAction(true, 1);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmissionSuccess(false);
  };

  const handleCustomDialogClose = () => {
    setCustomDialogOpen(false);
    handleDialogClose();
  };

  // Revised useEffect
  useEffect(() => {
    //@ts-ignore
    if (five.internal.actionID === "IVR") {
      handleDialogOpen();
    }
    if (existingPatient && activeStep === 0) {
      setActiveStep(1);
    }
  }, [dialogOpen, existingPatient, activeStep, ivr, hospice]);

  // Define handleNext and handleBack using useCallback to ensure stability
  const handleNext = useCallback(() => {
    if (
      activeStep === 1 &&
      (hospice === null || admitted === null || placeOfService === null)
    ) {
      five.message("Please fill in the required fields.");
      return 0;
    }

    if (activeStep === 2 && practitioner === null) {
      five.message("Please select a practitioner.");
      return 0;
    }

    if (
      activeStep === 3 &&
      (patient.data.Pay1MemberNumber === null ||
        patient.data.Pay1MemberNumber === undefined ||
        patient.data.Pay1MemberNumber === "")
    ) {
      five.message(
        "Please specify your member number for your primary insurance."
      );
      return 0;
    }

    if (activeStep === 4 && products.length < 1) {
      five.message("Please select atleast one product.");
      return 0;
    }

    if (activeStep === 5) {
      console.log(
        "logging the details required",
        cptWound,
        typeof eCode,
        lCode
      );

      if (cptWound === null || cptWound === "") {
        five.message("Please specify the wound type");
        return 0;
      }

      if (cptWound === "Diabetic foot ulcer") {
        if (eCode === "" || lCode === "") {
          five.message("Please select an E-Code and a L-Code.");
          return 0;
        }
      }

      if (cptWound === "Venous leg ulcer") {
        if (iCode === "" || lCode === "") {
          five.message("Please select an I-Code and a L-Code.");
          return 0;
        }
      }

      if (cptWound === "Pressure ulcer") {
        if (lCode === "") {
          five.message("Please select a L-Code.");
          return 0;
        }
      }
      if (cptWound === "Mohs") {
        if (cdCode === "") {
          five.message("Please select a C/D Code");
          return 0;
        }
      }
    }

    if (activeStep === 6 && (cptCode === null || cptCode === "")) {
      five.message("Please select a CPT Code.");
      return 0;
    }

    if (activeStep < totalSteps - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  }, [
    activeStep,
    totalSteps,
    hospice,
    admitted,
    placeOfService,
    practitioner,
    patient?.data?.Pay1MemberNumber,
    products,
    cptWound,
    eCode,
    lCode,
    iCode,
    cdCode,
    cptCode,
  ]);

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

  console.log(
    "Logging CPT Wounds and Codes from Main",
    cptWoundSize,
    cptWoundSize2,
    cptCode,
    cptCode2
  );

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
        onClose={handleCloseOutsideClick}
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
          {patient ? (
            <div
              className="patient-details"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "5%",
                margin: "20px 0",
              }}
            >
              {patient ? (
                <p>
                  <strong>
                    {patient?.data?.NameFirst + " " + patient?.data?.NameLast}
                  </strong>
                  <br />
                  {patient?.data.AddressStreet +
                    " " +
                    (patient.data.AddressStreet2
                      ? patient?.data.AddressStreet2
                      : "")}
                  <br />
                  {patient?.data.AddressCity +
                    " " +
                    patient?.data.AddressState +
                    " " +
                    patient?.data.AddressZip}
                </p>
              ) : (
                <></>
              )}{" "}
              <p>
                <strong>{AccountDetails.OfficeName}</strong>
                <br />
                {AccountDetails.AddressStreet}
                <br />
                {AccountDetails.AddressCity +
                  ", " +
                  AccountDetails.AddressState +
                  " " +
                  AccountDetails.AddressZip}
                <br />
                {AccountDetails.Email}
                <br />
                {AccountDetails.Phone}
              </p>
            </div>
          ) : null}
          {activeStep === 0 && (
            <NewPatient
              data={data}
              setMainForm={setFormState}
              mainForm={formState}
              handlePatient={handlePatient}
              five={five}
              page={page}
              setPage={setPage}
              patient={patient}
              setPatient={setPatient}
              handleNext={handleNext}
              handleDialogCloseExternal={handleDialogClose}
              setNewPatient={setNewPatient}
              account={account}
            />
          )}

          {activeStep === 1 &&
            (patient ? (
              <PatientDetails
                patient={patient}
                admitted={admitted}
                handleRadioChange={handleRadioChange}
                placeOfService={placeOfService}
                setPlaceOfService={setPlaceOfService}
                hospiceMain={hospice}
                setHospiceMain={setHospice}
                medicare={medicare}
                setMedicare={setMedicare}
              />
            ) : (
              <Container
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Container>
            ))}
          {activeStep === 2 && (
            <Practitioner
              five={five}
              setPractitioner={handlePractitioner}
              practitioner={practitioner}
              existingPatient={existingPatient}
              account={account}
            />
          )}
          {activeStep === 3 && patient && (
            <Insurance
              patient={patient}
              setPatient={setPatient}
              five={five}
              setPayorsMain={setPayors}
              newPatient={newPatient}
              payorExternal={payors}
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
            <CPTCode
              setCPTCodeMain={setCPTCode}
              cptCodeMain={cptCode}
              setCPTWoundSize={setCPTWoundSize}
              setCPTCode2Main={setCPTCode2}
              setCPTWoundSize2={setCPTWoundSize2}
            />
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
              admitted={admitted}
              npi={AccountDetails?.NPI}
              handleSubmit={handleSubmit}
              setReadyToSubmit={setReadyToSubmit}
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
            {activeStep === 0 ? null : existingPatient && activeStep === 1 ? (
              <Button
                onClick={() => {
                  five.internal.actionID === "IVR"
                    ? five.previousAction(true, 1)
                    : handleDialogClose();
                }}
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
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleSubmit(false)}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#285C79",
                    color: "white",
                    marginRight: "40px",
                  }}
                >
                  Save
                </Button>
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
              </Box>
            )}

            {activeStep === 7 ? (
              <Button
                onClick={() => handleSubmit(true)}
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
            ) : activeStep !== 0 ? (
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
            ) : null}
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
        <Snackbar
          open={submissionSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ zIndex: "99" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Please Accept The Terms Before Submitting
          </Alert>
        </Snackbar>
      </Dialog>
      <Dialog open={customDialogOpen} onClose={handleCustomDialogClose} TransitionComponent={Zoom}>
        <DialogTitle>Submission</DialogTitle>
        <CustomDialogContent>
          <DialogContentText>{submissionText}</DialogContentText>
        </CustomDialogContent>
        <DialogActions>
          <Button onClick={handleCustomDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomField;
