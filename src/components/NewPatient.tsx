import React, { useState } from 'react';
import { Container, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Patient from './Patient'; // Ensure this import points to your Patient component

const NewPatient = ({ data, handlePatient, five, patient, setPatient, handleNext, setNewPatient }) => {
  const [page, setPage] = useState(0);
  const [formState, setFormState] = useState({
    NameFirst: '',
    NameLast: '',
    Gender: '',
    Birthdate: '',
    AddressStreet: '',
    AddressStreet2: '',
    AddressCity: '',
    AddressState: '',
    AddressZip: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(event.target.files[0]);
    handleDialogClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatient({ data: formState });
    setNewPatient(true)
    handleNext()
  };

  return (
    <>
      {page === 0 && (
        <Container
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '10px',
            marginBottom: '100px'
          }}
        >
          <Box
            style={{
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid grey',
              padding: 20,
              borderRadius: '10px',
              boxShadow: '5px 5px 5px rgba(0,0,0,0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '.5rem',
              marginLeft: '40px',
              position: 'relative',
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <IconButton
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
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
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography mr={3} sx={{ minWidth: 120 }}>
                First Name:{' '}
              </Typography>
              <TextField label="First Name" margin="normal" sx={{ minWidth: 170 }} name="NameFirst" onChange={handleInputChange} />
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
                Last Name:{' '}
              </Typography>
              <TextField label="Last Name" margin="normal" variant="outlined" sx={{ minWidth: 170 }} name="NameLast" onChange={handleInputChange} />
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
              <Typography mr={3} sx={{ minWidth: 120, maxWidth: 120 }}>
                Gender:{' '}
              </Typography>
              <FormControl margin="normal" variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select labelId="gender-select-label" value={formState.Gender} onChange={handleInputChange} label="Gender" name="Gender">
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="F">F</MenuItem>
                </Select>
              </FormControl>
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
                Birthdate:{' '}
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <TextField
                  label="Street"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressStreet}
                  onChange={handleInputChange}
                  sx={{ flex: 3, marginRight: '8px' }}
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <TextField
                  label="City"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressCity}
                  onChange={handleInputChange}
                  sx={{ flex: 2, marginRight: '8px' }}
                  name="AddressCity"
                />
                <TextField
                  label="State"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressState}
                  onChange={handleInputChange}
                  sx={{ flex: 1, maxWidth: '80px', marginRight: '8px' }}
                  name="AddressState"
                />
                <TextField
                  label="Zip Code"
                  margin="normal"
                  variant="outlined"
                  value={formState.AddressZip}
                  onChange={handleInputChange}
                  sx={{ flex: 1, maxWidth: '120px' }}
                  name="AddressZip"
                />
              </Box>
            </Grid>

            {selectedFile && <Typography mt={2}>Uploaded file: {selectedFile.name}</Typography>}

            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Submit
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
          <Typography style={{ color: 'black' }} mt={5}>
            IVR for an existing patient?
          </Typography>
          <Button style={{ color: 'black' }} onClick={() => setPage(1)}>
            Select an existing patient
          </Button>
        </Container>
      )}
      {page === 1 && (
        <div className="container" style={{ width: '100%' }}>
          <Patient patients={data.response.value} handlePatient={handlePatient} five={five} patientSaved={patient} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default NewPatient;
