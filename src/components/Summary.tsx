import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

//@ts-ignore
const Summary = ({
  products,
  practitioner,
  eCode,
  iCode,
  lCode,
  cdCode,
  cptCode,
  payors,
  setReadyToSubmit,
}) => {
  console.log("SNF Admissions :", payors);
  const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setReadyToSubmit(event.target.checked)
  };
  return (
    <Box
      sx={{ p: 2, maxWidth: 600, mx: "auto", boxShadow: 3, borderRadius: 2 }}
      mt={10}
      mb={20}
    >
      <Typography variant="h6" gutterBottom>
        Insurance Verification Request
      </Typography>
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
        value={payors[0]?.CompanyName}
        margin="dense"
        InputProps={{
          readOnly: true,
        }}
        size="small"
      />
      <TextField
        label="Secondary Payor"
        fullWidth
        value={payors[1]?.CompanyName}
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
      <Typography variant="h6" mt={3}>
        Codes:
      </Typography>
      <Grid container spacing={2} marginTop={1} xs="auto">
        <Grid item xs={3}>
          <Typography variant="body1">
            {eCode
              ? `E Code: ${eCode}`
              : iCode
              ? `I Code: ${iCode}`
              : `CD Code: ${cdCode}`}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">{lCode && `L Code: ${lCode}`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">
            {cptCode && `CPT Code: ${cptCode}`}
          </Typography>
        </Grid>
      </Grid>

      <FormControlLabel
        style={{ display: "flex", alignItems: "flex-start" }}
        control={
          <Checkbox
            size="small"
            style={{ marginBottom: "10px" }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        }
        label={
          <Typography variant="body2" style={{ fontSize: "11px" }}>
            I certify I have obtained a valid authorization under applicable law
            from the patient listed on this form (a) permitting me to release
            the patient’s protected health information to Legacy Medical and its
            contractors to research insurance coverage regarding Legacy Medical
            products, and to provide me with reimbursement assistance services
            regarding such products; and (b) authorizing the payer to disclose
            PHI to Legacy Medical and its contractors for the purposes of
            determining benefit coverage.
          </Typography>
        }
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default Summary;
