//@ts-nocheck

import React, { useState, useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Patient from "./Patient"; // Ensure this import points to your Patient component

const NewPatient = ({
  setMainForm,
  mainForm,
  data,
  handlePatient,
  five,
  patient,
  setPatient,
  handleNext,
  setNewPatient,
  account,
  handleDialogCloseExternal,
  page,
  setPage,
}) => {
  // const [page, setPage] = useState(0);
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

  // Main form state variables
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesBase64, setSelectedFilesBase64] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentNames, setDocumentNames] = useState([]);

  // Dialog-specific state variables
  const [dialogSelectedFiles, setDialogSelectedFiles] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");

  // Error state
  const [errors, setErrors] = useState({
    documentName: false,
    documentType: false,
    otherDocumentType: false,
    selectedFiles: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate birthdate only
    if (name === "Birthdate") {
      const birthdate = new Date(value);
      const today = new Date();

      if (birthdate > today) {
        five.message("Birthdate cannot be in the future.");
        return;
      }

      // Optional: Minimum age validation (e.g., must be at least 18 years old)
      const minimumAge = 18;
      const ageDiff = today.getFullYear() - birthdate.getFullYear();
      const isBirthdayPassed =
        today >= new Date(birthdate.setFullYear(today.getFullYear()));

      if (
        ageDiff < minimumAge ||
        (ageDiff === minimumAge && !isBirthdayPassed)
      ) {
        five.message(`You must be at least ${minimumAge} years old.`);
        return;
      }
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setMainForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDialogOpen = () => {
    setDocumentName("");
    setDocumentType("");
    setOtherDocumentType("");
    setDialogSelectedFiles([]);
    setErrors({
      documentName: false,
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    });

    if (selectedFiles?.length >= 5) {
      return five.message(
        "Cannot upload more than " + selectedFiles?.length.toString() + " files."
      );
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDocumentName("");
    setDocumentType("");
    setOtherDocumentType("");
    setDialogSelectedFiles([]);
    setErrors({
      documentName: false,
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    });
  };

  // Modify handleFileChange to only set the dialog's selected files
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDialogSelectedFiles(files);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFiles: false }));
  };

  const handleDialogSubmit = () => {
    let hasError = false;
    const newErrors = {
      documentName: false,
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    };

    if (documentName.trim() === "") {
      newErrors.documentName = true;
      hasError = true;
    }

    if (documentType.trim() === "") {
      newErrors.documentType = true;
      hasError = true;
    }

    if (documentType === "other" && otherDocumentType.trim() === "") {
      newErrors.otherDocumentType = true;
      hasError = true;
    }

    if (dialogSelectedFiles?.length === 0) {
      newErrors.selectedFiles = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Process the files and update the main form's state
    dialogSelectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileType = file.type;

        setSelectedFilesBase64((prev) => [
          ...prev,
          { Base64: reader.result, ContentType: fileType },
        ]);
      };

      reader.readAsDataURL(file);
    });

    // Update the main form's selected files and document details
    setSelectedFiles((prev) => [...prev, ...dialogSelectedFiles]);
    setDocumentTypes((prev) => [
      ...prev,
      documentType === "other" ? otherDocumentType : documentType,
    ]);
    setDocumentNames((prev) => [...prev, documentName]);

    // Clear the dialog form fields
    setDialogSelectedFiles([]);
    setDocumentName("");
    setDocumentType("");
    setOtherDocumentType("");
    setErrors({
      documentName: false,
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    });

    handleDialogClose();
  };

  const handleDocumentDelete = (index) => {
    setSelectedFilesBase64((prevFiles) =>
      prevFiles.filter((item, i) => i !== index)
    );
    setDocumentTypes((prevFiles) => prevFiles.filter((item, i) => i !== index));
    setDocumentNames((prevFiles) => prevFiles.filter((item, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((item, i) => i !== index));
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    if (event.target.value !== "other") {
      setOtherDocumentType("");
    }
    setErrors((prevErrors) => ({ ...prevErrors, documentType: false }));
  };

  const isFormValid = () => {
    // Checking if the required fields have data or not
    const requiredFields = [
      "NameFirst",
      "NameLast",
      "Gender",
      "Birthdate",
      "AddressStreet",
      "AddressCity",
      "AddressState",
      "AddressZip",
    ];
    return requiredFields.every((field) => formState[field].trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      five.message("Please fill in all required fields.");
      return;
    }

    setNewPatient(true);

    const patientObj = {
      patient: formState,
      document: selectedFilesBase64,
      documentNames: documentNames,
      documentCategory: documentTypes,
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

        setPatient({
          data: patientData,
          document: selectedFilesBase64.map((base64, index) => ({
            Base64: base64,
            Category: documentTypes[index],
            Name: documentNames[index],
          })),
        });
      }
    );

    handleNext();
  };

  useEffect(() => {
    setPatient(null);

    if (mainForm) {
      setFormState(mainForm);
    }
  }, []);

  return (
    <>
      {page === 0 && (
        <Container
          id="new-patient-container"
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
            id="patient-form"
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
                First Name<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <TextField
                id="patient-first-name"
                label="First Name"
                margin="normal"
                sx={{ minWidth: 170 }}
                name="NameFirst"
                value={formState.NameFirst}
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
                Last Name<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <TextField
                id="patient-last-name"
                label="Last Name"
                margin="normal"
                variant="outlined"
                sx={{ minWidth: 170 }}
                name="NameLast"
                value={formState.NameLast}
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
                Gender<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <FormControl
                margin="normal"
                variant="outlined"
                sx={{ minWidth: 200 }}
              >
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  id="patient-gender"
                  labelId="gender-select-label"
                  value={formState.Gender}
                  onChange={handleInputChange}
                  label="Gender"
                  name="Gender"
                >
                  <MenuItem id="gender-male" value="M">M</MenuItem>
                  <MenuItem id="gender-female" value="F">F</MenuItem>
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
                Birthdate<span style={{ color: "red" }}>*</span>{" "}
              </Typography>
              <TextField
                id="patient-birthdate"
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
                <Typography variant="h6">
                  Address Information <span style={{ color: "red" }}>*</span>
                </Typography>
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
                  id="patient-street"
                  label="Street"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressStreet}
                  onChange={handleInputChange}
                  sx={{ flex: 3, marginRight: "8px" }}
                  name="AddressStreet"
                />
                <TextField
                  id="patient-apt"
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
                  id="patient-city"
                  label="City"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressCity}
                  onChange={handleInputChange}
                  sx={{ flex: 2, marginRight: "8px" }}
                  name="AddressCity"
                />
                <TextField
                  id="patient-state"
                  label="State"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressState}
                  onChange={handleInputChange}
                  sx={{ flex: 1, maxWidth: "80px", marginRight: "8px" }}
                  name="AddressState"
                />
                <TextField
                  id="patient-zip"
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

            {selectedFiles?.length > 0 && (
              <Box id="uploaded-files-section" mt={2}>
                <Typography variant="h6">Uploaded files:</Typography>
                {selectedFiles.map((file, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography>
                      {file.name} - {documentTypes[index]}
                    </Typography>
                    <Button
                      id={`delete-file-${index}`}
                      onClick={() => handleDocumentDelete(index)}
                      sx={{ marginLeft: "10px", color: "red" }}
                    >
                      Delete
                    </Button>
                  </Box>
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
                id="close-form-btn"
                type="button"
                variant="contained"
                style={{
                  padding: "10px 20px",
                  background: "#D8EEDA",
                  color: "#157069",
                }}
                onClick={handleDialogCloseExternal}
              >
                Close
              </Button>
              <Button
                id="submit-form-btn"
                type="submit"
                variant="contained"
                style={{
                  padding: "10px 20px",
                  background: "#14706A",
                  color: "white",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>

          <Typography style={{ color: "black" }} mt={5}>
            IVR for an existing patient?
          </Typography>
          <Button 
            id="existing-patient-btn"
            style={{ color: "#14706A" }} 
            onClick={() => setPage(1)}
          >
            Select an existing patient
          </Button>
        </Container>
      )}
      {page === 1 && (
        <div id="existing-patient-container" className="container" style={{ width: "100%" }}>
          <Patient
            patients={data.response.value}
            handlePatient={handlePatient}
            five={five}
            patientSaved={patient}
            setPage={setPage}
            handleNext={handleNext}
            handleDialogClose={handleDialogCloseExternal}
          />
        </div>
      )}
    </>
  );
};

export default NewPatient;
