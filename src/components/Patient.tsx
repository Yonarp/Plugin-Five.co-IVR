import { Container, ListItemButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { List, ListItemText } from "../FivePluginApi";
//@ts-ignore
const Patient = ({patients, handlePatient, five}) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

    const handleClick =  async(index, patient) => {
        console.log("Logging Patient FROM PATIENT ", patient)
        setSelectedIndex(index)
        const patientKey = {
          PatientKey: patient
        }
        await five.executeFunction(
          "getPatient",
          patientKey,
          null,
          null,
          null,
          (result) => {
            const patientData =  JSON.parse(result.serverResponse.results)
            handlePatient(patientData.response.value[0]);
          }
        );


    }

  return (
    <Container style={{maxWidth: '100vw'}}>
      <Typography variant="h5" style ={{textAlign: 'center', marginBottom: '20px' }}>Select the patient</Typography>
      <List>
        {patients.map((patient, index) => {
          return (
            <ListItemButton
              key={index}
              selected = {selectedIndex === index}
              onClick={() => handleClick(index,patient.__PAT)}
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
              <ListItemText primary={patient.PatientNameFirst + " "  + patient.PatientNameLast} secondary={"Gender:" + patient.PatientGender + " DOB: " + patient.PatientBirthdate}/>
            </ListItemButton>
          );
        })}
      </List>
    </Container>
  );
};

export default Patient