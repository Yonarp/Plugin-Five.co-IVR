import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  ListItemButton,
  Container,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
} from "../FivePluginApi";

//@ts-ignore
const Summary = ({
  patient,
  products,
  practitioner,
  eCode,
  iCode,
  lCode,
  cdCode,
  cptCode,
  npi,
  payors,
  setReadyToSubmit,
}) => {
  
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  console.log("Loggin products" , products)
  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setReadyToSubmit(event.target.checked);
  };

  const handleDialogOpen = (document) => {
    setSelectedDocument(document);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  //@ts-ignore
  const getDataUri = (base64: string, contentType: string) => {
    // Check if the base64 string is already a Data URI
    if (base64.startsWith("data:")) {
      return base64; // It's already a Data URI, return as-is
    }

    // If not, construct the Data URI using the contentType and base64 string
    return `data:${contentType};base64,${base64}`;
  };

  const getMimeTypeFromDataUri = (dataUri) => {
    // Extract the MIME type from the Data URI, e.g., "application/pdf", "image/jpeg"
    const mimeType = dataUri.match(/data:([^;]+);base64,/);
    return mimeType ? mimeType[1] : null;
  };

  console.log("Logging Patients to see the document Type: ", patient);

  return (
    <Container style={{ width: "100%" }}>
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
          value={npi}
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
              <Typography variant="body2">{products[0].brandname} - {products[0].qcode}</Typography>
            </Grid>
          ) : null}

          {products && products.length > 1 && products[1]?.name ? (
            <Grid item xs={6}>
              <Typography variant="body1">Product 2</Typography>
              <Typography variant="body2">{products[1].brandname} - {products[1].qcode}</Typography>
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
            <Typography variant="body1">
              {lCode && `L Code: ${lCode}`}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              {cptCode && `CPT Code: ${cptCode}`}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" mt={3}>
          Documents:
        </Typography>
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
            <Typography variant="body2" style={{ fontSize: "13px" }}>
              I certify I have obtained a valid authorization under applicable
              law from the patient listed on this form (a) permitting me to
              release the patient’s protected health information to Legacy
              Medical and its contractors to research insurance coverage
              regarding Legacy Medical products, and to provide me with
              reimbursement assistance services regarding such products; and (b)
              authorizing the payer to disclose PHI to Legacy Medical and its
              contractors for the purposes of determining benefit coverage.
            </Typography>
          }
          sx={{ mt: 2 }}
        />
      </Box>
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
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
    </Container>
  );
};

export default Summary;
