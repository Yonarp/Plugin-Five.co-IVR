import { Container } from "@mui/material";
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  // TextField,
  Typography,
} from "../FivePluginApi";

import DeleteIcon from "@mui/icons-material/Delete";

const Products = ({setProducts}) => {
  const [selectedProducts, setSelectedProducts] = useState([
    { name: "", qty: "" },
    { name: "", qty: "" },
  ]);

  const products = [
    { Description: "Zenith - Q4523", QCode: "Q4523", Brand: "Zenith" },
    { Description: "Impax - Q4262", QCode: "Q4262", Brand: "Impax" },
    { Description: "Orion - Q4276", QCode: "Q4276", Brand: "Orion" },
    { Description: "Surgraft - Q4268", QCode: "Q4268", Brand: "Surgraft" }
];

  const handleProductChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].name = event.target.value;
    setSelectedProducts(newProducts);
    setProducts(newProducts)
  };


  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { name: "", qty: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  return (
    <Container
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Select the product needed for this request.
      </Typography>
      {selectedProducts.map((product, index) => (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <Select
            fullWidth
            sx={{ margin: "10px 5px" }}
            value={product.name}
            onChange={(event) => handleProductChange(index, event)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a product
            </MenuItem>
            {products.map((product, idx) => (
              <MenuItem key={idx} value={product.Description}>
                {product.Description}
              </MenuItem>
            ))}
          </Select>

          <DeleteIcon
            htmlColor="red"
            onClick={() => handleRemoveProduct(index)}
            sx={{
              fill: "!important red",
              cursor: "pointer",
              "&:hover": {
                fill: "!important darkred",
                opacity: 0.5, // Change the color on hover
              },
            }}
          />
        </Box>
      ))}
      <Box style={{ width: "50%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          style={{ marginTop: "20px", borderRadius: '50px' }}
        >
          +
        </Button>
      </Box>
    </Container>
  );
};

export default Products;
