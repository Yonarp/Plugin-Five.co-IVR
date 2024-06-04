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

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState([
    { name: "", qty: "" },
    { name: "", qty: "" },
  ]);

  const products = [
    "ZNG-0202",
    "ZNG-0203",
    "ZNG-0404",
    "ZNG-0406",
    "ZNG-0408",
    "IMP-0202",
    "IMP-0203",
    "IMP-0404",
    "IMP-0406",
    "IMP-0408",
    "ORI-0202",
    "ORI-0203",
    "ORI-0404",
    "ORI-0406",
    "ORI-0408",
    "SFT-0203",
    "SFT-0204",
    "SFT-0404",
    "SFT-0406",
    "SFT-0408",
  ];
  /* 
  const productsSimple = [
    "Impax Dual Layer Graft 2x2 cm",
    "Impax Dual Layer Graft 2x3 cm",
    "Impax Dual Layer Graft 4x4 cm",
    "Impax Dual Layer Graft 4x6 cm",
    "Impax Dual Layer Graft 4x8 cm",
    "Orion 2x2 cm",
    "Orion 2x3 cm",
    "Orion 4x4 cm",
    "Orion 4x6 cm",
    "Orion 4x8 cm",
    "Surgraft 2x2 cm",
    "Zenith Graft 2x2 cm",
    "Zenith Graft 2x3 cm",
    "Zenith Graft 4x4 cm",
    "Zenith Graft 4x6 cm",
    "Zenith Graft 4x8 cm",
  ] */

  const handleProductChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].name = event.target.value;
    setSelectedProducts(newProducts);
  };

  /* const handleQtyChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].qty = event.target.value;
    setSelectedProducts(newProducts);
  }; */

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
              <MenuItem key={idx} value={product}>
                {product}
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
