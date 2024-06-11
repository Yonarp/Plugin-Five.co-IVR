import { Button, Container, ListItemButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, List, ListItemText } from "../FivePluginApi";
//@ts-ignore
const Patient = ({ patients, handlePatient, five, patientSaved, setPage }) => {
  // Initialize selectedIndex based on patientSaved
  const [selectedIndex, setSelectedIndex] = useState(
    patientSaved ? patientSaved.index : null
  );

  useEffect(() => {
    if (patientSaved) {
      console.log(
        "Setting selectedIndex from patientSaved:",
        patientSaved.index
      );
      setSelectedIndex(patientSaved.index);
    }
  }, [patientSaved]);

  const handleClick = async (index, patient) => {
    console.log("Logging Patient FROM PATIENT ", patient);
    setSelectedIndex(index);
    const patientKey = {
      PatientKey: patient,
    };
    await five.executeFunction(
      "getPatient",
      patientKey,
      null,
      null,
      null,
      (result) => {
        const patientData = JSON.parse(result.serverResponse.results);
        handlePatient(patientData.response.value[0], index);
      }
    );
  };

  return (
    <Container style={{ maxWidth: "100vw" }}>
      <Typography
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select the patient
      </Typography>
      <List>
        {patients.map((patient, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleClick(index, patient.__PAT)}
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
              primary={patient.PatientNameFirst + " " + patient.PatientNameLast}
              secondary={
                "Gender: " +
                patient.PatientGender +
                " DOB: " +
                patient.PatientBirthdate
              }
            />
          </ListItemButton>
        ))}
      </List>
      <Box
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginRight: '20px'
        }}
      >
        <Typography style={{ color: "black" }} mt={5}>
          IVR for a new patient?
        </Typography>
        <Button onClick={() => setPage(0)}>Create a new patient</Button>
      </Box>
      <br></br>
      <br />
      <Typography style={{ color: "white" }} mt={5}>
        IVR for a new patient?
      </Typography>
      <Button style={{ color: "white" }} onClick={() => setPage(0)}>
        Create a new patient
      </Button>
    </Container>
  );
};

export default Patient;
