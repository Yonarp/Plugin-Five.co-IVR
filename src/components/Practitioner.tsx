import { Container, ListItemButton } from "@mui/material";
import React from "react";
import {
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "../FivePluginApi";

const Practitioner = ({ members}) => {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  //@ts-ignore

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  

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
