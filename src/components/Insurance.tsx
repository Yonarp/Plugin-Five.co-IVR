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
  console.log("From Insurance", patient);
  const [selectedPayors, setSelectedPayors] = useState([]);
  //@ts-ignore
  const [selectedPayor, setSelectedPayor] = useState(null)
  const [payors, setPayors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleDialogOpen = (payor) => {
    setSelectedPayor(payor)
    setDialogOpen(true)
  }

  const handleDialogClose  = () => {
    setDialogOpen(false)
  }


  const handlePayorClick = (payor) => {
    const isSelected = selectedPayors.some((p) => p.PayorID === payor.PayorID);

    if (isSelected) {
      setSelectedPayors(
        selectedPayors.filter((p) => p.PayorID !== payor.PayorID)
      );
    } else {
      if (selectedPayors.length < 3) {
        setSelectedPayors([...selectedPayors, payor]);
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

  useEffect(() => {
    if (payors === null) {
      setLoading(true);
      const fetchData = async () => {
        if (
          (patient?.data.__PAY1 === null &&
            patient?.data.__PAY2 === null &&
            patient?.data.__PAY3 === null) ||
          patient === null
        ) {
          setLoading(false);
        } else {
          let payorArray = [];
          if (patient.data.__PAY1 !== null) {
            const payorObj = {
              PayKey: patient.data.__PAY1,
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
                //setLoading(false);
              }
            );
          }
          if (patient.data.__PAY2 !== null) {
            const payorObj = {
              PayKey: patient.data.__PAY2,
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
                //setLoading(false);
              }
            );
          }
          if (patient.data.__PAY3 !== null) {
            const payorObj = {
              PayKey: patient.data.__PAY3,
            };
            await five.executeFunction(
              "getPatientInsurance",
              payorObj,
              null,
              null,
              null,
              (result) => {
                const payorData = JSON.parse(result.serverResponse.results);
                // setPayors(payorData.response.value);
                payorArray.push(payorData.response.value[0]);
                //setLoading(false);
              }
            );
          }
          setPayors(payorArray);
          console.log('Loggin Payor Array From insurance',payorArray)
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

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
  <Typography variant="h5"   mt={6}  style={{ textAlign: "center", marginBottom: "20px" }}>
    Select the insurance payors in the order they should be billed.
  </Typography>
  <List>
    {
      //@ts-ignore
      newPatient ? (<Container
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",  // Ensure centering both horizontally and vertically
        }}
      >
        <Typography variant="body1">
          No Insurance found for this Patient
        </Typography>
      </Container>) : payors ? (
        payors.map((payor, index) => (
          <Box style={{
            display:'flex',
            flexDirection: "row",
          }}>
          <ListItem
            key={index}
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
           
          </ListItem >
          <Button variant="outlined" onClick={(e) => {
            e.stopPropagation();
            handleDialogOpen(payor);
          }}>
              Edit
            </Button>
            <InsuranceDetail dialogOpenExternal={dialogOpen} onClose ={handleDialogClose} payor={selectedPayor}/>
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
            flexDirection: "column",  // Ensure centering both horizontally and vertically
          }}
        >
          <Typography variant="body1">
            No Insurance found for this Patient
          </Typography>
        </Container>
      )
    }
  </List>

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