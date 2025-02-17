import { Container, ListItemButton } from "@mui/material";
import React, { useEffect, memo } from "react";
import {
  CircularProgress,
  List,
  ListItemText,
  Typography,
} from "../FivePluginApi";
const Practitioner = ({
  five,
  setPractitioner,
  practitioner,
  existingPatient,
  account,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    practitioner ? practitioner : null
  );
  const [practitioners, setPractitioners] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleClick = (index, practitioner) => {
    setSelectedIndex(index);
    setPractitioner(practitioner, index);
  };

  useEffect(() => {
    if (practitioner) {
      setSelectedIndex(practitioner?.index);
    }

    if (practitioners === null) {
      setLoading(true);
      const fetchData = async () => {
        five.executeFunction(
          "getAccountPractitioners",
          account,
          null,
          null,
          null,
          (result) => {
            const data = JSON.parse(result.serverResponse.results);
            const sortedData = data.sort((a, b) => {
              if (a.NameFirst < b.NameFirst) {
                return -1;
              }
              if (a.NameFirst > b.NameFirst) {
                return 1;
              }
              return 0;
            });

            setPractitioners(sortedData);
            if (existingPatient) {
              data.map((item, index) => {
                if (item?.___USR === practitioner?.data.___USR) {
                  setSelectedIndex(index);
                }
              });
            }
            setLoading(false);
          }
        );
      };
      //@ts-ignore

      fetchData();
    }
  }, []);

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#14706A" }} />
      </Container>
    );
  }

  return (
    <Container id="practitioner-container">
      <Typography
        mt={6}
        variant="h5"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Select a practitioner for this request
      </Typography>
      <List id="practitioners-list" style={{ marginBottom: "70px" }}>
        {practitioners ? (
          practitioners.map((practitionerItem, index) => {
            return practitionerItem.Title === "Practitioner" ? (
              <ListItemButton
                id={`practitioner-item-${index}`}
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleClick(index, practitionerItem)}
                sx={{
                  borderBottom: "1px solid #00000033",
                  "&.Mui-selected": {
                    backgroundColor: "#F1FAF3",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#FFF9E7",
                    },
                  },
                }}
              >
                <ListItemText
                  id={`practitioner-text-${index}`}
                  primary={practitionerItem.NameFull}
                  secondary={practitionerItem.Email}
                />
              </ListItemButton>
            ) : null;
          })
        ) : (
          <CircularProgress sx={{ color: "#14706A" }} />
        )}
      </List>
    </Container>
  );
};

export default memo(Practitioner);
