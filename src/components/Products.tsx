import { Container } from "@mui/material";
import React, { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "../FivePluginApi";

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState([
    { name: "", qty: "" },
    { name: "", qty: "" },
  ]);

  const products = [
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
  ];

  const handleProductChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].name = event.target.value;
    setSelectedProducts(newProducts);
  };

  const handleQtyChange = (index, event) => {
    const newProducts = [...selectedProducts];
    newProducts[index].qty = event.target.value;
    setSelectedProducts(newProducts);
  };

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { name: "", qty: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(newProducts);
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Select the product needed for this request.
      </Typography>
      {selectedProducts.map((product, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={5}>
            <Select
              fullWidth
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
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="number"
              value={product.qty}
              onChange={(event) => handleQtyChange(index, event)}
              placeholder="Qty"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveProduct(index)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        style={{ marginTop: "20px" }}
      >
        Add Product
      </Button>
    </Container>
  );
};

export default Products;
