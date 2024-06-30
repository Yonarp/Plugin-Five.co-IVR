import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  /* MenuItem ,*/ /* Select, */ Typography,
} from "../FivePluginApi";
import InsuranceDetail from "./InsuranceDetail";

//@ts-ignore
const Insurance = ({ patient, five, setPayorsMain, newPatient }) => {
  const [selectedPayors, setSelectedPayors] = useState([]);
  //@ts-ignore
  const [selectedPayor, setSelectedPayor] = useState(null);
  const [payors, setPayors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  console.log("Logginf from Insurance", payors);
  console.log("Logginf from Insurance Patients", patient);

  const handleDialogOpen = (payor = null, isEdit) => {
    setSelectedPayor(payor);
    setIsEdit(isEdit);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePayorClick = (payor) => {
    const isSelected = selectedPayors.some((p) => p.PayorID === payor.PayorID);

    if (isSelected) {
      setSelectedPayors(
        selectedPayors.filter((p) => p.PayorID !== payor.PayorID)
      );
      setPayorsMain(selectedPayors.filter((p) => p.PayorID !== payor.PayorID));
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

  const handlePayor = async (payor) => {
    if (isEdit) {
      console.log("Reached here", payor);
      setPayors((prevPayors) =>
        prevPayors.map((p) => (p.PayorID === payor.PayorID ? payor : p))
      );

      await five.executeFunction(
        "updatePayer",
        payor,
        null,
        null,
        null,
        //@ts-ignore
        (result) => {
          setPayors(null);
        }
      );
      setSelectedPayors([]);
    } else {
      setPayors((prevPayor) => [...prevPayor, payor]);
      /*    setLoading(true);
      const payorData = {
        payor: payor,
        patient: patient?.data?.___PAT,
      };
      await five.executeFunction(
        "pushPayer",
        payorData,
        null,
        null,
        null,
        //@ts-ignore
        (result) => {
         
        }
      ); */
      setSelectedPayors([]);
    }
  };

  useEffect(() => {
    console.log("Fetching from Insurance");

    if (payors === null) {
      setLoading(true);
      const fetchData = async () => {
        if (patient?.data.__PAY1 === null || patient === null) {
          setLoading(false);
        } else {
          let payorArray = [];
          if (newPatient) {
            const payorObj = {
              PayKey: patient?.data?.__PAY1,
            };
            await five.executeFunction(
              "getPatientInsurance",
              payorObj,
              null,
              null,
              null,
              (result) => {
                const payorData = JSON.parse(result.serverResponse.results);
                //setPayors(payorData.response.value);
                payorArray.push(payorData.response.value[0]);
                if (payorData) {
                  setPayors(payorArray);
                }
                if (patient?.data.__PAY2 === null) {
                  setLoading(false);
                }
              }
            );
          } else {
            if (
              patient.data.__PAY1 !== null ||
              patient.data.__PAY1 !== undefined
            ) {
              console.log("Patient Key", patient.data.__PAY1);
              const payorObj = {
                PayKey: patient?.data?.__PAY1,
              };
              await five.executeFunction(
                "getPatientInsurance",
                payorObj,
                null,
                null,
                null,
                (result) => {
                  const payorData = JSON.parse(result.serverResponse.results);
                  //setPayors(payorData.response.value);
                  payorArray.push(payorData.response.value[0]);
                  if (payorData) {
                    setPayors(payorArray);
                  }
                  if (patient?.data.__PAY2 === null) {
                    setLoading(false);
                  }
                }
              );
            }
            if (
              patient.data.__PAY2 !== null ||
              patient.data.__PAY1 !== undefined
            ) {
              const payorObj = {
                PayKey: patient?.data?.__PAY2,
              };
              await five.executeFunction(
                "getPatientInsurance",
                payorObj,
                null,
                null,
                null,
                (result) => {
                  const payorData = JSON.parse(result.serverResponse.results);
                  //setPayors(payorData.response.value);
                  payorArray.push(payorData.response.value[0]);
                  if (payorData) {
                    setPayors(payorArray);
                  }
                  setLoading(false);
                }
              );
            }
          }

          console.log("Loggin Payor Array From insurance", payorArray);
        }
      };
      fetchData();
    }
  }, [payors]);

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
    <Container style={{ width: "100%", height: "100%" }}>
      <Typography
        variant="h5"
        mt={6}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select the insurance payors in the order they should be billed.
      </Typography>
      <List>
        {payors ? (
          payors.map((payor, index) => (
            <Box
              key={payor?.PayorID || index}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ListItem
                button
                onClick={() => handlePayorClick(payor)}
                selected={selectedPayors.some(
                  (p) => p.PayorID === payor.PayorID
                )}
                sx={{
                  borderBottom: "1px solid #00000033",
                  "&.Mui-selected": {
                    backgroundColor: "#F4F8D0",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "lightblue",
                    },
                  },
                  flex: 1,
                }}
              >
                <ListItemText
                  primary={payor?.CompanyName}
                  secondary={payor?.PayorID}
                />
              </ListItem>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDialogOpen(payor, true);
                }}
              >
                Edit
              </Button>
              <InsuranceDetail
                dialogOpenExternal={dialogOpen}
                onClose={handleDialogClose}
                payor={selectedPayor}
                handlePayor={handlePayor}
                isEdit={isEdit}
              />
            </Box>
          ))
        ) : (
          <Container
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column", // Ensure centering both horizontally and vertically
            }}
          >
            <Typography variant="body1">
              No Insurance found for this Patient
            </Typography>
          </Container>
        )}
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

      {selectedPayors.map((payor, index) => (
        <div key={index}>
          <Typography variant="subtitle1" gutterBottom>
            <strong>{getPayorLabel(index)}</strong>
          </Typography>
          <Typography variant="body1">{payor?.CompanyName}</Typography>
        </div>
      ))}
    </Container>
  );
};

export default Insurance;
