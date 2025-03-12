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

import Lottie from "lottie-react";
import animationData from "./lottieComplete.json";
import { CustomFieldProps } from "../../../common";
import {
  Alert,
  Container,
  DialogContentText,
  Snackbar,
  Zoom,
} from "@mui/material";
import Insurance from "./components/Insurance";
import Products from "./components/Products";
import CPTCode from "./components/CPTCode";
//import Patient from "./components/Patient";
import Practitioner from "./components/Practitioner";
import ICDCode from "./components/ICDCode";
import Summary from "./components/Summary";
import NewPatient from "./components/NewPatient";
import PatientDetails from "./components/PatientDetails";
import { Description, Padding } from "@mui/icons-material";
import UploadDocument from "./components/UploadDocument";

FiveInitialize();
const CustomField = (props: CustomFieldProps) => {
  // Styles for the custom Dialog box that triggers after handle Submit
  const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: "5px",
    fontWeight: "bold",
  }));

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
  const [primaryPractitioner, setPrimaryPractitioner] = useState(null);
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
  const [cptWoundLocation, setCPTWoundLocation] = useState(null);
  const [cptTotalWoundSize, setCPTTotalWoundSize] = useState(null);
  const [snf, setSNF] = useState();
  const [diabeticFU, setDiabeticFU] = useState();
  const [pressureUlcer, setPressureUlcer] = useState({
    location: "",
    side: "",
    severity: "",
    stage: "",
  });
  //@ts-ignore
  const [patient, setPatient] = useState(null);
  const [data, setData] = useState(null);
  //@ts-ignore
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([])
  const [hospice, setHospice] = useState(null);
  const [accountKey, setAccountKey] = useState(null);
  const [account, setAccount] = useState({});
  const [medicare, setMedicare] = useState(null);
  // A state to check if the next button should be displayed or not based on the answer on the medicare Form
  const [preventNext, setPreventNext] = useState(false);
  //@ts-ignore
  const { theme, value, variant, five, formField, selectedRecord } = props;

  //const accountKey = five.stack.Account.AccountKey;

  //@ts-ignore

  const AccountDetails = selectedRecord?.data;

  const totalSteps = 9;
  const existingPatient =
    //@ts-ignore
    five.actionID() !== "IVR" &&
    five.actionID() !== "Accounts" &&
    five.actionID() !== "AccountsDis" &&
    five.actionID() !== "AccountsSalesRep";
  /*   let account;

  if (!existingPatient) {
    let account = {
      AccountKey: selectedRecord?.data?.ACT,
    };
  } */

  const getPrimaryPractitionerData = async (account) => {
    await five.executeFunction(
      "getPrimaryPractitioner",
      //@ts-ignore
      account,
      null,
      null,
      null,
      (result) => {
        const dataPrac = JSON.parse(result.serverResponse.results);
        setPrimaryPractitioner(dataPrac?.response);
      }
    );
  };

  const getPatients = async (account) => {};

  const handleDialogOpen = () => {
    setDialogOpen(true);
    setLoading(true);

    const fetchData = async () => {
      if (existingPatient) {
        setActiveStep(1);
        await five.executeFunction(
          "getIVRDetails",
          //@ts-ignore
          selectedRecord.data,
          null,
          null,
          null,
          (result) => {

            /*  patient: patient?.data?.___PAT,
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
            */


            const data = JSON.parse(result.serverResponse.results);
            const ivr = data.ivr;
            console.log("Logging IVR details -----------------------------------------------------> ",data)
            setIVR(data);
            setAccountKey(ivr.__ACT);
            setAccount({
              AccountKey: ivr.__ACT,
            });
            const accountObj = {
              AccountKey: ivr.__ACT,
            };
            getPrimaryPractitionerData(accountObj);
            handlePatient(data?.patient, null, data?.document);
            setLCode(ivr?.ICD10_L);
            setICode(ivr?.ICD10_I);
            setCPTCode(ivr?.CPTCODE);
            setCPTCode2(ivr?.CPTCODE2);
            setDiabeticFU(ivr?.WoundSubTypeE)
            setMedicare(ivr?.MedicareCoverage);
            setPressureUlcer((prevState) => ({
              ...prevState,
              location: ivr?.WoundSubLocationL,
              side: ivr?.WoundSubSideL,
              severity: ivr?.WoundSubSeverityL,
              stage: ivr?.WoundSubStageL
            }));
            setVLU((prevState) => ({
              ...prevState,
              location: ivr?.WoundSubLocationI,
              condition: ivr?.WoundSubConditionI,
              side: ivr?.SideI,
              inflamation: ivr?.WoundSubInflamationI
            }))
            setCPTWoundLocation(ivr?.WoundLocation)
            setCPTWoundSize(ivr?.WoundSize)
            setCPTWoundSize2(ivr?.WoundSize2)
            setECode(ivr?.ICD10_E);
            setHospice(ivr?.Hospice);
            setProducts(() => ([
              {
               name: data?.product.Description,
               qty: "",
               key: data?.product.___PRD,
               brandname:  data?.product.Brand,
               qcode: data?.product.QCode,
               Description: data?.product.Brand + '-' + data?.product.QCode
              }
            ]))
            setCDCode(ivr?.ICD10_CD);
            handlePractitioner(data?.practitioner);
            setCPTWound(ivr?.WoundType);
            /*setAdmitted(() =>
              ivr?.SNFAttendance ? ivr?.SNFAttendance : false
            ); */
            setAdmitted(ivr?.SNFAttendance);
            setPlaceOfService(ivr?.PlaceofService);
            setLoading(false);
          }
        );
      } else {
        const accountObj = {
          AccountKey: selectedRecord?.data?.ACT,
        };

        setAccount(accountObj);
        getPrimaryPractitionerData(accountObj);
        await five.executeFunction(
          "getAccountPatients",
          //@ts-ignore
          accountObj,
          null,
          null,
          null,
          (result) => {
            setData(JSON.parse(result.serverResponse.results));
            setLoading(false);
          }
        );
      }
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
    setVLU({ condition: "", location: "", side: "", inflamation: "" });
    setMohs("");
    setCPTWound(null);
    setCPTWoundSize(null);
    setCPTCode2(null);
    setCPTWoundSize2(null);
    setCPTWoundLocation(null);
    setCPTTotalWoundSize(null);
    setSNF(undefined);
    setDiabeticFU(undefined);
    setPressureUlcer({ location: "", side: "", severity: "", stage: "" });
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
    setAdmitted(value);
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

    if (practitioner === null) {
      five.showMessage("Please select a valid practitoner for this IVR");
      return 0;
    }

    if (!existingPatient) {
      const IVR = {
        patient: patient?.data?.___PAT,
        products,
        admitted,
        placeOfService,
        practitioner,
        status: complete ? "Submitted" : "Unsubmitted",
        eCode,
        iCode,
        lCode,
        cdCode,
        cptCode,
        cptCode2,
        Date: getFormattedDate(),
        vlu,
        mohs,
        hospice,
        diabeticFU,
        cptWound,
        pressureUlcer,
        cptWoundSize,
        cptWoundSize2,
        cptWoundLocation,
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
        payors,
        pressureUlcer,
        cptWoundSize,
        patient: patient?.data,
      };

      await five.executeFunction(
        "updateIVR",
        //@ts-ignore
        IVR,
        null,
        null,
        null,
        (result) => {}
      );
    }

    const submissionText = {
      message: complete ? "Submission Successful" : "The IVR has been saved.",
    };

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
  }, [dialogOpen, existingPatient, activeStep, ivr, hospice, patient]);

  // Define handleNext and handleBack using useCallback to ensure stability
  const handleNext = useCallback(() => {
    if (activeStep === 1) {
      let flag = 0;
      for (let item of patient.document) {
        if (
          item.Category === "facesheet" ||
          item.Category === "Insurance Front"
        ) {
          flag = 1;
          break;
        }
      }

      if (flag !== 1) {
        five.message(
          "Please be sure to include either a facesheet which includes a pay or policy number or a photo of a Medicare card."
        );
        return 0;
      }
    }

    if (activeStep === 2 && practitioner === null) {
      five.message("Please select a practitioner.");
      return 0;
    }

    if (
      activeStep === 3 &&
      (hospice === null || admitted === null || placeOfService === null)
    ) {
      five.message("Please fill in the required fields.");
      return 0;
    }

    if (
      activeStep === 4 &&
      (patient.data.Pay1MemberNumber === null ||
        patient.data.Pay1MemberNumber === undefined ||
        patient.data.Pay1MemberNumber === "")
    ) {
      five.message(
        "Please specify your member number for your primary insurance."
      );
      return 0;
    }

    if (activeStep === 5 && products?.length < 1) {
      five.message("Please select at least one product.");
      return 0;
    }

    if (activeStep === 6) {
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

    if (activeStep === 7 && (cptCode === null || cptCode === "")) {
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
    patient?.document,
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
        <CircularProgress sx={{ color: "#14706A" }} />
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
          background: "#14706A",
          color: "white",
        }}
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
        <DialogTitle style={{ backgroundColor: "#15706A", color: "white" }}>
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
              )}
              {!existingPatient ? (
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
                  {primaryPractitioner.Email}
                  <br />
                  {AccountDetails.Phone}
                </p>
              ) : null}
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
              <UploadDocument
                patient={patient}
                five={five}
                setPatient={setPatient}
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
                <CircularProgress sx={{ color: "#14706A" }} />
              </Container>
            ))}

          {activeStep === 3 &&
            (patient ? (
              <PatientDetails
                patient={patient}
                admitted={admitted}
                handleRadioChange={handleRadioChange}
                placeOfService={placeOfService}
                setPlaceOfService={setPlaceOfService}
                hospiceMain={hospice}
                snf={snf}
                setHospiceMain={setHospice}
                medicare={medicare}
                setPreventNext={setPreventNext}
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
                <CircularProgress sx={{ color: "#14706A" }} />
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
          {activeStep === 4 && patient && (
            <Insurance
              patient={patient}
              setPatient={setPatient}
              five={five}
              setPayorsMain={setPayors}
              newPatient={newPatient}
              payorExternal={payors}
            />
          )}
          {activeStep === 5 && (
            <Products
              five={five}
              setProducts={setProducts}
              productsSaved={products}
              account={account}
              
            />
          )}
          {activeStep === 6 && (
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

          {activeStep === 7 && (
            <CPTCode
              setCPTCodeMain={setCPTCode}
              cptCodeMain={cptCode}
              setCPTWoundSize={setCPTWoundSize}
              cptWoundSizeMain={cptWoundSize}
              setCPTCode2Main={setCPTCode2}
              cptCode2Main={cptCode2}
              setCPTWoundSize2={setCPTWoundSize2}
              cptWoundSize2Main={cptWoundSize2}
              setCPTWoundLocation={setCPTWoundLocation}
              cptWoundLocationMain={cptWoundLocation}
              setCPTTotalWoundSize={setCPTTotalWoundSize}
              cptTotalWoundSizeMain={cptTotalWoundSize}
            />
          )}
          {activeStep === 8 && (
            <Summary
              account={account}
              patient={patient}
              products={products}
              payors={payors}
              practitioner={practitioner}
              iCode={iCode}
              lCode={lCode}
              five={five}
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
                  background: "#D8EEDA",
                  color: "#157069",
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
                  id="button-save"
                  onClick={() => handleSubmit(false)}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#14706A",
                    color: "white",
                    marginRight: "40px",
                  }}
                >
                  Save
                </Button>
                <Button
                  id="button-previous"
                  onClick={handleBack}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#14706A",
                    color: "white",
                    marginRight: "20px",
                  }}
                >
                  Previous
                </Button>
              </Box>
            )}

            {activeStep === 8 ? (
              <Button
                id="button-submit"
                onClick={() => handleSubmit(true)}
                style={{
                  width: "100px",
                  height: "50px",
                  borderRadius: "0px",
                  background: "#14706A",
                  color: "white",
                  margin: "20px",
                }}
              >
                Submit
              </Button>
            ) : activeStep !== 0 ? (
              activeStep === 2 && preventNext === true ? (
                <></>
              ) : (
                <Button
                  id="button-next"
                  onClick={handleNext}
                  style={{
                    width: "100px",
                    height: "50px",
                    borderRadius: "0px",
                    background: "#14706A",
                    color: "white",
                    margin: "20px",
                  }}
                >
                  Next
                </Button>
              )
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
      <Dialog
        open={customDialogOpen}
        onClose={handleCustomDialogClose}
        TransitionComponent={Zoom}
        id="lottie-dialog-box"
      >
        <DialogTitle id="lottie-dialog-title">Submission</DialogTitle>
        <CustomDialogContent>
          <DialogContentText>
            <Lottie
              id="lottie-dialog-animation"
              animationData={animationData}
              style={{ height: 200, width: 200 }}
              loop={false}
            />
          </DialogContentText>
        </CustomDialogContent>
        <DialogActions>
          <Button
            id="lottie-button-ok"
            onClick={handleCustomDialogClose}
            style={{ color: "#14706A" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomField;
