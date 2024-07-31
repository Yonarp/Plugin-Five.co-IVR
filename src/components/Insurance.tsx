//@ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import { Box, Button, List, ListItem } from "../FivePluginApi";
import InsuranceDetail from "./InsuranceDetail";
import { Delete } from "@mui/icons-material";

const Insurance = React.memo(
  ({ patient, five, setPayorsMain, newPatient, setPatient }) => {
    const [selectedPayors, setSelectedPayors] = useState([]);
    //@ts-ignore
    const [selectedPayor, setSelectedPayor] = useState(null);
    const [payors, setPayors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [insuranceIndex, setInsuranceIndex] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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

    const returnMemberNumber = (index) => {
      console.log("From return Member number we get this  -->", index);
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
      if (isEdit) {
        console.log("Reached here", payorData);
        setPayors((prevPayors) =>
          prevPayors.map((p) => (p.___PAY === payorData.___PAY ? payorData : p))
        );

        const payorObj = {
          payor: payorData,
          patient: patient?.data,
          index: index
        };

        await five.executeFunction(
          "updatePayer",
          payorObj,
          null,
          null,
          null,
          //@ts-ignore
          (result) => {
            const payorData = JSON.parse(result.serverResponse.results);
            setPatient({data: payorData.response})
          }
        );
      } else {
        setPayors((prevPayor) => [...prevPayor, payorData]);
        const payorObj = {
          payor: payorData,
          patient: patient?.data,
        };
        await five.executeFunction(
          "pushPayer",
          payorObj,
          null,
          null,
          null,
          //@ts-ignore
          (result) => {
            const payorData = JSON.parse(result.serverResponse.results);
            setPatient({data: payorData.response})
          }
        );
      }
      setSelectedPayors([]);
    };

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
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
        setPayors(payorArray);
        setSelectedPayors(payorArray)
        setPayorsMain(payorArray)
        setLoading(false);
      };

      fetchData();
      console.log("Patient from Insurance", patient);
    }, [patient]);

    console.log("From Insurance Component", payors);
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
      <Container style={{ height: "100%", width: "100%", color: "black" }}>
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
          <Typography variant="body1" mt={5} style={{ textAlign: "center", marginBottom: "20px" }}> 
            Each payor must contain a member number.
          </Typography>
          <List>
            {payors
              ? payors.map((payor, index) => (
                  <Box
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
                      primary={index === 0 ? 'Primary' : 'Secondary'}
                      sx={{flex:0.2, width: '15%'}}
                      />
                      <ListItemText
                        sx={{fontSize: '1rem'}}
                        primary={payor?.CompanyName}
                        secondary={
                          index === 0
                            ? patient.data?.Pay1MemberNumber
                            : patient.data?.Pay2MemberNumber
                        }
                      />
                    </ListItem>
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInsuranceIndex(index);
                        handleDialogOpen(payor, true);
                      }}
                    >
                      Edit
                    </Button>
                    <Delete
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
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDialogOpen(null, false);
                }}
              >
                Add
              </Button>
            ) : null
          }
          <InsuranceDetail
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
