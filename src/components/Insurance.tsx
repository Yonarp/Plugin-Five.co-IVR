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

const Insurance = React.memo(({ patient, five, setPayorsMain, newPatient }) => {
  const [selectedPayors, setSelectedPayors] = useState([]);
  //@ts-ignore
  const [selectedPayor, setSelectedPayor] = useState(null);
  const [payors, setPayors] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handlePayor = async (payorData) => {
    if (isEdit) {
      console.log("Reached here", payorData);
      setPayors((prevPayors) =>
        prevPayors.map((p) => (p.___PAY === payorData.___PAY ? payorData : p))
      );

      await five.executeFunction(
        "updatePayer",
        payorData,
        null,
        null,
        null,
        //@ts-ignore
        (result) => {
        }
      );
    } else {
      setPayors((prevPayor) => [...prevPayor, payorData]);
      const payorObj = {
        payor: payorData,
        patient: patient?.data?.___PAT,
      };
      await five.executeFunction(
        "pushPayer",
        payorObj,
        null,
        null,
        null,
        //@ts-ignore
        (result) => {
         
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
      setLoading(false);
    };

    fetchData();
    console.log("Patient from Insurance", patient)
  }, [patient]);


  useEffect(() => {
    // Perform any additional actions or trigger a re-render when payors state changes
  }, [payors]);

  console.log("Payors", payors);
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
        <Typography variant="h5" mt={5}  style={{ textAlign: "center", marginBottom: "20px" }}>Select An Insurance</Typography>
        <List>
          {payors
            ? payors.map((payor, index) => (
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
                      secondary={index === 0 ? patient.data?.Pay1MemberNumber : patient.data?.Pay2MemberNumber}
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

        {selectedPayors.map((payor, index) => (
          <div key={index}>
            <Typography variant="subtitle1" gutterBottom>
              <strong>{getPayorLabel(index)}</strong>
            </Typography>
            <Typography variant="body1">{payor?.CompanyName}</Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
});

export default Insurance;
