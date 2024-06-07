import { Container, Typography } from "@mui/material";
import React from "react";
import { Box, TextField } from "../FivePluginApi";

const NewPatient = () => {
  return (
    <Container
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid black",
          padding: 20,
          borderRadius: "10px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
          justifyContent:'center',
          alignItems: 'center'
        }}
        component="form"
      >
        <Typography variant="h4">Enter the patient details</Typography>
        <Box mb={2}>
          <Typography>First Name</Typography>
          <TextField label="First Name" margin="normal" variant="outlined" />
        </Box>
        <Box mb={2}>
          <Typography>Last Name</Typography>
          <TextField label="Last Name" margin="normal" variant="outlined" />
        </Box>
        <Box mb={2}>
          <Typography>Gender</Typography>
          <TextField label="Gender" margin="normal" variant="outlined" />
        </Box>
        <Box mb={2}>
          <Typography>Email</Typography>
          <TextField label="Email" margin="normal" variant="outlined" />
        </Box>
      </Box>
    </Container>
  );
};

export default NewPatient;
