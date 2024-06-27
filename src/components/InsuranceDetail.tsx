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
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import UploadFileIcon from "@mui/icons-material/UploadFile";
  
  //@ts-ignore
  const InsuranceDetail = ({ dialogOpenExternal,onClose,payor, handlePayor, isEdit  }) => {
    console.log("Payor Details from Insurance Detail", payor)
    const [formState, setFormState] = useState({
      PayorID: "",
      groupNumber: "",
      CompanyName: "",
      frontImage: null,
      backImage: null,
      frontImagePreview: "",
      backImagePreview: "",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [uploadType, setUploadType] = useState("");
  
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
        closeDialog()
    }


    const handleSubmit = (e) => {
      e.preventDefault();
        handlePayor(formState)
        setDialogOpen(false);
    }

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
  

 
    return (
        <Dialog open={dialogOpenExternal} onClose={onClose }>
        <DialogContent>
          <Container
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '.5rem',
            }}
          >
           
              <Typography variant="h5" mb={5}>
                Upload Insurance Details
              </Typography>

              <Box
                mb={2}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  value={ payor ? payor.PayorID : formState.memberNumber}
                  onChange={handleInputChange}
                />
              </Box>
              <Box
                mb={2}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography mr={3} sx={{ minWidth: 120 }}>
                  Company Name:
                </Typography>
                <TextField
                  label="Company Name"
                  margin="normal"
                  sx={{ minWidth: 170 }}
                  name="CompanyName"
                  value={payor ? payor?.CompanyName : formState.companyName}
                  onChange={handleInputChange}
                />
              </Box>
  
              <Box
                mb={2}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDialogOpen('front')}
                  style={{ marginBottom: '10px' }}
                >
                  Upload Front Image
                </Button>
                {formState.frontImagePreview && (
                  <img
                    src={formState.frontImagePreview}
                    alt="Front Preview"
                    style={{ width: '200px', marginBottom: '10px' }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDialogOpen('back')}
                >
                  Upload Back Image
                </Button>
                {formState.backImagePreview && (
                  <img
                    src={formState.backImagePreview}
                    alt="Back Preview"
                    style={{ width: '200px', marginTop: '10px' }}
                  />
                )}
              </Box>
  
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
          </Container>
        </DialogContent>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleFileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>       
      </Dialog>
    );
  };
  
  export default InsuranceDetail;
  