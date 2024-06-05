import { Container, ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import {
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "../FivePluginApi";
const Practitioner = ({five}) => {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const members = [
    { NameFull: 'Bob Brown', Title: '' },
    { NameFull: 'Member 1', Title: '' },
    { NameFull: 'Member 2', Title: '' }
  ];
  
  console.log("Logging Five", five)

  const handleClick = (index) => {
    setSelectedIndex(index);
  };


  useEffect(() => {

    //@ts-ignore
    const results = five.executeFunction(
      "TesDataFunction",
      null,
      null,
      null,
      null,
      (result) => {
        console.log("Loggin From Practitioners");
        console.log(result.serverResponse.results)
        console.log(JSON.parse(result.serverResponse.results));
      
      }
    );

  }, [])

  

  if (members === null) {
    return <CircularProgress />;
  }
  

  return (
    <Container>
      <Typography
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select A Practitioner for this request
      </Typography>
      <List>
        {members ? (
          members.map((practitioner, index) => {
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
          })
        ) : (
          <CircularProgress />
        )}
      </List>
    </Container>
  );
};

export default Practitioner;
