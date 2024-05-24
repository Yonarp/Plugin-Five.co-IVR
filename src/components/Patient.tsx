import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { List, ListItem, ListItemText } from "../FivePluginApi";

const Patient = () => {
  const patients = ["John Doe", "Jane Doe"];
  return (
    <Container>
      <Typography variant="h5">Select the patient</Typography>
      <List>
        {patients.map((patient, index) => {
          return (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #00000033",
                "&.Mui-selected": {
                  backgroundColor: "#F4F8D0",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "lightblue",
                  },
                },
              }}
            >
              <ListItemText primary={patient}/>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};
