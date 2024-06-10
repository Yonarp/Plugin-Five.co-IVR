import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  IconButton,
} from "../FivePluginApi";
import Patient from "./Patient";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const NewPatient = ({ data, handlePatient, five }) => {
  const [page, setPage] = useState(0);
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [street, setStreet] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
    
  };
  const handleStreetChange = (event) => {
    setStreet(event.target.value);
    
  };
  const handleAptChange = (event) => {
    setApt(event.target.value);
    
  };
  
  

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleDialogClose();
  };

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
            marginTop: "10px",
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
              marginLeft: "40px",
              position: "relative",
            }}
            component="form"
          >
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={handleDialogOpen}
            >
              <UploadFileIcon />
            </IconButton>
            <Typography variant="h5" mb={5}>
              Enter patient details
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
              <TextField
                label="First Name"
                margin="normal"
                sx={{ minWidth: 170 }}
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
                Last Name:{" "}
              </Typography>
              <TextField
                label="Last Name"
                margin="normal"
                variant="outlined"
                sx={{ minWidth: 170 }}
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
              <Typography mr={3} sx={{ minWidth: 120, maxWidth: 120 }}>
                Gender:{" "}
              </Typography>
              <FormControl
                margin="normal"
                variant="outlined"
                sx={{ minWidth: 200 }}
              >
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  value={gender}
                  onChange={handleGenderChange}
                  label="Gender"
                >
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
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
                Birthdate:{" "}
              </Typography>
              <TextField
                label="Birthdate"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                value={birthdate}
                onChange={handleBirthdateChange}
                sx={{ minWidth: 200 }}
              />
            </Box>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Address Information</Typography>
              </Grid>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="Street"
                  margin="normal"
                  variant="outlined"
                  value={street}
                  onChange={handleStreetChange}
                  sx={{ flex: 3, marginRight: "8px" }} // Street 1 takes most space
                />
                <TextField
                  label="Apt"
                  margin="normal"
                  variant="outlined"
                  value={apt}
                  onChange={handleAptChange}
                  sx={{ flex: 1 }} // Street 2 takes less space
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextField
                  label="City"
                  margin="normal"
                  variant="outlined"
                  value={city}
                  onChange={handleCityChange}
                  sx={{ flex: 2, marginRight: "8px" }} // City takes most space
                />
                <TextField
                  label="State"
                  margin="normal"
                  variant="outlined"
                  value={state}
                  onChange={handleStateChange}
                  sx={{ flex: 1, maxWidth: "80px", marginRight: "8px" }} // State takes less space
                />
                <TextField
                  label="Zip Code"
                  margin="normal"
                  variant="outlined"
                  value={zip}
                  onChange={handleZipChange}
                  sx={{ flex: 1, maxWidth: "120px" }} // Zip Code takes intermediate space
                />
              </Box>
            </Grid>

            {selectedFile && (
              <Typography mt={2}>Uploaded file: {selectedFile.name}</Typography>
            )}

            <Typography mt={5}>IVR for an existing patient?</Typography>
            <Button  onClick={() => setPage(1)}>
              Select an existing patient
            </Button>
          </Box>

          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Upload Facesheet</DialogTitle>
            <DialogContent>
              <input type="file" onChange={handleFileChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Typography style={{color: 'white'}} mt={5}>IVR for an existing patient?</Typography>
          <Button style={{color: 'white'}} onClick={() => setPage(1)}>Select an existing patient</Button>
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
