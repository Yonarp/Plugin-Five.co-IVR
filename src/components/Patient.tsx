import { Container, ListItemButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { List, ListItemText } from "../FivePluginApi";

const Patient = () => {
  const patients = ["John Doe", "Jane Smith"];
  const [selectedIndex, setSelectedIndex] = useState(null)

    const handleClick = (index) => {
        setSelectedIndex(index)
    }

  return (
    <Container>
      <Typography variant="h5" style ={{textAlign: 'center', marginBottom: '20px' }}>Select the patient</Typography>
      <List>
        {patients.map((patient, index) => {
          return (
            <ListItemButton
              key={index}
              selected = {selectedIndex === index}
              onClick={() => handleClick(index)}
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
            </ListItemButton>
          );
        })}
      </List>
    </Container>
  );
};

export default Patient