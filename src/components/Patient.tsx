import { Button, Container, ListItemButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
//@ts-ignore
import { Box, List, ListItemText } from "../FivePluginApi";
//@ts-ignore
const Patient = ({ patients, handlePatient, five, patientSaved, setPage }) => {
  // Initialize selectedIndex based on patientSaved
  const [selectedIndex, setSelectedIndex] = useState(
    patientSaved ? patientSaved.index : null
  );

  useEffect(() => {
    console.log(patientSaved)
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
    <Container style={{ maxWidth: "100%", marginBottom: "10px" }}>
      <Typography
        mt={6}
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select a patient
      </Typography>
      <Box style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft:'30px',
               
              }}>
      <Typography variant="body1" style={{width:'150px'}}>
        <strong>Name</strong>
      </Typography>
      <Typography variant="body1" style={{width:'150px'}}>
      <strong>Gender</strong>
      </Typography>
      <Typography variant="body1" style={{width:'150px'}}>
      <strong> DOB</strong>
      </Typography>
      </Box>
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
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" style={{width:'150px'}}>
                {patient.PatientNameFirst + " " + patient.PatientNameLast}
              </Typography>
              <Typography variant="body1"  style={{width:'100px'}}>
                {patient.PatientGender}
              </Typography>
              <Typography variant="body1"  style={{width:'100px'}}>
                {patient.PatientBirthdate}
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginRight: "20px",
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
