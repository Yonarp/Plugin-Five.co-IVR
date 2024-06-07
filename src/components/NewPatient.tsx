import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Box, Button, TextField } from "../FivePluginApi";
import Patient from "./Patient";

const NewPatient = ({
  data,
  handlePatient,
  five,
}) => {
  const [page, setPage] = useState(0);
  
  return (
    <>
      {page === 0 && (
        <Container
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              maxWidth: "800px",
              display: "flex",
              flexDirection: "column",
              border: "2px solid grey",
              padding: 20,
              borderRadius: "10px",
              boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
              justifyContent: "center",
              alignItems: "center",
              fontSize: ".5rem",
            }}
            component="form"
          >
            <Typography variant="h4" mb={5}>
              Enter the patient details
            </Typography>
            <Box
              mb={2}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography mr={3} sx={{ minWidth: 120 }}>
                First Name:{" "}
              </Typography>
              <TextField label="First Name" margin="normal" />
            </Box>
            <Box
              mb={2}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography mr={3} sx={{ minWidth: 120 }}>
                Last Name:{" "}
              </Typography>
              <TextField label="Last Name" margin="normal" variant="outlined" />
            </Box>
            <Box
              mb={2}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography mr={3} sx={{ minWidth: 120 }}>
                Gender:{" "}
              </Typography>
              <TextField
                label="Gender"
                margin="normal"
                variant="outlined"
                inputProps={{ maxLength: 1 }}
              />
            </Box>
            <Box
              mb={2}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography mr={3} sx={{ minWidth: 120 }}>
                Email:{" "}
              </Typography>
              <TextField label="Email" margin="normal" variant="outlined" />
            </Box>
          </Box>
          <Typography mt={5}>IVR for an existing patient?</Typography>
          <Button onClick={() => setPage(1)}>Select a existing patient</Button>
        </Container>
      )}
      {page === 1 && (
        <div className="container" style={{ width: "100%" }}>
          <Patient
            patients={data.response.value}
            handlePatient={handlePatient}
            five={five}
          />
        </div>
      )}
    </>
  );
};

export default NewPatient;
