import React from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const Summary = ({ products, practitioner, eCode, iCode, lCode, cdCode, cptCode }) => {
  return (
    <Box
      sx={{ p: 2, maxWidth: 600, mx: "auto", boxShadow: 3, borderRadius: 2 }}
      mt={10}
    >
      <Typography variant="h6" gutterBottom>
        Insurance Verification Request
      </Typography>
      <TextField
        label="Date of Service"
        type="date"
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <TextField
        label="Practitioner"
        fullWidth
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        value={practitioner ? practitioner.data.NameFull : ""}
        size="small"
      />
      <TextField
        label="NPI"
        value="2468597750"
        fullWidth
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        size="small"
      />
      <TextField
        label="Primary Payor"
        fullWidth
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        size="small"
      />
      <TextField
        label="Secondary Payor"
        fullWidth
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        size="small"
      />
      <Grid container spacing={1} marginTop={1}>
        {products && products.length > 0 && products[0]?.name ? (
          <Grid item xs={6}>
            <Typography variant="body1">Product 1</Typography>
            <Typography variant="body2">{products[0].name}</Typography>
          </Grid>
        ) : null}

        {products && products.length > 1 && products[1]?.name ? (
          <Grid item xs={6}>
            <Typography variant="body1">Product 2</Typography>
            <Typography variant="body2">{products[1].name}</Typography>
          </Grid>
        ) : null}
      </Grid>
      <Typography variant="h6">Codes:</Typography>
      <Grid item xs="auto">
         <Typography variant="body1">
          {eCode ? `Ecode: ${eCode}` : (iCode ? `ICode: ${iCode}` : `CD-Code: ${cdCode}`)}
         </Typography>
         <Typography variant="body2">
          {lCode && `LCode: ${lCode}`}
         </Typography>
         <Typography variant="body2">
          {cptCode && `CPTCode: ${cptCode}`}
         </Typography>
      </Grid>

      <FormControlLabel
        control={<Checkbox size="small" />}
        label={
          <Typography variant="body2" style={{fontSize:'11px'}}>
            I certify I have obtained a valid authorization under applicable law from the patient listed on this form (a) permitting me to release the patient’s protected health information to Legacy Medical and its contractors to research insurance coverage regarding Legacy Medical products, and to provide me with reimbursement assistance services regarding such products; and (b) authorizing the payer to disclose PHI to Legacy Medical and its contractors for the purposes of determining benefit coverage.
          </Typography>
        }
        sx={{ mt: 2 }}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" size="small">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;
