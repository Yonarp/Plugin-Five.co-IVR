//@ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import { Box, Button, List, ListItem, TextField } from "../FivePluginApi";
import InsuranceDetail from "./InsuranceDetail";
import { Delete } from "@mui/icons-material";

const Insurance = React.memo(
  ({ patient, five, setPayorsMain, newPatient, setPatient, payorExternal }) => {
    const [selectedPayors, setSelectedPayors] = useState([]);
    //@ts-ignore
    const [selectedPayor, setSelectedPayor] = useState(null);
    const [payors, setPayors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [insuranceIndex, setInsuranceIndex] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [primaryMemberNumber, setPrimaryMemberNumber] = useState(null);
    const [secondaryMemberNumber, setSecondaryMemberNumber] = useState(null);
    const [primaryGroupNumber, setPrimaryGroupNumber] = useState("");
    const [secondaryGroupNumber, setSecondaryGroupNumber] = useState("");

    const handleDialogOpen = (payor = null, isEdit) => {
      setSelectedPayor(payor);
      setIsEdit(isEdit);
      setDialogOpen(true);
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    const handlePayorClick = (payor) => {
      const isSelected = selectedPayors.some(
        (p) => p.PayorID === payor.PayorID
      );

      if (isSelected) {
        setSelectedPayors(
          selectedPayors.filter((p) => p.PayorID !== payor.PayorID)
        );
        setPayorsMain(
          selectedPayors.filter((p) => p.PayorID !== payor.PayorID)
        );
      } else {
        if (selectedPayors.length < 3) {
          setSelectedPayors([...selectedPayors, payor]);
          setPayorsMain([...selectedPayors, payor]);
        }
      }
    };
    console.log("Logging Set Payors Main", payorExternal, payors)
    const getPayorLabel = (index) => {
      switch (index) {
        case 0:
          return "Primary payor";
        case 1:
          return "Secondary payor";
        case 2:
          return "Tertiary payor";
        default:
          return null;
      }
    };

    const handleMemberNumberChange = (event, index) => {
      if (index === 0) {
        setPrimaryMemberNumber(event.target.value);
        setPayors((prevState) => [...prevState]);
        setPatient((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            Pay1MemberNumber: event.target.value,
          },
        }));
      } else {
        setSecondaryMemberNumber(event.target.value);
        setPatient((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            Pay2MemberNumber: event.target.value,
          },
        }));
      }
    };

    const returnMemberNumber = (index) => {
     
      return index === 0
        ? patient.data?.Pay1MemberNumber
        : patient.data?.Pay2MemberNumber;
    };

    const handleDelete = async (payor, index) => {
      const deleteObj = {
        patientKey: patient?.data?.___PAT,
        index: index,
      };

      await five.executeFunction(
        "DeleteInsurance",
        deleteObj,
        null,
        null,
        null,
        //@ts-ignore
        (result) => {
          setPayors(
            payors.filter((payorItem) => {
              return payorItem.___PAY !== payor.___PAY;
            })
          );
          setPayorsMain(
            payors.filter((payorItem) => {
              return payorItem.___PAY !== payor.___PAY;
            })
          );
          if (index === 0) {
            setPatient((prevState) => ({
              ...prevState,
              data: {
                ...prevState.data,
                __PAY1: null,
              },
            }));
          } else if (index === 1) {
            setPatient((prevState) => ({
              ...prevState,
              data: {
                ...prevState.data,
                __PAY2: null,
              },
            }));
          }
        }
      );
    };

    const handlePayor = async (payorData, index) => {
      setLoading(true);
      if (isEdit) {
        setPayors((prevPayors) =>
          prevPayors.map((p) => (p.___PAY === payorData.___PAY ? payorData : p))
        );

        const payorObj = {
          payor: payorData,
          patient: patient?.data,
          index: index,
        };

        try {
          const result = await new Promise((resolve, reject) => {
            five.executeFunction(
              "updatePayer",
              payorObj,
              null,
              null,
              null,
              (result) => {
                resolve(result);
              },
              (error) => {
                reject(error);
              }
            );
          });

          const payorDataResult = JSON.parse(result.serverResponse.results);
          let documentFront = payorDataResult.document[0]?.response;
          let documentBack = payorDataResult.document[1]?.response;
          const newDocuments = [];

          if (documentFront) newDocuments.push(documentFront);
          if (documentBack) newDocuments.push(documentBack);
          setPatient((prevPatient) => ({
            data: payorDataResult.results.response,
            document: [...prevPatient.document, ...newDocuments],
          }));
        } catch (error) {
          console.error("Error updating payor:", error);
        } finally {
          setLoading(false); // End the loading state
        }
      } else {
        setPayors((prevPayor) => [...prevPayor, payorData]);
        const payorObj = {
          payor: payorData,
          patient: patient?.data,
        };
        try {
          const result = await new Promise((resolve, reject) => {
            five.executeFunction(
              "pushPayer",
              payorObj,
              null,
              null,
              null,
              (result) => {
                resolve(result);
              },
              (error) => {
                reject(error);
              }
            );
          });

          const payorDataResult = JSON.parse(result.serverResponse.results);
          let documentFront = payorDataResult.document[0]?.response;
          let documentBack = payorDataResult.document[1]?.response;
          const newDocuments = [];

          if (documentFront) newDocuments.push(documentFront);
          if (documentBack) newDocuments.push(documentBack);
          setPatient((prevPatient) => ({
            data: payorDataResult.results.response,
            document: [...prevPatient.document, ...newDocuments],
          }));
        } catch (error) {
          console.error("Error adding payor:", error);
        } finally {
          setLoading(false); // End the loading state
        }
      }
      setSelectedPayors([]);
    };

    useEffect(() => {
      setLoading(true);

      const fetchData = async () => {
        const payorKeys = [patient?.data?.__PAY1, patient?.data?.__PAY2].filter(
          Boolean
        );
        const payorPromises = payorKeys.map((payorKey) => {
          const payorObject = { PayKey: payorKey };
          return new Promise((resolve) => {
            five.executeFunction(
              "getPatientInsurance",
              payorObject,
              null,
              null,
              null,
              (result) => {
                const payorData = JSON.parse(result.serverResponse.results);
                resolve(payorData.response.value[0]);
              }
            );
          });
        });

        const payorArray = await Promise.all(payorPromises);
        setPrimaryMemberNumber(patient.data?.Pay1MemberNumber || "");
        setSecondaryMemberNumber(patient.data?.Pay2MemberNumber || "");
        setPrimaryGroupNumber(patient.data?.Pay1Group || "");
        setSecondaryGroupNumber(patient.data?.Pay2Group || "");

        setPayors(payorArray);
        setSelectedPayors(payorArray);
        setPayorsMain(payorArray);
        setLoading(false);
        
      };

      fetchData();
      
    }, [patient]);

  
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
          <CircularProgress sx={{color:"#14706A"}} />
        </Container>
      );
    }
    return (
      <Container id="insurance-container" style={{ height: "100%", width: "100%", color: "black" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            mt={5}
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Select An Insurance
          </Typography>
          <Typography
            variant="body1"
            mt={5}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Each payor must contain a member number.
          </Typography>
          <List id="insurance-list">
            {payors
              ? payors.map((payor, index) => (
                  <Box
                    id={`insurance-item-${index}`}
                    key={payor?.PayorID || index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItem
                      button
                      sx={{
                        borderBottom: "1px solid #00000033",
                        flex: 1,
                      }}
                    >
                      <ListItemText
                        primary={index === 0 ? "Primary" : "Secondary"}
                        sx={{ flex: 0.2, width: "15%", marginTop: "10px" }}
                      />
                      <ListItemText
                        sx={{ fontSize: "1rem", flex: 1, marginTop: "10px" }}
                        primary={payor?.CompanyName}
                        secondary={
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            sx={{ marginBottom: "16px" }}
                          >
                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "0.875rem",
                                  marginRight: "8px",
                                  color: "#555",
                                }}
                              >
                                Member Number:
                              </Typography>
                              <TextField
                                id={`member-number-${index}`}
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: true,
                                }}
                                variant="standard"
                                placeholder="Enter Group Number"
                                value={
                                  index === 0
                                    ? primaryMemberNumber
                                    : secondaryMemberNumber
                                }
                                sx={{
                                  minWidth: "200px",
                                  backgroundColor: "transparent",
                                  input: {
                                    padding: "1px 4px",
                                    fontSize: "0.875rem",
                                  },
                                }}
                              />
                            </Box>

                            <Box
                              display="flex"
                              flexDirection="row"
                              alignItems="center"
                              mt={1}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "0.875rem",
                                  marginRight: "8px",
                                  color: "#555",
                                }}
                              >
                                Group Number:
                              </Typography>
                              <TextField
                                id={`group-number-${index}`}
                                InputProps={{
                                  disableUnderline: true,
                                  readOnly: true,
                                }}
                                variant="standard"
                                placeholder="Enter Group Number"
                                value={
                                  index === 0
                                    ? primaryGroupNumber
                                    : secondaryGroupNumber
                                }
                                sx={{
                                  minWidth: "200px",
                                  backgroundColor: "transparent",
                                  input: {
                                    padding: "1px 4px",
                                    fontSize: "0.875rem",
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Button
                      id={`edit-insurance-${index}`}
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInsuranceIndex(index);
                        handleDialogOpen(payor, true);
                      }}
                      style={{
                        borderRadius: "0px",
                        background: "#D8EEDA",
                        color: "#157069",
                        borderColor: "#F1FAF3"
                      }}
                    >
                      Edit
                    </Button>
                    <Delete
                      id={`delete-insurance-${index}`}
                      style={{
                        fill: "#EC5750",
                        color: "#EC5750",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                      onClick={() => handleDelete(payor, index)}
                    />
                  </Box>
                ))
              : null}
          </List>
          {
            //@ts-ignore
            payors === null || payors?.length <= 1 ? (
              <Button
                id="add-insurance-btn"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDialogOpen(null, false);
                }}
                style={{
                  borderRadius: "0px",
                  background: "#D8EEDA",
                  color: "#157069",
                  borderColor: "#F1FAF3"
                }}
              >
                Add
              </Button>
            ) : null
          }
          <InsuranceDetail
            setLoading={setLoading}
            dialogOpenExternal={dialogOpen}
            onClose={handleDialogClose}
            payor={selectedPayor}
            handlePayor={handlePayor}
            handlePayorMain={setPayorsMain}
            isEdit={isEdit}
            patient={patient}
            index={insuranceIndex}
          />
        </Box>
      </Container>
    );
  }
);

export default Insurance;
