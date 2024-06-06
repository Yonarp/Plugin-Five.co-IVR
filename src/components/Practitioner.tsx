import { Container, ListItemButton } from "@mui/material";
import React, { useEffect } from "react";
import {
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "../FivePluginApi";
const Practitioner = ({ five }) => {
  const [selectedIndex, setSelectedIndex] = React.useState([]);
  const [practitioners, setPractitioners] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  console.log("Logging Five", five);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (practitioners === null) {
      setLoading(true);
      const fetchData = async () => {
        five.executeFunction(
          "getAccountPractitioners",
          null,
          null,
          null,
          null,
          (result) => {
            console.log("Loggin From Practitioners");
            console.log(result.serverResponse.results);
            console.log(JSON.parse(result.serverResponse.results));
            setPractitioners(JSON.parse(result.serverResponse.results));
            setLoading(false);
          }
        );
      };
      //@ts-ignore

      fetchData();
    }
  }, []);

  if (loading === null) {
    return (
      <Container
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
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
        {practitioners ? (
          practitioners.map((practitioner, index) => {
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
                <ListItemText primary={practitioner.NameFull} secondary={practitioner.Email} />
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
