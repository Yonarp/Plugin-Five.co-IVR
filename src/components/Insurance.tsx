import { Container } from "@mui/material";
import React, {useState} from "react";
import { List, ListItem, ListItemText, /* MenuItem ,*/ /* Select, */ Typography } from "../FivePluginApi";



const Insurance = () => {

    const [selectedPayors, setSelectedPayors] = useState([]);

    const payors = [
      { name: 'Aetna Better Health (FL)', id: '12345' },
      { name: 'AARP', id: 'asdfg' },
      // Add more payors as needed
    ];
  
    const handlePayorClick = (payor) => {
      if (!selectedPayors.includes(payor)) {
        setSelectedPayors([...selectedPayors, payor]);
      }
    };
  
    const getPayorLabel = (index) => {
      switch (index) {
        case 0:
          return 'Primary payor';
        case 1:
          return 'Secondary payor';
        case 2:
          return 'Tertiary payor';
        default:
          return null;
      }
    };
  
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Select the insurance payors in the order they should be billed.
        </Typography>
        <List>
          {payors.map((payor, index) => (
            <ListItem key={index} button onClick={() => handlePayorClick(payor)}>
              <ListItemText primary={payor.name} secondary={payor.id} />
            </ListItem>
          ))}
        </List>
  
        {selectedPayors.slice(0, 3).map((payor, index) => (
          <div key={index}>
            <Typography variant="subtitle1" gutterBottom>
              {getPayorLabel(index)}
            </Typography>
            <Typography variant="body1">{payor.name}</Typography>
          </div>
        ))}
      </Container>
    );


}

export default Insurance