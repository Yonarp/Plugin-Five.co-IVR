import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  // TextField,
  Typography,
} from "../FivePluginApi";

import DeleteIcon from "@mui/icons-material/Delete";

const Products = ({setProducts, productsSaved}) => {
  const [selectedProducts, setSelectedProducts] = useState(productsSaved ? productsSaved : [
    { name: "", qty: "" },
    { name: "", qty: "" },
  ]);

  const products = [
    { Description: "Zenith - Q4523", QCode: "Q4523", Brand: "Zenith", PRD: '016876A9-65E1-4303-AF66-B438D7E30885' },
    { Description: "Impax - Q4262", QCode: "Q4262", Brand: "Impax", PRD: '0612FAFD-53F6-4C47-B682-D70AFAE52A41' },
    { Description: "Orion - Q4276", QCode: "Q4276", Brand: "Orion", PRD: '4909AE5B-8DEA-4845-91E3-8BED0BED8665' },
    { Description: "Surgraft - Q4268", QCode: "Q4268", Brand: "Surgraft", PRD: '0E067184-4777-49A7-9E8B-A9CAA959485A' }
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
    setProducts(newProducts)
  };

  useEffect(() => {
    console.log("Use Effect From Products");
    if (productsSaved.length === 0) {
      setSelectedProducts([
        { name: "", qty: "" },
      ]);
    } else {
      setSelectedProducts(productsSaved);
    }
  }, [productsSaved]);

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
      <Typography variant="h5" style={{ textAlign: "center", marginBottom: "20px" }}  mt={6}>
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
