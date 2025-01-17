//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ListItemButton,
} from "@mui/material";

const UploadDocument = ({ patient, five, setPatient }) => {
  // Main form state variables
  const [selectedDocument, setSelectedDocument] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesBase64, setSelectedFilesBase64] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentNames, setDocumentNames] = useState([]);

  // Form field states
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [currentFile, setCurrentFile] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  // Error states
  const [errors, setErrors] = useState({
    documentName: false,
    documentType: false,
    otherDocumentType: false,
    selectedFiles: false,
  });

  useEffect(() => {}, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCurrentFile(file);
    setErrors((prevErrors) => ({ ...prevErrors, selectedFiles: false }));
  };

  const getMimeTypeFromDataUri = (dataUri) => {
    // Extract the MIME type from the Data URI, e.g., "application/pdf", "image/jpeg"
    const mimeType = dataUri.match(/data:([^;]+);base64,/);
    return mimeType ? mimeType[1] : null;
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    if (event.target.value !== "other") {
      setOtherDocumentType("");
    }
    setErrors((prevErrors) => ({ ...prevErrors, documentType: false }));
  };

  const pushDocument = async (base64String) => {

    const documentObj = {
      PatientKey: patient.data.___PAT,
      Category: documentType,
      Name: documentName,
      Base64: base64String
    }
    
    await five.executeFunction(
      "pushDocument",
      //@ts-ignore
      documentObj,
      null,
      null,
      null,
      //@ts-ignore
      (result) => {
        const payorData = JSON.parse(result.serverResponse.results);
        const documentData = payorData.response;
        const newDocument = {
          Base64: documentData?.Base64,
          Category: documentData?.Category,
          Name: documentData?.Name,
        }
        setPatient((prevPatient) => ({
          ...prevPatient,
          document: [...prevPatient.document, newDocument]
        }))

      }
    );
  };

  const handleUpload = () => {
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

    if (!currentFile) {
      newErrors.selectedFiles = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    if (selectedFiles.length >= 5) {
      alert("Cannot upload more than 5 files.");
      return;
    }

    // Process the file and update state
    const reader = new FileReader();
    reader.onloadend = () => {
      pushDocument(reader.result)
      setSelectedFilesBase64((prev) => [
        ...prev,
        { Base64: reader.result, ContentType: currentFile.type },
      ]);
    };
    reader.readAsDataURL(currentFile);

    //pushDocument();

    // Update the main form's selected files and document details
    setSelectedFiles((prev) => [...prev, currentFile]);
    setDocumentTypes((prev) => [
      ...prev,
      documentType === "other" ? otherDocumentType : documentType,
    ]);
    setDocumentNames((prev) => [...prev, documentName]);

    // Clear form
    setCurrentFile(null);
    setDocumentName("");
    setDocumentType("");
    setOtherDocumentType("");
    setErrors({
      documentName: false,
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    });

    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDialogOpen = (document) => {
    setSelectedDocument(document);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDocumentDelete = (index) => {
    setSelectedFilesBase64((prevFiles) =>
      prevFiles.filter((item, i) => i !== index)
    );
    setDocumentTypes((prevFiles) => prevFiles.filter((item, i) => i !== index));
    setDocumentNames((prevFiles) => prevFiles.filter((item, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((item, i) => i !== index));
  };

  console.log("Document Type:", documentType);
  console.log("Document Name:", documentName);
  console.log("Selected Files:", currentFile);
  console.log("Base 64 :", selectedFilesBase64);
  console.log("patient :", patient);

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        marginBottom: "100px",
      }}
    >
      <Typography
        variant="h5"
        mt={5}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Upload Document
      </Typography>

      <Typography
        variant="body1"
        style={{
          fontSize: "0.9rem",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Set Document Name"
          value={documentName}
          required
          error={errors.documentName}
          helperText={errors.documentName ? "Document name is required" : ""}
          onChange={(e) => {
            setDocumentName(e.target.value);
            setErrors((prevErrors) => ({
              ...prevErrors,
              documentName: false,
            }));
          }}
        />

        <FormControl
          fullWidth
          margin="normal"
          error={errors.documentType}
          required
        >
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
            <MenuItem value="priorAuthorization">Prior Authorization</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.documentType && (
            <FormHelperText>Document type is required</FormHelperText>
          )}
        </FormControl>

        {documentType === "other" && (
          <TextField
            fullWidth
            margin="normal"
            label="Specify Document Type"
            value={otherDocumentType}
            required
            error={errors.otherDocumentType}
            helperText={
              errors.otherDocumentType ? "Please specify document type" : ""
            }
            onChange={(e) => {
              setOtherDocumentType(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                otherDocumentType: false,
              }));
            }}
          />
        )}

        <Box sx={{ mt: 2, mb: 2 }}>
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            style={errors.selectedFiles ? { border: "1px solid red" } : {}}
          />
          {errors.selectedFiles && (
            <Typography color="error">
              Please select a file to upload
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleUpload}
          fullWidth
          sx={{ mt: 2, bgcolor: "#14706A", "&:hover": { bgcolor: "#0F5854" } }}
        >
          Upload
        </Button>
      </Box>

      {/* 
      
      This code is to preview documents locally stored, we are replacing it with Documents uploaded on the Database
      
      selectedFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded files:</Typography>
          {selectedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                mt: 1,
              }}
            >
              <Typography>
                {file.name} - {documentTypes[index]}
              </Typography>
              <Button
                onClick={() => handleDocumentDelete(index)}
                sx={{ color: 'red' }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      ) */}

      {patient.document.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded files:</Typography>
          <List>
            {
              //@ts-ignore
              patient.document.map((item, index) => {
                // Handle both cases: if item.Base64 is a string or an object
                const base64Data =
                  typeof item?.Base64 === "string"
                    ? item?.Base64
                    : item?.Base64?.Base64;

                return (
                  <ListItemButton
                    key={index}
                    onClick={() =>
                      handleDialogOpen({ ...item, Base64: base64Data })
                    } // Pass corrected Base64
                    sx={{
                      borderBottom: "1px solid #00000033",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightblue",
                      },
                    }}
                  >
                    <Typography variant="body1">{item?.Name}</Typography>
                  </ListItemButton>
                );
              })
            }
          </List>

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            PaperProps={{
              style: {
                minWidth: "70vw",
                height: "90%", // Dialog height
              },
            }}
          >
            <DialogTitle>Document Preview</DialogTitle>
            <DialogContent style={{ width: "100%", height: "100%" }}>
              {selectedDocument && selectedDocument?.Base64 ? (
                getMimeTypeFromDataUri(selectedDocument?.Base64) ===
                "application/pdf" ? (
                  // Render PDF using iframe
                  <iframe
                    src={selectedDocument?.Base64}
                    title="PDF Document"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                  />
                ) : getMimeTypeFromDataUri(selectedDocument?.Base64).startsWith(
                    "image/"
                  ) ? (
                  // Render image
                  <img
                    src={selectedDocument?.Base64}
                    alt="Document"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography variant="body2">Unknown file type</Typography>
                )
              ) : (
                <Typography variant="body2">No document available</Typography>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default UploadDocument;
