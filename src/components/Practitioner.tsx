import { Container, ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import { List, ListItemText, Typography } from "../FivePluginApi";
import { CustomFieldProps } from "../../../../common";

const Practitioner = ( account, props: CustomFieldProps ) => {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const [practitioners, setPractitioners] = React.useState([]);
    //@ts-ignore
  const { theme, value, variant, five } = props;

  const handleClick = (index) => {
    setSelectedIndex(index);
  };


  console.log(account)

  useEffect(() => {
  
      setPractitioners(() => {
        return [
          { NameFull: 'Bob Brown', Title: '' },
          { NameFull: 'Member 1', Title: '' },
          { NameFull: 'Member 2', Title: '' }
        ];
      })
  }, []);



  return (
    <Container>
      <Typography
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select A Practitioner for this request
      </Typography>
      <List>
        {practitioners.map((practitioner, index) => {
          return (
            <ListItemButton
              key={index}
              //@ts-ignore
              selected={selectedIndex === index}
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
              <ListItemText primary={practitioner.NameFull} />
              <ListItemText primary={practitioner.Title} />
            </ListItemButton>
          );
        })}
      </List>
    </Container>
  );
};

export default Practitioner;
