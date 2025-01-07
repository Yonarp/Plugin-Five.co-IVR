//@ts-nocheck
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CompanyNames } from "../strings";

//@ts-ignore
const InsuranceDetail = ({
  dialogOpenExternal,
  onClose,
  payor,
  handlePayor,
  handlePayorMain,
  isEdit,
  patient,
  index,
  setLoading
}) => {
  const [formState, setFormState] = useState({
    ___PAY: "",
    PayorID: "",
    groupNumber: "",
    CompanyName: "",
    frontImage: null,
    backImage: null,
    frontImagePreview: "",
    backImagePreview: "",
  });
  const [memberNumber, setMemberNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDialogOpen = (type) => {
    setUploadType(type);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseExternal = () => {
    onClose();
  };



  const handleSubmit = () => {
    setLoading(true)
    handleDialogCloseExternal();
    handlePayor(formState, index);
    handlePayorMain((prevPayor) => ({
      ...prevPayor,
      formState
    }))
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (uploadType === "front") {
        setFormState((prevState) => ({
          ...prevState,
          frontImage: file,
          frontImagePreview: reader.result,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          backImage: file,
          backImagePreview: reader.result,
        }));
      }
      handleDialogClose();
    };
    reader.readAsDataURL(file);
  };
  
  const getDocument = (val, docType) => patient.document.filter(obj => {
    return obj.__PAY === val && obj.Category === 'Insurance' && obj.Name.includes(docType)
  });

  useEffect(() => {

    let memberNumber
    let groupMemberNumber
    let frontImgPreview
    let backImgPreview

    if(index === 0) {

      memberNumber = patient.data.Pay1MemberNumber
      groupMemberNumber = patient.data.Pay1Group
      
      const paydocFront = getDocument(patient.data.__PAY1, 'Front');
      frontImgPreview = paydocFront[paydocFront.length - 1]?.Base64;
      const paydocBack = getDocument(patient.data.__PAY1, 'Back');
      backImgPreview = paydocBack[paydocBack.length - 1]?.Base64;
    } else {

      memberNumber = patient.data.Pay2MemberNumber
      groupMemberNumber = patient.data.Pay2Group

      const paydocFront = getDocument(patient.data.__PAY2, 'Front');
      frontImgPreview = paydocFront[paydocFront.length - 1]?.Base64;
      const paydocBack = getDocument(patient.data.__PAY2, 'Back');
      backImgPreview = paydocBack[paydocBack.length - 1]?.Base64;
    }

    if(!isEdit){
      setFormState({
        ___PAT: "",
        PayorID: "",
        groupNumber:  "",
        CompanyName:  "",
        frontImage: null,
        backImage: null,
        frontImagePreview: "",
        backImagePreview: "",
      });
    } else if (payor) {

      setFormState({
        ___PAT: patient.___PAY,
        PayorID: memberNumber,
        groupNumber: groupMemberNumber || "",
        CompanyName: payor.CompanyName || "",
        frontImage: null,
        backImage: null,
        frontImagePreview: frontImgPreview,
        backImagePreview: backImgPreview,
      });
    }
  }, [payor]);





  return (
    <Dialog open={dialogOpenExternal} onClose={onClose}>
      <DialogContent>
        <Container
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontSize: ".5rem",
          }}
        >
          <Typography variant="h5" mb={5}>
            Upload Insurance Details
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
              Company Name:
            </Typography>
            <Autocomplete
              options={[...CompanyNames, "Other"]}
              getOptionLabel={(option) => option}
              placeholder="Search"
              value={formState.CompanyName}
              onChange={(event, newValue) => {
                setIsOtherSelected(newValue === "Other");
                setFormState((prevState) => ({
                  ...prevState,
                  CompanyName: newValue || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  placeholder="Search"
                  margin="normal"
                  sx={{ minWidth: 250 }}  // Adjust the width here
                />
              )}
            />
          </Box>
          {isOtherSelected && (
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
                Enter Company Name:
              </Typography>
              <TextField
                label="Company Name"
                margin="normal"
                sx={{ minWidth: 300 }}
                name="CompanyName"
                value={formState.CompanyName}
                onChange={handleInputChange}
              />
            </Box>
          )}
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
              Member Number:
            </Typography>
            <TextField
              label="Member Number"
              margin="normal"
              sx={{ minWidth: 170 }}
              name="PayorID"
              value={formState.PayorID}
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
              Group Number:
            </Typography>
            <TextField
              label="Group Number"
              margin="normal"
              sx={{ minWidth: 170 }}
              name="groupNumber"
              value={formState.groupNumber}
              onChange={handleInputChange}
            />
          </Box>

          <Box
            mb={2}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogOpen("front")}
              style={{ marginBottom: "10px", background: "#D8EEDA", color: "#157069" }}
            >
              Upload Front Image
            </Button>
            {formState.frontImagePreview && (
              <img
                src={formState.frontImagePreview}
                alt="Front Preview"
                style={{ width: "200px", marginBottom: "10px" }}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogOpen("back")}
              style={{background: "#D8EEDA", color: "#157069"}}
            >
              Upload Back Image
            </Button>
            {formState.backImagePreview && (
              <img
                src={formState.backImagePreview}
                alt="Back Preview"
                style={{ width: "200px", marginTop: "10px" }}
              />
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px", background: "#14706A", color: "white" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Container>
      </DialogContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} accept="image/jpeg,image/png,application/pdf" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ color: "#14706A" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default InsuranceDetail;
