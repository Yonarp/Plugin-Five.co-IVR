// @ts-nocheck
import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Select,
  MenuItem,
  ListItemButton,
  FormHelperText,
  Paper,
  Divider
} from "@mui/material";

import {
  DialogActions,
  FormControl,
  InputLabel,
  List,
} from "../FivePluginApi";
import {
  CompanyNames,
  iCodes,
  lCodes,
  eCodes,
  mohsCodes,
  productsList,
  cptCodes,
} from "../strings";
import { Delete } from "@mui/icons-material";

const OpenIVRSummary = ({
  five,
  selectedRecord,
  handleDialogClose,
  existingIvrData,
  patient,
  practitioner,
  setPractitioner,
  payors,
  setPayors,
  products,
  setProducts,
  iCode,
  setICode,
  lCode,
  setLCode,
  eCode,
  setECode,
  cdCode,
  setCDCode,
  cptCode,
  setCPTCode,
  cptCode2,
  setCPTCode2,
  cptWoundSize1,
  setCPTWoundSize1,
  cptWoundSize2,
  setCPTWoundSize2,
  cptWound,
  setCPTWound,
  admitted,
  setAdmitted,
  placeOfService,
  setPlaceOfService,
  handleSubmit,
}) => {
  // -----------------------------------------------------
  // States
  // -----------------------------------------------------
  const [status, setStatus] = useState("");
  const [ivr, setIVR] = useState();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanySecond, setSelectedCompanySecond] = useState("");
  const [primaryMemberNumber, setPrimaryMemberNumber] = useState("");
  const [secondaryMemberNumber, setSecondaryMemberNumber] = useState("");
  const [primaryGroupNumber, setPrimaryGroupNumber] = useState("");
  const [secondaryGroupNumber, setSecondaryGroupNumber] = useState("");
  const [documents, setDocuments] = useState([]);
  const [secondDialogOpen, setSecondDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesBase64, setSelectedFilesBase64] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [otherDocumentType, setOtherDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [documentNames, setDocumentNames] = useState([]);
  const [npi, setNPI] = useState("");
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [dialogSelectedFiles, setDialogSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [practitionerList, setPractitionerList] = useState([]);

  // Error state for document uploads
  const [errors, setErrors] = useState({
    documentName: false,
    documentType: false,
    otherDocumentType: false,
    selectedFiles: false,
  });

  // -----------------------------------------------------
  // Read-Only logic
  // -----------------------------------------------------
  const isReadOnly = true; // Force read-only mode

  // -----------------------------------------------------
  // Helpers
  // -----------------------------------------------------
  const handlePatient = useCallback(() => {}, []);

  const handleSecondDialogOpen = (document) => {
    setSelectedDocument(document);
    setSecondDialogOpen(true);
  };

  const handleSecondDialogClose = () => {
    setSecondDialogOpen(false);
  };

  const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const handleDocumentDialogOpen = () => {
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

    if (documents.length >= 5) {
      return five.message(
        "Cannot upload more than " + documents.length.toString() + " files."
      );
    }
    setDocumentDialogOpen(true);
  };

  const handleDocumentDialogClose = () => {
    setDocumentDialogOpen(false);
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
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
    if (event.target.value !== "other") {
      setOtherDocumentType("");
    }
    setErrors((prev) => ({ ...prev, documentType: false }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDialogSelectedFiles(files);
    setErrors((prev) => ({ ...prev, selectedFiles: false }));
  };

  console.log("Logging the patient Object I am getting here ", patient, existingIvrData, practitioner)

  const handleDocumentDialogSubmit = () => {
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

    if (dialogSelectedFiles.length === 0) {
      newErrors.selectedFiles = true;
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const promises = dialogSelectedFiles?.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

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

    Promise.all(promises)
      .then((base64Files) => {
        setSelectedFiles((prev) => [...prev, ...dialogSelectedFiles]);
        setSelectedFilesBase64((prev) => [...prev, ...base64Files]);
        setDocumentTypes((prev) => [
          ...prev,
          documentType === "other" ? otherDocumentType : documentType,
        ]);
        setDocumentNames((prev) => [...prev, documentName]);

        setDocuments((prev) => [
          ...prev,
          ...dialogSelectedFiles.map((file, index) => ({
            Base64: base64Files[index],
            Category:
              documentType === "other" ? otherDocumentType : documentType,
            Name: documentName + "." + getFileExtension(file.name),
          })),
        ]);

        handleDocumentDialogClose();

        const documentObject = {
          Base64: base64Files[0],
          DocumentName: documentName,
          Category: documentType === "other" ? otherDocumentType : documentType,
          PatientKey: patient.data.___PAT,
        };

        five.executeFunction(
          "pushDocument",
          //@ts-ignore
          documentObject,
          null,
          null,
          null,
          (result) => {
            // ...
          }
        );
      })
      .catch((error) => {
        console.error("Error reading files: ", error);
      });
  };

  const getMimeTypeFromDataUri = (dataUri) => {
    const mimeType = dataUri.match(/data:([^;]+);base64,/);
    return mimeType ? mimeType[1] : null;
  };

  const handleMemberNumber = (primary, event) => {
    if (primary) {
      setPrimaryMemberNumber(event.target.value);
    } else {
      setSecondaryMemberNumber(event.target.value);
    }
  };

  const handleGroupNumber = (primary, event) => {
    if (primary) {
      setPrimaryGroupNumber(event.target.value);
    } else {
      setSecondaryGroupNumber(event.target.value);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
  };

  const handleCompanyChangeSecond = (event, newValue) => {
    setSelectedCompanySecond(newValue);
  };

  const handlePractitioner = (event) => {
    if (setPractitioner) {
      setPractitioner({ data: event.target.value, index: null });
    }
  };

  const handleICodeChange = (event, newValue) => {
    if (setICode) {
      setICode(newValue);
    }
  };

  const handleLCodeChange = (event, newValue) => {
    if (setLCode) {
      setLCode(newValue);
    }
  };

  const handleECodeChange = (event, newValue) => {
    if (setECode) {
      setECode(newValue);
    }
  };

  const handleCDCodeChange = (event, newValue) => {
    if (setCDCode) {
      setCDCode(newValue);
    }
  };

  const handleCPTCodeChange = (event, newValue) => {
    if (setCPTCode) {
      setCPTCode(newValue);
    }
  };

  const handleDeleteDocument = async (document, index) => {
    setDeleting(true);
    await five.executeFunction(
      "DeleteDocument",
      //@ts-ignore
      document,
      null,
      null,
      null,
      async (result) => {
        await five.executeFunction(
          "getIVRDetails",
          selectedRecord.data,
          null,
          null,
          null,
          async (result) => {
            // Update documents state with fresh data
            const data = JSON.parse(result.serverResponse.results);
            setDocuments(data.document);
            setDeleting(false);
          }
        );
      }
    );
  };

  // -----------------------------------------------------
  // Data Fetching on Mount
  // -----------------------------------------------------
  useEffect(() => {
    setStatus(selectedRecord.data?.Status);

    const fetchData = async () => {
      setLoading(true);
      await five.executeFunction(
        "getIVRDetails",
        selectedRecord.data,
        null,
        null,
        null,
        async (result) => {
          const data = JSON.parse(result.serverResponse.results);
          const ivrData = data.ivr;
          setIVR(data);
          handlePatient(data?.patient);

          // ICD10 & CPT data
          setLCode(ivrData?.ICD10_L || "");
          setICode(ivrData?.ICD10_I || "");
          setECode(ivrData?.ICD10_E || "");
          setCDCode(ivrData?.ICD10_CD || "");
          setCPTCode(ivrData?.CPTCODE || "");
          setCPTCode2(ivrData?.CPTCODE2 || "");
          setCPTWoundSize1(ivrData?.WoundSize || "");
          setCPTWoundSize2(ivrData?.WoundSize2 || "");
          setCPTWound(ivrData?.WoundType || "");

          setStatus(selectedRecord.data?.Status);
          setDocuments(data.document);

          // If there's a saved product in DB, find it in productsList
          const matchedProduct = productsList.find(
            (item) => data?.product?.___PRD === item?.PRD
          );
          setProducts(matchedProduct || null);

          // Insurance fields
          setPrimaryMemberNumber(data?.patient?.Pay1MemberNumber || "");
          setSecondaryMemberNumber(data?.patient?.Pay2MemberNumber || "");
          setPrimaryGroupNumber(data?.patient?.Pay1Group || "");
          setSecondaryGroupNumber(data?.patient?.Pay2Group || "");

          // Practitioner, admitted, POS
          setPractitioner(data?.practitioner);
          setAdmitted(ivrData?.SNFAttendance ? ivrData?.SNFAttendance : false);
          setPlaceOfService(ivrData?.PlaceofService);

          // Payors
          const payorKeys = [data?.patient?.__PAY1, data?.patient?.__PAY2].filter(Boolean);
          const payorPromises = payorKeys.map((payorKey) => {
            const payorObject = { PayKey: payorKey };
            return new Promise((resolve) => {
              five.executeFunction(
                "getPatientInsurance",
                payorObject,
                null,
                null,
                null,
                (result) => {
                  const payorData = JSON.parse(result.serverResponse.results);
                  resolve(payorData.response.value[0]);
                }
              );
            });
          });
          const payorArray = await Promise.all(payorPromises);
          setPayors(payorArray);
          setSelectedCompany(payorArray[0]?.CompanyName || "");
          setSelectedCompanySecond(payorArray[1]?.CompanyName || "");

          // NPI
          setNPI(data?.account?.NPI || "");

          // Practitioner List
          await five.executeFunction(
            "getAccountPractitioners",
            {
              AccountKey: data?.account?.___ACT,
            },
            null,
            null,
            null,
            (result) => {
              const accountData = JSON.parse(result.serverResponse.results);
              const onlyPractitioners = accountData.filter(
                (item) => item?.Title === "Practitioner"
              );
              setPractitionerList(onlyPractitioners);

              // Match practitioner
              const matchedPractitioner = onlyPractitioners.find(
                (item) => item?.___USR === data?.practitioner?.___USR
              );
              setPractitioner(matchedPractitioner || null);
              setLoading(false);
            }
          );
        }
      );
    };

    fetchData();
  }, []);

  // -----------------------------------------------------
  // Validation Utils
  // -----------------------------------------------------
  const isValidRequiredValue = (val) => {
    if (!val) return false;
    const strVal = String(val).trim().toLowerCase();
    if (!strVal || strVal === "null") return false;
    return true;
  };

  const isPositiveNumber = (val) => {
    if (!val) return false;
    const num = parseFloat(val);
    if (Number.isNaN(num)) return false;
    return num > 0;
  };

  // Check if required fields are missing (example usage, not displayed)
  const isRequiredFieldMissing = useMemo(() => {
    // Practitioner must be chosen
    if (!practitioner || !practitioner.data?.___USR) return true;
    if (!isValidRequiredValue(existingIvrData?.account?.NPI)) return true;
    if (!products || products.length === 0) return true;
    if (!isValidRequiredValue(selectedCompany)) return true;
    if (!isValidRequiredValue(primaryMemberNumber)) return true;
    if (!isValidRequiredValue(primaryGroupNumber)) return true;

    // At least one ICD code is required
    const iCodeValid = isValidRequiredValue(iCode);
    const lCodeValid = isValidRequiredValue(lCode);
    const eCodeValid = isValidRequiredValue(eCode);
    const cdCodeValid = isValidRequiredValue(cdCode);
    if (!(iCodeValid || lCodeValid || eCodeValid || cdCodeValid)) return true;

    // CPT Code 1 & Wound Size 1
    if (!isValidRequiredValue(cptCode)) return true;
    if (!isPositiveNumber(cptWoundSize1)) return true;

    return false;
  }, [
    practitioner,
    existingIvrData?.account?.NPI,
    products,
    selectedCompany,
    primaryMemberNumber,
    primaryGroupNumber,
    iCode,
    lCode,
    eCode,
    cdCode,
    cptCode,
    cptWoundSize1,
  ]);

  // -----------------------------------------------------
  // Render Helpers
  // -----------------------------------------------------
  // Renders a single label-value pair
  const renderField = (label, value) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", width: '200px' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || "Not specified"}
      </Typography>
    </Box>
  );

  // For section titles with a divider
  const SectionHeader = ({ children }) => (
    <Box sx={{ mt: 4, mb: 2 }}>
      <Typography variant="h6" color="#14706A" fontWeight="600">
        {children}
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );

  // -----------------------------------------------------
  // Render
  // -----------------------------------------------------
  if (loading) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 8 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <SectionHeader>IVR Summary</SectionHeader>
        {/* Header */}
        <Box display="flex" flexDirection='row' width='50%' justifyContent="space-between" alignItems="center" >
        {renderField("Patient ID", patient.data?.ID)}
        {renderField("Patient Name", patient.data?.NameFirst + " " + patient.data?.NameLast)}
        </Box>
        <Box display="flex" flexDirection='row' width='50%' justifyContent="space-between" alignItems="center" >
        {renderField("Account", existingIvrData.Account)}
        {renderField("Practitioner", existingIvrData.Provider)}
        </Box>
        <Box display="flex" flexDirection='row' width='50%' justifyContent="space-between" alignItems="center" >
        {renderField("Group NPI", npi)}
        {renderField("Individual NPI", existingIvrData?.ProviderNPI)}
        </Box>
        {/* NPI */}
       

        {/* Primary Payor */}
        <SectionHeader>Primary Insurance</SectionHeader>
        {renderField("Primary Payor", selectedCompany)}
        {renderField("Primary Member Number", primaryMemberNumber)}
        {renderField("Primary Group Number", primaryGroupNumber)}

        {/* Secondary Payor */}
        <SectionHeader>Secondary Insurance</SectionHeader>
        {renderField("Secondary Payor", selectedCompanySecond)}
        {renderField("Secondary Member Number", secondaryMemberNumber)}
        {renderField("Secondary Group Number", secondaryGroupNumber)}

        {/* ICD10 Codes */}
        <SectionHeader>ICD10 Codes</SectionHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("I Code", iCode)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("L Code", lCode)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("E Code", eCode)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("CD Code", cdCode)}
          </Grid>
        </Grid>

        {/* CPT Codes */}
        <SectionHeader>CPT Code</SectionHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("Wound Size 1", cptWoundSize1)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("CPT Code 1", cptCode)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("Wound Size 2", cptWoundSize2)}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {renderField("CPT Code 2", cptCode2)}
          </Grid>
        </Grid>

        {/* Documents */}
        <SectionHeader>Documents</SectionHeader>
        {documents && documents.length > 0 ? (
          <Paper variant="outlined" sx={{ mb: 2 }}>
            <List id="documents-list" sx={{ p: 0 }}>
              {documents.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItemButton
                    id={`document-item-${index}`}
                    onClick={() => handleSecondDialogOpen(item)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      "&:hover": { backgroundColor: "rgba(20,112,106,0.08)" },
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {item?.Name}
                    </Typography>
                  </ListItemButton>
                  {index < documents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography variant="body2" sx={{ fontStyle: "italic", mb: 2 }}>
            No documents added
          </Typography>
        )}

        <Box>
            <Typography variant="subtitle2">
                    Notice: Any changes require a new IVR submission. Updates will not be processed without a new request.
            </Typography>
        </Box>

      
        {/* Close Button */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            id="close-ivr-btn"
            onClick={handleDialogClose}
            variant="contained"
            sx={{
              bgcolor: "#14706A",
              color: "#fff",
              "&:hover": {
                bgcolor: "#0e5b57",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Paper>

      {/* Document Preview Dialog */}
      <Dialog
        id="document-preview-dialog"
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        PaperProps={{
          style: {
            minWidth: "70vw",
            height: "90%",
          },
        }}
      >
        <DialogTitle>Document</DialogTitle>
        <DialogContent sx={{ width: "100%", height: "100%" }}>
          {selectedDocument && selectedDocument.Base64 ? (
            getMimeTypeFromDataUri(selectedDocument.Base64) ===
            "application/pdf" ? (
              <iframe
                id="pdf-preview-frame"
                src={selectedDocument.Base64}
                title="PDF Document"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            ) : (
              <img
                id="image-preview"
                src={selectedDocument.Base64}
                alt="Document"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            )
          ) : (
            <Typography variant="body2">No document available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            id="close-preview-btn"
            onClick={handleSecondDialogClose}
            variant="contained"
            sx={{
              bgcolor: "#14706A",
              "&:hover": { bgcolor: "#0e5b57" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog
        id="document-upload-dialog"
        open={documentDialogOpen}
        onClose={handleDocumentDialogClose}
      >
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <TextField
            id="document-name-input"
            fullWidth
            margin="normal"
            label="Set Document Name"
            value={documentName}
            required
            error={errors.documentName}
            helperText={errors.documentName ? "Document name is required" : ""}
            onChange={(e) => {
              setDocumentName(e.target.value);
              setErrors((prev) => ({ ...prev, documentName: false }));
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
              id="document-type-select"
              labelId="document-type-label"
              value={documentType}
              onChange={(e) => {
                handleDocumentTypeChange(e);
                setErrors((prev) => ({ ...prev, documentType: false }));
              }}
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
              id="other-document-type-input"
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
                setErrors((prev) => ({
                  ...prev,
                  otherDocumentType: false,
                }));
              }}
            />
          )}

          <Box sx={{ mt: 2 }}>
            <input
              id="file-upload-input"
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
        </DialogContent>

        <DialogActions>
          <Button
            id="cancel-upload-btn"
            onClick={handleDocumentDialogClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            id="confirm-upload-btn"
            onClick={handleDocumentDialogSubmit}
            color="primary"
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OpenIVRSummary;
