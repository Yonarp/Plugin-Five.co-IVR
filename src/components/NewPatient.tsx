//@ts-nocheck

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Patient from "./Patient"; // Ensure this import points to your Patient component

const NewPatient = ({
  data,
  handlePatient,
  five,
  patient,
  setPatient,
  handleNext,
  setNewPatient,
  account,
  handleDialogCloseExternal,
}) => {
  const [page, setPage] = useState(0);
  const [formState, setFormState] = useState({
    NameFirst: "",
    NameLast: "",
    Gender: "",
    Birthdate: "",
    AddressStreet: "",
    AddressStreet2: "",
    AddressCity: "",
    AddressState: "",
    AddressZip: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesBase64, setSelectedFilesBase64] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Convert files to base64 strings
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFilesBase64((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });

    setSelectedFiles((prev) => [...prev, ...files]);
    setDocumentTypes((prev) => [
      ...prev,
      documentType === "other" ? otherDocumentType : documentType,
    ]);

    handleDialogClose();
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    if (event.target.value !== "other") {
      setOtherDocumentType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPatient(true);
    const patientObj = {
      patient: formState,
      document: selectedFilesBase64,
      AccountKey: account.AccountKey,
    };
    await five.executeFunction(
      "pushPatient",
      //@ts-ignore
      patientObj,
      null,
      null,
      null,
      //@ts-ignore
      (result) => {
        const payorData = JSON.parse(result.serverResponse.results);
        const patientData = payorData.response;
        console.log("Logging from push to patients", payorData);
        setPatient({
          data: patientData,
          documents: selectedFilesBase64.map((base64, index) => ({
            base64,
            type: documentTypes[index],
          })),
        });
      }
    );

    handleNext();
  };

  console.log("Logging Data from new patient", data);

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
            marginBottom: "100px",
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
            onSubmit={handleSubmit}
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
              <Typography variant="body1" mt={1}>
                Add Document
              </Typography>
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
                First Name<span style={{ color: "red" }}>*</span>:{" "}
              </Typography>
              <TextField
                label="First Name"
                margin="normal"
                sx={{ minWidth: 170 }}
                name="NameFirst"
                onChange={handleInputChange}
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
                Last Name<span style={{ color: "red" }}>*</span>:{" "}
              </Typography>
              <TextField
                label="Last Name"
                margin="normal"
                variant="outlined"
                sx={{ minWidth: 170 }}
                name="NameLast"
                onChange={handleInputChange}
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
                  value={formState.Gender}
                  onChange={handleInputChange}
                  label="Gender"
                  name="Gender"
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
                value={formState.Birthdate}
                onChange={handleInputChange}
                sx={{ minWidth: 200 }}
                name="Birthdate"
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
                  value={formState.AddressStreet}
                  onChange={handleInputChange}
                  sx={{ flex: 3, marginRight: "8px" }}
                  name="AddressStreet"
                />
                <TextField
                  label="Apt"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressStreet2}
                  onChange={handleInputChange}
                  sx={{ flex: 1 }}
                  name="AddressStreet2"
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
                  value={formState.AddressCity}
                  onChange={handleInputChange}
                  sx={{ flex: 2, marginRight: "8px" }}
                  name="AddressCity"
                />
                <TextField
                  label="State"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressState}
                  onChange={handleInputChange}
                  sx={{ flex: 1, maxWidth: "80px", marginRight: "8px" }}
                  name="AddressState"
                />
                <TextField
                  label="Zip Code"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressZip}
                  onChange={handleInputChange}
                  sx={{ flex: 1, maxWidth: "120px" }}
                  name="AddressZip"
                />
              </Box>
            </Grid>

            {selectedFiles.length > 0 && (
              <Box mt={2}>
                <Typography>Uploaded files:</Typography>
                {selectedFiles.map((file, index) => (
                  <Typography key={index}>
                    {file.name} - {documentTypes[index]}
                  </Typography>
                ))}
              </Box>
            )}
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Button
                type="button"
                variant="contained"
                style={{ padding: "10px 20px", background: '#780000', color:'white' }}
                onClick={handleDialogCloseExternal}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{ padding: "10px 20px",  background: '#266787', color:'white'  }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>

          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogContent style={{ width: "400px" }}>
              {/* Fixed width for dialog content */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="document-type-label">Document Type</InputLabel>
                <Select
                  labelId="document-type-label"
                  value={documentType}
                  onChange={handleDocumentTypeChange}
                  label="Document Type"
                >
                  <MenuItem value="facesheet">Facesheet</MenuItem>
                  <MenuItem value="wound notes">Wound Notes</MenuItem>
                  <MenuItem value="identification">Identification</MenuItem>
                  <MenuItem value="priorAuthorization">
                    Prior Authorization
                  </MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              {documentType === "other" && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Specify Document Type"
                  value={otherDocumentType}
                  onChange={(e) => setOtherDocumentType(e.target.value)}
                />
              )}
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,application/pdf"
                onChange={handleFileChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Typography style={{ color: "black" }} mt={5}>
            IVR for an existing patient?
          </Typography>
          <Button style={{ color: "black" }} onClick={() => setPage(1)}>
            Select an existing patient
          </Button>
        </Container>
      )}
      {page === 1 && (
        <div className="container" style={{ width: "100%" }}>
          <Patient
            patients={data.response.value}
            handlePatient={handlePatient}
            five={five}
            patientSaved={patient}
            setPage={setPage}
            handleNext={handleNext}
          />
        </div>
      )}
    </>
  );
};

export default NewPatient;
