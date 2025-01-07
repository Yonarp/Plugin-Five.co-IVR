//@ts-nocheck
import { Button, Container, ListItemButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, List, ListItemText } from "../FivePluginApi";

const Patient = ({ patients, handlePatient, five, patientSaved, setPage, handleNext, handleDialogClose }) => {

  const [selectedIndex, setSelectedIndex] = useState(
    patientSaved ? patientSaved.index : null
  );

  function convertToAmericanFormat(dateString) {
    if (!dateString || typeof dateString !== 'string') {
      return 'Invalid date';
    }
  
    dateString = dateString.trim();
  
    let year, month, day;
    
    if (dateString.includes('-')) {
      [year, month, day] = dateString.split('-');
    } else if (dateString.length === 8) {
      year = dateString.substring(0, 4);
      month = dateString.substring(4, 6);
      day = dateString.substring(6, 8);
    } else {
      return 'Invalid date format';
    }
    
    // Check if the extracted values are valid
    if (!year || !month || !day) {
      return 'Invalid date';
    }
  
    return `${month}/${day}/${year}`;
  }


  useEffect(() => {
    console.log(patientSaved);
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
        console.log("Patient Data ->", patientData)
        handlePatient(patientData.patient, index, patientData.document);
      }

    );

    handleNext()
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
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginLeft: "30px",
        }}
      >
        <Typography variant="body1" style={{ width: "150px" }}>
          <strong>Name</strong>
        </Typography>
        <Typography variant="body1" style={{ width: "150px" }}>
          <strong>Gender</strong>
        </Typography>
        <Typography variant="body1" style={{ width: "150px" }}>
          <strong> DOB</strong>
        </Typography>
      </Box>
      <List>
        {patients.map((patient, index) =>  (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => handleClick(index, patient.___PAT)}
            sx={{
              borderBottom: "1px solid #00000033",
              "&.Mui-selected": {
                backgroundColor: "#F1FAF3",
                color: "black",
                "&:hover": {
                  backgroundColor: "#FFF9E7",
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
              <Typography variant="body1" style={{ width: "150px" }}>
                {patient.NameFirst + " " + patient.NameLast}
              </Typography>
              <Typography variant="body1" style={{ width: "100px" }}>
                {patient.Gender}
              </Typography>
              <Typography variant="body1" style={{ width: "100px" }}>
                {convertToAmericanFormat(patient.Birthdate)}
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
          marginTop: "20px",
        }}
      >
        <Typography style={{ color: "black" }} mt={5}>
          IVR for a new patient?
        </Typography>
        <Button onClick={() => setPage(0)}>Create a new patient</Button>
      </Box>
      <Box
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button onClick={handleDialogClose} style={{
                  padding: "10px 35px",
                  background: "#14706A",
                  color: "white",
                }}>
            Cancel
          </Button>
        </Box>
    </Container>
  );
};

export default Patient;
