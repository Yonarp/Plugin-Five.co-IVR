import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

const Summary = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Insurance Verification Request
      </Typography>
      <TextField
        label="Date of Service"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Provider"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="NPI"
        value="2468597750"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Primary Payor"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Secondary Payor"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
      />
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={6}>
          <Typography variant="body1">Product 1</Typography>
          <Typography variant="body2">Orion - Q4276</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Product 2</Typography>
          <Typography variant="body2">Codes</Typography>
          <Typography variant="body2">15271</Typography>
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox />}
        label="I certify I have obtained a valid authorization under applicable law from the patient listed on this form (a) permitting me to release the patient’s protected health information to Legacy Medical and its contractors to research insurance coverage regarding Legacy Medical products, and to provide me with reimbursement assistance services regarding such products; and (b) authorizing the payer to disclose PHI to Legacy Medical and its contractors for the purposes of determining benefit coverage."
        sx={{ mt: 2 }}
      />
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;
