//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
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
    documentType: false,
    otherDocumentType: false,
    selectedFiles: false,
  });

  useEffect(() => {}, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Original file name:", file.name);
    setDocumentName(file.name);
    setCurrentFile(file);
    setErrors((prevErrors) => ({
      ...prevErrors,
      selectedFiles: false,
    }));
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
      Base64: base64String,
    };

    console.log("Document being pushed:", documentObj);

    await five.executeFunction(
      "pushDocument",
      documentObj,
      null,
      null,
      null,
      (result) => {
        const payorData = JSON.parse(result.serverResponse.results);
        const documentData = payorData.response;
        const newDocument = {
          ___DOC: documentData?.___DOC,
          Base64: documentData?.Base64,
          Category: documentData?.Category,
          Name: documentData?.Name,
        };
        setPatient((prevPatient) => ({
          ...prevPatient,
          document: [...prevPatient.document, newDocument],
        }));
      }
    );
  };

  const handleDelete = async (docKey) => {
    const documentObj = {
      ___DOC: docKey,
    };
    console.log("document Object FRom Delete", documentObj);

    await five.executeFunction(
      "DeleteDocument",
      documentObj,
      null,
      null,
      null,
      (result) => {
        setPatient((prevPatient) => ({
          ...prevPatient,
          document: prevPatient.document.filter((doc) => doc.___DOC !== docKey),
        }));
      }
    );
  };

  const handleUpload = () => {
    let hasError = false;
    const newErrors = {
      documentType: false,
      otherDocumentType: false,
      selectedFiles: false,
    };

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
      pushDocument(reader.result);
      setSelectedFilesBase64((prev) => [
        ...prev,
        { Base64: reader.result, ContentType: currentFile.type },
      ]);
    };
    reader.readAsDataURL(currentFile);

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

      {patient.document.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Uploaded files:</Typography>
          <List>
            {patient.document.map((item, index) => {
              const base64Data =
                typeof item?.Base64 === "string"
                  ? item?.Base64
                  : item?.Base64?.Base64;

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #00000033",
                  }}
                >
                  <ListItemButton
                    onClick={() =>
                      handleDialogOpen({ ...item, Base64: base64Data })
                    }
                    sx={{
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightblue",
                      },
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="body1">
                      {item?.Name} {/* Show full name including type */}
                      <Typography
                        component="span"
                        sx={{
                          color: "gray",
                          ml: 1,
                          fontSize: "0.9em",
                        }}
                      >
                        ({item?.Category}) {/* Show document category */}
                      </Typography>
                    </Typography>
                  </ListItemButton>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.___DOC);
                    }}
                    sx={{
                      color: "red",
                      minWidth: "auto",
                      mr: 1,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              );
            })}
          </List>
          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            PaperProps={{
              style: {
                minWidth: "70vw",
                height: "90%",
              },
            }}
          >
            <DialogTitle>Document Preview</DialogTitle>
            <DialogContent style={{ width: "100%", height: "100%" }}>
              {selectedDocument && selectedDocument?.Base64 ? (
                getMimeTypeFromDataUri(selectedDocument?.Base64) ===
                "application/pdf" ? (
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
