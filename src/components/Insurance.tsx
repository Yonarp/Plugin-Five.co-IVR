import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  /* MenuItem ,*/ /* Select, */ Typography,
} from "../FivePluginApi";

//@ts-ignore
const Insurance = ({ patient, five, setPayorsMain }) => {
  console.log("From Insurance", patient);
  const [selectedPayors, setSelectedPayors] = useState([]);
  const [payors, setPayors] = useState(null);
  const [loading, setLoading] = useState(false);

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
  <Typography variant="h6" gutterBottom>
    Select the insurance payors in the order they should be billed.
  </Typography>
  <List>
    {
      //@ts-ignore
      payors ? (
        payors.map((payor, index) => (
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
            }}
          >
            <ListItemText
              primary={payor?.CompanyName}
              secondary={payor?.PayorID}
            />
          </ListItem>
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
